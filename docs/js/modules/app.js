import {router} from "./router.js";
import {search} from "./search.js";

export const app = {
    init: function() {
        router.handler();
        search.paintings();
    }
};
