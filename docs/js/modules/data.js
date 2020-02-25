export const data = {
    /**
     * Function to get the stored data back from localStorage.
     *
     * @param key -> the key which the data was stored with.
     */
    getItem: function (key) {
        return localStorage.getItem(key);
    },

    /**
     * Function to store the data in localStorage.
     *
     * @param key -> name of stored data
     * @param data -> converted data array to string.
     */
    setItem: function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    /**
     * Function to convert the contents of localStorage back into something we can work with.
     */
    parse: function (item) {
        return JSON.parse(item);
    },

    /**
     * Function to clear localStorage.
     */
    clear: function () {
        localStorage.clear();
    },

    /**
     * Function to filter the data and push to an array.
     */
    filter: function (data) {
        let filter = [];

        filter.push({
            id: data.objectNumber,
            title: data.title,
            imgUrl: data.webImage.url,
            colors: data.colors,
            presentingDate: data.dating.presentingDate
        });

        return filter;
    }
};