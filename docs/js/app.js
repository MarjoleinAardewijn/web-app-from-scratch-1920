const main = document.querySelector('.objects'),
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

    main.insertAdjacentHTML('beforeend', html);
}

const renderPaintings = data => {
    const html = `
        <div class="object">
            <img src="${data.webImage.url}">
            <div class="title">
                <h3 class="title-name">${data.title}</h3>
            </div>
        </div>
    `;

    main.insertAdjacentHTML('beforeend', html);
};

const renderDetailsWithColors = data => {
    const html = `
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
    `;

    main.insertAdjacentHTML('beforeend', html);
};

const renderDetailsNoColorsDefined = data => {
    const html = `
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
        `;

    main.insertAdjacentHTML('beforeend', html);
};

const renderDetails = data => {
    // iterate over the colors to get all the colors and the name of an object
    if(data.colors.length > 0){
        renderDetailsWithColors(data);
    } else {
        renderDetailsNoColorsDefined(data);
    }
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
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            })
    }
}

function getPaintingsData(maker) {
    const painter = maker,
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

function getUserInput() {
    // get user input
    let inputVal = document.getElementById("userInputMaker").value;

    // remove all special characters in string
    let temp = inputVal.replace(/[^a-zA-Z ]/g, "");
    // remove all special characters and whitespaces around the string
    let maker = temp.trim();
    // replace all spaces with '+' in string and return the value
    return maker.replace(/[\s]/g, "+");
}

function searchForPaintings() {
    if(getUserInput()){
        // todo: remove all content in div.objects
        // todo: reset fetch
        // todo: fetch again
    } else {
        const maker = 'Aelbert+Cuyp';
        getPaintingsData(maker);
    }
}

function init(){
    const maker = 'Rembrandt+van+Rijn';
    // const maker = 'Aelbert+Cuyp';

    return getPaintingsData(maker);
}

init();
