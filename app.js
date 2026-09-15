/**
 * ============================================================================
 * APP.JS — INTERACTION CONTROLLER & LOCAL STORAGE SCRATCHPAD ENGINE
 * Version: 1.3.0 | Timestamp: 2026-09-15T13:00:00-07:00
 * Features:
 *  - Date math targeting Fall 2026 cohort calendar
 *  - Native LocalStorage debounced auto-save
 *  - Granular, per-question reset buttons (isolated field deletion)
 *  - Web Speech API integration for 1-tap voice dictation
 *  - 10-Week Full Discipleship Export (.txt file generation & JSON backup)
 * ============================================================================
 */

const DOW = ["MON", "TUE", "WED", "THU", "FRI"];

/**
 * Calculates current study position based on real calendar date.
 */
function todayPosition() {
  const now = new Date();
  const t = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  for (const w of Object.keys(cohortSchedule).map(Number)) {
    const [y, m, d] = cohortSchedule[w].iso.split("-").map(Number);
    const sun = new Date(y, m - 1, d).getTime();
    const mon = sun - 6 * 86400000;
    if (t >= mon && t <= sun) {
      const idx = Math.round((t - mon) / 86400000);
      return { week: w, day: Math.min(Math.max(idx + 1, 1), 5) };
    }
    if (t < mon) return { week: w, day: 1 };
  }
  return { week: 10, day: 5 };
}

let currentWeek = todayPosition().week;
let currentDay = todayPosition().day;
let preferredPlatform = localStorage.getItem("bwj.platform") || "spotify";

function setPlatform(p) {
  preferredPlatform = p;
  try { localStorage.setItem("bwj.platform", p); } catch (e) {}
  renderUI();
}

function setWeek(w) {
  currentWeek = w;
  currentDay = 1;
  renderUI();
}

function setDay(d) {
  currentDay = d;
  renderUI();
}

function jumpToToday() {
  const here = todayPosition();
  currentWeek = here.week;
  currentDay = here.day;
  renderUI();
}

function navigateDay(dir) {
  let next = currentDay + dir;
  if (next >= 1 && next <= 5) {
    currentDay = next;
  } else if (next > 5 && currentWeek < 10) {
    currentWeek++;
    currentDay = 1;
  } else if (next < 1 && currentWeek > 1) {
    currentWeek--;
    currentDay = 5;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderUI();
}

function triggerBibleGatewayTooltips() {
  setTimeout(() => {
    if (window.BGLinks && typeof window.BGLinks.linkVerses === "function") {
      window.BGLinks.version = "NIV";
      window.BGLinks.linkVerses();
    }
  }, 60);
}

// ==============================================================================
// LOCAL STORAGE SCRATCHPAD ENGINE
// ==============================================================================

let saveDebounceTimer;
function getNoteKey(week, day, field) {
  return `bwj_note_w${week}_d${day}_${field}`;
}

function saveScratchpadField(field, value) {
  clearTimeout(saveDebounceTimer);
  saveDebounceTimer = setTimeout(() => {
    try {
      localStorage.setItem(getNoteKey(currentWeek, currentDay, field), value);
      showStatusIndicator("✓ Saved to device", "#2dd4bf");
    } catch (e) {}
  }, 300);
}

function loadScratchpadField(field) {
  return localStorage.getItem(getNoteKey(currentWeek, currentDay, field)) || "";
}

function showStatusIndicator(msg, color) {
  const indicator = document.getElementById("scratchpadSaveIndicator");
  if (indicator) {
    indicator.textContent = msg;
    indicator.style.color = color || "#2dd4bf";
    indicator.style.opacity = "1";
    setTimeout(() => { indicator.style.opacity = "0.6"; }, 1600);
  }
}

/**
 * Granular Clear: Resets ONLY one single question without wiping the rest of the day.
 */
function clearSingleField(field, fieldLabel) {
  const targetId = "note" + field.charAt(0).toUpperCase() + field.slice(1);
  const el = document.getElementById(targetId);
  if (!el || !el.value.trim()) return;

  if (confirm(`Clear your notes for "${fieldLabel}"?`)) {
    el.value = "";
    localStorage.removeItem(getNoteKey(currentWeek, currentDay, field));
    showStatusIndicator(`✓ Cleared ${fieldLabel}`, "#fbbf24");
  }
}

// ==============================================================================
// VOICE DICTATION (WEB SPEECH API)
// ==============================================================================

let activeRecognizer = null;
let activeField = null;

function toggleDictation(field) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Voice dictation is not directly supported in this browser. Please use the microphone icon on your on-screen keyboard!");
    return;
  }

  const targetId = "note" + field.charAt(0).toUpperCase() + field.slice(1);
  const btnId = "micBtn_" + field;
  const textarea = document.getElementById(targetId);
  const btn = document.getElementById(btnId);

  // If already running on this field, stop it
  if (activeRecognizer && activeField === field) {
    activeRecognizer.stop();
    return;
  }

  // Stop any other active recognizer
  if (activeRecognizer) {
    activeRecognizer.stop();
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      activeRecognizer = recognition;
      activeField = field;
      btn.textContent = "🔴 Listening...";
      btn.style.borderColor = "#f43f5e";
      btn.style.color = "#f43f5e";
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const existing = textarea.value.trim();
      textarea.value = existing ? existing + " " + transcript : transcript;
      saveScratchpadField(field, textarea.value);
    };

    recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      resetMicBtn(btn);
    };

    recognition.onend = () => {
      resetMicBtn(btn);
      activeRecognizer = null;
      activeField = null;
    };

    recognition.start();
  } catch (err) {
    console.error("Speech recognition startup error:", err);
    resetMicBtn(btn);
  }
}

