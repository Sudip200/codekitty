const url ="https://github.com/";
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    if (changeInfo.status === 'complete' ) {
      
        console.log('Tab updated');
        console.log(changeInfo);
        console.log(tab);
       if(tab.url.includes(url)){
        chrome.scripting.executeScript({target: {tabId: tabId}, files:["content.js"]}).then(() => {
            chrome.tabs.sendMessage(tabId, {message: "updated"}, response => {
                console.log(response);
            });
        });
       }
    }
});