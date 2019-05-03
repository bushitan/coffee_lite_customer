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
    },
    getStoreDetail(options) {
        var store_uuid = options.store_uuid
        db.storeDetail(
            "share",
            store_uuid
        ).then(detailList=>{
            var pages = getCurrentPages()
            var prevPage = pages[pages.length - 2]
            var store = prevPage.data.store
            GP.setData({
                isLoading: false,
                detailList: detailList,
                store: store,
            })
        })
    },
    
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (e) {
        console.log(e)
        if (e.from == 'button')
            return {
                title: GP.data.store.title + '的分享券',
                path: e.target.dataset.path,
                imageUrl: GP.data.store.logo,
            }
    }
})