function resetMicBtn(btn) {
  if (btn) {
    btn.textContent = "🎙️ Dictate";
    btn.style.borderColor = "rgba(45,212,191,0.3)";
    btn.style.color = "#5eead4";
  }
}

// ==============================================================================
// REVIEW & 10-WEEK EXPORT TOOLS
// ==============================================================================

function toggleReviewModal(show) {
  const modal = document.getElementById("reviewModal");
  if (show) {
    buildWeeklyReviewSummary();
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
}

function buildWeeklyReviewSummary() {
  const container = document.getElementById("reviewSummaryContainer");
  let html = "";
  for (let d = 1; d <= 5; d++) {
    const notice = localStorage.getItem(getNoteKey(currentWeek, d, "notice")) || "";
    const seeGod = localStorage.getItem(getNoteKey(currentWeek, d, "god")) || "";
    const questions = localStorage.getItem(getNoteKey(currentWeek, d, "questions")) || "";
    const action = localStorage.getItem(getNoteKey(currentWeek, d, "action")) || "";
    const prayer = localStorage.getItem(getNoteKey(currentWeek, d, "prayer")) || "";

    const hasAnyNote = notice || seeGod || questions || action || prayer;
    const dayData = studyDays[`${currentWeek}-${d}`];
    const dayTitle = dayData ? dayData.title : `Day ${d}`;

    html += `
      <div style="background: rgba(2,6,23,0.6); border: 1px solid rgba(30,41,59,0.8); border-radius: 14px; padding: 14px; display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(30,41,59,0.6); padding-bottom: 6px;">
          <span style="font-weight: 800; font-size: 13px; color: #5eead4;">Day ${d}: ${dayTitle}</span>
          <span style="font-size: 11px; color: ${hasAnyNote ? '#2dd4bf' : '#64748b'};">${hasAnyNote ? '● Notes recorded' : 'No notes'}</span>
        </div>
        ${notice ? `<div style="font-size: 12px; line-height: 1.4;"><span style="color:#2dd4bf; font-weight:700;">! Notice:</span> ${escapeHtml(notice)}</div>` : ''}
        ${seeGod ? `<div style="font-size: 12px; line-height: 1.4;"><span style="color:#5eead4; font-weight:700;">✝ God:</span> ${escapeHtml(seeGod)}</div>` : ''}
        ${questions ? `<div style="font-size: 12px; line-height: 1.4;"><span style="color:#9fb0c5; font-weight:700;">? Questions:</span> ${escapeHtml(questions)}</div>` : ''}
        ${action ? `<div style="font-size: 12px; line-height: 1.4;"><span style="color:#fbbf24; font-weight:700;">» Action:</span> ${escapeHtml(action)}</div>` : ''}
        ${prayer ? `<div style="font-size: 12px; line-height: 1.4; font-style: italic; color: #cbd5e1;"><span style="color:#f43f5e; font-weight:700;">∞ Prayer:</span> ${escapeHtml(prayer)}</div>` : ''}
        ${!hasAnyNote ? `<div style="font-size: 12px; color: #64748b; font-style: italic;">No personal reflections entered for this day.</div>` : ''}
      </div>
    `;
  }
  container.innerHTML = html;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]);
}

