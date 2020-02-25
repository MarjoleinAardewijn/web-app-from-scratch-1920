import {router} from "./router.js";
import {data} from "./data.js";
import {render} from "./render.js";

export const search = {
    /**
     * Search for paintings from a specific artist
     */
    paintings: function () {
        const button = document.querySelector("button");
        button.addEventListener('click', function () {
            // get user input
            let input = document.getElementById("userInputMaker").value;

            // remove all special characters in string
            let artist = input.replace(/[^a-zA-Z ]/g, "");
            // remove all special characters and whitespaces around the string
            artist = artist.trim();
            // replace all spaces with '+' in string and return the value
            artist = artist.replace(/[\s]/g, "+");

            // clear localStorage.
            data.clear();
            // remove id from hash and all the content.
            router.removeIdFromHash();
            render.remove('objects');
            render.remove('details');

            // check if the user filled in a name of an artist in the input field.
            if (artist !== '') {
                router.getPaintings(artist);
            } else {
                artist = 'Rembrandt van Rijn';
                router.getPaintings(artist);
            }
        });
    }
};