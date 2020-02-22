import {api} from "./api.js";
import {router} from "./router.js";

export let app = {
    init: function() {
        router.route();

        // const artist = 'Rembrandt+van+Rijn';
        const artist = 'Aelbert+Cuyp';
        return api.overview(artist);
    }
};
