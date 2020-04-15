var eventBus = new Vue();

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
            
            <product-info-tabs
                :details="details"
                :sizes="sizes"
                :shipping="shipping"
            ></product-info-tabs>
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
        <review-tabs :reviews="reviews"></review-tabs>
        </div>`,
    data(){
        return {
            brand: "Vue Mastery",
            product: "Socks",
            description: "All about Socks",
            selectedVariant: 0,
            inventory: 110,
            sizes:["Large", "Medium", "Small"],
            reviews: [],
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
    },
    mounted(){
        eventBus.$on('review-submitted', review => {
            this.reviews.push(review);
        });
    }
});

Vue.component('product-info-tabs',{
    props:{
        sizes:{
            type: Array,
            required: true
        },
        details:{
            type: Array,
            required: true
        },
        shipping:{
            type: String,
            required: true
        }
    },
    template:`
        <div>
            <span 
                class="tab" 
                :class="{activeTab: selectedTab === tab}"
                v-for="(tab,index) in tabs" 
                :key="index"
                @click="selectedTab = tab"
                >
            {{tab}}
            </span>
            <div v-if="selectedTab == 'Details'">
                <ul>
                    <li v-for="detail in details">{{detail}}</li>
                </ul>
                <ul>
                    <li v-for="size in sizes">{{size}}</li>
                </ul>
            </div>
            <div v-if="selectedTab== 'Shipping'">
                <p>Shipping: {{ shipping}}</p>
            </div>
        </div>
    `,
    data(){
        return {
            tabs:["Details", "Shipping"],
            selectedTab: 'Details'
        }
    }
})

Vue.component('product-review', {
    props:'',
    template:`
        <form class="review-form" name="reviewForm" @submit.prevent="onSubmit">
            <div v-if="errors.length">
                <p>Errors are </p>
                <ul v-for="error in errors">
                    <li>{{error}}</li>
                </ul>
            </div>
            <p>
                <label>Name:</label>
                <input id="name" v-model="name" />
            </p>
            <p>
                <label>Review:</label>
                <textarea id="review" v-model="review"></textarea>
            </p>
            <p>
                <label>Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
            </p>
            <p>
                <label>Would you Recommend this Product</label>
                <p>
                    <input v-model="recommend" style="display:inline;width:5%" type="radio" value="Yes" >Yes 
                    <input v-model="recommend" style="display:inline;width:5%" type="radio" value="No" >No 
                </p>
            </p>
            <p>
                <input type="submit" value="Submit Review" />
            </p>
        </form>
    `,
    data(){
        return {
            name: null,
            review:  null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods:{
        onSubmit(){
            this.errors= [];
            if(this.name  && this.review  && this.rating && this.recommend){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                eventBus.$emit('review-submitted', productReview );
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;
            } else {
                if(!this.name) this.errors.push('Please provide Name');
                if(!this.review) this.errors.push('Please provide Review');
                if(!this.rating) this.errors.push('Please provide Rating');
                if(!this.recommend) this.errors.push('Please provide recommendation');
            }
            
            //process
        }
    }
})

Vue.component('review-tabs',{
    props:{
        reviews:{
            type:Array,
            required: true
        }
    },
    template:`
        <div>
            <span 
                class="tab" 
                :class="{activeTab: selectedTab === tab}"
                v-for="(tab,index) in tabs" 
                :key="index"
                @click="selectedTab = tab"
                >
            {{tab}}
            </span>
            <div v-if="selectedTab== 'Reviews'">
                <p v-if="!reviews.length">There are no reviews</p>
                <div v-for="review in reviews">
                    <p>{{review.review}}</p>
                    <p>By {{review.name}} Rating: {{review.rating}}</p>
                    <p>Recommend {{review.recommend}} </p>
                </div>
            </div>
            <br/>
            <div v-if="selectedTab== 'Write a Review'">
                <product-review></product-review>
            </div>
        </div>
    `,
    data(){
        return {
            tabs:["Reviews", "Write a Review"],
            selectedTab: 'Reviews'
        }
    }
})

var app = new Vue({
    el: '#app',
    data:{
        link: "https://www.vuemastery.com/",
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