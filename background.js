const url ="https://github.com/";
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    if (changeInfo.status === 'complete' ) {
      
        console.log('Tab updated');
        console.log(changeInfo);
        console.log(tab);

       if(tab.url.includes(url)){

        //get cookie from the tab
        chrome.cookies.get({url:'https://sudipto.eastus.cloudapp.azure.com:8080/api',name:'token'}, function(cookie) {
            console.log(cookie);
           if(cookie){
            chrome.scripting.executeScript({target: {tabId: tabId}, files:["content.js"]}).then(() => {
                chrome.tabs.sendMessage(tabId, {message: "updated"}, response => {
                    console.log(response);
                });
            });
           }else{
            chrome.tabs.create({url:'auth.html'});
           }
        });
        

       
       }
    }
});