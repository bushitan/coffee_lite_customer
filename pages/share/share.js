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
        if (e.from == 'button'){
            
            var currentTime = Date.parse(new Date());
            var deadTime = e.target.dataset.valid_time
            var remainTime = GP.time(currentTime, deadTime)
            console.log(    )


            return {
                title: GP.data.store.share_title + `（${remainTime}内点击有效）`,
                path: e.target.dataset.path,
                imageUrl: GP.data.store.share_logo,
            }
        }          
    },

    
    time(faultDate, completeTime) {
        var stime = Date.parse(new Date(faultDate));
        var etime = Date.parse(new Date(completeTime));
        var usedTime = etime - stime;  //两个时间戳相差的毫秒数
        var days = Math.floor(usedTime / (24 * 3600 * 1000));
        //计算出小时数
        var leave1 = usedTime % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000));
        // var time = days + "天" + hours + "时" + minutes + "分";

        if (days == 0)
            if (hours == 0) 
                return minutes + "分钟" 
            else 
                return hours + "小时" 
        else  
            return days + "天"
    },


})