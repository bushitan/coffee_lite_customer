// pages2/store/store.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        storeUUID:"",
        store:{
            // uuid:"68e54718-7156-11e9-b456-e95aa2c51b5d",
            // name:"Seeking",
            // logo: "http://img.12xiong.top/coffee_image/upload/bemXA6fZ.jpg",
            // summary:"外卖到店兑换，[买6送1]",
            // start_time:"2019-6-6",
            // end_time: "2020-6-5",
            // prizeCoverImage: "http://img.12xiong.top/coffee_image/upload/GAaYC6fZ.jpg",
            // // prizeCoverImageList: ["http://img.12xiong.top/coffee_image/upload/GAaYC6fZ.jpg"],
            // prizeCoverImageList: [],
            // // prizeCoverImage: "",
        },

        // myScore:5,
        // max:10,




        cardCur: 0,
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'https://mmbiz.qpic.cn/mmbiz_jpg/49qhzgz5ydzb8eRMXLDW2dubxnRYVEy8hkaV67hboiaNtqgK862ecCtAXRQZuWRibQlYmtHnbx5r30O8cvibBuZNA/0?wx_fmt=jpeg'
        }, {
            id: 1,
            type: 'image',
                url: 'https://mmbiz.qpic.cn/mmbiz_jpg/49qhzgz5ydyxfDRsLoEkXugwZ0SoSwVdRzDIwBmYA23eNLyA6YaFBvwcicTzDmkFqbhm0DsA6Asb553ThaPyU5A/0?wx_fmt=jpeg',
        }, {
            id: 2,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }, {
            id: 3,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        }, 
        ],


        basicsList: [{
            icon: 'usefullfill',
            name: '开始'
        }, {
            icon: 'radioboxfill',
            name: '等待'
        }, {
            icon: 'roundclosefill',
            name: '错误'
        }, {
            icon: 'roundcheckfill',
            name: '完成'
        },],
        basics: 0,
        numList: [{
            name: '开始'
        }, {
            name: '等待'
        }, {
            name: '错误'
        }, {
            name: '完成'
        },],
        num: 0,
        scroll: 0

    },





    /**********路由**********/
    // 打开集点码
    toScoreQR() {
        wx.navigateTo({ url: `/pages2/qrcode/qrcode?mode=score&storeUUID=${this.data.storeUUID}&storeName=${this.data.store.storeName}`, })
    },   
    // 到兑换二维码
    toExchangeQR() {
        wx.navigateTo({ url: `/pages2/qrcode/qrcode?mode=prize&storeUUID=${this.data.storeUUID}&storeName=${this.data.store.storeName}`, })
    },
    // 返回我的
    toMy(){
        wx.redirectTo({
            url: '/pages2/self/self',
        })
    },
    


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({ storeUUID: options.storeUUID})
        this.onInit()
    },

    /**
     *  coverCollectScore: 0
        coverLimitTime: 0
        coverLiveTime: null
        defaultCoverBgImgUrl: null
        endTime: "2020-11-15 23:18:00"
        latitude: 0
        longitude: 0
        noticImageList: []
        startTime: "2019-11-16 23:18:00"
        storeDes: ""
        storeLoadImage: null
        storeLogo: "http://img.12xiong.top/coffee_image/upload/hwkYm6fZ.jpg"
        storeMaxScore: 0
        storeMinScore: 10
        storeName: "飞碟君"
        storeShopUrl: null
        storeSummary: "满10个飞碟，送1个13块钱内的"
     */
    async onInit(){
        var store = await app.db.storeGetStore({ storeUUID: this.data.storeUUID})
        store.startTime = store.startTime.split(" ")[0]
        store.endTime = store.endTime.split(" ")[0]

        store.storeMaxScore = 15
        store.scoreNum = 10

        this.setData({
            store:store
        })


        var customer = await app.db.storeCustomerGetStoreScore({ storeUUID: this.data.storeUUID })
        var ad = await app.db.adSysGetAdList({ storeUUID: this.data.storeUUID, type:1})
        this.setData({
            customer: customer,
            ad:ad,
        })

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },



    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})



// toAddress(){
//     wx.openLocation({
//         name: GP.data.store.title,
//         address: GP.data.store.address,
//         latitude: GP.data.store.latitude,
//         longitude: GP.data.store.longitude,
//         scale: 18
//     })
// },
