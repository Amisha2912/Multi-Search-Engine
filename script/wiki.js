//---wikipedia---

const showResult=document.querySelector(".wikipediaResultList");

wikiBtn.addEventListener("click",()=>{
    
    googleResults.style.display="none";
    wikiResults.style.display="block";
    imgResults.style.display="none";
    const input=inputArea.value;
    getWikiResponse(input);
})

function getWikiResponse(inputValue){
    showResult.innerHTML=`<p style="text-align:center;padding-top:40px;color:orangered;">LOADING.......</p>`;
    const encodedTitle = encodeURIComponent(inputValue);
    const targetUrl=`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodedTitle}&format=json&origin=*`;
    fetch(targetUrl)
        .then(response => response.json())
        .then((data) => {
            console.log(data.query.search);
            displayWikipediaResults(data.query.search);
        })
        .catch(error => {
            console.error('Error fetching data from Wikipedia:', error);
        });
}

// getWikiResponse("javaScript");
const span2=document.createElement("span");

function displayWikipediaResults(items){
    span2.style.fontSize="2rem";
    span2.innerHTML=`  :- ${inputArea.value}`;
    wHead.appendChild(span2);

    // Clear previous results
   showResult.innerHTML = "";

   items.forEach((item)=>{
       const url=`http://en.wikipedia.org/?curid=${items.pageid}`;
       const titleLink=`<a href="${url}" target="_blank" rel="noopener">${item.title}</a>`;
       const urlLink=`<a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>`;

       const resultitem=document.createElement('div');
       resultitem.className="result-item";
       resultitem.innerHTML=`
       <h3 class="result-title">${titleLink}</h3>
       <hr>
       <div class="small-value">
           <span class="date">${item.timestamp}</span>
           ${urlLink}
        </div>
       <p class="result-snippet">${item.snippet}</p>
       `;

       showResult.appendChild(resultitem);

    })
}