export let router = {
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
        if(document.querySelector('section[data-route].active')){
            document.querySelector('section[data-route].active').classList.remove('active');
        }
        let activeSection = document.querySelector(`[data-route=${route}]`);
        // console.log(activeSection);
        activeSection.classList.add('active');
    }
};



