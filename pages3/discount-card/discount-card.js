// pages3/discount-card/discount-card.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad (options) {

        // var res = await app.db.cardGet()
        // console.log(res.data)
        this.getRe()
    },

    async toDiscountCard(){

        var res = await app.db.cardGet()
        console.log(res)
        
        var data = res.data

        wx.navigateToMiniProgram({
            appId: "wxcc2e4fbc5887661e",
            path: "/pages/get-card/get-card",
            extraData: {
                "discount_card_id": data.discount_card_id, 
                "mch_id": data.mch_id, 
                "appid": data.appid, 
                "out_trade_no": data.out_trade_no,
                "timestamp": data.timestamp , 
                "nonce_str": data.nonce_str , 
                "sign_type": data.sign_type , 
                "serial_no": data.serial_no , 
                "sign": data.sign,
            },
            success(res) { 
                console.log("success",res)
            },
            fail(res) {
                console.log("fail", res)
            },
        })
    },


    async getRe(){
        var res = await app.db.cardRe()
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})