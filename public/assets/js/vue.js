let store = new Vue({
    el: "#app",
    data: { 
        lessons: {},
        users: {},
        cart:[],
        showLesson:true,
        loggedIn:true,
    },

    created: function () {
      this.fetchLessonData();
      this.fetchUserData();
    },

    methods: {
        fetchLessonData() {
            fetch("https://cst3145-cw2-ginters.herokuapp.com/lessons").then((response) => {
                response.json().then((data) => {
                    store.lessons = data;
                });
            });
        },

        fetchUserData() {
            fetch("https://cst3145-cw2-ginters.herokuapp.com/users").then((response) => {
                response.json().then((data) => {
                    store.users = data;
                });
            });
        },

        addToCart: function(product) {
            this.cart.push(product);
            product.spaces -= 1;
        }, 

        removeItem: function(product) {
            let index = this.cart.indexOf(product);
            this.cart.splice(index, 1);
            product.spaces += 1;
        },
    },
});