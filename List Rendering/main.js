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
                color: "green"
            },
            {
                id: 2235,
                color: "blue"
            }
        ]
    }
})