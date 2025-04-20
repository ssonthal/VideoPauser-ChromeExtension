function pauseAllMedia() {
  document.querySelectorAll('video, audio').forEach(m => {
    if (!m.paused) {
      m.pause();
      m.dataset._pausedByExtension = 'true';
    }
  });
}

function resumeAllMedia() {
  document.querySelectorAll('video, audio').forEach(m => {
    if (m.dataset._pausedByExtension === 'true') {
      m.play();
      delete m.dataset._pausedByExtension;
    }
  });
}

function attachBlurAndFocusHandlers(autoResumeEnabled) {
  if (window._pauseOnBlurAttached) return;

  window._pauseOnBlurAttached = true;

  window.addEventListener('blur', () => {
    console.log('Window blurred → pausing');
    pauseAllMedia();
  });

  if (autoResumeEnabled) {
    window.addEventListener('focus', () => {
      console.log('Window focused → resuming');
      resumeAllMedia();
    });
  }
}

function initForSite() {
  chrome.storage.sync.get(["enabledSites", "autoResumeSites"], (result) => {
    const hostname = location.hostname;
    const enabled = result.enabledSites?.includes(hostname);
    const autoResume = result.autoResumeSites?.includes(hostname);

    if (enabled) {
      attachBlurAndFocusHandlers(autoResume);
    }
  });
}

// SPA-safe:
let lastUrl = location.href;
initForSite();
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    window._pauseOnBlurAttached = false;
    initForSite();
  }
}).observe(document, { subtree: true, childList: true });
