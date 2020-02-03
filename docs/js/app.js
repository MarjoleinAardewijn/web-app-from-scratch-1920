const key = 'n0Iu86hl';
const url = 'https://www.rijksmuseum.nl/api/nl/collection?key='+ key +'&involvedMaker=Aelbert+Cuyp';

// get all the objects
fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        console.log(myJson);
        let objects = [];

        // iterate over the objects to get all the objectNumbers
        for(let i = 0; i < myJson.artObjects.length; i++){
            let object = myJson.artObjects[i];
            // console.log("objectNr:" + object.objectNumber + "\ntitle:" + object.title + "\nimg:" + object.webImage.url);
            // store all the objectNumbers in an array
            objects.push(object.objectNumber);
        }

        // iterate over the objects to get the objectNumber to add to the url
        for(let i = 0; i < myJson.artObjects.length; i++){
            let objectNumber = objects[i];
            const url2 = 'https://www.rijksmuseum.nl/api/nl/collection/'+ objectNumber +'?key='+ key;

            // get object colors
            fetch(url2)
                .then((response2) => {
                    return response2.json();
                })
                .then((myJson2) => {
                    console.log(myJson2);
                    let object = myJson2.artObject;
                    let objectColors = [];

                    // iterate over the colors to get all the colors and the name of an object
                    if(object.colors.length > 0) {
                        for(let i = 0; i < object.colors.length; i++){
                            let objectColor = object.colors[i];
                            // store all the hex code of the colors in an array
                            objectColors.push(objectColor.hex);
                        }
                        console.log("img: "+ object.webImage.url +
                            "\nName: " + object.title +
                            "\nYear it was presented: " + object.dating.presentingDate +
                            "\nColors: "+ JSON.stringify(objectColors));
                    } else {
                        console.log("img: "+ object.webImage.url +
                            "\nName: " + object.title +
                            "\nYear it was presented: " + object.dating.presentingDate +
                            "\nColors: unknown");
                    }
                })
                .catch((error) => {
                    console.log('Error: ', error);
                })
        }

    })
    .catch((error) => {
        console.error('Error: ', error);
    });
