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
        var mode = options.mode || "score"
        var store_uuid = options.store_uuid || ""
        var store_name = options.storeName || ""

        this.setMode(mode, store_uuid, store_name)
 
    },

    setMode(mode, store_uuid, store_name){
        var title, userQR
        if (mode == "score") {
            title = "集点码,请向店员出示此二维码集点"
            userQR = `score,${wx.getStorageSync(API.UUID)},${store_uuid}`
        }
        else{
            title = "兑换码,请向店员出示此二维码兑换"
            userQR = `prize,${wx.getStorageSync(API.UUID)},${store_uuid}`
            wx.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#1d2a6d',
                animation: {
                    duration: 400,
                    timingFunc: 'easeIn'
                }
            })
        }
        this.setData({
            title:title,
            mode:mode,
            userQR: userQR
        })
    },
    
})