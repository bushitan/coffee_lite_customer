// pages3/ad/ad.js

var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stats:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },

    async onInit(){
        var res = await app.dbAD.getRecord({
            // "mode": app.dbAD.AD.RECORD_STORE,
            // "adID": ad._id,
            // "storeUUID": this.data.storeUUID,
        })

        this.setData({
            stats: res.data
        })
        console.log(res.data)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})