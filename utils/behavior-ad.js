
var app
module.exports = Behavior({
    data: {
        sharedText: '',
        adList: [],
        adBanner:{},
    },
    methods: {
        sharedMethod: function () {
            // this.data.sharedText === 'This is a piece of data shared between pages.'
            this.setData({
                sharedText: "1324r354"
            })

            console.log("11", this.data.payPrice)
        },


    },

    ready(){
        app = getApp()
        var adList = [
            {
                url: "http://img.12xiong.top/coffee_image/upload/psSYv6fZ.jpg",
                type: "1",

                imageUrl: "http://img.12xiong.top/coffee_image/upload/psSYv6fZ.jpg",

                contentUrl: "",

                liteAppID: "",
                litePath: "",
                liteExtraData: "",
                liteEnvVersion: "",

                roomID: "",
            },
        ]

        var adBanner = {
            url: "http://img.12xiong.top/coffee_image/upload/psSYv6fZ.jpg",
            type: "1",

            imageUrl: "http://img.12xiong.top/coffee_image/upload/psSYv6fZ.jpg",

            contentUrl: "",

            liteAppID: "",
            litePath: "",
            liteExtraData: "",
            liteEnvVersion: "",

            roomID: "",
        }

        this.setData({
            adList: adList,
            adBanner:adBanner,
        })
    },




    // onLoad() {
    //     console.log("behavior onload")
    // },

    // created() {
    //     console.time()
    //     console.log("created")
    // },

    // attached() {
    //     console.log("attached")
    // },

    // ready() {
    //     app = getApp()

    //     console.log("ready")
    //     this.setData({
    //         adList: app.adList
    //     })
    //     console.timeEnd()
    // },
    // moved() {
    //     console.log("moved")
    // },

    // detached() {
    //     console.log("detached")
    // },
})