function makeBibleGatewayUrl(passage, version = "NIV") {
  const cleanPassage = passage.replace(/–/g, "-").replace(/—/g, "-");
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(cleanPassage)}&version=${version}`;
}

const cohortSchedule = {
  1: { targetSunday: "Sun, Sep 13", iso: "2026-09-13", theme: "Welcome to Acts", acts: "Overview", sharing: [], mia: [], special: "Group Kickoff — welcome & overview of the 10 weeks." },
  2: { targetSunday: "Sun, Sep 20", iso: "2026-09-20", theme: "The Holy Spirit Arrives", acts: "Acts 1–2", sharing: ["Michael", "Bryan"], mia: [], special: "" },
  3: { targetSunday: "Sun, Sep 27", iso: "2026-09-27", theme: "The Birth of the Church", acts: "Acts 3–6", sharing: ["Joe C.", "Nate"], mia: [], special: "" },
  4: { targetSunday: "Sun, Oct 4", iso: "2026-10-04", theme: "Persecuted and Scattered", acts: "Acts 7–9", sharing: [], mia: ["Joe A.", "Joe C."], special: "🕊️ Group Prayer & Fast. Fast begins Sat 10/3 @ 12 PM. Sun 10/4 prayer at Rossmoor Park (10:45–1:00), then lunch at La Capilla after Sunday service." },
  5: { targetSunday: "Sun, Oct 11", iso: "2026-10-11", theme: "Good News for the Gentiles", acts: "Acts 9–11", sharing: [], mia: ["Nate", "Roy"], special: "" },
  6: { targetSunday: "Sun, Oct 18", iso: "2026-10-18", theme: "The Mission", acts: "Acts 12–15", sharing: ["Zac"], mia: ["Roy"], special: "" },
  7: { targetSunday: "Sun, Oct 25", iso: "2026-10-25", theme: "The Growing Church", acts: "Acts 15–17", sharing: ["Paul", "Roy"], mia: [], special: "" },
  8: { targetSunday: "Sun, Nov 1", iso: "2026-11-01", theme: "The Established Church", acts: "Acts 18–21", sharing: [], mia: ["Paul"], special: "" },
  9: { targetSunday: "Sun, Nov 8", iso: "2026-11-08", theme: "Opposition in Jerusalem", acts: "Acts 21–25", sharing: ["Johnny", "Joe A."], mia: [], special: "" },
  10: { targetSunday: "Sun, Nov 15", iso: "2026-11-15", theme: "On to Rome (Celebration)", acts: "Acts 25–28", sharing: [], mia: [], special: "🎉 Celebration wrap-up. Baptism services the following weekend, 11/21–11/22." }
};

const ROSTER = ["Paul", "Roy", "Michael", "Bryan", "Joe A.", "Joe C.", "Nate", "Zac", "Johnny"];
const LEADERS = ["Paul", "Roy"];

const platformData = {
  spotify: { cta: "Listen on Spotify", icon: "🟢", title: "Spotify", url: "https://open.spotify.com/show/6QlVAGJQayupe8KSleegNG" },
  apple: { cta: "Listen on Apple", icon: "🍏", title: "Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/being-with-jesus-podcast-scg-discipleship/id6811618382?at=1000l3bbu&itsct=podcast_box&itscg=30200&ls=1" },
  youtube: { cta: "Watch on YouTube", icon: "▶️", title: "YouTube", url: "https://www.youtube.com/playlist?list=PLJ8lzqX55j04" },
  subsplash: { cta: "Open in SCG App", icon: "📱", title: "SCG App", url: "https://subsplash.com/u/seacoastgrace/media/l/fpry94s-being-with-jesus-scg-discipleship" }
};

// Full Week 2 digitizations sourced from workbook pages
const studyDays = {
  "2-1": {
    title: "The Ascension",
    scripture: "Acts 1:1–11",
    bibleUrl: makeBibleGatewayUrl("Acts 1:1-11", "NIV"),
    think: [
      "What stood out to you from these verses? What was familiar? What was new or interesting?",
      "What questions came up for you as you read?",
      "What did you learn, realize, or remember about Jesus as you read?"
    ],
    live: "Look back over our teaching, the Scripture you've read, and your answers above. What do you sense God is asking you to do or change in your life today?"
  },
  "2-2": {
    title: "The Upper Room",
    scripture: "Acts 1:12–26",
    bibleUrl: makeBibleGatewayUrl("Acts 1:12-26", "NIV"),
    think: [
      "Notice: Read with a pen in hand. Highlight verses or words that stand out (aim for 4).",
      "See God: What does this teach about Jesus, the Father, or the Holy Spirit? (aim for 3).",
      "Ask Questions: What questions came up for you as you read? (aim for at least 2)."
    ],
    live: "Live Differently: Take a moment to review everything you wrote down. What is one thing God wants you to do or change today? Write down at least one concrete step."
  },
  "2-3": {
    title: "Pentecost",
    scripture: "Acts 2:1–13",
    bibleUrl: makeBibleGatewayUrl("Acts 2:1-13", "NIV"),
    think: [
      "Notice: What stood out as the Holy Spirit arrived with wind and fire? (aim for 4).",
      "See God: What does God's miraculous work across languages reveal about His heart? (aim for 3).",
      "Ask Questions: What is puzzling or challenging about this passage? (aim for 2)."
    ],
    live: "Live Differently: How can you step out in bold, Spirit-led obedience in your workplace or family today?"
  },
  "2-4": {
    title: "Peter's Sermon",
    scripture: "Acts 2:14–41",
    bibleUrl: makeBibleGatewayUrl("Acts 2:14-41", "NIV"),
    think: [
      "Notice: Peter grounds his message in Joel and the Psalms. What stands out to you? (aim for 4).",
      "See God: What does Peter's declaration teach us about Jesus as Lord and Messiah? (aim for 3).",
      "Ask Questions: When the crowd was cut to the heart, what did Peter tell them to do? (aim for 2)."
    ],
    live: "Live Differently: Repentance means a change of direction. Where is God asking you to realign your heart with Him today?"
  },
  "2-5": {
    title: "The Fellowship of Believers",
    scripture: "Acts 2:42–47",
    bibleUrl: makeBibleGatewayUrl("Acts 2:42-47", "NIV"),
    think: [
      "Notice: The believers devoted themselves to apostles' teaching, fellowship, breaking of bread, and prayer (aim for 4 notes).",
      "See God: How did God show His power and favor through their radical generosity? (aim for 3 notes).",
      "Ask Questions: What questions does this community model raise for our group? (aim for 2 questions)."
    ],
    live: "Live Differently: Devotion is training, not passive hope. What specific practice (prayer, generosity, or fellowship) will you commit to this weekend?"
  }
};
