let color = '#3aa757';

/**
 * sample popup에서 쓰는 color storage에 저장
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: renderBody
    });
  }
})

function renderBody() {
  const targets = document.querySelectorAll('h6.level');
  const topBar = document.querySelector('.breadcrumb');

  if (!!targets) {
    targets.forEach((target) => {
      target.style.display = 'none';
    })
  }
  if (!!topBar) {
    topBar.childNodes[1].style.display = 'none';
  }
}