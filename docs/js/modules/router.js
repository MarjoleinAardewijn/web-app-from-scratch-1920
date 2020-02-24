import {search} from "./search.js";
import {api} from "./api.js";
import {render} from "./render.js";

export const router = {
    handler: async function() {
        const artist = 'Aelbert+Cuyp';

        console.log('details');
        search.remove('objects');
        const paintings = await api.getData(artist);
        paintings.map(item => {
            render.overview(item);
            render.details(item);
        });
        this.route();
    },

    route: function() {
        routie(':objectNumber', objectNumber => {
            this.updateUI(objectNumber);
        });
    },

    /**
     * Function to add and remove active class depending if the data in the data-route attr matches the objectNumber
     * in routie function.
     *
     * @param route
     */
    updateUI: function (route) {
        if(document.querySelector('section[data-route].active') && document.querySelector('a[data-route].active')){
            document.querySelector('section[data-route].active').classList.remove('active');
            document.querySelector('a[data-route].active').classList.remove('active');
        }
        let activeSectionTest = document.querySelector(`section`);
        let activeSection = document.querySelector(`section[data-route=${route}]`);
        let activeLink = document.querySelector(`a[data-route=${route}]`);
        console.log(activeSectionTest);
        activeSection.classList.add('active');
        activeLink.classList.add('active');
    }
};



