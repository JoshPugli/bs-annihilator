export function changeTopLeftYTLogo() {
  // Change the document title
  if (document.title.includes("YouTube")) {
    document.title = document.title.replace("YouTube", "JoshTube");
  }

  // Also change the YouTube logo in the top left
  const logoElements = document.querySelectorAll(
    "ytd-topbar-logo-renderer, #logo"
  );
  logoElements.forEach(logo => {
    // Check if we already modified this logo
    if (!logo.hasAttribute("data-modified")) {
      // Add a custom attribute to avoid processing it multiple times
      logo.setAttribute("data-modified", "true");

      // For the text-based logo
      const spans = logo.querySelectorAll("yt-formatted-string, span");
      spans.forEach(span => {
        if (span.textContent === "YouTube") {
          span.textContent = "JoshTube";
        }
      });

      const imgLogos = logo.querySelectorAll("img, .ytd-topbar-logo-renderer");
      if (imgLogos.length > 0) {
        // Create a new overlay div for the text logo
        const logoOverlay = document.createElement("div");
        logoOverlay.textContent = "JoshTube";
        logoOverlay.style.fontFamily = '"Comic Sans MS", "Comic Sans", cursive'; // Changed to Comic Sans
        logoOverlay.style.position = "absolute";
        logoOverlay.style.left = "0";
        logoOverlay.style.top = "0";
        logoOverlay.style.width = "100%";
        logoOverlay.style.height = "100%";
        logoOverlay.style.display = "flex";
        logoOverlay.style.alignItems = "center";
        logoOverlay.style.justifyContent = "center";
        logoOverlay.style.fontWeight = "bold";
        logoOverlay.style.fontSize = "16px";
        logoOverlay.style.color = "#ff0000";
        logoOverlay.style.zIndex = "10";

        // Add a positioning wrapper if needed
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";

        // Insert our overlay
        const parent = imgLogos[0].parentElement;
        if (parent) {
          parent.style.position = "relative";
        }
        if (parent) {
          parent.appendChild(logoOverlay);
        }

        // Hide the original logo image
        imgLogos.forEach(img => {
          (img as HTMLElement).style.opacity = "0";
        });
      }
    }
  });
}

export function observeTitleChanges() {
  // Create a specific observer just for the title to ensure it always stays changed
  const titleObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (
        mutation.type === "childList" ||
        (mutation.type === "characterData" &&
          mutation.target.nodeName === "#text" &&
          mutation.target.parentElement === document.querySelector("title"))
      ) {
        // YouTube changed the title, so we change it again
        if (document.title.includes("YouTube")) {
          document.title = document.title.replace("YouTube", "JoshTube");
        }
      }
    });
  });

  // Start observing the title element
  const titleElement = document.querySelector("title");
  if (titleElement) {
    titleObserver.observe(titleElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }
}
