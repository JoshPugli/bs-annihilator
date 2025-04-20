// src/utils/storage.ts
export interface StorageData {
    blockedUrls: string[];
    isEnabled: boolean;
  }
  
  // Get all storage data
  export async function getStorageData(): Promise<StorageData> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['blockedUrls', 'isEnabled'], (result) => {
        resolve({
          blockedUrls: result.blockedUrls || [],
          isEnabled: result.isEnabled !== false, // Default to enabled
        });
      });
    });
  }
  
  // Save blocked URLs
  export async function saveBlockedUrls(urls: string[]): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ blockedUrls: urls }, resolve);
    });
  }
  
  // Add a URL to blocked list
  export async function addBlockedUrl(url: string): Promise<string[]> {
    const data = await getStorageData();
    const normalizedUrl = normalizeUrl(url);
    
    if (!data.blockedUrls.includes(normalizedUrl)) {
      const newUrls = [...data.blockedUrls, normalizedUrl];
      await saveBlockedUrls(newUrls);
      return newUrls;
    }
    
    return data.blockedUrls;
  }
  
  // Remove a URL from blocked list
  export async function removeBlockedUrl(url: string): Promise<string[]> {
    const data = await getStorageData();
    const normalizedUrl = normalizeUrl(url);
    const newUrls = data.blockedUrls.filter(u => u !== normalizedUrl);
    
    await saveBlockedUrls(newUrls);
    return newUrls;
  }
  
  // Toggle extension enabled state
  export async function toggleEnabled(enabled: boolean): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ isEnabled: enabled }, resolve);
    });
  }
  
  // Helper to normalize URLs for consistent matching
  function normalizeUrl(url: string): string {
    // Remove protocol and www
    let normalized = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    // Remove trailing slash
    normalized = normalized.replace(/\/$/, '');
    return normalized.toLowerCase();
  }
  
  // Check if URL should be blocked
  export async function shouldBlockUrl(url: string): Promise<boolean> {
    const data = await getStorageData();
    
    if (!data.isEnabled) {
      return false;
    }
    
    const normalizedUrl = normalizeUrl(url);
    
    return data.blockedUrls.some(blockedUrl => 
      normalizedUrl === blockedUrl || normalizedUrl.includes(blockedUrl)
    );
  }