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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    if (changeInfo.status === 'complete' ) {
      
        console.log('Tab updated');
        console.log(changeInfo);
        console.log(tab);

       if(tab.url.includes(url)){

        //get cookie from the tab
        chrome.cookies.get({url:'https://sudipto.eastus.cloudapp.azure.com:8080/api/',name:'token'}, function(cookie) {
            console.log(cookie);
          
            chrome.scripting.executeScript({target: {tabId: tabId}, files:["dist/bundle.js"]}).then(() => {
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
            });
          
        });
        

       
       }
    }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
     if(request.message === "auth"){
        chrome.tabs.create({url:'auth.html'});
     }
    });
