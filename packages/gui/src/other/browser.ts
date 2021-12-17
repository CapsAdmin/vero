import { bowser } from "@frontend/app/thirdparty";
import { TESTING } from "./other";

const matches = (query: string) => {
  if (TESTING) {
    return false;
  }
  return window.matchMedia(query).matches;
};

export const IsDarkThemePrefered = matches("(prefers-color-scheme: dark)");
export const IsPWA =
  matches("(display-mode: standalone)") ||
  (window.navigator && (window.navigator as any).standalone) ||
  document.referrer.includes("android-app://");

const browser = bowser.getParser(window.navigator.userAgent);
export const IsMobile = browser.is("mobile") || browser.is("tablet");
export const IsIOS = browser.is("iOS");
export const IsAndroid = browser.is("Android");
export const IsFirefox = browser.is("Firefox");
export const IsChrome = browser.is("Chrome");
export const IsSafari = browser.is("Safari");
export const IsDesktop = !IsMobile;
