// pages/qrcode/qrcode.js
var API = require('../../api/api.js')

var touches = []
var isCheck = false
var interval 
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var mode = options.mode || "score"
        var storeUUID = options.storeUUID || ""
        var storeName = options.storeName || ""
        var storeID = options.storeID || ""

        this.setData({
            mode: options.mode || "score",
            storeUUID: options.storeUUID || "",
            storeName: options.storeName || "",
            storeID: options.storeID || "",
        })

        this.setMode(mode, storeUUID, storeName, storeID)
        this.startHeart()


    },

    setMode(mode, storeUUID, storeName, storeID){
        var title, userQR
        var baseQR = [
            wx.getStorageSync(API.UUID),  // 用户UUID
            storeID,  //店铺ID
            Date.parse(new Date())  //时间戳
        ].join(",")
        if (mode == "score") {
            title = "集点码,请向<" + storeName + ">出示此二维码集点"
            // userQR = `score,${wx.getStorageSync(API.UUID)},${storeUUID}`
            userQR = 'score,' + baseQR
            wx.setNavigationBarTitle({ title:"集点码"})
        }
        else{
            title = "兑换码,请向<" + storeName +">出示此二维码兑换"
            // userQR = `prize,${wx.getStorageSync(API.UUID)},${storeUUID}`
            userQR = "prize," + baseQR
            wx.setNavigationBarTitle({ title: "兑换码" })
            wx.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#1d2a6d',
                animation: {
                    duration: 400,
                    timingFunc: 'easeIn'
                }
            })
        }
        this.setData({
            title:title,
            mode:mode,
            userQR: userQR
        })
    },
    
    startHeart(){
        var that = this
        interval = setInterval(function () {
            app.db.customerGetHeart().then(res=>{
                // TODO 检测心跳
                if (res.code == 0) {
                    console.log(res.msg)
                    // 集点成功
                    that.getSuccess(res.msg)
                }
            })
        },6000)
    },
    
    getSuccess(msg){
        msg = msg || ""
        wx.reLaunch({
            url: `/pages2/alert/alert?status=true&storeUUID=${this.data.storeUUID}&title=${msg}`
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




    /*********印章触摸*********/
    touchstart(e) { 
        // console.log(e)
        touches = e.touches
        this.check(e.touches)
    },
    touchmove(e) { 
        // console.log(e)
        touches = e.touches
        // this.check(e.touches)
    },
    touchend(e) { console.log(e)

    },
    check(touches){
        console.log(touches)
        if(isCheck)
            return 
        if (touches.length > 2){
            wx.showModal({
                title: '集点成功',
                content: '',
                success(){
                    isCheck = false
                },
            })
            isCheck = true
        }
            
    }
})