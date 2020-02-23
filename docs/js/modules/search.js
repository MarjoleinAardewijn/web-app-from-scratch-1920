import {api} from "./api.js";

export let search = {
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
    },

    /**
     * Function to search for other painters
     */
    paintings: function () {
        if(this.getUserInput()){
            // todo: remove all content in div.objects
            this.clear('objects');
            // todo: reset fetch
            // todo: fetch again
        } else {
            const artist = 'Aelbert+Cuyp';
            api.overview(artist);
        }
    },

    /**
     * Function to remove all the content inside a div.
     *
     * @param elementId: the ID of the div that you want to clear.
     */
    remove: function (elementId) {
        let div = document.getElementById(elementId);

        while(div.firstChild) {
            div.removeChild(div.firstChild);
        }
    }
};