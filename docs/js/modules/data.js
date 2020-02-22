export let data = {
    getObjectNumbers: function (data) {
        let paintings = [];

        // iterate over the objects to get all the objectNumbers
        for(let i = 0; i < data.length; i++){
            let painting = data[i];
            // store all the objectNumbers in an array
            paintings.push(painting.objectNumber);
        }

        return paintings;
    },

    getColors: function (data) {
        let paintingColors = [];

        for(let i = 0; i < data.colors.length; i++) {
            let paintingColor = data.colors[i];

            // store all the hex code of the colors in an array
            paintingColors += paintingColor.hex;
        }
        // convert string to array
        paintingColors = paintingColors.split(' ');
        return paintingColors;
    }
};