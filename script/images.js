//---images----
const span3=document.createElement("span");
const displayImg=document.querySelector(".imagesResultList");
imagesBtn.addEventListener("click",()=>{
    
    googleResults.style.display="none";
    wikiResults.style.display="none";
    imgResults.style.display="block";
    span3.style.fontSize="2rem";
    span3.innerHTML=`   :- ${inputArea.value}`;
    iHead.appendChild(span3);
    getImagesResponse(inputArea.value);
})

function getImagesResponse(queryInput){
    displayImg.innerHTML=`<p class="load">LOADING.......</p>`;
    const accessKey=`j1jmqnDa0eV-_WW4RwNFIvHmmxaa4rYcvBeM7icF228`;
    const secretKey=`q0zDdLYArxgJNMegX0XIReqGotOkqjFW8RxRAR-je-4`;

    const url=`https://api.unsplash.com/search/photos?page=1&query=${queryInput}&client_id=${accessKey}`;

    fetch(url).then(response => response.json())
    .then((data)=>{
        displayImagesResults(data.results);
    })
};

// getImagesResponse("birds");

function displayImagesResults(img){
    displayImg.innerHTML="";

     // Check if no images were found
    if (img.length === 0) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No images found for this search.";
        displayImg.appendChild(noResultsMessage);
        return; // Exit the function if no images
    }

    img.forEach((i)=>{
        const imgCard=document.createElement("div");
        imgCard.classList.add("img-results");
        imgCard.innerHTML=`
        <img src="${i.urls.raw}" alt="${i.alt_description}">
        <p>${i.description}</p>
        `;
        displayImg.appendChild(imgCard);
    })

}