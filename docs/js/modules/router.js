import {data as dataModule} from "./data.js";
import {api} from "./api.js";
import {render} from "./render.js";

export const router = {

    /**
     * Function to get all the data depending if localStorage is set or not.
     */
    handler: function() {
        if(localStorage.length === 0){
            const artist = 'Rembrandt+van+Rijn';
            this.getPaintings(artist);
        } else {
            this.getPaintingsFromLocalStorage();
        }
    },

    /**
     * Function to get all the data.
     *
     * @param artist
     */
    getPaintings: async function (artist) {
        render.loader('objects');
        const paintings = await api.getData(artist);
        render.remove('objects');
        this.getContent(paintings);
    },

    /**
     * Function to get all the data from localStorage.
     */
    getPaintingsFromLocalStorage: function () {
        render.loader('objects');
        let paintings = dataModule.getItem('details');
        let parsedPaintings = dataModule.parse(paintings);
        render.remove('objects');
        this.getContent(parsedPaintings);
    },

    /**
     * Function to render the content.
     *
     * @param data
     */
    getContent: function (data) {
        if (data.length !== 0) {
            data.map(item => {
                render.overview(item);
                render.details(item);
            });
            this.route();
        } else {
            render.noDataFound();
        }
    },

    /**
     * Function to remove the id from the hash.
     */
    removeIdFromHash: function () {
        window.location.replace("#");
    },

    /**
     * Function to update the hash depending on which painting is clicked, using Routie.
     */
    route: function() {
        routie(
            ':id', id => {
                this.updateUI(id);
            }
        );
    },

    /**
     * Function to add and remove active class depending if the data in the data-route attr matches the objectNumber
     * in routie function.
     *
     * @param route
     */
    updateUI: function (route) {
        if(document.querySelector('div[data-route].active') && document.querySelector('a[data-route].active')){
            document.querySelector('div[data-route].active').classList.remove('active');
            document.querySelector('a[data-route].active').classList.remove('active');
        }
        let activeSection = document.querySelector(`div[data-route=${route}]`);
        let activeLink = document.querySelector(`a[data-route=${route}]`);
        activeSection.classList.add('active');
        activeLink.classList.add('active');
    }
};



