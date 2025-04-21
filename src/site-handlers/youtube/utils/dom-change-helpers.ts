
export const GUIDE_SECTION_HEADERS_TO_REMOVE = [
    "Explore",
    "More from YouTube",
];


export function removeUnwantedElements() {
    // Remove Shorts from navigation
    removeElementsBySelector([
        // Sidebar Shorts link
        'ytd-guide-entry-renderer a[title="Shorts"]',
        'a.ytd-mini-guide-entry-renderer[title="Shorts"]',

        // Shorts section on homepage
        'ytd-rich-section-renderer:has(#rich-shelf-header:contains("Shorts"))',
        'ytd-reel-shelf-renderer',

        // Any Shorts video in recommendations
        'ytd-grid-video-renderer:has(a[href*="/shorts/"])',
        'ytd-compact-video-renderer:has(a[href*="/shorts/"])',
        
        // Home Tab
        'ytd-guide-entry-renderer a[title="Home"]',
        'a.ytd-mini-guide-entry-renderer[title="Home"]',

        // Expore Tab
        'ytd-guide-entry-renderer a[title="Explore"]',
        'a.ytd-mini-guide-entry-renderer[title="Explore"]',

        // Trending Tab
        'ytd-guide-entry-renderer a[title="Trending"]',
        'a.ytd-mini-guide-entry-renderer[title="Trending"]',

        // Create Button
        'ytd-button-renderer button[aria-label="Create"]'
    ]);

    // Remove the Explore section from the sidebar
    removeExploreSection();
}

function removeExploreSection() {
    const guideSections = document.querySelectorAll('ytd-guide-section-renderer');

    guideSections.forEach(section => {
        // Get element with id=guide-section-title
        const titleElement = section.querySelector('#guide-section-title');

        if (titleElement && titleElement.textContent) {

            const titleText = titleElement.textContent.trim();
            if (GUIDE_SECTION_HEADERS_TO_REMOVE.some(ele => ele === titleText)) {
                section.remove();
            }
        }
    });
}


function removeElementsBySelector(selectors: string[]) {
    selectors.forEach(selector => {
        try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                let containerToRemove = element;

                // If it's an anchor tag, try to find its parent container
                if (element.tagName === 'A') {
                    containerToRemove = element.closest('ytd-guide-entry-renderer') ||
                        element.closest('ytd-mini-guide-entry-renderer') ||
                        element;
                }

                if (containerToRemove) { containerToRemove.remove(); }
            });
        } catch (error) {
            console.error(`Error removing element with selector ${selector}:`, error);
        }
    });
}
