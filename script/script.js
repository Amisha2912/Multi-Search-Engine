const sideBar=document.querySelector(".side-bar");
const sideBarToggle=document.querySelector('.fa-bars');
const topContentUL=document.querySelector('.topContent ul');
const inputArea=document.querySelector(".userInput input");
const sendRequest=document.querySelector(".fa-paper-plane");
const mic =document.querySelector(".fa-microphone");
const chatHistory=document.querySelector(".chatHistory ul");
const topContent=document.querySelector('.topContent');
const chatContent=document.querySelector('.chatContent');
const result=document.querySelector('.results');
const newChat=document.querySelector(".newChat");
const theme=document.querySelector("#theme");


theme.addEventListener("click",()=>{
    document.body.classList.toggle("activeDark");
})

const promptQuestions =[
    {
        question:"write a thankyou note to you friend",
        icon:"fa-solid fa-wand-magic",
    },
    {
        question:"write a code in javascript",
        icon:"fa-solid fa-code",
    },
    {
        question:"how to become Full-stack Developer",
        icon:"fa-solid fa-laptop-code",
    },
    {
        question:"How to start coding journey?",
        icon:"fa-solid fa-database",
    },
];

window.addEventListener("load",()=>{
    promptQuestions.forEach((data)=>{
       
        let item =document.createElement('li');
        item.classList.add("li");

        item.addEventListener("click",()=>{
            getGeminiResponse(data.question,true);
        })
        item.innerHTML=`<div class="promptSuggestion">
        <p>${data.question}</p>
        <div class="icon"><i class="${data.icon}"></i></div>
        </div>`;
        topContentUL.appendChild(item);
    })
});


//----for voice input----
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Your browser does not support Speech Recognition.");
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    mic.addEventListener("click", () => {
        recognition.lang = "en-US"; // Change this if you want multiple languages
        recognition.start();
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        inputArea.value = transcript; // Show recognized text
        sendRequest.style.display ="inline";
    };

    recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
    };

}


//----sidebar-toggling------
sideBarToggle.addEventListener('click',()=>{
    // console.log("clicked");
    sideBar.classList.toggle('expandClose');
});


//----input for search------
inputArea.addEventListener("keyup",(e)=>{
    // console.log(e.target.value);
    if(e.target.value.length > 0){
        sendRequest.style.display ="inline";
    }
    else{
        sendRequest.style.display ="none";
    }
});



sendRequest.addEventListener("click",()=>{
    // getGoogleResponse(inputArea.value);
    getGeminiResponse(inputArea.value,true);

});

function getGeminiResponse(question,appendHistory){
    //console.log(question);
    if(appendHistory){
        let historyList=document.createElement('li');
        historyList.addEventListener("click",()=>{
        getGeminiResponse(question,false);
        })
        historyList.innerHTML =`<i class="fa-regular fa-message"></i>${question}`;
        chatHistory.appendChild(historyList);
    }
    

    result.innerHTML="";
    // inputArea.value="";

    topContent.style.display="none";
    chatContent.style.display="block";

    let resultHeading=`
    <div class=resultHeading>
    <img src="/asset/user.png">
    <p>${question}</p>`;


    //below instead of adding icon ,add images
    let resultData=`
    <div class="resultData">
      <img src="/asset/gemini.png"> 
      <div class="loader">
       <div class="animatedBG"></div>
       <div class="animatedBG"></div>
       <div class="animatedBG"></div>
      </div>
    </div`;

    result.innerHTML+=resultHeading;
    result.innerHTML+=resultData;

    const apiURL=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDV9w_cM7IG5soGbCgPNtiGmyHVPSPL5oQ`;

    fetch(apiURL,{
        method:"POST",
        body:JSON.stringify({
            "contents": [{
               "parts":[{"text": question}]
            }],
        }),
    }).then((response)=>response.json()).then((data)=>{
        // console.log(data.candidates[0].content.parts[0].text);

        document.querySelector(".results .resultData").remove();

        let responseData=jsonEscape(data.candidates[0].content.parts[0].text);

        let responseArray = responseData.split("**");
        let newResponse="";

        for(let i=0;i<responseArray.length;i++){
            if(i==0 || i%2!==1){
                newResponse+=responseArray[i];
            }else{
                newResponse+="<strong>"+responseArray[i].split(" ").join("&nbsp")+"</strong>";
            }
        }

        let newResponse2= newResponse.split("*").join(" ");

        let textArea =document.createElement("textarea");
        textArea.innerHTML=newResponse2;
        result.innerHTML+=`
        <div class="resultResponse">
        <img src="/asset/gemini.png"> 
        <p id="typeEffect"></p>
        </div> 
        `;

        let newResponseData =newResponse2.split(" ");
        for(let j=0;j< newResponseData.length;j++){
            timeout(j,newResponseData[j]+" ");
        }
        // result.innerHTML=data.candidates[0].content.parts[0].text;
    });
};


//-----creating typing effect coming one-by-one with some interval
const timeout = (index,nextWord)=>{
    setTimeout(function(){
        document.getElementById("typeEffect").innerHTML +=nextWord;
    },75*index);
}



//----new chat----
newChat.addEventListener("click",()=>{
    topContent.style.display ="block";
    chatContent.style.display="none";
    sendRequest.style.display ="none";
    inputArea.value="";
    imgResults.innerHTML="";
    googleResults.innerHTML="";
    wikiResults.innerHTML = "";
});

function jsonEscape(str){
    return str.replace(new RegExp("\r?\n\n","g"),"<br>")
    .replace(new RegExp("\r?\n","g"),"<br>");
}


