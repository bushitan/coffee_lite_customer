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

        CODE_SYS_SUCCESS : 100001,
        CODE_SCORE_SUCCESS : 102001,
        CODE_PRIZE_SUCCESS : 103001,
        /*****分享****/
        CODE_SHARE_SUCCESS: 104000,
        CODE_SHARE_SEND: 104001, //赠送成功
        CODE_SHARE_RECEIVE: 104002, //领取分享成功
        CODE_SHARE_NONE: 104003, //分享券不存在
        CODE_SHARE_USED: 104004, // 已领取
        CODE_SHARE_SELF: 104005, // 不能领取自己的券
        CODE_SHARE_LIMIT: 104006, // 限制期间，重复领取
        CODE_SHARE_VALID: 104007, //券已过期
        CODE_SHARE_AUTO_ERROR: 104008, //自助领券信息错误
        CODE_SHARE_AUTO_TIME_OUT: 104009, //自助领券超时

        CODE_WM_SCORE: "106001",
        CODE_WM_SHARE: "106002",
        CODE_WM_ALL: "106003",
        CODE_WM_CLOSE: "106004",
        CODE_WM_TIME_OUT: "106005",
        CODE_WM_USED: "106006",
        CODE_WM_DELETE: "106007",
        CODE_WM_FULL: "106008",

    },
    // route页面
    route: {
        MODE_NORMAL: "normal", // 小程序首页进入
        MODE_STORE: "store", // 店铺扫码
        MODE_SHARE: "share", // 领取好友分享
        MODE_AUTO_SHARE: "sh", //自助领券
        MODE_WM: "wm", //外卖自助领券or点
    },


    
    // 提示框的路由功能
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
            var nav = obj.nav || this.NAV_BACK
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
        redirect(obj) { console.log('in route'); wx.redirectTo({url: this.baseUrl(obj)}) },  //重定向
        navigate(obj) { wx.navigateTo({ url: this.baseUrl(obj) }) }, //跳转
    },

    // 分享页面的路由功能
    share:{
        NAV_BACK: "nav_back",
        NAV_REDIRECT: "nav_redirect",
        // 跳转初始化
        baseUrl(obj) {
            var nav = obj.nav || this.NAV_BACK
            var store_uuid = obj.store_uuid || ""
            var url = `/pages/share/share?`
                + `&nav=${nav}`
                + `&store_uuid=${store_uuid}`
            return url
        },
        redirect(obj) { 

            wx.redirectTo({ url: this.baseUrl(obj) }) 
        },  //重定向
        navigate(obj) { wx.navigateTo({ url: this.baseUrl(obj) }) }, //跳转
    },


    // 基础的分享页面功能
    onShareAppMessage(res){
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: res.title || '分享集点卡邀您集福利',
            path: res.path || '/pages/route/route',
            imageUrl: res.imageUrl || "../../images/icon_share_base_cup.png",
            
        }
    },

})