// set variables
const main = document.querySelector('main'),
    endpoint = 'https://www.rijksmuseum.nl/api/nl/collection',
    key = 'n0Iu86hl',
    maker = 'Aelbert+Cuyp',
    url = `${endpoint}?key=${key}&involvedMaker=${maker}`;

// const render = data => {
//     data.forEach((object, i) => {
//         const html = `
//             <!--HTML code here-->
//         `;
//         main.insertAdjacentHTML('beforeend', html);
//     });
// };

// get all the objects
fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((jsonData) => {
        let objects = [];
        let data = jsonData.artObjects;

        // iterate over the objects to get all the objectNumbers
        for(let i = 0; i < data.length; i++){
            let object = data[i];
            // store all the objectNumbers in an array
            objects.push(object.objectNumber);
        }

        // iterate over the objects to get the objectNumber to add to the url
        for(let i = 0; i < data.length; i++){
            let objectNumber = objects[i];
            const urlObjects = `${endpoint}/${objectNumber}?key=${key}`;

            // get object colors
            fetch(urlObjects)
                .then((responseObjects) => {
                    return responseObjects.json();
                })
                .then((jsonDataObjects) => {
                    let object = jsonDataObjects.artObject;
                    let objectColors = [];

                    // iterate over the colors to get all the colors and the name of an object
                    if(object.colors.length > 0) {
                        for(let i = 0; i < object.colors.length; i++) {
                            let objectColor = object.colors[i];

                            // store all the hex code of the colors in an array
                            objectColors += objectColor.hex;
                        }
                        // convert string to array
                        objectColors = objectColors.split(' ');

                        const html = `
                            <div class="object">
                                <img src="${object.webImage.url}">
                                <div class="title">
                                    <h3 class="title-name">${object.title}</h3>
                                    <span class="title-objectnumber">${objectNumber}</span>
                                </div>
                                <div class="presenting-date">
                                    <span>Year the painting was presented: <span class="presenting-date">${object.dating.presentingDate}</span></span>
                                </div>
                                <div class="colors">
                                    <span>Colors:</span>
                                     <ul>
                                        <!--
                                            loop through the colors in the array and place them in a li tag
                                            used .join('') on the map to remove apostrophe
                                        -->
                                        ${objectColors.map(hex =>{ 
                                            return `<li>${hex}</li>`
                                        }).join('')}
                                     </ul>
                                </div>
                            </div>
                        `;

                        main.insertAdjacentHTML('beforeend', html);

                        // console.log("img: "+ object.webImage.url +
                        //     "\nName: " + object.title +
                        //     "\nYear it was presented: " + object.dating.presentingDate +
                        //     "\nColors: " + JSON.stringify(objectColors) +
                        //     "\nObjectNr: " + object.objectNumber);
                    } else {
                        const html = `
                            <div class="object">
                                <img src="${object.webImage.url}">
                                <div class="title">
                                    <h3 class="title-name">${object.title}</h3>
                                    <span class="title-objectnumber">${objectNumber}</span>
                                </div>
                                <div class="presenting-date">
                                    <span>Year the painting was presented: <span class="presenting-date">${object.dating.presentingDate}</span></span>
                                </div>
                                <div class="colors">
                                    <span>Colors: unknown</span>
                                </div>
                            </div>
                        `;

                        main.insertAdjacentHTML('beforeend', html);

                        // console.log("img: "+ object.webImage.url +
                        //     "\nName: " + object.title +
                        //     "\nYear it was presented: " + object.dating.presentingDate +
                        //     "\nColors: unknown" +
                        //     "\nObjectNr: " + object.objectNumber);
                    }
                })
                .catch((error) => {
                    console.log('Something went wrong', error);
                })
        }

    })
    .catch((error) => {
        console.error('Error: ', error);
    });
