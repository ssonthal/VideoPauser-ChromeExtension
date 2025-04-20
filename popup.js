const enabledToggle = document.getElementById("enabledToggle");
const resumeToggle = document.getElementById("resumeToggle");
const resumeLabel = document.getElementById("resumeLabel");
const status = document.getElementById("status");

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const hostname = new URL(tabs[0].url).hostname;

  chrome.storage.sync.get(["enabledSites", "autoResumeSites"], (result) => {
    const enabledSites = result.enabledSites || [];
    const autoResumeSites = result.autoResumeSites || [];

    enabledToggle.checked = enabledSites.includes(hostname);
    resumeToggle.checked = autoResumeSites.includes(hostname);

    if (enabledToggle.checked) {
      resumeLabel.style.display = "block"; 
      resumeToggle.disabled = false;
    } else {
      resumeLabel.style.display = "none"; 
      resumeToggle.disabled = true;
    }
  });

  enabledToggle.addEventListener("change", () => {
    chrome.storage.sync.get("enabledSites", (result) => {
      let enabledSites = result.enabledSites || [];
      if (enabledToggle.checked) {
        if (!enabledSites.includes(hostname)) enabledSites.push(hostname);
      } else {
        enabledSites = enabledSites.filter(site => site !== hostname);
      }

      const userConfirmed = confirm("Changes will take effect after reloading the page. Do you want to reload now?");
      if (userConfirmed) {
        chrome.storage.sync.set({ enabledSites }, () => {
          chrome.tabs.reload();
        });
      } else {
        enabledToggle.checked = enabledSites.includes(hostname);
      }


      if (enabledToggle.checked) {
        resumeLabel.style.display = "block";
        resumeToggle.disabled = false; 
      } else {
        resumeLabel.style.display = "none";
        resumeToggle.disabled = true;
      }
    });
  });


  resumeToggle.addEventListener("change", () => {
    chrome.storage.sync.get("autoResumeSites", (result) => {
      let autoResumeSites = result.autoResumeSites || [];
      if (resumeToggle.checked) {
        if (!autoResumeSites.includes(hostname)) autoResumeSites.push(hostname);
      } else {
        autoResumeSites = autoResumeSites.filter(site => site !== hostname);
      }

      const userConfirmed = confirm("Changes will take effect after reloading the page. Do you want to reload now?");
      if (userConfirmed) {
        chrome.storage.sync.set({ autoResumeSites }, () => {
          chrome.tabs.reload();
        });
      }
    });
  });
});
