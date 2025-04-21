import { removeUnwantedElements, redirectToSubscriptions, changePageTitle, observeTitleChanges } from "./utils/index.js";

export function YouTubeCleanup() {
    // Force navigation to subscriptions page on first load
    redirectToSubscriptions();

    // Create an observer to watch for navigation elements
    const observer = new MutationObserver(() => {
        removeUnwantedElements();
        changePageTitle();
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
        changePageTitle();
    });

    // Also handle YouTube's navigation events
    window.addEventListener('yt-navigate-finish', () => {
        removeUnwantedElements();
        changePageTitle();

        // Check if we've navigated to homepage and redirect if needed
        const path = window.location.pathname;
        if (path === '/' || path === '/feed/recommended' || path === '/feed/explore') {
            redirectToSubscriptions();
        }
    });

    // Also try to clean up immediately
    removeUnwantedElements();
    changePageTitle();

    // Observe title changes specifically
    observeTitleChanges();
}