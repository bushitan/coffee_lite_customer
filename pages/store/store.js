
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

    async getStoreData(options){
        var store_uuid = options.store_uuid
        store = await db.storeInfo(store_uuid)
        // console.log(list)
        data = await db.storeData(store_uuid)

        GP.setData({
            store: store,
            data: data
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
    },

    
    // toExchange() {
    //     wx.navigateTo({
    //         url: `/pages/exchange/exchang?store_uuid=${GP.data.store.store_uuid}`
    //     })
    // },

    // toStore(e) {
    //     var store_uuid = e.currentTarget.dataset.store_uuid
    //     wx.navigateTo({
    //         url: `/pages/store/store?store_uuid=${store_uuid}`,
    //     })
    // },



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