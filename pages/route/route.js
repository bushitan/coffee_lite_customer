// pages/user/user.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
var RouteUtils = require('routeUtils.js')
var routeUtils = new RouteUtils()
var app = getApp()
var options
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isShowLogin:false,
        isReload:false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (_options) {
        GP = this
        
        GP.login()
        options = _options
        // debugger

    },    

    // 登陆获取用户信息
    login(){
        wx.showLoading({
            title: '加载中...',
        }) 
        // API
        db.login().then(userInfo =>{
            // console.log(userInfo)
            wx.setStorageSync(API.USER_INFO, userInfo)
            wx.setStorageSync(API.UUID, userInfo.uuid)
            wx.setStorageSync(API.OPEN_ID, userInfo.wx_openid)
            // GP.setData({
            //     options: options
            // })
            wx.hideLoading()

            // 新版本，不需要登陆了
            GP.nav()

            // // API 旧版本，需要点击登陆才有下一步
            // routeUtils.checkHasAuth().then(isHasAuth => {
            //     if (isHasAuth)
            //         GP.nav()
            //     else
            //         GP.setData({ isShowLogin: true })
            // })
        }).catch( res => {
            wx.hideLoading()
            GP.setData({ isReload:true})
        })

    },

    nav(){
        // var options = GP.data.options
        // var options = options
        if (options.hasOwnProperty('mode')){
            var store_uuid = options.store_uuid
            if (options.mode == app.route.MODE_SHARE) { 
                routeUtils.modeShare(store_uuid,options.share_uuid)  // share 模式
                return
            } else {
                routeUtils.modeStore(store_uuid)    // store 模式
                return
            }       
        } if (options.hasOwnProperty('scene') ){  
            // 扫码自动领优惠券操作
            const scene = decodeURIComponent(options.scene) 
            console.log(scene)
            // debugger
            var sceneList = scene.split('_')
            var mode = sceneList[0]
            if (mode == app.route.MODE_AUTO_SHARE)
                routeUtils.modeAuto(sceneList[0], sceneList[1], 
                    sceneList[2], sceneList[3])//auto_share 模式
            else if (mode == app.route.MODE_WM)
                routeUtils.modeWm( sceneList[1])//外卖 模式
            return
        }
        else {
            routeUtils.modeNormal() //normal 模式return
            return            
        }
    },

    //获取\更新用户头像信息
    onGetUserInfo: function (e) {
        if (!this.logged && e.detail.userInfo) {
            db.userUpdate(e.detail.userInfo).then( res => {
                GP.nav()
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        return app.onShareAppMessage(res)
    }
})




















// nav(){
//     var options = GP.data.options

//     if (options.hasOwnProperty('mode')) {
//         var store_uuid = options.store_uuid
//         if (options.mode == app.route.MODE_SHARE) { // share 模式
//             routeUtils.modeStore(store_uuid)
//             // TODO 查询分享结果
//             // db.storeShare(options.share_uuid).then(res => {
//             //     var message = res.message
//             //     var data = res.data
//             //     wx.showModal({
//             //         title: message.title || "",
//             //         content: message.content || "",
//             //     })
//             //     GP.toStore(store_uuid)
//             // })
//         } else {
//             routeUtils.modeStore(store_uuid)
//         }
//     } if (options.hasOwnProperty('scene')) {  //auto_share 模式
//         // 扫码自动领优惠券操作
//         const scene = decodeURIComponent(options.scene)
//         var sceneList = scene.split('_')
//         routeUtils.modeAuto(sceneList[0], sceneList[1], sceneList[2], sceneList[3])
//     }
//     else
//         routeUtils.modeNormal()
// },
/*******导航**********/

// toStore(store_uuid) {
//     wx.redirectTo({
//         url: `/pages/store/store?store_uuid=${store_uuid}`,
//     })
// },


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