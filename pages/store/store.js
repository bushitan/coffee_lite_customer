
// pages/list/list.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
var StoreUtils = require('store_utils.js')
var storeUtils = new StoreUtils()

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
        STORE_ICON_MODE_CUP :1 ,//杯子图案
        STORE_ICON_MODE_STAMP : 2,//印章图案
        showBack:false,   //
        store:[],
        isFullScore: false,//满杯
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.getStoreData(options)
        GP.startInterval()
        GP.isShowBack()
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
        })
    },

    // 用户扫描二维码，领取福利券
    scanAutoShare(){
        wx.scanCode({
            success(res) {
                db.scanAutoShareCustomer(res.result).then( res=>{
                    if (res.message.code == CODE_SHARE_SUCCESS) 
                        storeUtils.scanSuccess(res.message.title,GP.data.store.uuid)
                    else 
                        storeUtils.scanFail()
                })
            }
        })
    },

    /*****定时器** */
    startInterval(){
        interval = setInterval(function () {
            db.refresh().then(res => {
                var data = res.data
                var infoList = data.info_list
                if (infoList == null) 
                    return

                GP.updateStoreData(GP.data.store.uuid) //直接刷新
                for (var i=0;i<infoList.length;i++){ //提示分享结果
                    var msg = infoList[i]
                    wx.showModal({
                        title: msg.title,
                        content: msg.content,
                        success() {
                            if (msg.code == CODE_SCORE_SUCCESS || msg.code == CODE_PRIZE_SUCCESS ) 
                                storeUtils.getScorePrizeSucess()        
                            if ( msg.code == CODE_SHARE_SUCCESS)
                                storeUtils.shareSucess()
                        },
                    })
                }
                console.log(res)
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
            // 判断是否满点
            var isFullScore = false
            if (scoreNum > exchanveValue) {
                isFullScore = true 
                data.score_num = exchanveValue
            }

            GP.setData({
                isFullScore: isFullScore,
                data: data,                
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
    toExchange(){
        wx.navigateTo({url: `/pages/exchange/exchange?store_uuid=${GP.data.store.uuid}`})
    },
    toShare() {
        wx.navigateTo({url: `/pages/share/share?store_uuid=${GP.data.store.uuid}`})
    },
    // 到集点二维码
    toQR() {
        wx.navigateTo({url: `/pages/qrcode/qrcode?mode=score&store_uuid=${GP.data.store.uuid}`,})
    },   // 到集点二维码
    toExchangeQR() {
        wx.navigateTo({url: `/pages/qrcode/qrcode?mode=prize&store_uuid=${GP.data.store.uuid}`,})
    },

    /***********辅助功能********** */
    // 是否显示左上角返回按钮
    isShowBack() {
        var pages = getCurrentPages()
        if (pages.length == 1)
            GP.setData({ showBack: true })
    },
    // 定向返回list页面
    back() {
        wx.redirectTo({
            url: '/pages/list/list',
        })
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
    onShareAppMessage: function () {

    }
})