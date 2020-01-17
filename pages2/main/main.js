// pages2/main/main.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        userInfo: {
            id: '202232',
            name: 'fengef',
            allScoreNum: 1,
            allPrizeNum: 1,
            allStoreNum: 1,
        },
        storeList: [
            {
                storeUUID: "2",  //广告所在店铺
                storeName: "StrongCoffee", //店铺名称
                storeLogo: "http://img.12xiong.top/coffee_image/upload/IGyXK6fZ.jpg", //店铺logo
                storeDes: "满6杯赠30元内饮品一杯",  //店铺活动描述
                storeMinScore: 6,  //店铺起始兑换点数
                storeMaxScore: 10,  //店铺最高兑换点数
                myScore: 1,    //此店铺已经集的点数
            },
            {
                storeUUID: "3",  //广告所在店铺
                storeName: "StrongCoffee", //店铺名称
                storeLogo: "http://img.12xiong.top/coffee_image/upload/IGyXK6fZ.jpg", //店铺logo
                storeDes: "满6杯赠30元内饮品一杯",  //店铺活动描述
                storeMinScore: 6,  //店铺起始兑换点数
                storeMaxScore: 10,  //店铺最高兑换点数
                myScore: 1,    //此店铺已经集的点数
            },
            {
                storeUUID: "4",  //广告所在店铺
                storeName: "StrongCoffee", //店铺名称
                storeLogo: "http://img.12xiong.top/coffee_image/upload/IGyXK6fZ.jpg", //店铺logo
                storeDes: "满6杯赠30元内饮品一杯",  //店铺活动描述
                storeMinScore: 6,  //店铺起始兑换点数
                storeMaxScore: 10,  //店铺最高兑换点数
                myScore: 1,    //此店铺已经集的点数
            },
        ],




        cardCur: 0,
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        }, {
            id: 1,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
        }, {
            id: 2,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        },],
    },

    // cardSwiper
    cardSwiper(e) {
        this.setData({
            cardCur: e.detail.current
        })
    },

    /**
     * @method 去商铺
     */
    toStore(e){
        var storeUUID = e.currentTarget.dataset.store_uuid
        console.log(storeUUID)
        wx.redirectTo({
            url: '/pages2/store/store',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.login({
            success(e){
                console.log(e)
            },
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})