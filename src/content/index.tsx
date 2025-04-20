// import React from 'react'; // This is essential for JSX
// import BlockedPage from "../components/BlockedPage";
// import { createRoot } from "react-dom/client";

// Simple function to check if this is Instagram
function isInstagram() {
    return window.location.hostname.includes('instagram.com');
}

// Function to block the page
function blockPage() {
    // Create a container div for React to render into
    const container = document.createElement('div');
    container.id = 'blocked-page-container';
    document.body.innerHTML = ''; // Clear the existing body content
    document.body.appendChild(container);

    // Render the BlockedPage component
    // const root = createRoot(container);
    // root.render(React.createElement(BlockedPage, { url: window.location.href }));
    // Alternative without JSX: 
    // root.render(React.createElement(BlockedPage, { url: window.location.href }));

    // Stop loading the rest of the page
    window.stop();
}

// Check if we're on Instagram and block if needed
if (isInstagram()) {
    console.log('Blocking Instagram');

    // Use MutationObserver to detect when body is added
    const observer = new MutationObserver(function() {
        if (document.body) {
            blockPage();
            observer.disconnect();
        }
    });

    observer.observe(document.documentElement || document, {
        childList: true,
        subtree: true
    });
}