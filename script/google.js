//---for google  search-----

const googleBtn=document.querySelector(".google");
const wikiBtn=document.querySelector(".wikipedia");
const imagesBtn=document.querySelector(".images");

const gHead=document.querySelector(".g-head");
const wHead=document.querySelector(".h-tag");
const iHead=document.querySelector(".i-head");

const googleResults=document.querySelector('#googleSearch');
const wikiResults=document.querySelector('#wikiSearch');
const imgResults=document.querySelector('#imageSearch');
const showGoogleResult=document.querySelector(".googleResultList");
const span1=document.createElement("span");


googleBtn.addEventListener("click",()=>{
    googleResults.style.display="block";
    wikiResults.style.display="none";
    imgResults.style.display="none";
    console.log(inputArea.value);
    span1.style.fontSize="2rem";
    span1.innerHTML=`   :- ${inputArea.value}`;
    gHead.appendChild(span1);
    getGoogleResponse(inputArea.value);
});

function getGoogleResponse(query) {
    // console.log(query);
    showGoogleResult.innerHTML=`<p style="text-align:center;padding-top:40px;color:orangered;">LOADING.......</p>`;
    const apiKey = "AIzaSyAwHZLi4AaMZea81WIghWMRtj1MFY_9SC8";
    const searchEngineId = "807b15b0a790c4757";
    const encodedQuery = encodeURIComponent(query); // URL-encode the query


    //console.log("Encoded Query:", encodedQuery);
    if (encodedQuery.trim() !== "") {
        fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodedQuery}`)
            .then(response => response.json())
            .then(data => {
                //console.log(data.items[0].pagemap.cse_image[0].src); // Log the results from the search
                displayGoogleResults(data.items); // Function to display the results
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
            });
    }

};


function displayGoogleResults(data){
    // console.log(data.items);
    showGoogleResult.innerHTML="";
    data.forEach((g)=>{
        const getResult=document.createElement("div");
        getResult.classList.add("getResult1");
        const nav=document.createElement("div");
        nav.classList.add("navTitle");
        const imgG=g.pagemap?.cse_thumbnail != undefined ? g.pagemap?.cse_thumbnail[0].src : '/asset/user.png';
        // console.log(imgG);
        nav.innerHTML=`
        <img src="${imgG}">
        <div class="title">
         <h4>${g.title}</h4>
         <p><a href="${g.link}">${g.displayLink}</a></p>
        </div>
        `;
        getResult.appendChild(nav);

        const resultContent=document.createElement("div");
        resultContent.classList.add("resultContent");

        resultContent.innerHTML=`
        <h2>${g.title}</h2>
        <p class="description">${g.snippet}</p>
        <hr>`;
        getResult.appendChild(resultContent);

        showGoogleResult.appendChild(getResult);
    })
}

 