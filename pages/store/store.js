
// pages/list/list.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
var interval
Page({

    /**
     * 页面的初始数据
     */
    data: {
        store:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.getStoreData(options)
        GP.interval()
    },
    interval(){
        interval = setInterval(function () {
            db.refresh().then( res =>{
                console.log(res)
            })
        }, 4000)
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("onUnload")
        clearInterval(interval)
        console.log(interval)
    },

    // 获取门店数据 
    // 绑定客户与门店的关系
    getStoreData(options){
        var store_uuid = options.store_uuid
        // API
        db.storeInfo(store_uuid).then(store => {
        // API
            db.storeData(store_uuid).then(data=>{
                GP.setData({
                    store: store,
                    data: data
                })
            })
        })       
    },

    toExchange(){
        wx.navigateTo({
            url: `/pages/exchange/exchange?store_uuid=${GP.data.store.uuid}`
        })
    },
    toShare() {
        wx.navigateTo({
            url: `/pages/share/share?store_uuid=${GP.data.store.uuid}`
        })
    },
    // 去到定位页面
    toAddress() {
        wx.openLocation({
            name: GP.data.store.title,
            address: GP.data.store.address,
            latitude: GP.data.store.latitude,
            longitude: GP.data.store.longitude,
            scale: 18
        })

    },
    // 到集点二维码
    toQR() {
        wx.navigateTo({
            url: '/pages/qrcode/qrcode?mode=score',
        })
    },   // 到集点二维码
    toExchangeQR() {
        wx.navigateTo({
            url: '/pages/qrcode/qrcode?mode=prize',
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})