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
            /**
             * Fetch paintings and the details from an artist.
             *
             * @type {Response} -> Paintings from artist + details.
             */
            const response = await fetch(urlArtist);
            const jsonData = await response.json();
            const objects = jsonData.artObjects;
            // Todo: add filter/reduce
            // Loop through the paintings to get the details of every painting
            const details = objects.map(async function(object) {
                const urlDetails = `${endpoint}/${object.objectNumber}?key=${apiKey}`;

                // Fetch details
                const responseDetails = await fetch(urlDetails);
                const jsonDataDetails = await responseDetails.json();
                return jsonDataDetails.artObject;
            });
            console.log(await Promise.all(details));

            // wait until all the data from the details is fetched
            return await Promise.all(details);
        } catch (err) {
            console.log('Error: ', err);
        }
    }
};