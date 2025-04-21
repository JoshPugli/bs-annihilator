import { getHandler } from "../site-handlers/router";

const handler = getHandler(window.location.href);

if (handler !== null) {
  const observer = new MutationObserver(function() {
    if (document.body) {
      handler();
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement || document, {
    childList: true,
    subtree: true,
  });
}
