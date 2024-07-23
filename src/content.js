import showdown from 'showdown';
var exetime = 0;
function exe(){


var filenames= document.getElementsByClassName('react-directory-truncate');
var hiclass = document.getElementsByClassName('Box-sc-g0xbh4-0 bWpuBf');
var textar = document.getElementById('read-only-cursor-text-area');
var sticyheader=document.getElementById('StickyHeader');
var newElement = document.getElementById('newElement');
var reponame= document.getElementsByClassName('Truncate-text');
var textInput = document.getElementById('message');
var closeDiv = document.getElementById('closeDiv');
var owner = document.getElementsByClassName('AppHeader-context-item-label')[0].innerText;
var docs = document.getElementsByClassName('markdown-body entry-content container-lg')
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


//button to explain the repo files
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
    //function to preprocess file text (nothing doing now)
 return files;
}
//close button action to make newElement disappear
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



//main function to send message to server
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
    let text;
    if(docs[0]){
        text = docs[0].innerText;
    }
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
                if(text){
                    
                     question = value;
                     messagePrompt = `This is the the github repo name ${reponame[0].innerText} and files ${files} and readme text ${text} answer this question based on the repo ${value}`;
                }else{
         messagePrompt = `This is the the github repo name ${reponame[0].innerText} and files ${files} answer this question based on the repo ${value}`;
         question = value;
         field = 'repo-value';
           } }else if(inwhich === 'repo-files'){
              
                if(text){
                  
                    question ='explain all this github repository files point wise';
                    messagePrompt = `This is the the github repo name ${reponame[0].innerText} and files ${files} and readme text ${text} explain these files point wise`;
               }
               else{
                messagePrompt = `This is the the github repo name '${reponame[0].innerText}' and files '${files}' explain these files point wise`;
                question ='explain all this github repository files point wise';
                field = 'repo-files';
               }
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




//convert markdown to html using showdown
function markdownToHtml(markdown){
    const converter = new showdown.Converter();
    //configure the showdown
    // add <br> tag at the end of each line
    converter.setOption('simpleLineBreaks', true);
    //adding monaco editor style in code block
    converter.setFlavor('github');
  
    return converter.makeHtml(markdown);
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
    refreshButton.style.padding = "17px";
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
//get cookie and check if user is authenticated ,get tab update
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'updated') {
        refreshButton();
        sendResponse({ message: 'done' });
    }

    if(request.message === 'cookie'){
        if(request.token === 'no'){
            isAuth = false;
        }
        else{
            isAuth = true;
        }
        sendResponse({message: 'done'});
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.message);
  if(request.message === 'xxxx'){
    console.log('xxxx');
      sendResponse({owner: owner,repo:reponame[0].innerText});
  }
});

//select code for explanation from text area
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
};
exe();





