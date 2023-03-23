let currentTab;
const portsArr = [];

class Tab {
  constructor(tabTitle, tabId) {
    this.tabTitle = tabTitle;
    this.tabId = tabId;
  }
}

const handleMessageFromContentScript = (request, sender, sendResponse) => { 
  console.log('background.js received message:', request.message);

  const tabTitle = sender.tab.title;
  const tabId = sender.tab.id;
  setTab(tabTitle, tabId);
}

const sendMessageToContentScript = msg => {
  if (tab === undefined) {
    console.log('background.js: no tab to send message to');
    return;
  }
  console.log('background.js sending message to content.js:', msg);
  chrome.tabs.sendMessage(tab.tabId, msg);
}

/**
 * Sets or updates the activeTab object
 * @param tabTitle - The title of the current tab
 * @param tabId - The id of the current tab
 */
const setTab = (tabTitle, tabId) => {
  if (currentTab !== undefined) {
    console.log('background.js: Existing tab data being overwritten: tabTitle=', currentTab.tabTitle, 'tabId=', currentTab.tabId);
  }
  console.log('background.js: new tab data, tabTitle=', tabTitle, 'tabId=', tabId);
  currentTab = new Tab(tabTitle, tabId);
}

/**
 * Establish connection with dev tool
 */
chrome.runtime.onConnect.addListener(port => {
  // Add the port to our ports array
  // TODO: Not sure if we even need a ports array - we need
  // to decide how we're going to handle multiple tabs with Reaper
  portsArr.push(port);

  // Attach an event listener to each port for messages from the dev tool
  port.onMessage.addListener(onMessageFromDevTool);

  // Send a test message
  // sendMessageToDevTool('hello from background.js!');
});

/**
Set up listener for messages from content script
*/
chrome.runtime.onMessage.addListener(handleMessageFromContentScript); 
