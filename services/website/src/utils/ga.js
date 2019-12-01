import { GA_TRACKING, getConfigValue } from "../config";

export function gtag() {
  window.dataLayer.push(arguments);
}

export const init = () => {
  if (getConfigValue(GA_TRACKING)) {
    window.dataLayer = window.dataLayer || [];
    gtag("js", new Date());

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${getConfigValue(
      GA_TRACKING
    )}`;
    document.body.appendChild(script);
  }
};