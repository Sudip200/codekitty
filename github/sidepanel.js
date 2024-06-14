var textar = document.getElementById('read-only-cursor-text-area');
var chat_container = document.getElementById('chat-container');
console.log(textar);
var baseUrl ='https://github.com/';
//on tab update get url
chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' ) {
        console.log('Tab updated');
        if(tab.url.includes(baseUrl)){
            var url = tab.url;
            var data = await fetchUrl(url);
           chat_container.innerText = data;
        }
        
    }});


async function fetchUrl(url){
    const response = await fetch(url);
    const html = await response.text();
    //parse html and get textarea with id read-only-cursor-text-area
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");
    var textarea = doc.getElementById('read-only-cursor-text-area');
    var data = textarea.innerText;
    return data;
}