/**
 * Copies the current active week's study notes to the clipboard.
 */
function copyWeekNotesToClipboard() {
  let summary = `Being with Jesus — Week ${currentWeek} Notes\n\n`;
  for (let d = 1; d <= 5; d++) {
    const dayData = studyDays[`${currentWeek}-${d}`];
    summary += `=== Day ${d}: ${dayData ? dayData.title : 'Day ' + d} ===\n`;
    const notice = localStorage.getItem(getNoteKey(currentWeek, d, "notice"));
    const seeGod = localStorage.getItem(getNoteKey(currentWeek, d, "god"));
    const questions = localStorage.getItem(getNoteKey(currentWeek, d, "questions"));
    const action = localStorage.getItem(getNoteKey(currentWeek, d, "action"));
    const prayer = localStorage.getItem(getNoteKey(currentWeek, d, "prayer"));
    if (notice) summary += `Notice: ${notice}\n`;
    if (seeGod) summary += `See God: ${seeGod}\n`;
    if (questions) summary += `Questions: ${questions}\n`;
    if (action) summary += `Action: ${action}\n`;
    if (prayer) summary += `Prayer: ${prayer}\n`;
    summary += `\n`;
  }
  navigator.clipboard.writeText(summary).then(() => {
    alert(`Week ${currentWeek} notes copied to clipboard!`);
  }).catch(() => {
    alert("Unable to copy to clipboard.");
  });
}

/**
 * Compiles all 10 weeks (50 days) into a single downloadable .txt portfolio file.
 */
