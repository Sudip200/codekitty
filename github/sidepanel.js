var textar = document.getElementById('read-only-cursor-text-area');
var chat_container = document.getElementById('chat-container');
var sendBtn = document.getElementById('send-button');
var startBtn = document.getElementById('start-button');
var message = document.getElementById('message-input');
var ownerdiv = document.getElementById('owner');
var owner = '';
var repo = '';
var isRagBuilt = false;
console.log(window.location.href);
var baseUrl ='https://github.com/';
var API_URL = 'https://sudipto.eastus.cloudapp.azure.com:8080'

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    console.log(tab.url);
   chrome.tabs.sendMessage(tab.id, {message: "xxxx"}, response => {
        //chat_container.innerHTML = response.owner+response.repo;
        //owner = response.owner;
       // repo = response.repo;
        //ownerdiv.innerHTML = `Owner: ${owner} Repo: ${repo}`
    });
});
//get url from tabs update
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
       if(tab.url.includes(baseUrl)){
          //parse github url to get owner and repo
            let url = new URL(tab.url);
            let path = url.pathname.split('/');
             owner = path[1];
             repo = path[2];
             ownerdiv.innerHTML = `Owner: ${owner} Repo: ${repo}`
       }
       
    }
});

sendBtn.addEventListener('click', function(){
    if(owner === '' || repo === ''){
        alert('Please select a repo to start');
        return;
    }
   if(isRagBuilt){
    fetch(`${API_URL}/api/invoke`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "owner": owner,
          "repo": repo,
          "prompt": message.value
        })
   }).then(response => {
        return response.text();
   }).then(data => {
        let content = `<h2>${message.value}</h2><br>`
        //auto scroll chat container
         chat_container.scrollTop = chat_container.scrollHeight;
         chat_container.innerHTML = chat_container.innerHTML+content+data;
         message.value = '';

 })
   }else{
    fetch(`${API_URL}/api/getrepo?owner=${owner}&repo=${repo}`).then(response => {
        return response.text();
    }).then(data => {
         if(data ==='done'){ 
            isRagBuilt = true;
         fetch(`${API_URL}/api/invoke`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "owner": owner,
                "repo": repo,
                "prompt": message.value
              })
         }).then(response => {
              return response.text();
         }).then(data => {
              let content = `<h2>${message.value}</h2><br>`
              //auto scroll chat container
               chat_container.scrollTop = chat_container.scrollHeight;
               chat_container.innerHTML = chat_container.innerHTML+content+data;
               message.value = '';

       })
         }
    });
    }
});

