import showdown from 'showdown';
var exetime = 0;
(function exe(){


var filenames= document.getElementsByClassName('react-directory-truncate');
var hiclass = document.getElementsByClassName('Box-sc-g0xbh4-0 bWpuBf');
var textar = document.getElementById('read-only-cursor-text-area');
var sticyheader=document.getElementById('StickyHeader');
var newElement = document.getElementById('newElement');
var reponame= document.getElementsByClassName('Truncate-text');
var textInput = document.getElementById('message');
var closeDiv = document.getElementById('closeDiv');
var isAuth = false;

var files='';
var wholeText='';
var innerhtml='';
for(var i=0;i<filenames.length-1;i=i+2){
    files += filenames[i].innerText+' ';
}

var newElementWrapper = document.createElement("div");
newElementWrapper.id = "newElementWrapper";
var newElement = document.createElement("div");
var closeDiv = document.createElement("div");
var textDiv = document.createElement("div");
textDiv.id = "textDiv";
let containerDiv = document.createElement('div');
containerDiv.style.position = 'fixed';
containerDiv.style.bottom = '0px';
containerDiv.style.right = '0px';
containerDiv.style.padding = '10px';
containerDiv.style.display = 'grid';
containerDiv.style.width = '312px';
containerDiv.style.gridTemplateColumns = '1fr auto';
containerDiv.style.gridGap = '5px';
containerDiv.style.background = '#2c2c2c';
containerDiv.style.borderRadius = '10px';
containerDiv.style.border = '1px solid #ccc';
containerDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
containerDiv.style.alignItems = 'center';
containerDiv.style.fontFamily = 'Arial, sans-serif';

let inputBox = document.createElement('input');
inputBox.type = 'text';
inputBox.id = 'message';
inputBox.placeholder = 'Type your message...';
inputBox.style.padding = '10px';
inputBox.style.fontSize = '16px';
inputBox.style.border = '1px solid #ccc';
inputBox.style.borderRadius = '5px';
inputBox.style.outline = 'none';

//Button

var sendButton = document.createElement("button");
sendButton.id = "sendButton";
sendButton.onclick = function() {
    let messageElement = document.getElementById('message');
    let value = messageElement.value;
    if(value.length>0){
    sendMessage2('code-value');
    }else{
        console.log('Empty message');
    }
};
sendButton.style.padding = "10px";
sendButton.style.fontSize = "16px";
sendButton.style.backgroundColor = "#0b6521";
sendButton.style.color = "white";
sendButton.style.border = "none";
sendButton.style.borderRadius = "5px";
sendButton.style.cursor = "pointer";
sendButton.style.transition = "background-color 0.3s";
sendButton.onmouseover = function() {
    this.style.backgroundColor = "#0056b3";
};
sendButton.onmouseout = function() {
    this.style.backgroundColor = "#007bff";
};
sendButton.innerText = "Send";

containerDiv.appendChild(inputBox);
containerDiv.appendChild(sendButton);
textDiv.appendChild(containerDiv);











newElementWrapper.appendChild(newElement);
newElementWrapper.appendChild(textDiv);
//document.body.appendChild(newElementWrapper);
//document.body.appendChild(closeDiv);
newElementWrapper.style.display = "none";

var newElementWrapperID = document.getElementById('newElementWrapper');
if(!newElementWrapperID){
    document.body.appendChild(newElementWrapper);
}






var closeAction = document.createElement("button");
//set it at right
newElement.style.position = "fixed";
newElement.style.display = "block";
newElement.style.right = "0";
newElement.style.top = "0";
newElement.id = "newElement";
newElement.style.width = "315px";
newElement.style.backgroundColor = "rgb(13, 17, 23)";
newElement.style.color = "white";
newElement.style.overflow = "auto";
//newElement.style.resize = "horizontal";
//newElement.style.cursor = "ew-resize";
newElement.style.height = "100%";
newElement.style.paddingLeft = "20px";
newElement.style.fontFamily = "monospace";
newElement.style.paddingBottom ="100px";
newElement.style.borderLeft = "0.7px solid white";

//close button

closeDiv.style.position = "fixed";

closeDiv.style.top = "50%";
closeDiv.style.transform = "translateY(-50%)";
closeAction.innerHTML = "Open";
closeDiv.id = "closeDiv";
closeAction.style.backgroundColor = "rgb(13, 17, 23)";
closeAction.style.color = "white";

closeAction.style.borderRadius = "50% 0 0 50%";

closeAction.style.padding = "3px 20px";
closeAction.style.textAlign = "center";
closeAction.style.textDecoration = "none";
closeAction.style.display = "inline-block";
closeAction.style.fontSize = "16px";
//adding image icon in close button


closeAction.style.cursor = "pointer";
closeAction.onclick = makeNewElementDisappear;
//check if body contains closeDiv
var closeDivid = document.getElementById('closeDiv');
if(!closeDivid && (textar || files.length>0)){
   
    document.body.appendChild(closeDiv);
    closeDiv.style.right = "0px";
}
closeDiv.style.right = "0px";
closeDiv.appendChild(closeAction);



function beginButton(){
   
    const button = document.createElement('button');
    button.innerHTML = 'Explain';
    button.id = 'explainButton';
   //github green button color
    button.style.backgroundColor = "#238636";
    button.style.color = "white";
    button.style.borderRadius = "6px";
    button.style.height='35px';
    button.style.border = "none";
    button.style.padding = "3px 20px";
    button.style.textAlign = "center";
    button.style.textDecoration = "none";
    button.style.display = "inline-block";
    button.style.fontSize = "16px";
    

    if(textar){
      console.log('textar found');
    
    }else{
        button.onclick = function(){
            sendMessage2('repo-files')
        }
      if(hiclass[0]){
        hiclass[0].appendChild(button);
      }else if(sticyheader){
        sticyheader.appendChild(button);
      }else{
        console.log('No button found');
      }
    
    }

}
function preprocessFileText(files){
 return files;
}
function makeNewElementDisappear(){
   //check if newElementWrapper is there in body
   let newElementWrapperid = document.getElementById('newElementWrapper');
    if(!newElementWrapperid){
        document.body.appendChild(newElementWrapper);
    }

   (newElementWrapper.style.display === "none" && closeDiv.style.right=="0px")?(newElementWrapper.style.display = "block",
     closeAction.innerHTML = "Close",
        closeDiv.style.right = "312px"

    ):(newElementWrapper.style.display = "none",
    closeAction.innerHTML = "Open",
    closeDiv.style.right = "0px"
    
    );
   // closeDiv.style.right === "312px"?closeDiv.style.right = "0":closeDiv.style.right = "312px";
}

function makeApiCall(){
    if(isAuth===false){
        chrome.runtime.sendMessage({message: 'auth'});
        return;
    }
    //disable the button
    const btnexplain = document.getElementById('explainButton');
    btnexplain.disabled = true;
    explainCodes().then(() => {
        seeIfelementValue();
        document.body.appendChild(newElementWrapper);
        newElementWrapper.style.display = "block";
       // document.body.appendChild(closeDiv);
        closeDiv.style.right = "312px";
        closeDiv.appendChild(closeAction);
    });
}
function makeApiCallWholeText(){
    if(isAuth===false){
        chrome.runtime.sendMessage({message: 'auth'});
        return;
    }
    const btnexplain = document.getElementById('explainButton');
    btnexplain.disabled = true;
    explainWholeText().then(() => {
       
        seeIfelementValue();
        document.body.appendChild(newElementWrapper);
        newElementWrapper.style.display = "block";
       // document.body.appendChild(closeDiv);
        closeDiv.style.right = "312px";
        closeDiv.appendChild(closeAction);
    });
}

function seeIfelementValue(){
    setInterval(()=>{
        if(newElement.innerText.length==0){
            newElement.innerText = "Please wait...";
        }else{
            clearInterval();
        }
    },1000);

}





 //document.getElementById('sendButton').onclick=sendMessage;

 function sendMessage(){
    if(isAuth===false){
        chrome.runtime.sendMessage({message: 'auth'});
        return;
    }
    let message = document.getElementById('message')
    let value = message.value;
    message.value = '';
    let previousText = newElement.innerHTML;
    if(previousText.includes('Please wait...')){
        previousText.replace('Please wait...','')
    }
    const evSource = new EventSource(`https://sudipto.eastus.cloudapp.azure.com:8080/api/generate?prompt=${value}&model=gemma:2b`);
    evSource.onopen = function (event) {
          console.log('Connection opened');
          newElement.innerHTML = "Please wait....";
      };
      evSource.onmessage = function (event) {
        if(event.data === "sdjnjsdnsdka"){
            evSource.close();
            return
        }
        let msg = event.data;
         wholeText += msg;
       
         let promptAndres = `### ${value} \n\n ${wholeText}`;
         
         const nested = markdownToHtml(promptAndres);
         newElement.innerHTML = previousText + '<br>' + nested;
        
      };

      evSource.onerror = function (event) {
          console.error('EventSource failed:', event);
          newElement.innerHTML = newElement.innerHTML + "Something went wrong. This may be due to large text or network issue or our server is in maintenance. Please try again.";
          evSource.close();
      };

}
async function sendMessage2(inwhich) {
    if (isAuth === false) {
        chrome.runtime.sendMessage({ message: 'auth' });
        return;
    }
   //check if newElementWrapper is there in body
   let newElementWrapperid = document.getElementById('newElementWrapper');
   let closeDiv = document.getElementById('closeDiv');
    if(!newElementWrapperid){
        document.body.appendChild(newElementWrapper);
    }
    if(newElementWrapperid.style.display === "none"){
        newElementWrapperid.style.display = "block";
    }
    if(!closeDiv){
        document.body.appendChild(closeDiv); 
    }
    if(closeDiv.style.right === "0px"){
        closeDiv.style.right = "312px";
    }
    let messagePrompt = ''
    let selectedText = '';
    let question = '';
    let field = '';
    let messageElement = document.getElementById('message');
    let newElement = document.getElementById('newElement');
    let value = messageElement.value;
    messageElement.value = '';
    let previousText = newElement.innerHTML;
    
    if (previousText.includes('Please wait...')) {
        previousText = previousText.replace('Please wait...', '');
    }

    newElement.innerHTML = "Please wait....";
    if(textar){
       selectedText = window.getSelection().toString();
       if(inwhich === 'code-selected' && selectedText.length>0){
           messagePrompt = `This is the whole code ${textar.value} answer this question based on the code explain this code ${selectedText}`;
           field = 'code-selected';
           question = `explain this code ${selectedText}`;
           let selectbtn = document.getElementById('selectedText');
           selectbtn.remove();
       }else if(inwhich === 'code-value' && value.length>0){
           question = value;
           messagePrompt = `This is the whole code ${textar.value} answer this question based on the code ${value}`;
           field = 'code-value';
       }
    }else{
        if(files.length>0){
            if(inwhich === 'code-value' && value.length>0){
         messagePrompt = `This is the the github repo name ${reponame[0].innerText} and files ${files} answer this question based on the repo ${value}`;
         question = value;
         field = 'repo-value';
            }else if(inwhich === 'repo-files'){
                messagePrompt = `This is the the github repo name '${reponame[0].innerText}' and files '${files}' explain these files point wise`;
                question ='explain all this github repository files point wise';
                field = 'repo-files';
            }
        }
    }

    try {
        
        const response = await fetch(`https://sudipto.eastus.cloudapp.azure.com:8080/api/generate`,{
            method: 'POST',
            //sending cookie
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: messagePrompt}),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let wholeText = '';

        while (true) {
            const { done, value: chunk } = await reader.read();
            if (done) break;

            const msg = decoder.decode(chunk, { stream: true });

            if (msg === "sdjnjsdnsdka") {
                msg='';
                console.log('Connection closed by server');
                break;
            }

            let processedMsg = msg;
            if (msg === "sdxlp") {
                console.log('New line');
                processedMsg = '\n';
            }

            wholeText += processedMsg;
            

            let promptAndRes = `### ${question} \n\n ${wholeText}`;
            const nested = markdownToHtml(promptAndRes);
            newElement.innerHTML = previousText + '<br>' + nested;
            //auto scroll to bottom
            newElement.scrollTop = newElement.scrollHeight;

        }
    } catch (error) {
        console.error('Fetch error:', error);
        newElement.innerHTML += "Something went wrong. This may be due to large text or network issues, or our server is in maintenance. Please try again.";
    }
}



 async function explainWholeText(){
    const evSource = new EventSource(`https://sudipto.eastus.cloudapp.azure.com:8080/api/generate?prompt=explain this code ${textar.value}&model=gemma:2b`);
    evSource.onopen = function (event) {
          console.log('Connection opened');
          if(textar.value.length>2000){
            newElement.innerText = "Please wait.This file is too large, may take some time...";
          }else{
            newElement.innerText = "Please wait...";
          }
         
      };
      evSource.onmessage = function (event) {
        if(event.data === "sdjnjsdnsdka"){
            evSource.close();
            const btnexplain = document.getElementById('explainButton');
            btnexplain.disabled = false;
            return;
        }
        
         wholeText+=event.data;
        const nested =markdownToHtml(wholeText);
         newElement.innerHTML = nested;
       
      };

      evSource.onerror = function (event) {
          console.error('EventSource failed:', event);
          const btnexplain = document.getElementById('explainButton');
         btnexplain.disabled = false;
          newElement.innerText = newElement.innerText + "Something went wrong. This may be due to large text or network issue or our server is in maintenance. Please try again";
          evSource.close();
      };

 }


  async function explainCodes(){
    const evSource = new EventSource(`https://sudipto.eastus.cloudapp.azure.com:8080/api/generate?prompt=explain all this github repository files point wise  with repository name ${reponame[0].innerText} and file names ${preprocessFileText(files)}&model=gemma:2b`);
    evSource.onopen = function (event) {
          console.log('Connection opened');
          newElement.innerHTML = "Please wait...";
      };
      evSource.onmessage = function (event) {
        if(event.data === "sdjnjsdnsdka"){
            //enable the button
            const btnexplain = document.getElementById('explainButton');
            btnexplain.disabled = false;
            evSource.close();

            return
        }
        
         wholeText+=event.data;
         let first = `#${reponame[0].innerText} \n\n ${wholeText}`;
        const nested =markdownToHtml(first);
         newElement.innerHTML = newElement.innerHTML + nested;
        
      };

      evSource.onerror = function (event) {
          console.error('EventSource failed:', event);
          newElement.innerHTML = newElement.innerHTML + `\n\n` + "Something went wrong. This may be due to large text or network issue or our server is in maintenance. Please try again";
          const btnexplain = document.getElementById('explainButton');
            btnexplain.disabled = false;
          evSource.close();
      };

}
function markdownToHtml(markdown){
    const converter = new showdown.Converter();
    //configure the showdown
    // add <br> tag at the end of each line
    converter.setOption('simpleLineBreaks', true);
    //adding monaco editor style in code block
    converter.setFlavor('github');
    

  
    return converter.makeHtml(markdown);
}
function upgradeHtml(fullStr){
    //starts with ** and ends with **
   
    const regex = /\*\*(.*?)\*\*/g;
    //regex if starts with * and ends with .
    const regex2 = /\*(.*?)\./g;
    const codeRegex = /```(.*?)```/g;
    if(fullStr.match(regex)){
        const matches = fullStr.match(regex);
        for(let i=0;i<matches.length;i++){
            const str = matches[i].replace(/\*\*/g,'');
            fullStr = fullStr.replace(matches[i],`<h3>${str}</h3>`);
        }
        //check if new line is there
    }
    //if matchs new line
    if(fullStr.match(/\n/g)){
        fullStr = fullStr.replace(/\n/g,'<br>');
    }
    if(fullStr.match(regex2)){
        const matches = fullStr.match(regex2);
        for(let i=0;i<matches.length;i++){
            const str = matches[i].replace('*','');
            fullStr = fullStr.replace(matches[i],`<p style="color:#c4c4c4;">${str}</p>`);
        }
    }
    if(fullStr.match(codeRegex)){
        const matches = fullStr.match(codeRegex);
        for(let i=0;i<matches.length;i++){
            const str = matches[i].replace(/```/g,'');
            fullStr = fullStr.replace(matches[i],`<code style="padding: 3px;border: 1px solid white;">${str}</code>`);
        }
    }
    return fullStr;
}


//check if button is already there
if(hiclass[0]) {
    if(hiclass[0].innerText.includes('Explain')){
       
    }else{
        beginButton();
    
    }
}else if(sticyheader){
    if(sticyheader.innerText.includes('Explain')){
       
    }else{
        beginButton();
    }
}
 async function removeElements(){
    const newElement = document.getElementById('newElement');
    //const closeDiv = document.getElementById('closeDiv');
    const newElementWrapper = document.getElementById('newElementWrapper');
    const selectbtn = document.getElementById('selectedText');
    const textDiv = document.getElementById('textDiv');
    if(newElementWrapper){
        newElementWrapper.remove();
    }
 
  if(selectbtn){
      selectbtn.remove();
  }
  if(closeDiv){
      closeDiv.remove();
  }
 
}
function refreshButton(){
    //add refresh button in newElementWrapper
    const refreshButton = document.createElement('button');
    refreshButton.innerHTML = 'Click to Refresh Page to get updated content';
    refreshButton.id = 'refreshButton';
    refreshButton.style.border = "1px solid white";
    refreshButton.style.padding = "10px";
    refreshButton.style.color = "white";
    refreshButton.style.borderRadius = "6px";
    refreshButton.style.height='35px';
    refreshButton.onclick = function(){
        location.reload();
    };
    refreshButton.style.border = "none";
    refreshButton.style.padding = "3px 20px";
    refreshButton.style.textAlign = "center";
  //check if refresh button is already there
  let refreshButtonId = document.getElementById('refreshButton');
    if(!refreshButtonId){
        newElement.appendChild(refreshButton);
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'updated') {
        removeElements();
        //exe only once
        exe();
        
    }

    if(request.message === 'cookie'){
        if(request.token === 'no'){
            isAuth = false;
        }
        else{
            isAuth = true;
        }
    }




    sendResponse({message: 'done'});
});

if(textar){
textar.addEventListener('mouseup',(event)=>{
    //first remove the div if already there
    const selectedTextDiv = document.getElementById('selectedText');
    if(selectedTextDiv){
        selectedTextDiv.remove();
    }
    //get pixel position 
   
    //create a div with position absolute and set the position to the above pixel position
    const div = document.createElement('button');
    div.style.position = "absolute";
    div.style.left = `${event.pageX}px`;
    div.style.top = `${event.pageY}px`;
    div.style.padding = "5px";
    div.style.backgroundColor = "green";
    div.id = "selectedText";
    div.style.color = "white";
    div.style.border = "none";
    div.onclick = function (){
        sendMessage2('code-selected')
    };
    div.innerHTML = "Explain";
    
    //only append if selected text is there
    if(window.getSelection().toString().length>0){
        document.body.appendChild(div);
    }
});
}

function makeApiCallOnSelected(){
    if(isAuth===false){
        chrome.runtime.sendMessage({message: 'auth'});
        return;
    }
    const selectbtn= document.getElementById('selectedText');
    selectbtn.remove();
   
    sendMessage2().then(() => {
        //check if already appended
        seeIfelementValue();
        const newElementWrapper = document.getElementById('newElementWrapper');
       if(newElementWrapper.style.display === "none"){
        newElementWrapper.style.display = "block";
        }

        if(closeDiv.style.right === "0px" && newElementWrapper.style.display === "block"){

        
        closeDiv.style.right = "312px";
        }
        closeDiv.appendChild(closeAction);
      
    });
}
async function explainSelectedText(){
    const selectedText = window.getSelection().toString();
    const evSource = new EventSource(`https://sudipto.eastus.cloudapp.azure.com:8080/api/generate?prompt=explain this code ${selectedText}&model=gemma:2b`, {
        withCredentials: true
    });
    evSource.onopen = function (event) {
          console.log('Connection opened');
          newElement.innerHTML = "Please wait....";
      };
      evSource.onmessage = function (event) {
        if(event.data === "sdjnjsdnsdka"){
            evSource.close();
            return
        }
        
         wholeText+=event.data;
        const nested =markdownToHtml(wholeText);
         newElement.innerHTML = nested;
        
      };

      evSource.onerror = function (event) {
          console.error('EventSource failed:', event);
          newElement.innerHTML = newElement.innerHTML + "Something went wrong. This may be due to large text or network issue or our server is in maintenance. Please try again.";
          evSource.close();
      };
}



})();





