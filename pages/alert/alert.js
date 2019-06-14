// pages/list/list.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        STATUS_SUCCESS: app.alert.STATUS_SUCCESS,
        STATUS_FAIL: app.alert.STATUS_FAIL,
        MODE_SCORE: app.alert.MODE_SCORE,
        MODE_SHARE: app.alert.MODE_SHARE,
        MODE_PRIZE: app.alert.MODE_PRIZE,
        NAV_BACK: app.alert.NAV_BACK,
        NAV_REDIRECT: app.alert.NAV_REDIRECT,



        status: app.alert.STATUS_SUCCESS, // true成功，fail失败
        mode: app.alert.MODE_SCORE, //
        nav: app.alert.NAV_BACK,
        store_uuid: "",
        title: "",
        content: "",

        imgUrls: [
            'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
            'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.redirect
        GP = this
        // debugger
        GP.setData({
            status: options.status || GP.data.status, 
            mode: options.mode || GP.data.mode,
            nav: options.nav || GP.data.nav,
            store_uuid: options.store_uuid || GP.data.store_uuid,
            title: options.title || GP.data.title,
            content: options.content || GP.data.content,
        })
    },

    // 点击关注更多按钮
    more() {
        // TODO 打开探店小地图
    },

    // 点击返回按钮
    back() {
        // TODO 根据nav， store_uuid ，返回页面
        if (GP.data.nav == app.alert.NAV_BACK) GP.navBack()
        else GP.redirectToStore()
    },

    navBack(){
        wx.navigateBack({           
        })
    },
    navToStore(e) {
        // var store_uuid = e.currentTarget.dataset.store_uuid
        wx.navigateTo({
            url: `/pages/store/store?store_uuid=${GP.data.store_uuid}`,
        })
    },

    redirectToStore(){
        wx.redirectTo({
            url: `/pages/store/store?store_uuid=${GP.data.store_uuid}`,
        })  
    },


    clickSwiper(e){
        var index = e.currentTarget.dataset.index
        console.log(index)
    },


})