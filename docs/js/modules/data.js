export const data = {
    get: function (key) {
        return localStorage.getItem(key);
    },

    set: function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    parse: function (object) {
        return JSON.parse(object);
    },

    filter: function (data) {
        let filter = [];

        // filter the data and push to array.
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