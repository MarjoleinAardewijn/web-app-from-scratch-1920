import {api} from "./api.js";

export const search = {
    /**
     * Search for paintings from a specific artist
     */
    paintings: function () {
        if (this.getUserInput()) {
            this.remove('objects');
            const artist = this.getUserInput();
            api.getData(artist);
        } else {
            this.remove('objects');
            const artist = 'Aelbert+Cuyp';
            api.getData(artist);
        }
    },

    /**
     * Function to get the user input.
     */
    getUserInput: function () {
        // get user input
        let inputVal = document.getElementById("userInputMaker").value;

        // remove all special characters in string
        let temp = inputVal.replace(/[^a-zA-Z ]/g, "");
        // remove all special characters and whitespaces around the string
        let artist = temp.trim();
        // replace all spaces with '+' in string and return the value
        return artist.replace(/[\s]/g, "+");
    }
};