export interface FishingReportSection {
  heading: string;
  paragraphs: string[];
}

export interface FishingReport {
  slug: string;
  title: string;
  shortTitle: string;
  date: string;
  isoDate: string;
  readTime: string;
  metaDescription: string;
  excerpt: string;
  heroImage: string;
  heroAlt: string;
  locations: string[];
  highlights: Array<{
    species: string;
    status: string;
    detail: string;
  }>;
  sections: FishingReportSection[];
  bestTimes: string;
  baitTips: string[];
}

export const FISHING_REPORTS: FishingReport[] = [
  {
    slug: "sarasota-fishing-report-september-28-2026",
    title: "Sarasota Fishing Report: What’s Biting This Week in Sarasota Bay & Offshore",
    shortTitle: "Fall Bait Push Has Sarasota Fishing Heating Up",
    date: "September 28, 2026",
    isoDate: "2026-09-28",
    readTime: "6 min read",
    metaDescription:
      "Weekly Sarasota fishing report for Sarasota Bay, Siesta Key, Longboat Key and Venice, Florida. Find what’s biting inshore and offshore this week.",
    excerpt:
      "The fall bait push is underway. Snook, redfish, trout, mangrove snapper, Spanish mackerel and more are getting active from Sarasota Bay to the nearshore Gulf.",
    heroImage: "/images/sarasota-fishing-report-september-28-2026-cover.webp",
    heroAlt:
      "Captain Jon assisting a customer with a redfish aboard the newly wrapped Reel Smart Charters boat on Sarasota Bay",
    locations: ["Sarasota Bay", "Siesta Key", "Longboat Key", "Venice", "Nearshore Gulf"],
    highlights: [
      {
        species: "Snook",
        status: "Very good",
        detail: "Early around dock lights, bridges, mangrove edges, seawalls and deeper cuts.",
      },
      {
        species: "Redfish",
        status: "Improving",
        detail: "Look for fish on grass flats, sandy potholes, oyster bars and moving-water points.",
      },
      {
        species: "Trout",
        status: "Improving",
        detail: "Deeper grass flats and grass edges are producing mixed-bag action around bait.",
      },
      {
        species: "Nearshore snapper",
        status: "Steady",
        detail: "Reefs, ledges and hard bottom can produce snapper, grunts, mackerel, bonita and jacks when weather allows.",
      },
    ],
    sections: [
      {
        heading: "What’s biting in Sarasota this week?",
        paragraphs: [
          "Late September is one of the most exciting transition periods of the year for Sarasota fishing. The fall bait push is underway, and anglers can expect action from snook, redfish, spotted seatrout, mangrove snapper, Spanish mackerel, jack crevalle, ladyfish, bluefish, juvenile tarpon and more.",
          "The best bite is typically early in the morning, late in the afternoon and around moving water. As the water begins to cool, fish are becoming more active on Sarasota Bay grass flats, mangrove shorelines, docks, bridges, passes and Gulf structure.",
        ],
      },
      {
        heading: "Where should I fish in Sarasota Bay this week?",
        paragraphs: [
          "Focus on deeper grass flats, potholes, mangrove points, oyster bars, docks and bridges throughout Sarasota Bay. The areas around Siesta Key, Big Pass, New Pass, Lido Key, Longboat Key and the Intracoastal Waterway are all worth checking.",
          "Look for bait schools, diving birds, clean moving water and current. If the bait is there, predator fish are usually close behind.",
        ],
      },
      {
        heading: "Are snook biting in Sarasota and Siesta Key?",
        paragraphs: [
          "Yes—snook fishing should be very good this week around Sarasota, Siesta Key and Longboat Key. Fish early morning around dock lights, bridges, mangrove edges, seawalls and deeper cuts leading into the bay.",
          "Live whitebait is hard to beat, but a shrimp imitation, soft plastic, topwater plug or small twitch bait can also produce. Snook may feed shallow at first light, then slide under docks, into mangroves or toward deeper structure as the sun gets higher.",
        ],
      },
      {
        heading: "Where can I catch redfish near Sarasota this week?",
        paragraphs: [
          "Redfish are beginning to show more consistently as fall approaches. Look for them around shallow grass flats, sandy potholes, mangrove shorelines, oyster bars and points with a good tide moving across them.",
          "Sarasota Bay, the flats around Siesta Key and Longboat Key, and waters south toward Venice can all hold redfish this time of year. A quiet approach matters—watch for pushing fish, nervous bait, tails or wakes in skinny water.",
        ],
      },
      {
        heading: "Are trout biting in Sarasota Bay?",
        paragraphs: [
          "Spotted seatrout fishing is improving as the bay transitions out of the hottest part of the year. Fish deeper grass flats and grass edges, especially where there is bait and moving water.",
          "A live shrimp under a popping cork is a dependable option for trout, while soft plastics on light jigheads are excellent for covering water. Trout, ladyfish, jacks and bluefish may all be mixed together over productive grass flats.",
        ],
      },
      {
        heading: "Longboat Key and Venice: inshore to offshore options",
        paragraphs: [
          "Longboat Key offers a great mix of inshore, pass, beach and nearshore opportunities. Longboat Pass, nearby grass flats, mangrove shorelines and Gulf beaches are all worth a look for snook, redfish, trout, mackerel, jacks, bluefish and snapper.",
          "Around Venice, the fall pattern is getting stronger. Inshore anglers can target snook, redfish, trout, mangrove snapper, juvenile tarpon, jacks and ladyfish around the Intracoastal, mangroves, docks, bridges and passes. Offshore of Venice, reefs, ledges, hard bottom and wrecks can hold snapper, grouper where open, amberjack where open, bonita, mackerel and kingfish. Early departures are often the best plan when weather windows allow.",
        ],
      },
      {
        heading: "Is offshore fishing good out of Sarasota?",
        paragraphs: [
          "Offshore fishing can be very productive in late September. Nearshore reefs, wrecks, ledges and hard bottom are holding mangrove snapper, lane snapper, grunts, mackerel, bonita, jacks and occasional cobia or kingfish.",
          "For anglers making a longer run offshore from Sarasota or Venice, bottom fishing remains a great option when seas cooperate. Reef fish regulations and seasons can change, so always confirm current state and federal rules before keeping fish.",
        ],
      },
      {
        heading: "Should I book an inshore or offshore Sarasota fishing charter this week?",
        paragraphs: [
          "Choose an inshore Sarasota fishing charter if you want a calmer ride and a wide variety of action from snook, redfish, trout, snapper, jacks and more around Sarasota Bay, Siesta Key, Longboat Key and Venice.",
          "Choose an offshore charter if weather allows and you want to target Gulf reef fish, snapper, grouper when open, mackerel, bonito, kingfish, amberjack when open and larger nearshore or offshore species. Late September offers some of the year’s best variety for families, first-time anglers and serious fishermen alike.",
        ],
      },
    ],
    bestTimes:
      "Sunrise, sunset and moving tide are the best windows. For redfish and trout, focus on a clean incoming tide or the first part of the outgoing tide around grass flats, potholes, mangroves and points.",
    baitTips: [
      "Live whitebait for snook, redfish, trout, mangrove snapper, jacks and mackerel.",
      "Shrimp for trout, snapper, redfish and mixed-bag action.",
      "Topwater plugs at dawn; soft plastics on light jigheads over grass flats; shrimp imitations around docks and mangroves.",
      "Live pinfish, sardines, squid and cut bait for offshore bottom fishing.",
    ],
  },
];

export const LATEST_FISHING_REPORT = FISHING_REPORTS[0];
