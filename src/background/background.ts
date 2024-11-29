console.log("Hello world from bakground script");

chrome.runtime.onInstalled.addListener(() => {
  // Inject content.js into all currently open tabs
  chrome.tabs.query({ url: ["http://*/*", "https://*/*"] }, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        injectContentScript(tab.id);
      }
    });
  });
});

// Function to inject content script
async function injectContentScript(tabId: number) {
  try {
    // Check if content script is already injected
    const [result] = await chrome.scripting.executeScript({
      target: { tabId },
      // @ts-ignore
      func: () => !!window.__CONTENT_SCRIPT_INJECTED__,
    });

    if (!result.result) {
      // Inject content script if not already injected
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ["content.js"],
      });

      console.log(`Content script injected into tab ${tabId}`);
    } else {
      console.log(`Content script already present in tab ${tabId}`);
    }
  } catch (error) {
    console.error(`Failed to inject content script into tab ${tabId}:`, error);
  }
}
