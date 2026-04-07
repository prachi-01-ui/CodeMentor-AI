chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "explainError",
    title: "Explain with CodeMentor AI",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "explainError") {
    chrome.storage.local.set({ selectedText: info.selectionText });
    chrome.action.openPopup();
  }
});
