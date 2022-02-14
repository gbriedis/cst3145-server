new Vue ({
    el: '#vue',
    data : {
        showLesson:true,
        cart:[],
        shoppingCartIcon: "assets/img/shopping-cart.png",
        lessons: {},
        created: function () {
            this.fetchLessonData();
        },
        checkout: {
            name: "",
            phoneNumber: "",
            correct: false
        },
        ascendingDescending: 'ascending',
        sortType: 'price',
        searchValue: '',
    },
    methods: {
        fetchLessonData() {
            fetch("http://localhost:3000/lessons").then((response) => {
                response.json().then((data) => {
                    store.lessons = data; 
                })
            })
        },
        // add items to the shopping cart
        addToCart: function(product) {
            this.cart.push(product);
            product.spaces -= 1;
        }, 

        // booleon function to show/disable cart
        showCart: function() {
            this.showLesson = false;
        },

        // remove item from cart
        removeItem: function(product) {
            let index = this.cart.indexOf(product);
            this.cart.splice(index, 1);
            product.spaces += 1;
        },

        // sorting function, takes in which type of sort is needed
        sort(type) {
            this.sortType = type;
        },

        // alert for order completed
        alertOrder() {
            if(this.checkout.correct == true) {
                if(this.cart.length >= 1) {
                    alert("Order Completed")
                    this.cart = []
                }
                else {
                    alert("Add items to the cart")
                }
            }
        }
    },
    computed: {

        // validate checkout form
        validateOrder(){
            const nameRGEX = /^[A-Za-z]+$/;
            const phoneRGEX = new RegExp('^[0-9]+$');

            if (nameRGEX.test(this.checkout.name) && phoneRGEX.test(this.checkout.phoneNumber)) {
                this.checkout.correct = true;  
            }
            else { 
                return this.checkout.correct = false;
            }
            return this.checkout.correct;
        },

        // function to sort lessons  
        sortItems() {
            let tempLessons = this.lessons

            // search by title
            if (this.searchValue != '' && this.searchValue) {
                tempLessons = tempLessons.filter((item) => {
                  return item.subject.toUpperCase().includes(this.searchValue.toUpperCase())
                })
            }

            // sort by subject
            if(this.sortType === 'subject') {
                return tempLessons.sort((a,b) => {
                    let fa = a.subject.toLowerCase(), fb = b.subject.toLowerCase()

                    if(fa < fb) return -1;
                    if(fa > fb) return 1;
                    return 0;
                })
            }

            // sort by location
            else if (this.sortType == 'location') {
                return tempLessons.sort((a,b) => {
                    if(a.location < b.location) return -1;
                    if(a.location > b.location) return 1;
                    return 0;
                });
            }
            
            // sort by price
            else if(this.sortType === 'price') {
                return tempLessons.sort((a,b) => {
                    if(a.price < b.price) return -1;
                    if(a.price > b.price) return 1;
                    return 0;
                });
            }

            // sort by spaces
            else if(this.sortType === 'spaces') {
                return tempLessons.sort((a,b) => {
                    if(a.spaces < b.spaces) return -1;
                    if(a.spaces > b.spaces) return 1;
                    return 0;
                });
            }
            return tempLessons
        },

        // ascending/descending function
        upDown() {
            if(ascendingDescending == 'descending') {
                this.lessons.reverse()
            }
        }
    },
})