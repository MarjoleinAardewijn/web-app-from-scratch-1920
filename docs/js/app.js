// set variables
const main = document.querySelector('main'),
    endpoint = 'https://www.rijksmuseum.nl/api/nl/collection',
    key = 'n0Iu86hl',
    maker = 'Aelbert+Cuyp',
    url = `${endpoint}?key=${key}&involvedMaker=${maker}`;

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

const renderPaintings = data => {
    let painting = data;

    // iterate over the colors to get all the colors and the name of an object
    if(painting.colors.length > 0) {
        // getColors(data);

        const html = `
            <div class="object">
                <img src="${painting.webImage.url}">
                <div class="title">
                    <h3 class="title-name">${painting.title}</h3>
                    <span class="title-objectnumber">${painting.objectNumber}</span>
                </div>
                <div class="presenting-date">
                    <span>Year the painting was presented: <span class="presenting-date">${painting.dating.presentingDate}</span></span>
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

    } else {
        const html = `
            <div class="object">
                <img src="${painting.webImage.url}">
                <div class="title">
                    <h3 class="title-name">${painting.title}</h3>
                    <span class="title-objectnumber">${painting.objectNumber}</span>
                </div>
                <div class="presenting-date">
                    <span>Year the painting was presented: <span class="presenting-date">${painting.dating.presentingDate}</span></span>
                </div>
                <div class="colors">
                    <span>Colors: not defined</span>
                </div>
            </div>
        `;

        main.insertAdjacentHTML('beforeend', html);
    }
};

function getPaintingDetailsData(jsonData){
    let data = jsonData.artObjects;

    let paintings = getObjectNumbers(data);

    // iterate over the objects to get the objectNumber to add to the url
    for(let i = 0; i < data.length; i++){
        let paintingObjectNumber = paintings[i];
        const urlPainting = `${endpoint}/${paintingObjectNumber}?key=${key}`;

        // get object colors
        fetch(urlPainting)
            .then((responsePaintings) => {
                return responsePaintings.json();
            })
            .then((jsonDataPaintings) => {
                renderPaintings(jsonDataPaintings.artObject);
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            })
    }
}

function getPaintingsData() {
    // get all the objects
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonData) => {
            getPaintingDetailsData(jsonData);
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
}

getPaintingsData();
