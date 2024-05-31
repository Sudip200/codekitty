(function exe(){
var filenames= document.getElementsByClassName('Link--primary');
var hiclass = document.getElementsByClassName('Box-sc-g0xbh4-0 bWpuBf');
var textar = document.getElementById('read-only-cursor-text-area');
var sticyheader=document.getElementById('StickyHeader');
var newElement = document.getElementById('newElement');
var closeDiv = document.getElementById('closeDiv');
var isAuth = false;

var files='';
var wholeText='';
var innerhtml='';
for(var i=0;i<filenames.length-1;i++){
    files += filenames[i].innerText+' ';
}

var newElement = document.createElement("div");
var closeDiv = document.createElement("div");
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

newElement.style.borderLeft = "0.7px solid white";

//close button

closeDiv.style.position = "fixed";

closeDiv.style.top = "50%";
closeDiv.style.transform = "translateY(-50%)";
closeAction.innerHTML = "Close";
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
    
    if(!sticyheader){
    button.onclick = makeApiCall;
    hiclass[0].appendChild(button);
    }else{
        if(textar){
        button.onclick = makeApiCallWholeText;
       sticyheader.appendChild(button);
        }
    
    }

}
function preprocessFileText(files){
 //replace space with ,
 return files;
}
function makeNewElementDisappear(){
    newElement.style.display === "none"?(newElement.style.display = "block",
     closeAction.innerHTML = "Close",
        closeDiv.style.right = "312px"

    ):(newElement.style.display = "none",
    closeAction.innerHTML = "Open",
    closeDiv.style.right = "0"
    
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
        document.body.style.display = "flex";
        document.body.appendChild(newElement);
        document.body.appendChild(closeDiv);
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
        document.body.style.display = "flex";
        seeIfelementValue();
        document.body.appendChild(newElement);
        document.body.appendChild(closeDiv);
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
        const nested =upgradeHtml(wholeText);
         newElement.innerHTML = nested;
       
      };

      evSource.onerror = function (event) {
          console.error('EventSource failed:', event);
          newElement.innerText = newElement.innerText + "Something went wrong. This may be due to large text or network issue or our server is in maintenance. Please try again";
          evSource.close();
      };

 }


  async function explainCodes(){
    const evSource = new EventSource(`https://sudipto.eastus.cloudapp.azure.com:8080/api/generate?prompt=explain all this github repo files ${preprocessFileText(files)}&model=gemma:2b`);
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
        const nested =upgradeHtml(wholeText);
         newElement.innerHTML = nested;
        
      };

      evSource.onerror = function (event) {
          console.error('EventSource failed:', event);
          newElement.innerHTML = newElement.innerHTML + "Something went wrong. This may be due to large text or network issue or our server is in maintenance. Please try again";
          evSource.close();
      };

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
            fullStr = fullStr.replace(matches[i],`<code>${str}</code>`);
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'updated') {
        const newElement = document.getElementById('newElement');
       const closeDiv = document.getElementById('closeDiv');
     if(newElement && closeDiv){
              newElement.remove();
              closeDiv.remove();
    
       }
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
    div.onclick = makeApiCallOnSelected;
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
    explainSelectedText().then(() => {
        document.body.style.display = "flex";
        //check if already appended
        seeIfelementValue();
       if(newElement.style.display === "none"){
        newElement.style.display = "block";
         }
        document.body.appendChild(newElement);
        document.body.appendChild(closeDiv);
        closeDiv.style.right = "312px";
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
        const nested =upgradeHtml(wholeText);
         newElement.innerHTML = nested;
        
      };

      evSource.onerror = function (event) {
          console.error('EventSource failed:', event);
          newElement.innerHTML = newElement.innerHTML + "Something went wrong. This may be due to large text or network issue or our server is in maintenance. Please try again.";
          evSource.close();
      };
}



})();





