const objects = document.querySelector('.objects'),
    sections = document.querySelectorAll('section'),
    main = document.querySelector('main'),
    endpoint = 'https://www.rijksmuseum.nl/api/nl/collection',
    apiKey = 'n0Iu86hl';

function getObjectNumbers(data) {
    let paintings = [];

    // iterate over the objects to get all the objectNumbers
    for(let i = 0; i < data.length; i++){
        let painting = data[i];
        // store all the objectNumbers in an array
        paintings.push(painting.objectNumber);
    }

    return paintings;
}

function getColors(data) {
    let paintingColors = [];

    for(let i = 0; i < data.colors.length; i++) {
        let paintingColor = data.colors[i];

        // store all the hex code of the colors in an array
        paintingColors += paintingColor.hex;
    }
    // convert string to array
    paintingColors = paintingColors.split(' ');
    return paintingColors;
}

function renderNoDataFound() {
    const html = `
        <div><span>Oeps! Het ziet er naar uit dat deze schilder niet bestaat. Check voor de zekerheid of je de naam goed gesachreven hebt.</span></div>
    `;

    objects.insertAdjacentHTML('beforeend', html);
}

const renderDetailsWithColors = data => {
    const html = `
        <section data-route="${data.objectNumber}">
            <div class="object">
                <img src="${data.webImage.url}">
                <div class="title">
                    <h3 class="title-name">${data.title}</h3>
                    <span class="title-objectnumber">${data.objectNumber}</span>
                </div>
                <div class="presenting-date">
                    <span>Year the painting was presented: <span class="presenting-date">${data.dating.presentingDate}</span></span>
                </div>
                <div class="colors"> 
                    <span>Colors:</span>
                     <ul>
                        <!--
                            loop through the colors in the array and place them in a li tag
                            used .join('') on the map to remove apostrophe
                        -->
                        ${getColors(data).map(hex =>{
                            return `<li>${hex}</li>`
                        }).join('')}
                     </ul>
                </div>
            </div>
        </section>
    `;

    main.insertAdjacentHTML('afterend', html);
};

const renderDetailsNoColorsDefined = data => {
    const html = `
            <section data-route="${data.objectNumber}">
                <div class="object">
                    <img src="${data.webImage.url}">
                    <div class="title">
                        <h3 class="title-name">${data.title}</h3>
                        <span class="title-objectnumber">${data.objectNumber}</span>
                    </div>
                    <div class="presenting-date">
                        <span>Year the painting was presented: <span class="presenting-date">${data.dating.presentingDate}</span></span>
                    </div>
                    <div class="colors">
                        <span>Colors: not defined</span>
                    </div>
                </div>
            </section>
        `;

    main.insertAdjacentHTML('afterend', html);
};

const renderDetails = data => {
    // iterate over the colors to get all the colors and the name of an object
    if(data.colors.length > 0){
        renderDetailsWithColors(data);
    } else {
        renderDetailsNoColorsDefined(data);
    }
};

const renderPaintings = data => {
    const html = `
        <div class="object">
            <img src="${data.webImage.url}">
            <div class="title">
                <h3 class="title-name"><a href="#${data.objectNumber}">${data.title}</a></h3>
                <p>${data.objectNumber}</p>
            </div>
        </div>
    `;

    objects.insertAdjacentHTML('beforeend', html);
};

function getPaintingDetailsData(jsonData){
    let data = jsonData.artObjects;

    let paintings = getObjectNumbers(data);

    // iterate over the objects to get the objectNumber to add to the url
    for(let i = 0; i < data.length; i++){
        let paintingObjectNumber = paintings[i];
        const url = `${endpoint}/${paintingObjectNumber}?key=${apiKey}`;

        // get object colors
        fetch(url)
            .then((responseDetails) => {
                return responseDetails.json();
            })
            .then((jsonDataDetails) => {
                renderPaintings(jsonDataDetails.artObject);
                renderDetails(jsonDataDetails.artObject);
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            })
    }
}

/**
 * Function to fetch all the paintings from a specific painter
 * @param artist: painter where you want to see some paintings from.
 */
function getPaintingsData(artist) {
    const painter = artist,
        url = `${endpoint}?key=${apiKey}&involvedMaker=${painter}`;

    // get all the objects
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonData) => {
            // check if there are any results
            if(jsonData.count !== 0) {
                getPaintingDetailsData(jsonData);
            } else {
                renderNoDataFound();
            }
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
}

/**
 * based on the code from Joost about routie.js
 * link: https://codepen.io/joostf/pen/jOPPMLK
 */
routie({
    ':id': id => {
        updateUI(id);
    }
});

function updateUI(route){
    if(document.querySelector('section[data-route].active')){
        document.querySelector('section[data-route].active').classList.remove('active');
    }
    let activeSection = document.querySelector(`[data-route=${route}]`);
    // console.log(activeSection);
    activeSection.classList.add('active');
}

/**
 * The code for this function is inspired on the code from tutorialrepublic.com.
 * Link: https://www.tutorialrepublic.com/faq/how-to-get-the-value-of-text-input-field-using-javascript.php
 *
 * For the regex I used the answers on stackoverflow as inspireation.
 * link: https://stackoverflow.com/questions/441018/replacing-spaces-with-underscores-in-javascript
 *
 * Function to get the user input.
 */
function getUserInput() {
    // get user input
    let inputVal = document.getElementById("userInputMaker").value;

    // remove all special characters in string
    let temp = inputVal.replace(/[^a-zA-Z ]/g, "");
    // remove all special characters and whitespaces around the string
    let artist = temp.trim();
    // replace all spaces with '+' in string and return the value
    return artist.replace(/[\s]/g, "+");
}

/**
 * Function to search for other painters
 */
function searchForPaintings() {
    if(getUserInput()){
        // todo: remove all content in div.objects
        clearBox('objects');
        // todo: reset fetch
        // todo: fetch again
    } else {
        const artist = 'Aelbert+Cuyp';
        getPaintingsData(artist);
    }
}

/**
 * For this function I used the code from geeksforgeeks.org.
 * link: https://www.geeksforgeeks.org/how-to-clear-the-content-of-a-div-using-javascript/
 *
 * Function to remove all the content inside a div.
 * @param elementID: the ID of the div that you want to clear.
 */
function clearBox(elementID) {
    let div = document.getElementById(elementID);

    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function init(){
    // const artist = 'Rembrandt+van+Rijn';
    const artist = 'Aelbert+Cuyp';

    return getPaintingsData(artist);
}

init();
