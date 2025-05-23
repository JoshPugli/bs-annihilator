import { defaultOptions, selectors, urls } from "./lib.js";
import { hide } from "../utils.js";

export function InstagramOnMutationHandler() {
  const settings = defaultOptions;

  const path = window.location.pathname;
  const body = document.body;

  if (settings.blockExplore) {
    const exploreLink = body?.querySelector(selectors.nav.explore);
    hide(exploreLink);
  }
  if (settings.blockReels) {
    const reelsLink = body?.querySelector(selectors.nav.reels);
    hide(reelsLink);
  }

  if (path === urls.base) {
    if (settings.blockStories) {
      const storyFeed = body?.querySelector(selectors.storyFeed);
      hide(storyFeed);
    }

    if (settings.blockPosts) {
      const posts = body?.querySelector(selectors.posts);
      const postsLoader = body?.querySelector(selectors.postsLoader);
      const postsContainer = posts?.closest("div");
      hide(posts);
      hide(postsLoader);
      hide(postsContainer);
    }

    if (settings.blockSuggestedFollowers) {
      const suggestedFollowersLink = body?.querySelector(
        selectors.suggestedFollowers
      );
      const suggestedFollowersTitle = suggestedFollowersLink?.closest("div");
      const suggestedFollowers = suggestedFollowersTitle?.nextElementSibling;
      hide(suggestedFollowersLink);
      hide(suggestedFollowersTitle);
      hide(suggestedFollowers);
    }

    // Redirect to 'Following' feed
    if (settings.blockForYouFeed) {
      const queryParams = new URLSearchParams(window.location.search);
      if (
        queryParams?.get("variant") === "home" ||
        queryParams?.get("variant") === null
      ) {
        queryParams.set("variant", "following");
        window.location.search = queryParams.toString();
      }
    }
  }

  const blockStoriesSection =
    path.includes(urls.stories) && settings.blockStories;
  if (blockStoriesSection) {
    const storiesSection = body?.querySelector("section");
    hide(storiesSection);
  }

  const blockReelsScreen = path.includes(urls.reels) && settings.blockReels;
  if (blockReelsScreen) {
    const main = body?.querySelector(selectors.main);
    hide(main);
  }

  const blockExploreScreen =
    path.includes(urls.explore) && settings.blockExplore;
  if (blockExploreScreen) {
    const main = body?.querySelector(selectors.main);
    hide(main);
  }
}
