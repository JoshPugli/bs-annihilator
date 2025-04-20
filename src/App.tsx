import { useState, useEffect } from 'react';
import './App.css';
import { getStorageData, addBlockedUrl, removeBlockedUrl, toggleEnabled } from './utils/storage';

function App() {
  // State for managing the list of blocked URLs
  const [blockedUrls, setBlockedUrls] = useState<string[]>([]);
  // State for the new URL input field
  const [newUrl, setNewUrl] = useState('');
  // State for whether the extension is enabled
  const [isEnabled, setIsEnabled] = useState(true);
  
  // Load data from Chrome storage when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getStorageData();
        setBlockedUrls(data.blockedUrls || []);
        setIsEnabled(data.isEnabled !== false);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, []);
  
  // Handle adding a new URL to block
  const handleAddUrl = async () => {
    if (newUrl.trim()) {
      try {
        const updatedUrls = await addBlockedUrl(newUrl.trim());
        setBlockedUrls(updatedUrls);
        setNewUrl(''); // Clear input after adding
      } catch (error) {
        console.error('Error adding URL:', error);
      }
    }
  };
  
  // Handle removing a URL from the blocked list
  const handleRemoveUrl = async (url: string) => {
    try {
      const updatedUrls = await removeBlockedUrl(url);
      setBlockedUrls(updatedUrls);
    } catch (error) {
      console.error('Error removing URL:', error);
    }
  };
  
  // Toggle whether the extension is enabled or disabled
  const handleToggleEnabled = async () => {
    try {
      await toggleEnabled(!isEnabled);
      setIsEnabled(!isEnabled);
    } catch (error) {
      console.error('Error toggling enabled state:', error);
    }
  };
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Site Blocker</h1>
        <div className="toggle-container">
          <label htmlFor="enable-toggle">
            {isEnabled ? 'Blocking Enabled' : 'Blocking Disabled'}
          </label>
          <input
            id="enable-toggle"
            type="checkbox"
            checked={isEnabled}
            onChange={handleToggleEnabled}
          />
        </div>
      </header>
      
      <main>
        <div className="add-url-form">
          <input
            type="text"
            placeholder="Enter URL to block (e.g., facebook.com)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
          />
          <button onClick={handleAddUrl}>Add</button>
        </div>
        
        <section className="blocked-urls-section">
          <h2>Blocked Sites</h2>
          {blockedUrls.length === 0 ? (
            <p className="no-sites-message">No sites are currently blocked</p>
          ) : (
            <ul className="blocked-sites-list">
              {blockedUrls.map((url) => (
                <li key={url} className="blocked-site-item">
                  <span className="site-url">{url}</span>
                  <button 
                    className="remove-button"
                    onClick={() => handleRemoveUrl(url)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      
      <footer className="app-footer">
        <p>Stay productive by blocking distracting sites</p>
      </footer>
    </div>
  );
}

export default App;