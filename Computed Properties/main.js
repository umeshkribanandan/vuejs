var app = new Vue({
    el: '#app',
    data: {
        brand: "Vue Mastery",
        product: "Socks",
        description: "All about Socks",
        selectedVariant: 0,
        link: "https://www.vuemastery.com/",
        inventory: 110,
        details: ["80% cotton", "20% polyster", "Gender-neutral"],
        sizes:["Large", "Medium", "Small"],
        variants: [
            {
                id: 2234,
                color: "green",
                image: "./images/vmSocks-green-onWhite.jpg",
                quantity: 100
            },
            {
                id: 2235,
                color: "blue",
                image: "./images/vmSocks-blue-onWhite.jpg",
                quantity: 0
            }
        ],
        cart: 0
    },
    methods:{
        addToCart: function() {
            this.cart += 1;
        },
        updateProduct(index){
            this.selectedVariant = index;
        },
        removeFromCart(){
            if( this.cart ===0)
                this.cart = 0;
            else 
                this.cart -= 1;
        }
    },
    computed:{
        title(){
            return this.brand + ' ' + this.product;
        },
        image(){
            return this.variants[this.selectedVariant].image;
        },
        onSale(){
            console.log(this.selectedVariant);
            return this.variants[this.selectedVariant].quantity ? true : false;
        }

    }
})