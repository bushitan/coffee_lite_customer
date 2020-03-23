 // pages2/main/main.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        sn:"",
        userInfo: {
            // id: '202232',
            // name: 'fengef',
            // allScoreNum: 1,
            // allPrizeNum: 1,
            // allStoreNum: 1,
        },
        storeList: [
            // {
            //     storeUUID: "2",  //广告所在店铺
            //     storeName: "StrongCoffee", //店铺名称
            //     storeLogo: "http://img.12xiong.top/coffee_image/upload/bemXA6fZ.jpg", //店铺logo
            //     storeDes: "满6杯赠30元内饮品一杯",  //店铺活动描述
            //     storeMinScore: 6,  //店铺起始兑换点数
            //     storeMaxScore: 10,  //店铺最高兑换点数
            //     myScore: 1,    //此店铺已经集的点数
            // },
        ],




        cardCur: 0,
        swiperList: [
        //     {
        //     id: 0,
        //     type: 'image',
        //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        // }, {
        //     id: 1,
        //     type: 'image',
        //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
        // }, {
        //     id: 2,
        //     type: 'image',
        //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        // },
        ],
    },

    // cardSwiper
    cardSwiper(e) {
        this.setData({
            cardCur: e.detail.current
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },

    async onInit() {
        
        var sn = wx.getStorageSync(app.db.KEY_SN)
        var userInfo = await app.db.sysMyGetInfo()
        var storeList = await app.db.storeMyGetStoreInfo()


        this.setData({
            sn:sn,
            userInfo: userInfo,
            storeList: storeList,
        })
        // console.log(my,store)
        // debugger
    },



    /**
     * @method 去商铺
     */
    toStore(e) {
        var storeUUID = e.currentTarget.dataset.store_uuid
        console.log(storeUUID)
        wx.navigateTo({
            url: '/pages2/store/store?storeUUID=' + storeUUID,
        })
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})