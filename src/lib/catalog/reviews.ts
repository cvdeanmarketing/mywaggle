/**
 * Customer ratings and review excerpts.
 *
 * Ratings: the aggregate rating Waggle publishes in each live product page's
 * structured data (schema.org AggregateRating). Several live pages share one
 * rating group, so counts repeat across related products.
 *
 * Excerpts: customer comments published on mywaggle.com pages. Only comments
 * shown with a star rating are treated as star reviews; the rest are shown as
 * customer stories. To show every review, export them from the reviews app and
 * add them here (one entry per review).
 */
export interface Review {
  name: string;
  role?: string;
  /** Stars as displayed with the original comment. Omitted when none was shown. */
  rating?: number;
  text: string;
}

const LIVE = (h: string) => `https://mywaggle.com/products/${h}`;

export const RATINGS: Record<
  string,
  { rating: number; count: number; url: string }
> = {
  "pet-monitor-pro-plus": {
    rating: 4.4,
    count: 3150,
    url: LIVE("pet-monitor"),
  },
  "pet-monitor-lite-plus": {
    rating: 4.4,
    count: 3150,
    url: LIVE("pet-monitor"),
  },
  "pet-monitor-pro-plus-satellite": {
    rating: 4.4,
    count: 3150,
    url: LIVE("pet-monitor"),
  },
  "wagglecam-pro": { rating: 4.5, count: 257, url: LIVE("wagglecam-pro") },
  "rv-wifi-mini-cam": {
    rating: 4.5,
    count: 257,
    url: LIVE("waggle-pet-camera"),
  },
  "rv-4g-mini-camera": {
    rating: 4.4,
    count: 222,
    url: LIVE("rv-4g-mini-camera"),
  },
  "rv-4g-camera": { rating: 4.4, count: 222, url: LIVE("waggle-4g-camera") },
  "anti-anxiety-cam-bundle": {
    rating: 4.4,
    count: 70,
    url: LIVE("anti-anxiety-cam-bundle"),
  },
  "home-and-roam-bundle": {
    rating: 4.4,
    count: 80,
    url: LIVE("home-and-roam-bundle"),
  },
  "rv-4g-scout-bundle": {
    rating: 4.4,
    count: 120,
    url: LIVE("pet-scout-bundle"),
  },
  "rv-4g-scout-pro-bundle": {
    rating: 4.4,
    count: 95,
    url: LIVE("rv-4g-scout-bundle-pro-1"),
  },
  "pet-scout-bundle": {
    rating: 4.4,
    count: 60,
    url: LIVE("rv-safety-mini-bundle"),
  },
};

const RV_STORIES: Review[] = [
  {
    name: "Sarah K.",
    role: "Full-time RVer, Colorado",
    rating: 5,
    text: "Left our two dogs in the RV while we hiked. Checked in from the trail and could see them sleeping. Talked to them when they woke up. Absolute game changer for us.",
  },
  {
    name: "Mike T.",
    role: "Weekend RVer, Texas",
    rating: 5,
    text: "Got an alert while at dinner — someone was lurking around our rig. The spotlight scared them off and I have footage. Paid for itself the first week.",
  },
  {
    name: "Linda M.",
    role: "Seasonal traveler, Pacific Northwest",
    rating: 4,
    text: "Setup was genuinely 2 minutes. Works perfectly in spots where campground Wi-Fi is nonexistent. I've tried 3 other cameras — this is the only one built for actual RV life.",
  },
];

const CAM_STORIES: Review[] = [
  {
    name: "Emily Carter",
    text: "I purchased the Waggle Cam to keep an eye on my pet during crate training. At first, he experienced some anxiety, but thankfully, we decided to monitor him with the camera. It made a huge difference—he would calm down as soon as he heard our voice, which was amazing. I absolutely love having it!",
  },
  {
    name: "Jason Miller",
    text: "Our neighbor called to let us know that Lisa, my 5-month-old pup, had been barking nonstop. When we checked on her, we realized she was unwell. The vet discovered she had swallowed a piece of a toy, which caused her a lot of distress. That's when our vet recommended WaggleCam. It allows us to monitor her at all times and even alerts us when she barks. While the subscription adds to the cost, it's been worth the investment.",
  },
  {
    name: "Olivia Hayes",
    text: "My pup recently turned 16, and we wanted to ensure his safety while we were at work. Investing in the Waggle Cam turned out to be a great decision—the peace of mind we get knowing he's okay is truly invaluable.",
  },
];

const MONITOR_STORIES: Review[] = [
  {
    name: "Megan Dodd",
    role: "Dodd Squad RV",
    text: "Traveling full-time with our rescue pup Hugo, the Waggle Pet Monitor has transformed our RV adventures. We can now explore remote trails and national parks with complete peace of mind, knowing we'll be instantly alerted to any temperature changes. After two years on the road with Waggle, we simply wouldn't travel without it!",
  },
  {
    name: "Darlene",
    role: "Like there's no tomorrow",
    text: "Waggle Pet Monitor and Mini Camera have been life saving for my pet. The Monitor tracks the environment in my RV, while the Camera lets me check in on Duchess, talk to her, and track her movements. Perfect combo for safety and peace of mind. Thank you, Waggle!",
  },
  {
    name: "Brandon Scott",
    text: "We recently had a nightmare experience while out shopping at a nearby store—our RV lost power, and the AC shut off. Fortunately, we were able to get back within minutes. After that, we immediately purchased the Waggle Monitor, and it's been a great addition for keeping us informed about our RV's status. While it has some minor ups and downs, the peace of mind it provides is truly invaluable.",
  },
];

export const REVIEWS: Record<string, Review[]> = {
  "rv-4g-mini-camera": RV_STORIES,
  "rv-4g-camera": RV_STORIES,
  "wagglecam-pro": CAM_STORIES,
  "pet-monitor-pro-plus": MONITOR_STORIES,
  "pet-monitor-lite-plus": MONITOR_STORIES,
  "pet-monitor-pro-plus-satellite": MONITOR_STORIES,
};
