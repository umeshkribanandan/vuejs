Vue.component('product',{
    props:{
        premium:{
            type: Boolean,
            required: true
        },
        details:{
            type: Array,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image" :alt="description"/>
        </div>
        <div class="product-info">
            <h1>{{title}}</h1>
            <p v-if="inventory > 10" :class="{strike:!onSale}"> In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
            <p v-else> Out of Stock</p>
            <p v-show="onSale">On Sale!!!</p>
            <p>Shipping: {{ shipping}}</p>
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>
            <ul>
                <li v-for="size in sizes">{{size}}</li>
            </ul>
            <div 
                v-for="(variant, index) in variants" 
                :key="variant.id"
                class="color-box"
                :style="{backgroundColor: variant.color}"
                @mouseover="updateProduct(index)"
            >
            </div>
            <button 
                v-on:click="addToCart"
                class="button"
                :disabled="!onSale"
                :class="{disabledButton:!onSale}"
            >
                Add to Cart
            </button>
            <button 
                v-on:click="removeFromCart"
                class="button"
                :disabled="!onSale"
                :class="{disabledButton:!onSale}"
            >
                Remove from Cart
            </button>
        </div>
        <span><a :href="link">Vue Mastery</a></span>
        </div>`,
    data(){
        return {
            brand: "Vue Mastery",
            product: "Socks",
            description: "All about Socks",
            selectedVariant: 0,
            link: "https://www.vuemastery.com/",
            inventory: 110,
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
            ]
        }
    },
    methods:{
        addToCart: function() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        updateProduct(index){
            this.selectedVariant = index;
        },
        removeFromCart(){
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
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
        },
        shipping(){
            if(this.premium)
                return 'Free';
            return '2.99';
        }

    }
})

var app = new Vue({
    el: '#app',
    data:{
        premium: true,
        cart: []
    },
    methods:{
        addToCart: function(id) {
            this.cart.push(id);
        },
        removeFromCart(id){
            this.cart.splice(this.cart.indexOf(id),1);
        }
    },
})