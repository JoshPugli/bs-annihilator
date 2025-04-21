import { observeTitleChanges, changeTopLeftYTLogo } from "./utils/logos.js";
import { defaultOptions, selectors } from "./lib.js";

export function YouTubeCleanup() {
  // const settings = defaultOptions;
  const mutationObserver = new MutationObserver(onMutation);

  const settings = defaultOptions;

  function onMutation() {
    const path = window.location.pathname;
    const body = document.body;

    if (settings.blockHome) {
      const homeLinks = body?.querySelectorAll(selectors.home);
      homeLinks.forEach((link) => link.remove());
    }

    if (settings.blockShorts) {
      const shortsLinks = body?.querySelectorAll(selectors.shorts);
      shortsLinks.forEach((link) => link.remove());
    }

    if (
      settings.blockExplore ||
      settings.blockSubscriptions ||
      settings.blockMoreFromYouTube
    ) {
      const guideSections = body?.querySelectorAll(
        "ytd-guide-section-renderer" 
      );

      guideSections.forEach((section) => {
        // Get element with id=guide-section-title
        const titleElement = section.querySelector("#guide-section-title");

        if (titleElement && titleElement.textContent) {
          const titleText = titleElement.textContent.trim();
          if (settings.blockExplore && titleText === "Explore") {
            section.remove();
          } else if (
            settings.blockSubscriptions &&
            titleText === "Subscriptions"
          ) {
            section.remove();
          } else if (
            settings.blockMoreFromYouTube &&
            titleText === "More from YouTube"
          ) {
            section.remove();
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

  mutationObserver.observe(document, {
    childList: true,
    subtree: true,
  });

  onMutation();
}
