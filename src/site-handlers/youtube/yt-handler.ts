import { observeTitleChanges, changeTopLeftYTLogo } from "./utils/logos.js";
import { defaultOptions, selectors } from "./lib.js";
import { hide } from "../utils.js";

export function YouTubeOnMutationHander() {
  // const settings = defaultOptions;
  const settings = defaultOptions;

  const path = window.location.pathname;
  const body = document.body;

  if (settings.blockHome) {
    const homeLinks = body?.querySelectorAll(selectors.home);
    homeLinks.forEach(link => hide(link));
  }

  if (settings.blockShorts) {
    const shortsLinks = body?.querySelectorAll(selectors.shorts);
    shortsLinks.forEach(link => hide(link));
  }

  if (
    settings.blockExplore ||
    settings.blockSubscriptions ||
    settings.blockMoreFromYouTube
  ) {
    const guideSections = body?.querySelectorAll("ytd-guide-section-renderer");

    guideSections.forEach(section => {
      // Get element with id=guide-section-title
      const titleElement = section.querySelector("#guide-section-title");

      if (titleElement && titleElement.textContent) {
        const titleText = titleElement.textContent.trim();
        if (settings.blockExplore && titleText === "Explore") {
          hide(section);
        } else if (
          settings.blockSubscriptions &&
          titleText === "Subscriptions"
        ) {
          hide(section);
        } else if (
          settings.blockMoreFromYouTube &&
          titleText === "More from YouTube"
        ) {
          hide(section);
        }
      }
    });
  }

  if (settings.replaceLogo) {
    changeTopLeftYTLogo();
  }

  if (settings.replaceTabTitle) {
    observeTitleChanges();
  }

  if (
    path === "/" ||
    path === "/feed/recommended" ||
    path === "/feed/explore"
  ) {
    const subscriptionsLink = document.querySelector(
      'a[href="/feed/subscriptions"]'
    );

    if (subscriptionsLink) {
      (subscriptionsLink as HTMLElement).click();
    } else {
      window.location.href = "/feed/subscriptions";
    }
  }
}
