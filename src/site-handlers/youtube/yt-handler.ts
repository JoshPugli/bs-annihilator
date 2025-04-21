import { removeUnwantedElements, redirectToSubscriptions, changeTopLeftYTLogo } from "./utils/index.js";
import { observeTitleChanges } from "./utils/index.js";

export function YouTubeCleanup() {
    // Force navigation to subscriptions page on first load
    redirectToSubscriptions();

    // Create an observer to watch for navigation elements
    const observer = new MutationObserver(() => {
        removeUnwantedElements();
        changeTopLeftYTLogo();
    });

    // Start observing the document with the configured parameters
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Initial cleanup when the page loads
    document.addEventListener('DOMContentLoaded', () => {
        removeUnwantedElements();
        redirectToSubscriptions();
        changeTopLeftYTLogo();
    });

    // Also handle YouTube's navigation events
    window.addEventListener('yt-navigate-finish', () => {
        removeUnwantedElements();
        changeTopLeftYTLogo();

        // Check if we've navigated to homepage and redirect if needed
        const path = window.location.pathname;
        if (path === '/' || path === '/feed/recommended' || path === '/feed/explore') {
            redirectToSubscriptions();
        }
    });

    // Also try to clean up immediately
    removeUnwantedElements();
    changeTopLeftYTLogo();

    // Observe title changes specifically
    observeTitleChanges();
}