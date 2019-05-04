
// pages/list/list.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
var interval

var CODE_SYS_SUCCESS   = 100001
var CODE_SCORE_SUCCESS = 102001
var CODE_PRIZE_SUCCESS = 103001
var CODE_SHARE_SUCCESS = 104000
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showBack:false,
        store:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.getStoreData(options)
        GP.interval()
        GP.isShowBack()
    },
    isShowBack(){
        var pages = getCurrentPages()
        if(pages.length == 1)
            GP.setData({showBack:true})
    },
    back(){
        wx.redirectTo({
            url: '/pages/list/list',
        })
    },

    interval(){
        interval = setInterval(function () {
            db.refresh().then(res => {
                // var message = res.message
                var data = res.data

                var infoList = data.info_list
                if (infoList == null) return
                for (var i=0;i<infoList.length;i++){
                    var msg = infoList[i]
                    wx.showModal({
                        title: msg.title,
                        content: msg.content,
                        success() {
                            if (msg.code == CODE_SCORE_SUCCESS || msg.code == CODE_PRIZE_SUCCESS ) {
                                var pages = getCurrentPages()
                                var currentPage = pages[pages.length - 1]                                
                                if (currentPage.__route__ == "pages/qrcode/qrcode"){
                                    var prePage = pages[pages.length - 2]
                                    prePage.updateStoreData()
                                    wx.navigateBack({})
                                } else if (currentPage.__route__ == "pages/store/store") {
                                    currentPage.updateStoreData()
                                }                                    
                            }
                            if ( msg.code == CODE_SHARE_SUCCESS){
                                GP.toShare()
                                // wx.navigateTo({
                                //     url: '/pages/share/share',
                                // })
                            }
                        },
                    })
                }
                console.log(res)
            })
        }, 4000)
    },

    // 刷新店铺数据
    updateStoreData(){
        var store_uuid = GP.data.store.uuid
        db.storeData(store_uuid).then(res => {
            GP.setData({
                data: res.data
            })
        })
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
            wx.setNavigationBarTitle({
                title: store.title
            })
            db.storeData(store_uuid).then(res=>{
                GP.setData({
                    store: store,
                    data: res.data
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
            url: `/pages/qrcode/qrcode?mode=score&store_uuid=${GP.data.store.uuid}`,
        })
    },   // 到集点二维码
    toExchangeQR() {
        wx.navigateTo({
            url: `/pages/qrcode/qrcode?mode=prize&store_uuid=${GP.data.store.uuid}`,
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})