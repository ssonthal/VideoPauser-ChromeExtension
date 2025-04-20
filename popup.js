const enabledToggle = document.getElementById("enabledToggle");
const resumeToggle = document.getElementById("resumeToggle");
const resumeLabel = document.getElementById("resumeLabel"); // Assuming you have an ID for the label
const status = document.getElementById("status");

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const hostname = new URL(tabs[0].url).hostname;

  chrome.storage.sync.get(["enabledSites", "autoResumeSites"], (result) => {
    const enabledSites = result.enabledSites || [];
    const autoResumeSites = result.autoResumeSites || [];

    // Set the checkbox states based on stored data
    enabledToggle.checked = enabledSites.includes(hostname);
    resumeToggle.checked = autoResumeSites.includes(hostname);

    // Show or hide auto-resume checkbox based on pausing feature state
    if (enabledToggle.checked) {
      resumeLabel.style.display = "block"; // Show the label for auto-resume
      resumeToggle.disabled = false; // Enable auto-resume checkbox
    } else {
      resumeLabel.style.display = "none"; // Hide the label for auto-resume
      resumeToggle.disabled = true; // Disable auto-resume checkbox
    }
  });

  // Event listener for enabling/disabling pausing
  enabledToggle.addEventListener("change", () => {
    chrome.storage.sync.get("enabledSites", (result) => {
      let enabledSites = result.enabledSites || [];
      if (enabledToggle.checked) {
        if (!enabledSites.includes(hostname)) enabledSites.push(hostname);
      } else {
        enabledSites = enabledSites.filter(site => site !== hostname);
      }

      // Prompt the user to reload for changes to take effect
      const userConfirmed = confirm("Changes will take effect after reloading the page. Do you want to reload now?");
      if (userConfirmed) {
        // Save the updated enabledSites and reload the current tab
        chrome.storage.sync.set({ enabledSites }, () => {
          chrome.tabs.reload();
        });
      } else {
        // If not confirmed, reset the checkbox back to its original state
        enabledToggle.checked = enabledSites.includes(hostname);
      }

      // Show or hide auto-resume checkbox based on pausing state
      if (enabledToggle.checked) {
        resumeLabel.style.display = "block"; // Show the label for auto-resume
        resumeToggle.disabled = false; // Enable auto-resume checkbox
      } else {
        resumeLabel.style.display = "none"; // Hide the label for auto-resume
        resumeToggle.disabled = true; // Disable auto-resume checkbox
      }
    });
  });

  // Event listener for auto-resume toggle
  resumeToggle.addEventListener("change", () => {
    chrome.storage.sync.get("autoResumeSites", (result) => {
      let autoResumeSites = result.autoResumeSites || [];
      if (resumeToggle.checked) {
        if (!autoResumeSites.includes(hostname)) autoResumeSites.push(hostname);
      } else {
        autoResumeSites = autoResumeSites.filter(site => site !== hostname);
      }

      // Prompt the user to reload for changes to take effect
      const userConfirmed = confirm("Changes will take effect after reloading the page. Do you want to reload now?");
      if (userConfirmed) {
        // Save the updated autoResumeSites and reload the current tab
        chrome.storage.sync.set({ autoResumeSites }, () => {
          chrome.tabs.reload();
        });
      }
    });
  });
});
