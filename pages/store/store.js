
// pages/list/list.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
var StoreUtils = require('store_utils.js')
var storeUtils = new StoreUtils()
var app = getApp()

var interval

var CODE_SYS_SUCCESS   = 100001
var CODE_SCORE_SUCCESS = 102001
var CODE_PRIZE_SUCCESS = 103001
var CODE_SHARE_SUCCESS = 104000
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sn:"", // 用户名称


        STORE_ICON_MODE_CUP: 1,//杯子图案
        STORE_ICON_MODE_STAMP: 2,//印章图案
        STORE_ICON_MODE_LADDER: 3,//天梯图案
        showBack:false,   //
        store:{
            icon_mode:1,
        },
        isFullScore: false,//满杯

        data:{
            score_num: 0, //集点数量
            share_num: 0, //分享券数量
            prize_num: 0, //礼物数量
        }, //
        ladderScore:0, //天梯集点的点数

        adList:[],



        currentLive: 
        {
            _id:"",
            roomID:29,
            title:"咖啡机公开课",
            coverUrl: "/images/live/cover.jpg",
            status: 10, // 1、进行中  2、已结束                 
            hostLogoUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            hostName:"拉花谭老师",
            desc:"拉花拿铁",
            goodUrl:"https://sj.qskjad.top/product/detail/81d2e8fa-5a16-4db6-a389-e8493f500706", // 商品连接
            startTime:"2020-03-17 15:12:23",    
        },           
        
        danmuList:
            [{
                text: '好想去哦！！',
                color: '#ff0000',
                time: 1
            }, {
                text: '在哪里呀',
                color: '#ff00ff',
                time: 3
            }],
        videoControls:false,
    },


    load1(e) {
        console.log(e)
    },
    load2(e) {
        console.log(e)
    },
    clickVideo(e){
        console.log("clickVideo", e)
        this.setData({ videoControls: true})
    },

    // behaviors: [app.behaviorAd, ],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this

        this.setData({
            sn: "SN10" + wx.getStorageSync(API.USER_INFO).id //+ "："
        })

        GP.getStoreData(options)
        GP.startInterval()
        GP.isShowBack()

        GP.getLastAd() // 获取广告
        // GP.test()  // 测试页面
    },

    /**
     * @method  每次展示，初始化广告组件
     */
    onShow(){
        // GP.setData({
        //     adList: app.ad || []
        // })   
        
    },

    /**
     * @method 获取最新的广告
     */
    getLastAd(store_uuid) {
        // db.storeGetAd(store_uuid).then(res => {
        //     console.log(res.data.ad)
        //     GP.setData({
        //         // adList: res.data.ad
        //         adList: res.data
        //     })
        // })
    },

    // 获取门店数据 
    // 绑定客户与门店的关系
    getStoreData(options) {
        var store_uuid = options.store_uuid
        // API
        db.storeInfo(store_uuid).then(store => {
            // API
            wx.setNavigationBarTitle({
                title: store.title
            })
            GP.setData({ store: store})
            GP.updateStoreData(store_uuid)  // 更新店铺数据
            
            // db.storeData(store_uuid).then(res => {
            //     GP.setData({
            //         store: store,
            //         data: res.data
            //     })
            // })
            GP.getLastAd(store_uuid) //更新店铺的广告
        })
    },


    /**测试接口 */
    test(){
        var store_uuid = "68e54718-7156-11e9-b456-e95aa2c51b5d"
        // storeUtils.getScorePrizeSucess(GP.data.store.uuid)   //集点、积分成功
        storeUtils.shareSucess(store_uuid) // 跳转分享页面
    },

  /*****定时器** */
    startInterval(){
        interval = setInterval(function () {
            db.refresh().then(res => {
                var data = res.data
                var infoList = data.info_list
                if (infoList == null) 
                    return

                // debugger
                // 提示
                // for (var i = 0; i < infoList.length; i++){
                //     var msg = infoList[i]
                //     wx.showToast({ title: msg.title })  
                // }              
                var store_uuid = GP.data.store.uuid
                var msg_last = infoList[0]
                var code_last = infoList[0].code
                var title_last = infoList[0].title
                var content_last = infoList[0].content

                //直接刷新数据
                GP.updateStoreData(store_uuid)
                // 跳转到相应页面
                // 去提示页，成功
                if (code_last == app.code.CODE_SCORE_SUCCESS 
                    || code_last == app.code.CODE_PRIZE_SUCCESS 
                    || code_last == app.code.CODE_SHARE_SEND 
                    || code_last == app.code.CODE_SHARE_RECEIVE )
                    storeUtils.getScorePrizeSucess(store_uuid, title_last, content_last)
                // 获得分享券
                else if (code_last == app.code.CODE_SHARE_SUCCESS){
                    wx.showModal({ title: title_last, content: content_last })
                    storeUtils.getShare(GP.data.store.uuid)
                }
                // 去提示页，失败
                else{
                    storeUtils.getScorePrizeFail(store_uuid, title_last, content_last)
                }


                // for (var i=0;i<infoList.length;i++){ //提示分享结果
                //     var msg = infoList[i]
                //     wx.showModal({
                //         title: msg.title,
                //         content: msg.content,
                //         success() {
                //             if (msg.code == CODE_SCORE_SUCCESS || msg.code == CODE_PRIZE_SUCCESS ) 
                //                 storeUtils.getScorePrizeSucess()        
                //             if ( msg.code == CODE_SHARE_SUCCESS)
                //                 storeUtils.shareSucess(GP.data.store.uuid)
                //         },
                //     })
                // }
                // console.log(res)
            })
        }, 4000)
    },

    // 刷新店铺数据
    updateStoreData(store_uuid){
        db.storeData(store_uuid).then(res => {
            // TODO 店铺状态
            var exchanveValue = GP.data.store.exchange_value
            var scoreNum = res.data.score_num
            var data = res.data
            var ladderScore = res.data.score_num
            // 判断是否满点
            var isFullScore = false
            if (scoreNum > exchanveValue) {
                isFullScore = true 
                data.score_num = exchanveValue
            }

            GP.setData({
                isFullScore: isFullScore,
                data: data,              
                ladderScore: ladderScore 
            })

            // console.log(GP.data.store.exchange_value)
            // console.log(res.data.score_num)
            // console.log(GP.data.store.exchange_value)
            // console.log(GP.data.store.exchange_value)

        })
    },

    

    /**
     * 生命周期函数--监听页面卸载
     * 注销interval
     */
    onUnload: function () {
        clearInterval(interval)
        console.log(interval)
    },

    /***********路由********** */

    toShop(){
        wx.navigateTo({
            url:  "plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId=975716",
        })
    },

    // toExchange(){
    //     wx.navigateTo({url: `/pages/exchange/exchange?store_uuid=${GP.data.store.uuid}`})
    // },
    toShare() {
        wx.navigateTo({ url: `/pages/share/share?nav=nav_back&store_uuid=${GP.data.store.uuid}`})
    },
    // 到集点二维码
    toQR() {
        wx.navigateTo({url: `/pages/qrcode/qrcode?mode=score&store_uuid=${GP.data.store.uuid}`,})
    },   // 到集点二维码
    toExchangeQR() {
        wx.navigateTo({url: `/pages/qrcode/qrcode?mode=prize&store_uuid=${GP.data.store.uuid}`,})
    },

    // 旧版本 跳转到广告
    toAd(e){
        var type = e.currentTarget.dataset.type
        var web_url = e.currentTarget.dataset.web_url
        if (type == app.adType.AD_TYPE_IMAGE)
            wx.previewImage({
                urls: [web_url],
            })
        else
            wx.navigateTo({ url: `/pages/article/article?url=${web_url}`, })
    },
    // 新版本  跳转到广告
    toAdNew(e) {
        var type = e.currentTarget.dataset.type

        var content_image_url = e.currentTarget.dataset.content_image_url
        var content_url = e.currentTarget.dataset.content_url
        var content_lite_app_id = e.currentTarget.dataset.content_lite_app_id
        var content_lite_path = e.currentTarget.dataset.content_lite_path
        var content_lite_extra_data = e.currentTarget.dataset.content_lite_extra_data
        var content_lite_env_version = e.currentTarget.dataset.content_lite_env_version

        // debugger
        if (type == app.adType.AD_TYPE_IMAGE)
            wx.previewImage({
                urls: [content_image_url],
            })
        else
            wx.navigateTo({ url: `/pages/article/article?url=${content_url}`, }) 
    },

    /***********辅助功能********** */
    toMall(){

        var openId = wx.getStorageSync(app.db.KEY_OPEN_ID)
        var url = "https://sj.qskjad.top/Home/Index"
        console.log(url)
        wx.navigateTo({ url: '/pages/article/article?url=' + url, }) 
    },


    // 是否显示左上角返回按钮
    isShowBack() {
        var pages = getCurrentPages()
        if (pages.length == 1)
            GP.setData({ showBack: true })
    },
    // 定向返回list页面
    back() {
        var page = getCurrentPages()
        if(page.length == 1){
            wx.redirectTo({
                url: '/pages/list/list',
            })
        } else {
            wx.navigateBack()
        }
        
    },
    // 去到定位页面
    toAddress() {
        wx.openLocation({
            name: GP.data.store.title,
            address: GP.data.store.address,
            latitude: GP.data.store.latitude,
            longitude: GP.data.store.longitude,
            scale: 18
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        return app.onShareAppMessage({
            title: GP.data.store.share_title,
            // path: `/pages/store/store?store_uuid=${GP.data.store.uuid}`,
            path: `/pages/route/route?mode=store&store_uuid=${GP.data.store.uuid}`,
            imageUrl: GP.data.store.share_logo,
        })
    }
})


