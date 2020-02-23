import {render} from "./render.js";
import {search} from "./search.js";

const endpoint = 'https://www.rijksmuseum.nl/api/nl/collection',
    apiKey = 'n0Iu86hl';

export let api = {
    /**
     * Async function to fetch all the paintings from a specific painter and the details of every painting.
     *
     * @param artist: the artist where you want to see some paintings from.
     */
    getData: async (artist) => {
        const painter = artist,
            urlArtist = `${endpoint}?key=${apiKey}&involvedMaker=${painter}`;

        try {
            const response = await fetch(urlArtist);
            const jsonData = await response.json();
            if (jsonData.artObjects.length !== 0) {
                let objects = jsonData.artObjects;

                /**
                 * Loop through the paintings to get the details of every painting
                 */
                objects.map(async (object) => {
                    const urlDetails = `${endpoint}/${object.objectNumber}?key=${apiKey}`;

                    /**
                     * Fetch details
                     */
                    try {
                        const response = await fetch(urlDetails);
                        const jsonData = await response.json();
                        render.overview(jsonData.artObject);
                        render.details(jsonData.artObject);
                    } catch (err) {
                        console.log('Error: ', err);
                    }
                });
            } else {
                search.remove('objects');
                render.noDataFound();
            }
        } catch (err) {
            console.log('Error: ', err);
        }
    }
};