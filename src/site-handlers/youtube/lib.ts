export const defaultOptions = {
  blockHome: true,
  blockShorts: true,

  blockExplore: true,
  blockSubscriptions: true,
  blockMoreFromYouTube: true,

  replaceLogo: true,
  replaceTabTitle: true,
};

export const labelsArray = Object.keys(defaultOptions);

export const urls = {
  home: "/",
};

export const selectors = {
  home: [
    'ytd-guide-entry-renderer a[title="Home"]',
    'a.ytd-mini-guide-entry-renderer[title="Home"]',
  ].join(", "),
  shorts: [
    'ytd-guide-entry-renderer a[title="Shorts"]',
    'a.ytd-mini-guide-entry-renderer[title="Shorts"]',
  ].join(", "),
};
