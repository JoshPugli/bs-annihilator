// src/components/BlockedPage.tsx
import React from 'react';
import './BlockedPage.css';

interface BlockedPageProps {
  url: string;
}

const BlockedPage: React.FC<BlockedPageProps> = ({ url }) => {
  return (
    <div className="blocked-page">
      <div className="blocked-container">
        <h1>Access Blocked</h1>
        <p>The site you're trying to visit has been blocked to help you stay productive.</p>
        <div className="blocked-url">{url}</div>
        <button 
          className="redirect-button"
          onClick={() => window.location.href = "https://google.com"}
        >
          Go to Google
        </button>
      </div>
    </div>
  );
};

export default BlockedPage;