function exportFullTenWeekJournal() {
  let fullJournal = `BEING WITH JESUS — 10-WEEK STUDY JOURNAL\n`;
  fullJournal += `Cohort: Fall 2026 | Exported: ${new Date().toLocaleString()}\n`;
  fullJournal += `============================================================\n\n`;

  let totalEntries = 0;
  for (let w = 1; w <= 10; w++) {
    const weekSchedule = cohortSchedule[w];
    fullJournal += `############################################################\n`;
    fullJournal += `WEEK ${w}: ${weekSchedule ? weekSchedule.theme : ''} (${weekSchedule ? weekSchedule.acts : ''})\n`;
    fullJournal += `Target Sunday: ${weekSchedule ? weekSchedule.targetSunday : ''}\n`;
    fullJournal += `############################################################\n\n`;

    for (let d = 1; d <= 5; d++) {
      const notice = localStorage.getItem(getNoteKey(w, d, "notice"));
      const seeGod = localStorage.getItem(getNoteKey(w, d, "god"));
      const questions = localStorage.getItem(getNoteKey(w, d, "questions"));
      const action = localStorage.getItem(getNoteKey(w, d, "action"));
      const prayer = localStorage.getItem(getNoteKey(w, d, "prayer"));

      if (notice || seeGod || questions || action || prayer) {
        totalEntries++;
        const dayData = studyDays[`${w}-${d}`];
        fullJournal += `--- Day ${d}: ${dayData ? dayData.title : 'Study Day'} ---\n`;
        if (dayData && dayData.scripture) fullJournal += `Scripture: ${dayData.scripture}\n`;
        if (notice) fullJournal += `! Notice: ${notice}\n`;
        if (seeGod) fullJournal += `✝ See God: ${seeGod}\n`;
        if (questions) fullJournal += `? Questions: ${questions}\n`;
        if (action) fullJournal += `» Action: ${action}\n`;
        if (prayer) fullJournal += `∞ Prayer: ${prayer}\n`;
        fullJournal += `\n`;
      }
    }
  }

  if (totalEntries === 0) {
    alert("No notes recorded across the 10 weeks yet!");
    return;
  }

  const blob = new Blob([fullJournal], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Being_With_Jesus_10_Week_Journal_${new Date().toISOString().slice(0,10)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Downloads a complete JSON backup of all browser notes.
 */
function downloadJsonBackup() {
  const backup = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("bwj_note_")) {
      backup[key] = localStorage.getItem(key);
    }
  }
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `bwj_notes_backup_${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Restores JSON backup into LocalStorage.
 */
function restoreJsonBackup(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      let count = 0;
      Object.keys(data).forEach(key => {
        if (key.startsWith("bwj_note_")) {
          localStorage.setItem(key, data[key]);
          count++;
        }
      });
      alert(`Successfully restored ${count} study reflections!`);
      renderUI();
    } catch (err) {
      alert("Invalid backup file format.");
    }
  };
  reader.readAsText(file);
}

// ==============================================================================
// MAIN RENDER CONTROLLER
// ==============================================================================

function renderUI() {
  const huddle = cohortSchedule[currentWeek];
  const here = todayPosition();
  const isToday = (here.week === currentWeek && here.day === currentDay);

  document.getElementById("headerHuddleShort").textContent = huddle.targetSunday.replace("Sun, ", "Sun ");
  
  const selectEl = document.getElementById("weekSelect");
  selectEl.innerHTML = Object.keys(cohortSchedule).map(k => `
    <option value="${k}" ${parseInt(k) === currentWeek ? 'selected' : ''}>Week ${k} · ${cohortSchedule[k].theme}</option>
  `).join('');

  const todayBtn = document.getElementById("todayBtn");
  if (isToday) {
    todayBtn.style.background = "#111a28";
    todayBtn.style.color = "#4f6076";
  } else {
    todayBtn.style.background = "rgba(6,78,74,0.55)";
    todayBtn.style.color = "#5eead4";
  }

  // Full Week Homework Range
  document.getElementById("weekRangeSpan").textContent = huddle.fullRange || huddle.acts;
  document.getElementById("weekRangeSubtext").textContent = huddle.startEnd || "";

  // Sunday Huddle
  document.getElementById("huddleTargetSunday").textContent = huddle.targetSunday;
  document.getElementById("huddleSubtitle").textContent = `${huddle.theme} · ${huddle.acts}`;
  document.getElementById("huddleSharing").textContent = huddle.sharing.length ? huddle.sharing.join(" · ") : "No one scheduled";
  document.getElementById("huddleAbsent").textContent = huddle.mia.length ? huddle.mia.join(" · ") : "All present";

  const specialBox = document.getElementById("huddleSpecialBox");
  if (huddle.special) {
    specialBox.style.display = "flex";
    document.getElementById("huddleSpecialText").textContent = huddle.special;
  } else {
    specialBox.style.display = "none";
  }

  const rosterContainer = document.getElementById("rosterBadges");
  rosterContainer.innerHTML = ROSTER.map(name => {
    const isLeader = LEADERS.includes(name);
    const displayName = isLeader ? `${name} ★` : name;
    let bgStyle = "background: rgba(2,6,23,0.5); border: 1px solid #1e293b; color: #8ea0b6;";
    if (huddle.mia.includes(name)) {
      bgStyle = "background: rgba(120,53,15,0.35); border: 1px solid rgba(251,191,36,0.35); color: #fcd34d;";
    } else if (huddle.sharing.includes(name)) {
      bgStyle = "background: rgba(6,78,74,0.5); border: 1px solid rgba(45,212,191,0.45); color: #5eead4;";
    }
    return `<span style="font-size: 12px; font-weight: 600; padding: 6px 11px; border-radius: 9999px; ${bgStyle}">${displayName}</span>`;
  }).join('');

  // Fast countdown targeting Sep 27, 2026
  const now = new Date();
  const fastDate = new Date(2026, 8, 27);
  const fastAway = Math.round((fastDate - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 86400000);
  const countdownText = fastAway > 1 ? `in ${fastAway} days` : fastAway === 1 ? "tomorrow" : fastAway === 0 ? "today" : "completed";
  document.getElementById("fastCountdownBadge").textContent = countdownText;

  // Day Stepper Pills
  const pillContainer = document.getElementById("dayPillContainer");
  pillContainer.innerHTML = [1, 2, 3, 4, 5].map(n => {
    const isActive = (n === currentDay);
    const hasData = !!studyDays[`${currentWeek}-${n}`];
    const isCurrentCalendarDay = (here.week === currentWeek && here.day === n);
    
    let pillStyle = "display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; min-height: 52px; border-radius: 14px; cursor: pointer; transition: all .15s;";
    if (isActive) {
      pillStyle += "background: #0d9488; color: #fff; border: 1px solid #2dd4bf;";
    } else {
      pillStyle += `background: #111a28; color: ${hasData ? "#9fb0c5" : "#4f6076"}; border: 1px solid ${isCurrentCalendarDay ? "rgba(45,212,191,0.45)" : "#1e293b"};`;
    }

    return `
      <button class="tap" onclick="setDay(${n})" style="${pillStyle}">
        <span style="font-size: 9px; font-weight: 700; letter-spacing: 0.1em; opacity: 0.7;">${DOW[n-1]}</span>
        <span style="font-size: 15px; font-weight: 800;">${n}</span>
      </button>
    `;
  }).join('');

  // Active Day Content
  const key = `${currentWeek}-${currentDay}`;
  const dayData = studyDays[key];
  const hasUploadedData = !!dayData;

  const fallbackScripture = huddle.acts === "Overview" ? "Acts 1" : huddle.acts;
  const scriptureText = hasUploadedData ? dayData.scripture : fallbackScripture;
  const bibleUrl = hasUploadedData ? dayData.bibleUrl : makeBibleGatewayUrl(fallbackScripture, "NIV");

  document.getElementById("studyDayHeading").textContent = `Week ${currentWeek} · Day ${currentDay}`;
  document.getElementById("studyTitle").textContent = hasUploadedData ? dayData.title : `Day ${currentDay} Readings in Preparation`;
  document.getElementById("studyScriptureBadge").textContent = scriptureText;
  document.getElementById("studyBibleLink").href = bibleUrl;

  // Podcast
  const platform = platformData[preferredPlatform];
  const mainCTA = document.getElementById("mainPodcastCTA");
  mainCTA.href = platform.url;
  mainCTA.innerHTML = `<span style="font-size: 16px;">▶</span><span>${platform.cta}</span>`;

  const playerBtns = document.getElementById("playerButtons");
  playerBtns.innerHTML = Object.keys(platformData).map(k => {
    const isSelected = (k === preferredPlatform);
    return `
      <button class="tap" onclick="setPlatform('${k}')" title="${platformData[k].title}" style="width: 44px; height: 44px; border-radius: 14px; font-size: 16px; cursor: pointer; transition: all .15s; ${isSelected ? 'background: rgba(6,78,74,0.7); border: 1px solid #2dd4bf;' : 'background: #151f2e; border: 1px solid #243347; opacity: .65;'}">
        ${platformData[k].icon}
      </button>
    `;
  }).join('');

  // Sections Display
  const activeHint = document.getElementById("activePassageHint");
  const pendingNoticeBox = document.getElementById("pendingNoticeBox");
  const thinkSection = document.getElementById("thinkSection");
  const liveSection = document.getElementById("liveSection");
  const scratchpadSection = document.getElementById("scratchpadSection");
  const reftagLink = document.getElementById("inlineReftagLink");

  reftagLink.textContent = scriptureText;
  reftagLink.href = bibleUrl;

  if (hasUploadedData) {
    activeHint.style.display = "block";
    pendingNoticeBox.style.display = "none";
    thinkSection.style.display = "flex";
    liveSection.style.display = "flex";
    scratchpadSection.style.display = "flex";

    // 2x2 Quadrant Text
    document.getElementById("quadNoticeText").textContent = dayData.noticeSubtext || "Write down a few things you noticed as you read.";
    document.getElementById("quadGodText").textContent = dayData.godSubtext || "What did this passage teach you about God?";
    document.getElementById("quadQuestionsText").textContent = dayData.questionsSubtext || "What questions came up for you as you read?";
    document.getElementById("quadActionText").textContent = dayData.actionSubtext || "What action do you need to take?";

    document.getElementById("liveDifferentlyText").textContent = dayData.live;

    // Load Scratchpad values into Textareas
    document.getElementById("noteNotice").value = loadScratchpadField("notice");
    document.getElementById("noteGod").value = loadScratchpadField("god");
    document.getElementById("noteQuestions").value = loadScratchpadField("questions");
    document.getElementById("noteAction").value = loadScratchpadField("action");
    document.getElementById("notePrayer").value = loadScratchpadField("prayer");
    document.getElementById("scratchpadDayBadge").textContent = `Week ${currentWeek} · Day ${currentDay}`;
  } else {
    activeHint.style.display = "none";
    pendingNoticeBox.style.display = "block";
    thinkSection.style.display = "none";
    liveSection.style.display = "none";
    scratchpadSection.style.display = "none";
  }

  document.getElementById("nextBtn").textContent = (currentDay === 5 ? "Next Week →" : "Next Day →");
  triggerBibleGatewayTooltips();
}

renderUI();
