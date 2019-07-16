// pages/exchange/exchange.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
var app =getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        NAV_BACK: app.share.NAV_BACK,
        NAV_REDIRECT: app.share.NAV_REDIRECT,        
        nav: app.alert.NAV_BACK,
        store_uuid: "",

        isLoading: !true,
        detailList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this

        // 初始化导航，店铺数据
        GP.setData({
            nav: options.nav || GP.data.nav,
            store_uuid: options.store_uuid || GP.data.store_uuid,
        })
       
        GP.getStoreDetail(options)
    },
    getStoreDetail(options) {
        var store_uuid = options.store_uuid
        db.storeInfo(store_uuid).then(store => {
            GP.setData({
                store: store,
            })
            db.storeDetail(
                "share",
                store_uuid
            ).then(detailList => {
                // var pages = getCurrentPages()
                // var prevPage = pages[pages.length - 2]
                // var store = prevPage.data.store
                GP.setData({
                    isLoading: false,
                    detailList: detailList,
                    // store: store,
                })
            })
        })     
       
    },
    
    // 重定向返回店铺列表
    back(){
        wx.redirectTo({
            url: `/pages/store/store?store_uuid=${GP.data.store_uuid}`,
        }) 
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (e) {
        console.log(e)
        console.log(GP.data)
        if (e.from == 'button')
            return {
                title: GP.data.store.share_title + `（分享券有效期至：${e.target.dataset.valid_time}）`,
                path: e.target.dataset.path,
                imageUrl: GP.data.store.share_logo,
            }
            
    }
})