export function redirectToSubscriptions() {
    // Only redirect if we're on the homepage
    const path = window.location.pathname;
    if (path === '/' || path === '/feed/recommended' || path === '/feed/explore') {
        const subscriptionsLink = document.querySelector('a[href="/feed/subscriptions"]');
        
        if (subscriptionsLink) {
            (subscriptionsLink as HTMLElement).click();
        } else {
            window.location.href = '/feed/subscriptions';
        }
    }
}