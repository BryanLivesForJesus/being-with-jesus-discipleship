/**
 * ============================================================================
 * DATA.JS — BEING WITH JESUS DATA REGISTRY
 * Version: 1.3.0 | Timestamp: 2026-09-15T13:00:00-07:00
 * Description: Contains schedule dates, rosters, podcast links, and study text.
 * ============================================================================
 */

/**
 * Normalizes passage strings (replacing en-dashes/em-dashes) and builds clean Bible Gateway URLs.
 * @param {string} passage - E.g. "Acts 1:1-11"
 * @param {string} version - Default "NIV"
 * @returns {string} Fully encoded URL
 */
function makeBibleGatewayUrl(passage, version = "NIV") {
  const cleanPassage = passage.replace(/–/g, "-").replace(/—/g, "-");
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(cleanPassage)}&version=${version}`;
}

/**
 * Master Cohort Schedule (10 Weeks)
 * Contains Sunday targets, sharing rotations, and event milestones.
 */
const cohortSchedule = {
  1: { 
    targetSunday: "Sun, Sep 13", 
    iso: "2026-09-13", 
    theme: "Welcome to Acts", 
    acts: "Overview", 
    fullRange: "Acts Overview",
    startEnd: "Kickoff & Orientation",
    sharing: [], 
    mia: [], 
    special: "Group Kickoff — welcome & overview of the 10 weeks." 
  },
  2: { 
    targetSunday: "Sun, Sep 20", 
    iso: "2026-09-20", 
    theme: "The Holy Spirit Arrives", 
    acts: "Acts 1–2", 
    fullRange: "Acts 1:1 – 2:47",
    startEnd: "Day 1 (Acts 1:1–11) → Day 5 (Acts 2:42–47)",
    sharing: ["Michael", "Bryan"], 
    mia: [], 
    special: "" 
  },
  3: { 
    targetSunday: "Sun, Sep 27", 
    iso: "2026-09-27", 
    theme: "The Birth of the Church", 
    acts: "Acts 3–6", 
    fullRange: "Acts 3:1 – 6:15",
    startEnd: "Day 1 (Acts 3:1–10) → Day 5 (Acts 6:8–15)",
    sharing: ["Joe C.", "Nate"], 
    mia: [], 
    special: "🕊️ Group Prayer & Fast. Fast begins Sat 9/26 @ 12 PM. Sun 9/27 prayer at Rossmoor Park (10:45–1:00), followed by lunch after the fast and prayer at In-N-Out in Rossmoor." 
  },
  4: { 
    targetSunday: "Sun, Oct 4", 
    iso: "2026-10-04", 
    theme: "Persecuted and Scattered", 
    acts: "Acts 7–9", 
    fullRange: "Acts 7:1 – 9:43",
    startEnd: "Day 1 (Acts 7:1–29) → Day 5 (Acts 9:32–43)",
    sharing: [], 
    mia: ["Joe A.", "Joe C."], 
    special: "" 
  },
  5: { 
    targetSunday: "Sun, Oct 11", 
    iso: "2026-10-11", 
    theme: "Good News for the Gentiles", 
    acts: "Acts 9–11", 
    fullRange: "Acts 9:32 – 11:30",
    startEnd: "Day 1 (Acts 9:32–43) → Day 5 (Acts 11:19–30)",
    sharing: [], 
    mia: ["Nate", "Roy"], 
    special: "" 
  },
  6: { 
    targetSunday: "Sun, Oct 18", 
    iso: "2026-10-18", 
    theme: "The Mission", 
    acts: "Acts 12–15", 
    fullRange: "Acts 12:1 – 15:35",
    startEnd: "Day 1 (Acts 12:1–19) → Day 5 (Acts 15:22–35)",
    sharing: ["Zac"], 
    mia: ["Roy"], 
    special: "" 
  },
  7: { 
    targetSunday: "Sun, Oct 25", 
    iso: "2026-10-25", 
    theme: "The Growing Church", 
    acts: "Acts 15–17", 
    fullRange: "Acts 15:36 – 17:34",
    startEnd: "Day 1 (Acts 15:36–16:15) → Day 5 (Acts 17:16–34)",
    sharing: ["Paul", "Roy"], 
    mia: [], 
    special: "" 
  },
  8: { 
    targetSunday: "Sun, Nov 1", 
    iso: "2026-11-01", 
    theme: "The Established Church", 
    acts: "Acts 18–21", 
    fullRange: "Acts 18:1 – 21:16",
    startEnd: "Day 1 (Acts 18:1–17) → Day 5 (Acts 21:1–16)",
    sharing: [], 
    mia: ["Paul"], 
    special: "" 
  },
  9: { 
    targetSunday: "Sun, Nov 8", 
    iso: "2026-11-08", 
    theme: "Opposition in Jerusalem", 
    acts: "Acts 21–25", 
    fullRange: "Acts 21:17 – 25:12",
    startEnd: "Day 1 (Acts 21:17–36) → Day 5 (Acts 25:1–12)",
    sharing: ["Johnny", "Joe A."], 
    mia: [], 
    special: "" 
  },
  10: { 
    targetSunday: "Sun, Nov 15", 
    iso: "2026-11-15", 
    theme: "On to Rome (Celebration)", 
    acts: "Acts 25–28", 
    fullRange: "Acts 25:13 – 28:31",
    startEnd: "Day 1 (Acts 25:13–27) → Day 5 (Acts 28:17–31)",
    sharing: [], 
    mia: [], 
    special: "🎉 Celebration wrap-up. Baptism services the following weekend, 11/21–11/22." 
  }
};

const ROSTER = ["Paul", "Roy", "Michael", "Bryan", "Joe A.", "Joe C.", "Nate", "Zac", "Johnny"];
const LEADERS = ["Paul", "Roy"];

const platformData = {
  spotify: { cta: "Listen on Spotify", icon: "🟢", title: "Spotify", url: "https://open.spotify.com/show/6QlVAGJQayupe8KSleegNG" },
  apple: { cta: "Listen on Apple", icon: "🍏", title: "Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/being-with-jesus-podcast-scg-discipleship/id6811618382?at=1000l3bbu&itsct=podcast_box&itscg=30200&ls=1" },
  youtube: { cta: "Watch on YouTube", icon: "▶️", title: "YouTube", url: "https://www.youtube.com/playlist?list=PLJ8lzqX55j04" },
  subsplash: { cta: "Open in SCG App", icon: "📱", title: "SCG App", url: "https://subsplash.com/u/seacoastgrace/media/l/fpry94s-being-with-jesus-scg-discipleship" }
};

/**
 * Digitized Workbook Content
 * Structured to support the 4 quadrant questions and the action step.
 */
const studyDays = {
  "2-1": {
    title: "The Ascension",
    scripture: "Acts 1:1–11",
    bibleUrl: makeBibleGatewayUrl("Acts 1:1-11", "NIV"),
    noticeSubtext: "Write down a few things you noticed as you read (aim for 4).",
    godSubtext: "What did this passage teach you about God / Jesus / Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for 2).",
    actionSubtext: "What action do you need to take today? (aim for 1).",
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "2-2": {
    title: "The Upper Room",
    scripture: "Acts 1:12–26",
    bibleUrl: makeBibleGatewayUrl("Acts 1:12-26", "NIV"),
    noticeSubtext: "Read with pen in hand. Highlight verses or words that stand out (aim for 4).",
    godSubtext: "What does this teach about Jesus, the Father, or the Holy Spirit? (aim for 3).",
    questionsSubtext: "What questions came up for you as you read? (aim for at least 2).",
    actionSubtext: "What action do you need to take? Write down at least one concrete step.",
    live: "Take a moment to review everything you wrote down. What is one thing God wants you to do or change today?"
  },
  "2-3": {
    title: "Pentecost",
    scripture: "Acts 2:1–13",
    bibleUrl: makeBibleGatewayUrl("Acts 2:1-13", "NIV"),
    noticeSubtext: "What stood out as the Holy Spirit arrived with wind and fire? (aim for 4).",
    godSubtext: "What does God's miraculous work across languages reveal about His heart? (aim for 3).",
    questionsSubtext: "What is puzzling, challenging, or unanswered in this passage? (aim for 2).",
    actionSubtext: "How can you step out in bold, Spirit-led obedience in your life today? (aim for 1).",
    live: "Spend two minutes in quiet prayer asking the Holy Spirit for courage and power to witness for Christ."
  },
  "2-4": {
    title: "Peter's Sermon",
    scripture: "Acts 2:14–41",
    bibleUrl: makeBibleGatewayUrl("Acts 2:14-41", "NIV"),
    noticeSubtext: "Peter grounds his sermon in Joel and the Psalms. What stands out? (aim for 4).",
    godSubtext: "What does Peter's declaration teach us about Jesus as Lord and Messiah? (aim for 3).",
    questionsSubtext: "When the crowd was cut to the heart, what did Peter tell them to do? (aim for 2).",
    actionSubtext: "Repentance means a change of direction. What action will you take today? (aim for 1).",
    live: "Where is God calling you to realign your priorities and turn fully toward Him today?"
  },
  "2-5": {
    title: "The Fellowship of Believers",
    scripture: "Acts 2:42–47",
    bibleUrl: makeBibleGatewayUrl("Acts 2:42-47", "NIV"),
    noticeSubtext: "The believers devoted themselves to teaching, fellowship, bread, and prayer (aim for 4).",
    godSubtext: "How did God show His presence and power through their radical generosity? (aim for 3).",
    questionsSubtext: "What questions does this early church model raise for our men's group? (aim for 2).",
    actionSubtext: "Devotion requires training. What specific practice will you commit to? (aim for 1).",
    live: "Commit to one act of intentional fellowship or generosity with a brother this week."
  }
};
