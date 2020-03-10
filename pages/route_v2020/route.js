// pages2/route/route.js

var  app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isReload: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {

        var status = await app.db.sysLogin()
        console.log(options)
        if (status) { // 登陆成功
            this.success(options)
        } else {// 登陆失败
            this.setData({ isReload: true })
        }
    },

    /**
     * @method 登陆验证
     */
    success(options){
        if (options.hasOwnProperty('mode')) {
            this.toStore(options)
        } else if (options.hasOwnProperty('scene')) {  
            this.scanQR(options)
        } else {
            this.toSelf()
        }
    },

    /**
     * 1 跳转到店铺详情
     */
    toStore(options){
        var store_uuid = options.store_uuid
        wx.redirectTo({
            url: `/pages2/store/store?store_uuid=${store_uuid}`,
        })  
    },

    /**
     * 2 扫码集点
     */
    async scanQR(options){
        var scene = decodeURIComponent(options.scene) 
        var r = await app.db.customerScanQrCode({
            qrcodeUUID: scene
        })
        
        // 扫码结果
        wx.redirectTo({
            url: `/pages2/alert/alert`,
        })
    },

    /**
     * 3 去到我的店铺
     */
    toSelf(){
        wx.redirectTo({
            url: `/pages2/self/self`,
        })
    },

})