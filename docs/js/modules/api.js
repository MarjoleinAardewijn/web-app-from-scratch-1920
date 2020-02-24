import {render} from "./render.js";

const endpoint = 'https://www.rijksmuseum.nl/api/nl/collection',
    apiKey = 'n0Iu86hl';

export const api = {
    /**
     * Async function to fetch all the paintings from a specific painter and the details of every painting.
     *
     * @param artist: the artist where you want to see some paintings from.
     */
    getData: async function(artist) {
        const painter = artist,
            urlArtist = `${endpoint}?key=${apiKey}&involvedMaker=${painter}`;

        try {
            const response = await fetch(urlArtist);
            const jsonData = await response.json();
            if (jsonData.artObjects.length !== 0) {
                const objects = jsonData.artObjects;

                /**
                 * Loop through the paintings to get the details of every painting
                 */
                const details = objects.map(async function(object) {
                    const urlDetails = `${endpoint}/${object.objectNumber}?key=${apiKey}`;

                    /**
                     * Fetch details
                     */
                    try {
                        const response = await fetch(urlDetails);
                        const jsonData = await response.json();
                        return jsonData.artObject;
                    } catch (err) {
                        console.log('Error: ', err);
                    }
                });

                // wait until all the data from the details is fetched
                return await Promise.all(details);

            } else {
                render.noDataFound();
            }
        } catch (err) {
            console.log('Error: ', err);
        }
    }
};