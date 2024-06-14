const url ="https://github.com/";

//get cookies on install
chrome.runtime.onInstalled.addListener(function() {
    chrome.cookies.get({url:'https://sudipto.eastus.cloudapp.azure.com:8080/api/',name:'token'}, function(cookie) {
        if(cookie){
            console.log(cookie);
        }else{
            chrome.tabs.create({url:'auth.html'});
        }
    });
});
function sendMessage(tabId, cookie){
    chrome.tabs.sendMessage(tabId, {message: "updated"}, response => {
        console.log(response);
    });
    if(cookie){
        chrome.tabs.sendMessage(tabId, {message: "cookie", token: cookie.value}, response => {
            console.log(response);
        });
    }else{
        chrome.tabs.sendMessage(tabId, {message: "cookie", token: 'no'}, response => {
            console.log(response);
        });
    }
}
chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
      
    if (changeInfo.status === 'complete' ) {
      
        console.log('Tab updated');
        console.log(changeInfo);
        console.log(tab);

       if(tab.url.includes(url)){

        //get cookie from the tab
        chrome.sidePanel.setOptions({
            tabId,
            path: 'sidepanel.html',
            enabled: true
          });
      await  chrome.cookies.get({url:'https://sudipto.eastus.cloudapp.azure.com:8080/api/',name:'token'}, function(cookie) {
            console.log(cookie);
            sendMessage(tabId, cookie);
          
        });
        //send the url sidepanel 
        chrome.tabs.sendMessage(tabId, {message: "url", url: tab.url}, response => {
            console.log(response);
        });
       }else{
        chrome.sidePanel.setOptions({
            tabId,
            enabled: false
          });
       
       }
    }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
     if(request.message === "auth"){
        chrome.tabs.create({url:'auth.html'});
     }
    });
    chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
    
