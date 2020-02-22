import {render} from "./render.js";
import {data as dataModule} from "./data.js";

const endpoint = 'https://www.rijksmuseum.nl/api/nl/collection',
    apiKey = 'n0Iu86hl';

export let api = {
    /**
     * Function to fetch all the paintings from a specific painter
     *
     * @param artist: the artist where you want to see some paintings from.
     */
    overview: function(artist) {
        const painter = artist,
            url = `${endpoint}?key=${apiKey}&involvedMaker=${painter}`;

        // get all the objects
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((jsonData) => {
                // check if there are any results
                if (jsonData.count !== 0) {
                    this.details(jsonData);
                } else {
                    render.noData();
                }
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    },

    /**
     * Function to fetch the details
     *
     * @param data
     */
    details: function (data) {
        let objects = data.artObjects;
        let paintings = dataModule.getObjectNumbers(objects);

        // iterate over the objects to get the objectNumber to add to the url
        for(let i = 0; i < objects.length; i++){
            let paintingObjectNumber = paintings[i];
            const url = `${endpoint}/${paintingObjectNumber}?key=${apiKey}`;

            // get object colors
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((jsonData) => {
                    render.overview(jsonData.artObject);
                    render.details(jsonData.artObject);
                })
                .catch((error) => {
                    console.log('Something went wrong', error);
                })
        }
    }
};