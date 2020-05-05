//app.js

let livePlayer = requirePlugin('live-player-plugin')
var db = require('db/db.js')

var behaviorAd = require('utils/behavior-ad.js')

// var db = new DB()

App({
    db:db,
    behaviorAd: behaviorAd,
    onLaunch: function (options) {
        console.log("[onLaunch] 本次场景值:", options.scene)
        this.globalData.scene = options.scene

        if (wx.cloud) {
            wx.cloud.init({
                env: "cup-customer-release",
                traceUser: true
            })
        }

        //加载广告
        // this.adInit()

        // 自定义导航条高度
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let capsule = wx.getMenuButtonBoundingClientRect();
                if (capsule) {
                    this.globalData.Custom = capsule;
                    this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
                } else {
                    this.globalData.CustomBar = e.statusBarHeight + 50;
                }
            }
        })
    },


    onShow(options) {
        // livePlayer.getLiveParams({ room_id:31, scene: options.scene })
        //     .then(res => {
        //         console.log('get share openid', res.share_openid) // 分享者openid，分享卡片进入场景才有
        //         console.log('get openid', res.openid) // 用户openid
        //         console.log('get room id', res.room_id) // 房间号
        //         console.log('get custom params', res.customParams) // 开发者在跳转进入直播间页面时，页面路径上携带的自定义参数，这里传回给开发者
        //     }).catch(err => {
        //         console.log('get live params', err)
        //     })

        console.log("app on show ")
        livePlayer.getOpenid({ room_id: 31, scene: options.scene })
            .then(res => {
                console.log('getOpenid' , res)
                // console.log('get share openid', res.share_openid) // 分享者openid，分享卡片进入场景才有
                // console.log('get openid', res.openid) // 用户openid
                // console.log('get room id', res.room_id) // 房间号
                // console.log('get custom params', res.customParams) // 开发者在跳转进入直播间页面时，页面路径上携带的自定义参数，这里传回给开发者
            }).catch(err => {
                console.log('get live params', err)
            })
        livePlayer.getShareParams({ room_id: 31, scene: options.scene })
            .then(res => {
                console.log('getShareParams', res)
                // console.log('get share openid', res.share_openid) // 分享者openid，分享卡片进入场景才有
                // console.log('get openid', res.openid) // 用户openid
                // console.log('get room id', res.room_id) // 房间号
                // console.log('get custom params', res.customParams) // 开发者在跳转进入直播间页面时，页面路径上携带的自定义参数，这里传回给开发者
            }).catch(err => {
                console.log('get live params', err)
            })

        console.log("app on show out ")
        // livePlayer.getLiveStatus({ room_id: 31, scene: options.scene })
        //     .then(res => {
        //         console.log('get share openid', res.share_openid) // 分享者openid，分享卡片进入场景才有
        //         console.log('get openid', res.openid) // 用户openid
        //         console.log('get room id', res.room_id) // 房间号
        //         console.log('get custom params', res.customParams) // 开发者在跳转进入直播间页面时，页面路径上携带的自定义参数，这里传回给开发者
        //     }).catch(err => {
        //         console.log('get live params', err)
        //     })
    },

    // 获取上一页面
    getPrePage() {
        var pre = getCurrentPages()[getCurrentPages().length - 2]
        return pre
    },

    globalData: {
        userInfo: null,
        scene:1001
    },

    // // 广告模块
    // adInit(){
    //     db.storeGetAd().then(res => {
    //         this.ad = res.data
    //         // API
    //     })
    // },
    adType:{
        AD_TYPE_IMAGE: 1,//打开图片
        AD_TYPE_WEB_VIEW: 2,//打开webview
        AD_TYPE_LITE: 3, //打开小程序
    },
    ad:{
    },

    // 
    code :{

        CODE_SYS_SUCCESS : 100001,
        CODE_SYS_ERROR: 100002,
        CODE_SYS_ERROR_NETWORK: 100003,

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




// "subpackages": [
//     {
//         "root": "packageA",
//         "pages": [
//             "pages/home/home"
//         ],
//         "plugins": {
//             "live-player-plugin": {
//                 "version": "1.0.3",
//                 "provider": "wx2b03c6e691cd7370"
//             }
//         }
//     }
// ],