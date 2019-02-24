Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image" v-bind:alt="altText">
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inventory > 7">In Stock ({{ inventory }})</p>
            <p v-else-if="inventory > 0">Almost sold Out! ({{ inventory }} left)</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div v-for="(variant, index) in variants"
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateVariant(index)"
                >
            </div>

            <button
                :disabled="inventory <= 0"
                :class="{ disabledButton: inventory <= 0 }"
                v-on:click="addToCart(1)">Add to Cart</button>
            <button
                _disabled="cart < 0"
                _class="{ disabledButton: cart <= 0 }"
                v-on:click="addToCart(-1)">remove From Cart</button>

        </div>

        <product-review></product-review>
    </div>`,
    data() {
        return {
            brand: "Vue Mastery",
            product: "Socks",
            altText: "A pair of warm, fuzzy socks",
            details: ["80% cotton", "20% polyester", "Gender-natural"],
            variants: [
                {
                    variantId: 123,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks-green.png",
                    inventory: 10
                },
                {
                    variantId: 124,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue.png",
                    inventory: 0
                }
            ],
            variantIndex: 0
        }
    },
    methods: {
        addToCart(howMany) {
            this.$emit("add-to-cart", howMany)
        },
        updateVariant(index) {
            this.variantIndex = index;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.variantIndex].variantImage;
        },
        inventory() {
            return this.variants[this.variantIndex].inventory;
        },
        shipping() {
            if( this.premium ) {
                return "Free"
            }
            return 2.99
        }
    }
})

Vue.component('product-review', {
    template: `
        <input v-model="name">
    `,
    data() {
        return {
            name: null
        }
    }
})


var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: 0
    },
    methods: {
        addToCart(howMany) {
            console.log('howMany', howMany)
            // if(this.cart + howMany >= 0 && this.variants[this.variantIndex].inventory - howMany >= 0) {
            if(this.cart + howMany >= 0) {
                // this.variants[this.variantIndex].inventory -= howMany;
                this.cart += howMany;
            }
        }
    }
})