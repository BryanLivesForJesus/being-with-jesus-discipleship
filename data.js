/**
 * ============================================================================
 * DATA.JS — BEING WITH JESUS DATA REGISTRY
 * Version: 1.5.0 | Timestamp: 2026-10-06T12:00:00-07:00
 * Description: Contains schedule dates, rosters, podcast links, and study text.
 * ============================================================================
 */

function makeBibleGatewayUrl(passage, version = "NIV") {
  const cleanPassage = passage.replace(/–/g, "-").replace(/—/g, "-");
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(cleanPassage)}&version=${version}`;
}

const cohortSchedule = {
  1: { targetSunday: "Sun, Sep 13", iso: "2026-09-13", theme: "Welcome to Acts", acts: "Overview", fullRange: "Acts Overview", startEnd: "Kickoff & Orientation", sharing: [], mia: [], special: "Group Kickoff — welcome & overview of the 10 weeks." },
  2: { targetSunday: "Sun, Sep 20", iso: "2026-09-20", theme: "The Holy Spirit Arrives", acts: "Acts 1–2", fullRange: "Acts 1:1 – 2:47", startEnd: "Day 1 (Acts 1:1–11) → Day 5 (Acts 2:42–47)", sharing: ["Michael", "Bryan"], mia: [], special: "" },
  3: { targetSunday: "Sun, Sep 27", iso: "2026-09-27", theme: "The Birth of the Church", acts: "Acts 3–6", fullRange: "Acts 3:1 – 6:15", startEnd: "Day 1 (Acts 3:1–26) → Day 5 (Acts 6:1–15)", sharing: ["Joe C.", "Nate"], mia: [], special: "" },
  4: { targetSunday: "Sun, Oct 4", iso: "2026-10-04", theme: "Persecuted and Scattered", acts: "Acts 7–9", fullRange: "Acts 7:1 – 9:19", startEnd: "Day 1 (Acts 7:1–53) → Day 5 (Acts 9:1–19)", sharing: [], mia: ["Joe A.", "Joe C."], special: "" },
  5: { targetSunday: "Sun, Oct 11", iso: "2026-10-11", theme: "Good News for the Gentiles", acts: "Acts 9–11", fullRange: "Acts 9:19 – 11:30", startEnd: "Day 1 (Acts 9:19–31) → Day 5 (Acts 11:1–30)", sharing: [], mia: ["Nate", "Roy"], special: "" },
  6: { targetSunday: "Sun, Oct 18", iso: "2026-10-18", theme: "The Mission", acts: "Acts 12–15", fullRange: "Acts 12:1 – 15:35", startEnd: "Day 1 (Acts 12:1–24) → Day 5 (Acts 15:1–35)", sharing: ["Zac"], mia: ["Roy"], special: "" },
  7: { targetSunday: "Sun, Oct 25", iso: "2026-10-25", theme: "The Growing Church", acts: "Acts 15–17", fullRange: "Acts 15:36 – 17:34", startEnd: "Day 1 (Acts 15:36–16:15) → Day 5 (Acts 17:16–34)", sharing: ["Paul", "Roy"], mia: [], special: "" },
  8: { targetSunday: "Sun, Nov 1", iso: "2026-11-01", theme: "The Established Church", acts: "Acts 18–21", fullRange: "Acts 18:1 – 21:16", startEnd: "Day 1 (Acts 18:1–17) → Day 5 (Acts 21:1–16)", sharing: [], mia: ["Paul"], special: "" },
  9: { targetSunday: "Sun, Nov 8", iso: "2026-11-08", theme: "Opposition in Jerusalem", acts: "Acts 21–25", fullRange: "Acts 21:17 – 25:12", startEnd: "Day 1 (Acts 21:17–36) → Day 5 (Acts 25:1–12)", sharing: ["Johnny", "Joe A."], mia: [], special: "" },
  10: { targetSunday: "Sun, Nov 15", iso: "2026-11-15", theme: "On to Rome (Celebration)", acts: "Acts 25–28", fullRange: "Acts 25:13 – 28:31", startEnd: "Day 1 (Acts 25:13–27) → Day 5 (Acts 28:17–31)", sharing: [], mia: [], special: "🎉 Celebration wrap-up. Baptism services the following weekend, 11/21–11/22." }
};

const ROSTER = ["Paul", "Roy", "Michael", "Bryan", "Joe A.", "Joe C.", "Nate", "Zac", "Johnny"];
const LEADERS = ["Paul", "Roy"];

const platformData = {
  spotify: { cta: "Listen on Spotify", icon: "🟢", title: "Spotify", url: "https://open.spotify.com/show/6QlVAGJQayupe8KSleegNG" },
  apple: { cta: "Listen on Apple", icon: "🍏", title: "Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/being-with-jesus-podcast-scg-discipleship/id6811618382?at=1000l3bbu&itsct=podcast_box&itscg=30200&ls=1" },
  youtube: { cta: "Watch on YouTube", icon: "▶️", title: "YouTube", url: "https://www.youtube.com/playlist?list=PLJ8lzqX55j04" },
  subsplash: { cta: "Open in SCG App", icon: "📱", title: "SCG App", url: "https://subsplash.com/u/seacoastgrace/media/l/fpry94s-being-with-jesus-scg-discipleship" }
};

const studyDays = {
  "1-1": {
    title: "Overview of Acts",
    scripture: "Acts Overview",
    bibleUrl: makeBibleGatewayUrl("Acts Overview", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "1-2": {
    title: "Overview of Acts",
    scripture: "Acts Overview",
    bibleUrl: makeBibleGatewayUrl("Acts Overview", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "1-3": {
    title: "Overview of Acts",
    scripture: "Acts Overview",
    bibleUrl: makeBibleGatewayUrl("Acts Overview", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "1-4": {
    title: "Overview of Acts",
    scripture: "Acts Overview",
    bibleUrl: makeBibleGatewayUrl("Acts Overview", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "1-5": {
    title: "Overview of Acts",
    scripture: "Acts Overview",
    bibleUrl: makeBibleGatewayUrl("Acts Overview", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "2-1": {
    title: "The Ascension",
    scripture: "Acts 1:1-1:11",
    bibleUrl: makeBibleGatewayUrl("Acts 1:1-1:11", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "2-2": {
    title: "The Upper Room",
    scripture: "Acts 1:12-1:26",
    bibleUrl: makeBibleGatewayUrl("Acts 1:12-1:26", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "2-3": {
    title: "Pentecost",
    scripture: "Acts 2:1-2:13",
    bibleUrl: makeBibleGatewayUrl("Acts 2:1-2:13", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "2-4": {
    title: "Peter's Sermon",
    scripture: "Acts 2:14-2:41",
    bibleUrl: makeBibleGatewayUrl("Acts 2:14-2:41", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "2-5": {
    title: "The Fellowship of Believers",
    scripture: "Acts 2:42-2:47",
    bibleUrl: makeBibleGatewayUrl("Acts 2:42-2:47", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "3-1": {
    title: "Peter Heals a Lame Beggar",
    scripture: "Acts 3:1-3:26",
    bibleUrl: makeBibleGatewayUrl("Acts 3:1-3:26", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "3-2": {
    title: "Peter and John Before the Sanhedrin",
    scripture: "Acts 4:1-4:31",
    bibleUrl: makeBibleGatewayUrl("Acts 4:1-4:31", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "3-3": {
    title: "The Believers Share Possessions",
    scripture: "Acts 4:32-5:11",
    bibleUrl: makeBibleGatewayUrl("Acts 4:32-5:11", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "3-4": {
    title: "The Apostles Heal and Face Persecution",
    scripture: "Acts 5:12-5:42",
    bibleUrl: makeBibleGatewayUrl("Acts 5:12-5:42", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "3-5": {
    title: "The Choosing of the Seven & Stephen's Arrest",
    scripture: "Acts 6:1-6:15",
    bibleUrl: makeBibleGatewayUrl("Acts 6:1-6:15", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "4-1": {
    title: "Stephen's Address to the Council",
    scripture: "Acts 7:1-7:53",
    bibleUrl: makeBibleGatewayUrl("Acts 7:1-7:53", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "4-2": {
    title: "The Stoning of Stephen & the Church Scattered",
    scripture: "Acts 7:54-8:3",
    bibleUrl: makeBibleGatewayUrl("Acts 7:54-8:3", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "4-3": {
    title: "Philip Proclaims Christ in Samaria",
    scripture: "Acts 8:4-8:25",
    bibleUrl: makeBibleGatewayUrl("Acts 8:4-8:25", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "4-4": {
    title: "Philip and the Ethiopian Official",
    scripture: "Acts 8:26-8:40",
    bibleUrl: makeBibleGatewayUrl("Acts 8:26-8:40", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "4-5": {
    title: "The Conversion of Saul",
    scripture: "Acts 9:1-9:19",
    bibleUrl: makeBibleGatewayUrl("Acts 9:1-9:19", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "5-1": {
    title: "Saul in Damascus and Jerusalem",
    scripture: "Acts 9:19-9:31",
    bibleUrl: makeBibleGatewayUrl("Acts 9:19-9:31", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "5-2": {
    title: "Aeneas and Tabitha",
    scripture: "Acts 9:32-9:43",
    bibleUrl: makeBibleGatewayUrl("Acts 9:32-9:43", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "5-3": {
    title: "Cornelius and Peter's Vision",
    scripture: "Acts 10:1-10:23",
    bibleUrl: makeBibleGatewayUrl("Acts 10:1-10:23", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "5-4": {
    title: "Gentiles Hear the Good News",
    scripture: "Acts 10:28-10:48",
    bibleUrl: makeBibleGatewayUrl("Acts 10:28-10:48", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "5-5": {
    title: "The Church in Antioch",
    scripture: "Acts 11:1-11:30",
    bibleUrl: makeBibleGatewayUrl("Acts 11:1-11:30", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "6-1": {
    title: "Peter Delivered from Prison",
    scripture: "Acts 12:1-12:24",
    bibleUrl: makeBibleGatewayUrl("Acts 12:1-12:24", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "6-2": {
    title: "Barnabas and Saul Sent Off",
    scripture: "Acts 12:25-13:12",
    bibleUrl: makeBibleGatewayUrl("Acts 12:25-13:12", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "6-3": {
    title: "Paul and Barnabas at Antioch in Pisidia",
    scripture: "Acts 13:13-13:52",
    bibleUrl: makeBibleGatewayUrl("Acts 13:13-13:52", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "6-4": {
    title: "Paul and Barnabas in Iconium and Lystra",
    scripture: "Acts 14:1-14:28",
    bibleUrl: makeBibleGatewayUrl("Acts 14:1-14:28", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "6-5": {
    title: "The Council at Jerusalem",
    scripture: "Acts 15:1-15:35",
    bibleUrl: makeBibleGatewayUrl("Acts 15:1-15:35", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "7-1": {
    title: "Paul and Silas Separate / Lydia's Conversion",
    scripture: "Acts 15:36-16:5",
    bibleUrl: makeBibleGatewayUrl("Acts 15:36-16:5", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "7-2": {
    title: "Paul and Silas in Prison",
    scripture: "Acts 16:6-16:15",
    bibleUrl: makeBibleGatewayUrl("Acts 16:6-16:15", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "7-3": {
    title: "The Thessalonian and Berean Responses",
    scripture: "Acts 16:16-16:40",
    bibleUrl: makeBibleGatewayUrl("Acts 16:16-16:40", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "7-4": {
    title: "Paul at the Areopagus",
    scripture: "Acts 17:1-17:15",
    bibleUrl: makeBibleGatewayUrl("Acts 17:1-17:15", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "7-5": {
    title: "Paul in Corinth",
    scripture: "Acts 17:16-17:34",
    bibleUrl: makeBibleGatewayUrl("Acts 17:16-17:34", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "8-1": {
    title: "Paul's Return to Antioch and Journey to Ephesus",
    scripture: "Acts 18:18-18:28",
    bibleUrl: makeBibleGatewayUrl("Acts 18:18-18:28", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "8-2": {
    title: "Paul in Ephesus",
    scripture: "Acts 19:1-19:22",
    bibleUrl: makeBibleGatewayUrl("Acts 19:1-19:22", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "8-3": {
    title: "The Riot in Ephesus",
    scripture: "Acts 19:23-19:41",
    bibleUrl: makeBibleGatewayUrl("Acts 19:23-19:41", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "8-4": {
    title: "Through Macedonia and Greece / Eutychus Raised",
    scripture: "Acts 20:1-20:38",
    bibleUrl: makeBibleGatewayUrl("Acts 20:1-20:38", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "8-5": {
    title: "Paul's Farewell to the Miletus Elders",
    scripture: "Acts 21:1-21:16",
    bibleUrl: makeBibleGatewayUrl("Acts 21:1-21:16", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "9-1": {
    title: "On to Jerusalem",
    scripture: "Acts 21:17-21:36",
    bibleUrl: makeBibleGatewayUrl("Acts 21:17-21:36", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "9-2": {
    title: "Paul Arrives in Jerusalem and is Arrested",
    scripture: "Acts 21:37-22:29",
    bibleUrl: makeBibleGatewayUrl("Acts 21:37-22:29", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "9-3": {
    title: "Paul Speaks to the Crowd",
    scripture: "Acts 22:30-23:35",
    bibleUrl: makeBibleGatewayUrl("Acts 22:30-23:35", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "9-4": {
    title: "Paul Before the Sanhedrin",
    scripture: "Acts 24:1-24:27",
    bibleUrl: makeBibleGatewayUrl("Acts 24:1-24:27", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "9-5": {
    title: "The Plot Against Paul and Transfer to Caesarea",
    scripture: "Acts 25:1-25:22",
    bibleUrl: makeBibleGatewayUrl("Acts 25:1-25:22", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "10-1": {
    title: "Paul Before Agrippa",
    scripture: "Acts 25:23-26:32",
    bibleUrl: makeBibleGatewayUrl("Acts 25:23-26:32", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "10-2": {
    title: "The Voyage to Rome Begins / The Storm",
    scripture: "Acts 27:1-27:26",
    bibleUrl: makeBibleGatewayUrl("Acts 27:1-27:26", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "10-3": {
    title: "The Shipwreck",
    scripture: "Acts 27:27-27:44",
    bibleUrl: makeBibleGatewayUrl("Acts 27:27-27:44", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "10-4": {
    title: "Arrival in Rome and Proclaiming the Kingdom",
    scripture: "Acts 28:1-28:16",
    bibleUrl: makeBibleGatewayUrl("Acts 28:1-28:16", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "10-5": {
    title: "Proclaiming the Kingdom in Rome",
    scripture: "Acts 28:17-28:31",
    bibleUrl: makeBibleGatewayUrl("Acts 28:17-28:31", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  }
};
