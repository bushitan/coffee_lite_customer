//app.js
App({
    onLaunch: function (options) {
        console.log("[onLaunch] 本次场景值:", options.scene)
        this.globalData.scene = options.scene
    },
    globalData: {
        userInfo: null,
        scene:1001
    },

    // 
    code :{
        CODE_SHARE_SUCCESS: 104000,
        CODE_SHARE_AUTO_ERROR: 104008,
        CODE_SHARE_AUTO_TIME_OUT: 104009,
    },
    // route页面
    route: {
        MODE_NORMAL: "normal", // 小程序首页进入
        MODE_STORE: "store", // 店铺扫码
        MODE_SHARE: "share", // 领取好友分享
        MODE_AUTO_SHARE: "sh", //自助领券
    },


    
    // 提示框
    alert: {
        STATUS_SUCCESS: "status_success",
        STATUS_FAIL: "status_fail",
        MODE_SCORE: "mode_score",
        MODE_SHARE: "mode_share",
        MODE_PRIZE: "mode_prize",
        NAV_BACK: "nav_back",
        NAV_REDIRECT: "nav_redirect",

        // 跳转初始化
        baseUrl(obj) {
            var status = obj.status || this.STATUS_SUCCESS
            var mode = obj.mode || this.MODE_SCORE
            var nav = obj.monavde || this.NAV_BACK
            var store_uuid = obj.store_uuid || ""
            var title = obj.title || ""
            var content = obj.content || ""
            var url = `/pages/alert/alert?`
                + `status=${status}`
                + `&mode=${mode}`
                + `&nav=${nav}`
                + `&store_uuid=${store_uuid}`
                + `&title=${title}`
                + `&content=${content}`
            return url
        },
        redirect(obj) { wx.redirectTo({url: this.baseUrl(obj)}) },  //重定向
        navigate(obj) { wx.navigateTo({ url: this.baseUrl(obj) }) }, //跳转
    }



})