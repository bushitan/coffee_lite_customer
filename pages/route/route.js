// pages/user/user.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()


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
    async login(options){
        var userInfo = await db.login()
        console.log(userInfo)
        wx.setStorageSync(API.UUID, userInfo.uuid)
        wx.setStorageSync(API.OPEN_ID, userInfo.wx_openid)
        GP.setData({
            options:options
        })

        wx.hideLoading()
        var isHasAuth = await GP.checkHasAuth()
        if (isHasAuth)
            GP.nav()
        else
            GP.setData({ isShowLogin:true})

    },

    nav(){
        var options = GP.data.options
        if (options.hasOwnProperty('store_uuid'))
            wx.redirectTo({
                url: `/pages/store/store?store_uuid=${options.store_uuid}`,
            })
        else
            wx.redirectTo({
                url: `/pages/list/list`,
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