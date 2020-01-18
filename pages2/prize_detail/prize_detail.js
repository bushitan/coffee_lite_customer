// pages2/prize_detail/prize_detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        scoreList: [
            {
                storeUUID: "prizeUUID",  //广告所在店铺
                createTime: "2020-2-3"
            },
            {
                storeUUID: "2",  //广告所在店铺
                storeName: "StrongCoffee", //店铺名称
                storeLogo: "", //店铺logo
                storeDes: "满6杯赠30元内饮品一杯",  //店铺活动描述
                storeMinScore: 6,  //店铺起始兑换点数
                storeMaxScore: 10,  //店铺最高兑换点数
                myScore: 1,    //此店铺已经集的点数
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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