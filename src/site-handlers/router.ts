import React from 'react'; // This is essential for JSX
import BlockedPage from "../components/BlockedPage";
import { createRoot } from "react-dom/client";
import { YouTubeCleanup } from './youtube/yt-handler';

function blockPage() {
    // Create a container div for React to render into
    const container = document.createElement('div');
    container.id = 'blocked-page-container';
    document.body.innerHTML = ''; // Clear the existing body content
    document.body.appendChild(container);

    // Render the BlockedPage component
    const root = createRoot(container);
    root.render(React.createElement(BlockedPage, { url: window.location.href }));

    // Stop loading the rest of the page
    window.stop();
}

export function getHandler(path: string): null | (() => void) {
    switch (true) {
        case path.includes("instagram.com"):
            return blockPage; 
        case path.includes("youtube.com"):
            return YouTubeCleanup; 
        default:
            return () => {}; 
    }
            
}