// // 用户扫描二维码，领取福利券
// scanAutoShare(){
//     wx.scanCode({
//         success(res) {

//             console.log(res)
//             return

//             db.scanAutoShareCustomer(res.result).then(res => {
//                 if (res.message.code == CODE_SHARE_SUCCESS)
//                     storeUtils.scanSuccess(res.message.title, GP.data.store.uuid)
//                 else
//                     storeUtils.scanFail()
//             })
//         }
//     })
// },



    // /*****定时器** */
    // startInterval(){
    //     interval = setInterval(function () {
    //         db.refresh().then(res => {
    //             var data = res.data
    //             var infoList = data.info_list
    //             if (infoList == null) 
    //                 return

    //             GP.updateStoreData(GP.data.store.uuid) //直接刷新
    //             for (var i=0;i<infoList.length;i++){ //提示分享结果
    //                 var msg = infoList[i]
    //                 wx.showModal({
    //                     title: msg.title,
    //                     content: msg.content,
    //                     success() {
    //                         if (msg.code == CODE_SCORE_SUCCESS || msg.code == CODE_PRIZE_SUCCESS ) 
    //                             storeUtils.getScorePrizeSucess()        
    //                         if ( msg.code == CODE_SHARE_SUCCESS)
    //                             storeUtils.shareSucess(GP.data.store.uuid)
    //                     },
    //                 })
    //             }
    //             console.log(res)
    //         })
    //     }, 4000)
    // },
