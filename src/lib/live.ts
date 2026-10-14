/** Waggle Live: free expert sessions. Titles, speakers and credentials as published on mywaggle.com. */
export interface LiveSession {
  title: string;
  speaker: string;
  credential: string;
  summary: string;
  minutes?: number;
  topic: "travel" | "behavior" | "wellbeing" | "rv";
  /** Replay URL on the video host. Null until connected. */
  replayUrl: string | null;
}

export const LIVE_SESSIONS: LiveSession[] = [
  {
    title: "Life on the Road with Big Dogs",
    speaker: "Dawn Thurman",
    credential: "Full-time RVer & experienced pet traveler",
    summary: "Firsthand experience challenging breed stereotypes and navigating life on the road with big dogs.",
    minutes: 44,
    topic: "travel",
    replayUrl: null,
  },
  {
    title: "Dog Parent Burnout",
    speaker: "Emily",
    credential: "Vet tech, dog trainer & canine nutritionist",
    summary: "Feel more confident, less overwhelmed, and better equipped as a dog parent.",
    minutes: 41,
    topic: "wellbeing",
    replayUrl: null,
  },
  {
    title: "RV Maintenance Simplified",
    speaker: "Jeanette Starr",
    credential: "16-year RV travel veteran",
    summary: "Prevent costly repairs, prepare for every season, and keep your RV road-ready.",
    minutes: 38,
    topic: "rv",
    replayUrl: null,
  },
  {
    title: "How to Plan the Perfect RV Road Trip",
    speaker: "Jeanette Starr",
    credential: "16-year RV travel veteran",
    summary: "How experienced RVers plan routes, find campsites, stay flexible and avoid common mistakes.",
    topic: "travel",
    replayUrl: null,
  },
  {
    title: "Road Trip Ready: Live Dog Training Tips",
    speaker: "Shane Gentry",
    credential: "Certified dog trainer",
    summary: "Practical, real-world training tips for calmer, more enjoyable travel with your dog.",
    topic: "behavior",
    replayUrl: null,
  },
  {
    title: "The Secrets to Easing Separation Anxiety",
    speaker: "Jamie Bozzi",
    credential: "Certified professional dog trainer & canine behavior consultant",
    summary: "Understand and manage your dog's separation anxiety with guidance from a behavior specialist.",
    topic: "behavior",
    replayUrl: null,
  },
];
