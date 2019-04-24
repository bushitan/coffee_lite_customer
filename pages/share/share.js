// pages/exchange/exchange.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLoading: true,
        prizeList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this

        GP.getStoreDetail(options)
        // action_score.getScorePrize(wx.getStorageSync(API.USER_ID)).then(res => {
        //     console.log(res)
        //     GP.setData({
        //         isLoading:false,
        //         scoreList: res.score.data,
        //         prizeList: res.prize.data,
        //         shareList: res.share.data
        //     })
        // })
    },
    async getStoreDetail(options) {
        var store_uuid = options.store_uuid
        detailList = await db.storeDetail(
            "share",
            store_uuid
        )

        var pages = getCurrentPages()
        var prevPage = pages[pages.length - 2]
        var store = prevPage.data.store
        GP.setData({
            isLoading: false,
            detailList: detailList,
            store: store,
        })

        // // console.log(list)
        // detail = await db.storeDetail(store_uuid)

        // GP.setData({
        //     store: store,
        //     detail: detail
        // })
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