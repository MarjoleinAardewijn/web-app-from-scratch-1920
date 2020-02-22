import {data as dataModule} from "./data.js";

const objects = document.querySelector('.objects'),
    main = document.querySelector('main');

export let render = {
    /**
     * Function to render the overview of all the paintings
     *
     * @param data
     */
    overview: function (data) {
        const html = `
            <a href="#${data.objectNumber}" class="link">
                <div class="object">
                    <img src="${data.webImage.url}">
                    <div class="title">
                        <h3 class="title-name">${data.title}</h3>
        <!--                <p>${data.objectNumber}</p>-->
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
        <section data-route="${data.objectNumber}">
            <div class="object">
                <div class="title">
                    <h3 class="title-name">${data.title}</h3>
                    <span class="title-objectnumber">${data.objectNumber}</span>
                </div>
                <div class="presenting-date">
                    <span>Year the painting was presented: <span class="date">${data.dating.presentingDate}</span></span>
                </div>
                <div class="colors"> 
                    <span>Colors:</span>
                     <ul>
                        <!--
                            loop through the colors in the array and place them in a li tag
                            used .join('') on the map to remove apostrophe
                        -->
                        ${dataModule.getColors(data).map(hex => {
                            return `<li class="hex-color" style="background-color: ${hex}">${hex}</li>`
                        }).join('')}
                     </ul>
                </div>
            </div>
        </section>
    `;

        main.insertAdjacentHTML('afterend', html);
    },

    /**
     * Function to render content that has no colors defined.
     *
     * @param data
     */
    detailsNoColors: function (data) {
        const html = `
            <section data-route="${data.objectNumber}">
                <div class="object">
                    <div class="title">
                        <h3 class="title-name">${data.title}</h3>
                        <span class="title-objectnumber">${data.objectNumber}</span>
                    </div>
                    <div class="presenting-date">
                        <span>Year the painting was presented: <span class="date">${data.dating.presentingDate}</span></span>
                    </div>
                    <div class="colors">
                        <span>Colors: </span><span class="not-defined">not defined</span>
                    </div>
                </div>
            </section>
        `;

        main.insertAdjacentHTML('afterend', html);
    },

    /**
     * No data found html renderer
     */
    noData: function () {
        const html = `
        <div><span>Oeps! Het ziet er naar uit dat deze schilder niet bestaat. Check voor de zekerheid of je de naam goed gesachreven hebt.</span></div>
    `;

        objects.insertAdjacentHTML('beforeend', html);
    }

};