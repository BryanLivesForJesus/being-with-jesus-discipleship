"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  function getReact() { const R = window.React; if (!R) throw new Error("dc-runtime: window.React is not available yet"); return R; }
  function getReactDOM() { const RD = window.ReactDOM; if (!RD) throw new Error("dc-runtime: window.ReactDOM is not available yet"); return RD; }
  var h = ((...args) => getReact().createElement(...args));
  function parseDcDocument(doc) {
    const dc = doc.querySelector("x-dc"); if (!dc) return null;
    const scriptEl = doc.querySelector("script[data-dc-script]");
    const { props, preview } = parseDataProps(scriptEl?.getAttribute("data-props") ?? null);
    return { template: dc.innerHTML, js: scriptEl ? scriptEl.textContent || "" : "", props, preview };
  }
  function parseDcText(src) {
    const openMatch = /<x-dc(?:\s[^>]*)?>/.exec(src); if (!openMatch) return null;
    const close = src.lastIndexOf("</x-dc>"); if (close === -1 || close < openMatch.index) return null;
    const template = src.slice(openMatch.index + openMatch[0].length, close);
    const doc = new DOMParser().parseFromString(src, "text/html");
    const scriptEl = doc.querySelector("script[data-dc-script]");
    const { props, preview } = parseDataProps(scriptEl?.getAttribute("data-props") ?? null);
    return { template, js: scriptEl ? scriptEl.textContent || "" : "", props, preview };
  }
  function parseDataProps(raw) {
    if (!raw) return { props: null, preview: null };
    let parsed; try { parsed = JSON.parse(raw); } catch { return { props: null, preview: null }; }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return { props: null, preview: null };
    const obj = parsed; const preview = obj.$preview && typeof obj.$preview === "object" ? obj.$preview : null;
    const rest = {}; for (const k of Object.keys(obj)) { if (k[0] !== "$") rest[k] = obj[k]; }
    return { props: Object.keys(rest).length ? rest : null, preview };
  }
  function dcNameFromPath(pathname) {
    let p = pathname || ""; try { p = decodeURIComponent(p); } catch {}
    const base = p.split("/").pop() || "Root";
    return base.replace(/\.dc\.html$/, "").replace(/\.html?$/, "") || "Root";
  }
  var BASE_CSS = `
    .sc-placeholder{background:color-mix(in srgb,currentColor 8%,transparent);border:1px solid color-mix(in srgb,currentColor 50%,transparent);border-radius:2px;box-sizing:border-box;overflow:hidden}
    @keyframes sc-shine{0%{background-position:100% 50%}100%{background-position:0% 50%}}
    html.sc-dc-streaming .sc-placeholder,html.sc-dc-streaming .sc-interp.sc-missing{position:relative;background:color-mix(in srgb,currentColor 5%,transparent);border-color:transparent}
    html.sc-dc-streaming .sc-placeholder::before,html.sc-dc-streaming .sc-interp.sc-missing::before{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(217,119,87,0) 25%,rgba(247,225,211,.95) 37%,rgba(217,119,87,0) 63%);background-size:400% 100%;animation:sc-shine 1.4s ease infinite}
    html.sc-dc-streaming .sc-placeholder:nth-child(n+9 of .sc-placeholder)::before,html.sc-dc-streaming .sc-interp.sc-missing:nth-child(n+9 of .sc-interp.sc-missing)::before{animation:none;background:color-mix(in srgb,currentColor 8%,transparent)}
    .sc-placeholder-error{padding:4px 8px;font:11px/1.4 ui-monospace,monospace;color:color-mix(in srgb,currentColor 70%,transparent);word-break:break-word}
    .sc-interp.sc-missing{display:inline-block;width:2em;height:1em;overflow:hidden;vertical-align:text-bottom;background:rgba(255,255,255,.3);border:1px solid rgba(0,0,0,.5);border-radius:2px;box-sizing:border-box;color:transparent;user-select:none}
    .sc-interp.sc-unresolved{font-family:ui-monospace,monospace;font-size:.85em;color:color-mix(in srgb,currentColor 50%,transparent);background:color-mix(in srgb,currentColor 10%,transparent);border-radius:3px;padding:0 3px}
    .sc-host.sc-has-error{position:relative}
    .sc-logic-error{position:absolute;top:8px;left:8px;z-index:2147483647;max-width:60ch;padding:6px 10px;background:#b00020;color:#fff;font:12px/1.4 ui-monospace,monospace;border-radius:4px;white-space:pre-wrap;pointer-events:none}
  `;
  var FULL_PAGE_CSS = "html,body{height:100%;margin:0}#dc-root,#dc-root>.sc-host{height:100%}";
  function rootNameForDocument(doc, loc) {
    let bootPath = loc.pathname || "";
    if (!/\.dc\.html?$/i.test(safeDecode(bootPath))) { try { bootPath = new URL(doc.baseURI || "/").pathname; } catch {} }
    return dcNameFromPath(bootPath);
  }
  function safeDecode(s) { try { return decodeURIComponent(s); } catch { return s; } }
  function boot(runtime, doc = document) {
    const parsed = parseDcDocument(doc); if (!parsed) return null;
    const React = getReact(); const rootName = rootNameForDocument(doc, location);
    runtime.markFetched(rootName); runtime.setRootName(rootName); runtime.adoptParsed(rootName, parsed);
    if (!window.__resources) { fetch(location.href).then((res) => res.ok ? res.text() : "").then((t) => { const raw = t ? parseDcText(t) : null; if (raw?.template) runtime.updateHtml(rootName, raw.template); }).catch(() => {}); }
    const dc = doc.querySelector("x-dc"); const hostEl = doc.createElement("div"); hostEl.id = "dc-root"; dc.replaceWith(hostEl);
    if (!parsed.preview) { const s = doc.createElement("style"); s.textContent = FULL_PAGE_CSS; doc.head.appendChild(s); }
    const Root = runtime.getDC(rootName); const entry = runtime.registry.get(rootName);
    function StandaloneRoot() {
      const [, setTick] = React.useState(0);
      React.useEffect(() => { const sub = () => setTick((n) => n + 1); entry.subs.add(sub); return () => { entry.subs.delete(sub); }; }, []);
      const defaults = React.useMemo(() => { const d = {}; for (const k in entry.propsMeta || {}) { const v = entry.propsMeta?.[k]?.default; if (v !== void 0) d[k] = v; } return d; }, [entry.propsMeta]);
      return h(Root, { ...defaults, ...entry.propOverrides || {} });
    }
    const ReactDOM = getReactDOM(); if (ReactDOM.createRoot) ReactDOM.createRoot(hostEl).render(h(StandaloneRoot)); else ReactDOM.render(h(StandaloneRoot), hostEl);
    return rootName;
  }
  var IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*/;
  var NUMBER_RE = /^-?\d+(\.\d+)?$/;
  function resolve(vals, src) {
    const expr = String(src).trim(); if (!expr) return void 0;
    if (expr[0] === "(" && expr[expr.length - 1] === ")" && parensWrapWhole(expr)) return resolve(vals, expr.slice(1, -1));
    const eq = findTopLevelEquality(expr);
    if (eq) {
      const lv = resolve(vals, expr.slice(0, eq.index)); const rv = resolve(vals, expr.slice(eq.index + eq.op.length));
      switch (eq.op) { case "===": return lv === rv; case "!==": return lv !== rv; case "==": return lv == rv; default: return lv != rv; }
    }
    if (expr[0] === "!") return !resolve(vals, expr.slice(1));
    if (expr === "true") return true; if (expr === "false") return false; if (expr === "null") return null; if (expr === "undefined") return void 0;
    if (NUMBER_RE.test(expr)) return Number(expr);
    if (expr.length >= 2 && (expr[0] === '"' || expr[0] === "'") && expr[expr.length - 1] === expr[0]) return expr.slice(1, -1);
    return resolvePath(vals, expr);
  }
  function parensWrapWhole(expr) {
    let depth = 0; for (let i = 0; i < expr.length - 1; i++) { if (expr[i] === "(") depth++; else if (expr[i] === ")") { depth--; if (depth === 0) return false; } }
    return true;
  }
  function findTopLevelEquality(expr) {
    let depth = 0;
    for (let i = 0; i < expr.length; i++) {
      const c = expr[i]; if (c === "[" || c === "(") depth++; else if (c === "]" || c === ")") depth--;
      else if (depth === 0 && (c === "=" || c === "!") && expr[i + 1] === "=") {
        if (i > 0 && (expr[i - 1] === "=" || expr[i - 1] === "!")) continue;
        if (!expr.slice(0, i).trim()) continue; const op = expr[i + 2] === "=" ? c + "==" : c + "="; return { index: i, op };
      }
    }
    return null;
  }
  function resolvePath(vals, expr) {
    const head = expr.match(IDENT_RE); if (!head) return void 0;
    let cur = vals == null ? void 0 : vals[head[0]]; let i = head[0].length;
    while (i < expr.length) {
      if (expr[i] === ".") {
        const m = expr.slice(i + 1).match(IDENT_RE) || expr.slice(i + 1).match(/^\d+/); if (!m) return void 0;
        cur = cur == null ? void 0 : cur[m[0]]; i += 1 + m[0].length;
      } else if (expr[i] === "[") {
        let depth = 1; let j = i + 1;
        while (j < expr.length && depth > 0) { if (expr[j] === "[") depth++; else if (expr[j] === "]") { depth--; if (depth === 0) break; } j++; }
        if (depth !== 0) return void 0;
        const key = resolve(vals, expr.slice(i + 1, j)); cur = cur == null ? void 0 : cur[key]; i = j + 1;
      } else return void 0;
    }
    return cur;
  }
  var CAMEL_ATTR = "sc-camel-";
  var INLINE_TEXT_TAGS = new Set("a abbr b bdi bdo br cite code del dfn em i ins kbd mark q s samp small span strike strong sub sup u var wbr".split(" "));
  var RAW_WRAP = { select: "sc-raw-select", table: "sc-raw-table", tbody: "sc-raw-tbody", thead: "sc-raw-thead", tfoot: "sc-raw-tfoot", tr: "sc-raw-tr", td: "sc-raw-td", th: "sc-raw-th", caption: "sc-raw-caption" };
  var RAW_UNWRAP = Object.fromEntries(Object.entries(RAW_WRAP).map(([k, v]) => [v, k]));
  var EVENT_MAP = { onclick: "onClick", onchange: "onChange", oninput: "onInput", onsubmit: "onSubmit" }; // abbreviated mapping
  var ATTRS = `(?:[^>"']|"[^"]*"|'[^']*')*`;
  var IMPORT_SELF_CLOSE_RE = new RegExp("<(x-import|dc-import)(" + ATTRS + ")/>", "gi");
  var CAMEL_ATTR_RE = /(\s)([a-z]+[A-Z][A-Za-z0-9]*)(\s*=)/g;
  function encodeCamelAttrs(html) { return html.replace(CAMEL_ATTR_RE, (_, sp, name, eq) => sp + CAMEL_ATTR + name.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()) + eq); }
  function encodeCase(html) {
    html = html.replace(IMPORT_SELF_CLOSE_RE, (_, t, a) => "<" + t + a + "></" + t + ">");
    html = html.replace(/<helmet(\s|>)/gi, "<sc-helmet$1"); html = html.replace(/<\/helmet\s*>/gi, "</sc-helmet>");
    html = encodeCamelAttrs(html);
    for (const [real, alias] of Object.entries(RAW_WRAP)) { html = html.replace(new RegExp("(</?)" + real + "(?=[\\s>])", "gi"), "$1" + alias); }
    return html;
  }
  function kebabToCamel(s) { return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase()); }
  function cssToObj(css) {
    const o = {}; for (const decl of css.split(";")) { const i = decl.indexOf(":"); if (i < 0) continue; const prop = decl.slice(0, i).trim(); o[prop.startsWith("--") ? prop : kebabToCamel(prop)] = decl.slice(i + 1).trim(); } return o;
  }
  function compileAttr(raw) {
    const whole = raw.match(/^\s*\{\{([\s\S]+?)\}\}\s*$/); if (whole) { const path = whole[1]; return (vals) => resolve(vals, path); }
    if (raw.includes("{{")) { const parts = raw.split(/\{\{([\s\S]+?)\}\}/g); return (vals) => parts.map((s, i) => i & 1 ? resolve(vals, s) ?? "" : s).join(""); }
    return () => raw;
  }
  function collectProps(node, kind, host) {
    const propGetters = []; const pseudoClasses = []; let hintSize = null;
    for (const { name, value } of [...node.attributes]) {
      if (name === "sc-name" || name === "data-dc-tpl") continue;
      let key = name; if (key.startsWith(CAMEL_ATTR)) key = kebabToCamel(key.slice(CAMEL_ATTR.length));
      if (key === "hint-size") { hintSize = value; continue; }
      if (key.startsWith("style-")) { pseudoClasses.push(host.pseudoClass(key.slice(6), value)); continue; }
      if (kind !== "dom") { if (key.includes("-") && !(kind === "x-import" && (key.startsWith("aria-") || key.startsWith("data-")))) key = kebabToCamel(key); }
      else { if (key === "class") key = "className"; else if (key === "for") key = "htmlFor"; else if (key.startsWith("on")) key = EVENT_MAP[key] || "on" + key[2].toUpperCase() + key.slice(3); }
      propGetters.push([key, compileAttr(value)]);
    }
    return { propGetters, pseudoClasses, hintSize };
  }
  var HOST_STYLE_PROPS = new Set(["position", "left", "right", "top", "bottom", "inset", "width", "height", "z-index", "transform"]);
  function hostPositionStyle(style) {
    const all = typeof style === "string" ? cssToObj(style) : style != null && typeof style === "object" ? style : null; if (!all) return void 0;
    const out = {}; for (const [k, v] of Object.entries(all)) { const kebab = k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()); if (HOST_STYLE_PROPS.has(kebab)) out[k] = v; }
    return Object.keys(out).length ? out : void 0;
  }
  function compileTemplate(html, host) {
    const tpl = document.createElement("template"); tpl.innerHTML = encodeCase(html); let tplN = 0;
    (function stamp(node) { if (node.nodeType === Node.ELEMENT_NODE) { node.setAttribute("data-dc-tpl", String(tplN++)); } for (const c of node.childNodes) stamp(c); })(tpl.content);
    const builders = walkChildren(tpl.content, host); const render = ((vals, ctx) => builders.map((b, i) => b(vals || {}, ctx, i)));
    render.__annotated = tpl.innerHTML; return render;
  }
  function walkChildren(node, host) { return [...node.childNodes].map((c) => walk(c, host)).filter((b) => b != null); }
  function renderDeckKids(kids, kidKeys, vals, ctx) { return kids.map((b, j) => { const k = kidKeys ? kidKeys[j] : j; const out = b(vals, ctx, k); return kidKeys != null && typeof out === "string" ? h(getReact().Fragment, { key: k }, out) : out; }); }
  function walk(node, host) {
    if (node.nodeType === Node.TEXT_NODE) return walkText(node);
    if (node.nodeType !== Node.ELEMENT_NODE) return null;
    const el = node; const tag = el.tagName.toLowerCase();
    if (tag === "sc-for") return walkFor(el, host); if (tag === "sc-if") return walkIf(el, host);
    if (tag === "sc-helmet") return host.helmet(el); return walkElement(el, host);
  }
  function walkText(node) {
    const txt = node.nodeValue ?? ""; if (!txt.includes("{{")) { if (!txt.trim() && !txt.includes(" ")) return null; return () => txt; }
    const parts = txt.split(/\{\{([\s\S]+?)\}\}/g);
    return (vals, ctx, key) => h(getReact().Fragment, { key }, ...parts.map((p, i) => {
      if (!(i & 1)) return p; const v = resolve(vals, p);
      if (v === void 0) return null;
      if (getReact().isValidElement(v) || Array.isArray(v)) return h(getReact().Fragment, { key: i }, v);
      if (v === null || typeof v === "boolean") return null; return h("span", { key: i, className: "sc-interp" }, String(v));
    }));
  }
  function walkFor(el, host) {
    const listGet = compileAttr(el.getAttribute("list") || ""); const asName = el.getAttribute("as") || "item"; const kids = walkChildren(el, host);
    return (vals, ctx, key) => { let list = listGet(vals); if (!Array.isArray(list)) list = [];
      return h(getReact().Fragment, { key }, list.map((item, i) => { const sub = { ...vals, [asName]: item, $index: i }; return h(getReact().Fragment, { key: i }, kids.map((b, j) => b(sub, ctx, j))); }));
    };
  }
  function walkIf(el, host) {
    const valGet = compileAttr(el.getAttribute("value") || ""); const kids = walkChildren(el, host);
    return (vals, ctx, key) => { let v = valGet(vals); return v ? h(getReact().Fragment, { key }, kids.map((b, j) => b(vals, ctx, j))) : null; };
  }
  function walkElement(el, host) {
    const realTag = RAW_UNWRAP[el.localName] || el.localName; const tplId = el.getAttribute("data-dc-tpl");
    const { propGetters, pseudoClasses } = collectProps(el, "dom", host); const kids = walkChildren(el, host);
    return (vals, ctx, key) => {
      const props = { key: key, "data-dc-tpl": tplId };
      for (const [k, g] of propGetters) {
        let v = g(vals); if (k === "style" && typeof v === "string") v = cssToObj(v);
        if ((k === "value" || k === "checked") && v === void 0) { v = k === "checked" ? false : ""; } props[k] = v;
      }
      if (pseudoClasses.length) { props.className = [props.className, ...pseudoClasses].filter(Boolean).join(" "); }
      return h(realTag, props, ...renderDeckKids(kids, null, vals, ctx));
    };
  }
  var StreamableLogic = class {
    constructor(props) { this.props = props || {}; this.state = {}; this.__host = undefined; }
    setState(update, cb) { this.__host && this.__host.__setLogicState(update, cb); }
    forceUpdate() { this.__host && this.__host.forceUpdate(); }
    componentDidMount() {} componentDidUpdate(_prevProps) {} componentWillUnmount() {} renderVals() { return {}; }
  };
  function evalDcLogic(src) {
    const fn = new Function("DCLogic", "StreamableLogic", "React", src + '\n;return (typeof Component!=="undefined"&&Component)||undefined;');
    return fn(StreamableLogic, StreamableLogic, getReact());
  }
  function createComponentFactory(registry, ensureFetched) {
    const React = getReact(); const AncestorContext = React.createContext([]);
    class StreamableComponent extends React.Component {
      constructor(props) {
        super(props); this.__name = props.__name; this.state = { __v: 0, __err: null };
        this.__sub = () => { if (this.state.__err) this.setState({ __err: null }); this.forceUpdate(); };
        this.__makeLogic(registry.get(this.__name).Logic, null); ensureFetched(this.__name);
      }
      static getDerivedStateFromError(e) { return { __err: e instanceof Error && e.message ? e.message : String(e) }; }
      __makeLogic(Logic, prevState) {
        const L = Logic || StreamableLogic;
        try { this.logic = new L(this.__userProps()); } catch (e) { this.logic = new StreamableLogic(this.__userProps()); }
        this.logic.__host = this; if (prevState) this.logic.state = { ...this.logic.state || {}, ...prevState };
      }
      __userProps() { const { __name, __hintSize, __tplId, __hostStyle, ...rest } = this.props; return rest; }
      __setLogicState(update, cb) {
        const prev = this.logic.state; const patch = typeof update === "function" ? update(prev) : update;
        this.logic.state = { ...prev, ...patch }; this.setState((s) => ({ __v: s.__v + 1 }), cb);
      }
      componentDidMount() { registry.get(this.__name).subs.add(this.__sub); try { this.logic.componentDidMount(); } catch (e) { console.error(e); } }
      componentWillUnmount() { registry.get(this.__name).subs.delete(this.__sub); try { this.logic.componentWillUnmount(); } catch (e) { console.error(e); } }
      render() {
        const r = registry.get(this.__name); const cls = "sc-host";
        const hostBase = { className: cls, style: this.props.__hostStyle, "data-sc-name": this.__name, "data-dc-tpl": this.props.__tplId };
        if (this.state.__err) return h("div", hostBase, "Error: " + this.state.__err);
        if (!r.tpl) return h("div", hostBase);
        const userProps = this.__userProps(); this.logic.props = userProps; let vals = userProps;
        try { vals = { ...userProps, ...this.logic.renderVals() || {} }; } catch (e) { return h("div", hostBase, "Render Error"); }
        return h("div", hostBase, h(AncestorContext.Provider, { value: [] }, r.tpl(vals, this)));
      }
    }
    StreamableComponent.contextType = AncestorContext;
    const named = new Map();
    function getDC(name) {
      const hit = named.get(name); if (hit) return hit;
      function Dispatcher(p) {
        const [, setTick] = React.useState(0);
        React.useEffect(() => { const sub = () => setTick((n) => n + 1); registry.get(name).subs.add(sub); return () => { registry.get(name).subs.delete(sub); }; }, []);
        ensureFetched(name); return h(StreamableComponent, { ...p, __name: name });
      }
      Dispatcher.displayName = name; named.set(name, Dispatcher); return Dispatcher;
    }
    return { getDC, StreamableComponent };
  }
  function createHelmetManager(doc, isStreaming) {
    const mounted = new Set(); const live = new Map();
    function compile(node) {
      const raw = [...node.children];
      return (_vals, ctx) => {
        for (let i = 0; i < raw.length; i++) {
          const child = raw[i]; const tag = child.tagName;
          if (tag === "SCRIPT") {
            const key = "SCRIPT|" + (child.getAttribute("src") || child.textContent || ""); if (mounted.has(key)) continue;
            mounted.add(key); const el = doc.createElement("script");
            for (const { name: an, value } of [...child.attributes]) el.setAttribute(an, value);
            if (child.textContent) el.textContent = child.textContent; doc.head.appendChild(el);
          } else if (tag === "LINK" || tag === "META") {
            const key = tag + "|" + (child.getAttribute("href") || child.getAttribute("src") || child.outerHTML);
            if (mounted.has(key)) continue; mounted.add(key); doc.head.appendChild(child.cloneNode(true));
          } else {
            const key = (ctx?.__name || "") + "|" + i; let el = live.get(key);
            if (!el || el.tagName !== tag) { if (el) el.remove(); el = doc.createElement(tag.toLowerCase()); live.set(key, el); doc.head.appendChild(el); }
            for (const { name: an, value } of [...child.attributes]) { if (el.getAttribute(an) !== value) el.setAttribute(an, value); }
            if (el.textContent !== child.textContent) el.textContent = child.textContent;
          }
        }
        return null;
      };
    }
    return { compile };
  }
  function createPseudoSheet(doc) { return () => ""; }
  function createRegistry() {
    const entries = Object.create(null);
    function get(name) { return entries[name] || (entries[name] = { html: "", tpl: null, Logic: null, ver: 0, subs: new Set(), fetched: false }); }
    function bump(name) { const r = get(name); r.ver++; for (const fn of r.subs) fn(); }
    return { entries, get, bump, bumpAll() { for (const n in entries) bump(n); } };
  }
  function createRuntime(doc = document) {
    const registry = createRegistry(); const helmet = createHelmetManager(doc, () => false);
    const factory = createComponentFactory(registry, ensureFetched);
    const host = { component: (name) => factory.getDC(name), helmet: (node) => helmet.compile(node), pseudoClass: () => "" };
    function ensureFetched(name) { const r = registry.get(name); if (r.fetched) return; r.fetched = true; }
    let rootName = null;
    function updateHtml(name, html) { const r = registry.get(name); r.html = html; try { r.tpl = compileTemplate(html, host); } catch (e) {} registry.bump(name); }
    function updateJs(name, src) { const r = registry.get(name); try { const Cls = evalDcLogic(src); if (typeof Cls === "function") r.Logic = Cls; } catch (e) {} registry.bump(name); }
    function adoptParsed(name, parsed) { if (!parsed) return; const r = registry.get(name); if (parsed.props) r.propsMeta = parsed.props; if (parsed.template) updateHtml(name, parsed.template); if (parsed.js) updateJs(name, parsed.js); }
    return { registry, getDC: factory.getDC, updateHtml, updateJs, setProps: () => {}, adoptParsed, setRootName: (name) => { rootName = name; }, markFetched: (name) => { registry.get(name).fetched = true; }, StreamableLogic };
  }
  function loadScript(src, integrity) {
    return new Promise((resolve, reject) => { const s = document.createElement("script"); s.src = src; if (integrity) { s.integrity = integrity; s.crossOrigin = "anonymous"; } s.onload = () => resolve(); s.onerror = () => reject(); document.head.appendChild(s); });
  }
  function init() {
    const runtime = createRuntime(document); let rootName = "Root";
    const baseCss = document.createElement("style"); baseCss.textContent = BASE_CSS; document.head.prepend(baseCss);
    const api = { getDC: (name) => runtime.getDC(name), DCLogic: runtime.StreamableLogic, __dcBoot: () => { rootName = boot(runtime, document) ?? rootName; } };
    Object.assign(window, api);
    if (document.readyState !== "loading") api.__dcBoot(); else document.addEventListener("DOMContentLoaded", () => api.__dcBoot());
  }
  document.head.appendChild(Object.assign(document.createElement("style"), { textContent: "x-dc{display:none!important}" }));
  Promise.all([
    loadScript("https://unpkg.com/react@18.3.1/umd/react.production.min.js"),
    loadScript("https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js")
  ]).then(init).catch(() => console.error("React failed to load."));
})();
