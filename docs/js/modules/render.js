const objects = document.querySelector('.objects'),
    details = document.querySelector('section');

export const render = {
    /**
     * Function to render the loading image.
     *
     * @param elementId
     */
    loader: function (elementId) {
        const element = document.getElementById(elementId),
            loadingImage = `
                <div class="loading">
                    <img src="./img/loading.gif" alt="loading">
                    <p>Loading...</p>
                </div>
            `;

        element.insertAdjacentHTML("beforeend", loadingImage);
    },

    /**
     * Function to render the overview of all the paintings.
     *
     * @param data
     */
    overview: function (data) {
        const html = `
            <a href="#${data.id}" data-route="${data.id}" class="link">
                <div class="object">
                    <img src="${data.imgUrl}">
                    <div class="title">
                        <h3 class="title-name">${data.title}</h3>
                    </div>
                </div>
            </a>
        `;

        objects.insertAdjacentHTML('beforeend', html);
    },

    /**
     * Function to switch between html layouts depending if there are colors or not.
     *
     * @param data
     */
    details: function (data) {
        // iterate over the colors to get all the colors and the name of an object
        if (data.colors.length > 0) {
            this.detailsWithColors(data);
        } else {
            this.detailsNoColors(data);
        }
    },

    /**
     * Function to render content with colors.
     *
     * @param data
     */
    detailsWithColors: function (data) {
        const html = `
            <div data-route="${data.id}">
                <div class="object">
                    <div class="title">
                        <h3 class="title-name">${data.title}</h3>
                        <span class="title-objectnumber">${data.id}</span>
                    </div>
                    <div class="presenting-date">
                        <span>Year the painting was presented: <span class="date">${data.presentingDate}</span></span>
                    </div>
                    <div class="colors"> 
                        <span>Colors:</span>
                         <ul>
                            <!--
                                loop through the colors in the array and place them in a li tag
                                used .join('') on the map to remove apostrophe
                            -->
                            ${data.colors.map(colors => {
                                return `<li class="hex-color" style="background-color: ${colors.hex}">${colors.hex}</li>`
                            }).join('')}
                         </ul>
                    </div>
                </div>
            </div>
        `;

        details.insertAdjacentHTML('beforeend', html);
    },

    /**
     * Function to render content that has no colors defined.
     *
     * @param data
     */
    detailsNoColors: function (data) {
        const html = `
            <div data-route="${data.id}">
                <div class="object">
                    <div class="title">
                        <h3 class="title-name">${data.title}</h3>
                        <span class="title-objectnumber">${data.id}</span>
                    </div>
                    <div class="presenting-date">
                        <span>Year the painting was presented: <span class="date">${data.presentingDate}</span></span>
                    </div>
                    <div class="colors">
                        <span>Colors: </span><span class="not-defined">not defined</span>
                    </div>
                </div>
            </div>
        `;

        details.insertAdjacentHTML('beforeend', html);
    },

    /**
     * No data found html renderer.
     */
    noDataFound: function () {
        const html = `
            <div class="no-data"><span>Oeps! Het ziet er naar uit dat deze schilder niet bestaat. Check voor de zekerheid of je de naam goed gesachreven hebt.</span></div>
        `;

        objects.insertAdjacentHTML('beforeend', html);
    },

    /**
     * Function to remove all the content inside a div.
     *
     * @param elementId: the ID of the div that you want to clear.
     */
    remove: function (elementId) {
        const div = document.getElementById(elementId);

        while(div.firstChild) {
            div.removeChild(div.firstChild);
        }
    }

};