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
            fetch("http://localhost:3000/lessons").then((response) => {
                response.json().then((data) => {
                    store.lessons = data;
                });
            });
        },

        fetchUserData() {
            fetch("http://localhost:3000/user").then((response) => {
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

        login: function() {
            let mail = document.querySelector("input[name=email]").value
            let pw = document.querySelector("input[name=password]").value
            let userDetails = {email: mail, password: pw}
            
            fetch('http://localhost:3000/login', {
                method: 'POST'
            })
        }
    },
});