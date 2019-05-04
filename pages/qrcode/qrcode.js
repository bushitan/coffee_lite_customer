// pages/qrcode/qrcode.js
var API = require('../../api/api.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var mode = options.mode
        var store_uuid = options.store_uuid

        this.setMode(mode, store_uuid)
 
    },

    setMode(mode, store_uuid){
        var title, userQR
        if (mode == "score") {
            title = "向商家集点"
            userQR = `score,${wx.getStorageSync(API.UUID)},${store_uuid}`
        }
        else{
            title = "兑换咖啡"
            userQR = `prize,${wx.getStorageSync(API.UUID)},${store_uuid}`
        }
        this.setData({
            title:title,
            mode:mode,
            userQR: userQR
        })
    },
    
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})