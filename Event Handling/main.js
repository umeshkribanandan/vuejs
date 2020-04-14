var app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        description: "All about Socks",
        image: "./images/vmSocks-green-onWhite.jpg",
        link: "https://www.vuemastery.com/",
        inventory: 110,
        onSale: true,
        details: ["80% cotton", "20% polyster", "Gender-neutral"],
        sizes:["Large", "Medium", "Small"],
        variants: [
            {
                id: 2234,
                color: "green",
                image: "./images/vmSocks-green-onWhite.jpg"
            },
            {
                id: 2235,
                color: "blue",
                image: "./images/vmSocks-blue-onWhite.jpg"
            }
        ],
        cart: 0
    },
    methods:{
        addToCart: function() {
            this.cart += 1;
        },
        updateProduct(image){
            this.image = image
        },
        removeFromCart(){
            if( this.cart ===0)
                this.cart = 0;
            else 
                this.cart -= 1;
        }
    }
})