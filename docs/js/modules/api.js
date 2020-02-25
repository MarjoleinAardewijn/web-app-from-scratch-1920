import {data as dataModule} from "./data.js";

const endpoint = 'https://www.rijksmuseum.nl/api/nl/collection',
    apiKey = 'n0Iu86hl';

export const api = {
    /**
     * Async function to fetch all the paintings from a specific painter and the details
     * of every painting.
     *
     * @param artist: the artist where you want to see some paintings from.
     */
    getData: async function(artist) {
        const urlArtist = `${endpoint}?key=${apiKey}&involvedMaker=${artist}`;

        try {
            /**
             * Fetch paintings and the details from an artist.
             *
             * @type {Response} -> Paintings from artist + details.
             */
            const response = await fetch(urlArtist);
            const jsonData = await response.json();
            const objects = jsonData.artObjects;

            // Check if paintings are from the artist (filter) and loop through the paintings
            // to get the details of every painting (map).
            const details = objects.filter(async function (object) {
                return object.principalOrFirstMaker === artist;
            }).map(async function(object) {
                const urlDetails = `${endpoint}/${object.objectNumber}?key=${apiKey}`;

                try {
                    // Fetch details
                    const response = await fetch(urlDetails);
                    const jsonData = await response.json();
                    // filter data
                    const filteredData = await dataModule.filter(jsonData.artObject);
                    return await filteredData[0];
                } catch (err) {
                    console.log('Error: ', err);
                }
            });

            // wait until all the data from the details is fetched.
            let allData = await Promise.all(details);
            // store all the data in the localStorage.
            await dataModule.setItem('details', allData);
            // return fetched data.
            return await allData;
        } catch (err) {
            console.log('Error: ', err);
        }
    }
};