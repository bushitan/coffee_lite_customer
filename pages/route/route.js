// pages/user/user.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
var RouteUtils = require('routeUtils.js')
var routeUtils = new RouteUtils()
var app = getApp()

// 进入店铺
// pages/route/route?mode=store&&store_uuid=ff1f7ada-63d8-11e9-a3f6-b83312f00bac

// 点击分享券，进入店铺集点
// pages/route/route?mode=share&store_uuid=68e54718-7156-11e9-b456-e95aa2c51b5d&share_uuid=c024b862-72c4-11e9-be1f-e95aa2c51b5d

// 扫码直接领分享券,短链接，
//  scene= sh自助积分_店铺id_sellerid_unix结束时间  ( sh分享， sc积分 )
// pages/route/route?scene=sh_1_1_1559939515

    // scan 函数扫描结果
    // res = {
    //     charSet:"utf-8",
    //     errMsg:"scanCode:ok",
    //     path:"pages/route/route?scene=sh_1_1_1559939515",
    //     rawData:"bGIxbCtOcmk6b35qI2JkczlEeUJrWC5fMTU1OTkyNTgyMw==",
    //     result:"",
    //     scanType:"WX_CODE",
    // }

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShowLogin:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        wx.showLoading({
            title: '加载中...',
        }) 
        GP.login(options)


    },    

    // 登陆获取用户信息
    login(options){
        // API
        db.login().then(userInfo =>{
            console.log(userInfo)
            wx.setStorageSync(API.UUID, userInfo.uuid)
            wx.setStorageSync(API.OPEN_ID, userInfo.wx_openid)
            GP.setData({
                options: options
            })
            wx.hideLoading()
            // API
            GP.checkHasAuth().then(isHasAuth => {
                if (isHasAuth)
                    GP.nav()
                else
                    GP.setData({ isShowLogin: true })
            })
        })

    },

    nav(){
        var options = GP.data.options
        
        if (options.hasOwnProperty('mode')){
            var store_uuid = options.store_uuid
            if (options.mode == "share") { // share 模式
                // TODO 查询分享结果
                db.storeShare(options.share_uuid).then(res => {
                    var message = res.message
                    var data = res.data
                    wx.showModal({
                        title: message.title || "",
                        content: message.content || "",
                    })
                    GP.toStore(store_uuid)
                })
            } else {
                GP.toStore(store_uuid)
            }       
        } if (options.hasOwnProperty('scene') ){  //auto_share 模式
            // 扫码自动领优惠券操作
            const scene = decodeURIComponent(options.scene) 
            var sceneList = scene.split('_')
            routeUtils.modeAuto(sceneList[0], sceneList[1], sceneList[2], sceneList[3])
        }
        else
            routeUtils.modeNormal()
    },






    /*******导航**********/

    toStore(store_uuid) {
        wx.redirectTo({
            url: `/pages/store/store?store_uuid=${store_uuid}`,
        })  
    },





    // 检测是否用户授权
    checkHasAuth() {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success(res) {
                    console.log(res.authSetting)
                    resolve(res.authSetting.hasOwnProperty("scope.userInfo"))
                }
            })
        })
    },


    //获取\更新用户头像信息
    onGetUserInfo: function (e) {
        if (!this.logged && e.detail.userInfo) {
            db.userUpdate(e.detail.userInfo).then( res => {
                GP.nav()
            })
        }
    },





    checkShare(options){
        if (options.hasOwnProperty("is_share"))
            wx.setStorageSync(API.SHARE_SCORE_ID, options.score_id)
    },

    // 检测是否用户授权
    checkUserInfo(){
        return new Promise( (resolve,reject)=>{
            wx.getSetting({
                success(res) {
                    console.log(res.authSetting)
                    resolve(res.authSetting.hasOwnProperty("scope.userInfo"))
                }
            })
        })
        
    },



    // 检查是否登录
    loginCheck(){
        action_user.login().then( userInfo => {
            wx.setStorageSync(API.USER_ID, userInfo._id)
            wx.setStorageSync(API.OPEN_ID, userInfo._openid)
            wx.setStorageSync(API.USER_INFO, userInfo)
            GP.toScore()  //集点卡
            // GP.toMy()  //群相册
        })
    },


    // 跳到我的页面
    toScore() {
        GP.checkUserInfo().then(res => {
            if (res)
                wx.redirectTo({ url: '/pages/menu/menu', })
            else
                wx.redirectTo({ url: '/pages/g_info/g_info', })
        })
        // return
    },

    // 跳到我的页面
    toMy(){
        GP.checkUserInfo().then( res=>{
            if (res) 
                wx.redirectTo({url: '/pages/g_my/g_my',})
            else
                wx.redirectTo({ url: '/pages/g_info/g_info', })
        })
        // return
       
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})





/*******自助领券**********/
// auto(mode, store_id, seller_id, unix){
//     // 菊花码过期
//     var current_unix = Math.round(new Date().getTime() / 1000)
//     console.log(current_unix, unix, current_unix - unix)
//     if (mode == "sh") { //分享模式
//         db.scanAutoShareCustomer(store_id, seller_id, unix).then(res => {
//             console.log(res)
//             var store = res.data
//             if (res.message.code == app.code.CODE_SHARE_SUCCESS) {
//                 // TODO 跳转到分享页面
//             }
//             // storeUtils.scanSuccess(res.message.title, GP.data.store.uuid)
//             else if (res.message.code == app.code.CODE_SHARE_AUTO_TIME_OUT) { //已超时
//                 app.alert.redirect({
//                     status: app.alert.STATUS_FAIL,
//                     mode: app.alert.MODE_SHARE,
//                     nav: app.alert.NAV_REDIRECT,
//                     store_uuid: store.uuid,
//                     title: res.message.title,
//                     content: res.message.content,
//                 })
//             }
//             else {
//                 app.alert.redirect({
//                     status: app.alert.STATUS_FAIL,
//                     mode: app.alert.MODE_SHARE,
//                     nav: app.alert.NAV_REDIRECT,
//                     store_uuid: store.uuid,
//                     title: res.message.title,
//                     content: res.message.content,
//                 })
//             }
//         })
//     }
// },