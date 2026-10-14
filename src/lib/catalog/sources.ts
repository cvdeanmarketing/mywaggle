import type { SourceRef } from "./types";

/** Public pages the catalog data was taken from (reviewed 2026-10-14). */
export const SRC = {
  home: { label: "mywaggle.com homepage", url: "https://mywaggle.com/" },
  store: {
    label: "Shop Waggle store page",
    url: "https://mywaggle.com/pages/store",
  },
  shopCollection: {
    label: "Waggle shop collection",
    url: "https://mywaggle.com/collections/waggle-shop",
  },
  petMonitor: {
    label: "Waggle Pet Monitor product page",
    url: "https://mywaggle.com/products/pet-monitor",
  },
  petMonitorHelp: {
    label: "Pet Monitor Help (support)",
    url: "https://support.mywaggle.com/pet-monitor-help.php",
  },
  faq: {
    label: "Waggle FAQ (support)",
    url: "https://support.mywaggle.com/faq",
  },
  subscription: {
    label: "Waggle Subscription Plans (support)",
    url: "https://support.mywaggle.com/subscription",
  },
  subscriptionPolicy: {
    label: "Subscription policy",
    url: "https://mywaggle.com/pages/subscription-policy",
  },
  networkPlan: {
    label: "Pet Monitor Network Plan (support)",
    url: "https://support.mywaggle.com/networkplan-petmonitor.php",
  },
  wagglecam: {
    label: "WaggleCam product page",
    url: "https://mywaggle.com/products/wagglecam",
  },
  wagglecamSub: {
    label: "WaggleCam Pro Subscription (support)",
    url: "https://support.mywaggle.com/subscription-wagglecampro.php",
  },
  wagglecamHelp: {
    label: "WaggleCam Pro Help (support)",
    url: "https://support.mywaggle.com/wagglecam-pro-help.php",
  },
  rvMiniCam: {
    label: "RV WiFi Mini Cam product page",
    url: "https://mywaggle.com/products/rv-mini-cam",
  },
  rvMiniCamFaq: {
    label: "RV Cam AI Mini FAQ (support)",
    url: "https://support.mywaggle.com/rv-mini-cam-faq",
  },
  rv4gMini: {
    label: "RV 4G Mini Camera product page",
    url: "https://mywaggle.com/products/rv-4g-mini-camera",
  },
  rv4gMiniHelp: {
    label: "RV 4G Mini Camera Help (support)",
    url: "https://support.mywaggle.com/rv-4g-mini-camera-help.php",
  },
  rvSecurityCamera: {
    label: "RV Security Camera landing page",
    url: "https://mywaggle.com/pages/rv-security-camera",
  },
  rv4gCamera: {
    label: "RV 4G Camera product page",
    url: "https://mywaggle.com/products/waggle-4g-camera",
  },
  rv4gCameraHelp: {
    label: "RV 4G Camera Help (support)",
    url: "https://support.mywaggle.com/rv-4g-camera-help.php",
  },
  cameras: {
    label: "Waggle Pet Cameras product page",
    url: "https://mywaggle.com/products/rv-4g-mini-camera",
  },
  observation: {
    label: "RV Observation System product page",
    url: "https://mywaggle.com/products/rv-observation-system",
  },
  chooseBundle: {
    label: "Choose your Waggle Bundles",
    url: "https://mywaggle.com/pages/choose-your-bundle",
  },
  homeAndRoam: {
    label: "Home and Roam Bundle product page",
    url: "https://mywaggle.com/products/home-and-roam-bundle",
  },
  petScout: {
    label: "Pet Scout Bundle product page",
    url: "https://mywaggle.com/products/rv-safety-mini-bundle",
  },
  rv4gScout: {
    label: "RV 4G Scout Bundle product page",
    url: "https://mywaggle.com/products/pet-scout-bundle",
  },
  subscriptionExplained: {
    label: "Why does Waggle have a subscription?",
    url: "https://mywaggle.com/pages/waggle-subscription-explained",
  },
} satisfies Record<string, SourceRef>;
