// pages3/discount-card/discount-card.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isHasDiscountCard:false,
        OutOrderNo:"",
        liteCupOpenId:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad (options) {

        // var res = await app.db.cardGet()
        // console.log(res.data)
        // this.getRe()
        this.setData({
            liteCupOpenId:options.liteCupOpenId 
        })

    },

    async onShow(){
        this.onInit()
    },
    async onInit(){
        // 用户绑定
        // var res = await app.db.cardBind({
        //     wxOpenId: this.data.liteCupOpenId ,
        //     discountWxOpenId: wx.getStorageSync(app.db.KEY_OPEN_ID),
        // })  
        this.checkUserDiscountCard()
        // var isHasDiscountCard = this.checkUserDiscountCard()
        // console.log(isHasDiscountCard)
        // if (isHasDiscountCard == false)
        //     this.toDiscountCard()
    },
     
    //检测是否有卡
    async checkUserDiscountCard(){

        var res = await app.db.cardCheck({
            discountWxOpenId: wx.getStorageSync(app.db.KEY_OPEN_ID)
        })
        var isHasDiscountCard = res.isHasDiscountCard
        this.setData({
            isHasDiscountCard: isHasDiscountCard,
            OutOrderNo: res.data.OutOrderNo || "",
        })
        if (isHasDiscountCard == false)
            this.toDiscountCard()
        // return isHasDiscountCard
        // console.log(res)
    },

    //取领卡
    async toDiscountCard(){
        // 领卡
        var res = await app.db.cardGet()
        console.log("discount_card_id",res.data.discount_card_id)

        var data = res.data

        wx.navigateToMiniProgram({
            appId: "wxcc2e4fbc5887661e",
            path: "/pages/get-card/get-card",
            extraData: {
                "discount_card_id": data.discount_card_id,
                "mch_id": data.mch_id,
                "appid": data.appid,
                "out_trade_no": data.out_trade_no,
                "timestamp": data.timestamp,
                "nonce_str": data.nonce_str,
                "sign_type": data.sign_type,
                "serial_no": data.serial_no,
                "sign": data.sign,
            },
            success(res) {
                console.log("success", res)
            },
            fail(res) {
                console.log("fail", res)
            },
        })
       
    },

    getCardDetai(){
        

        wx.navigateToMiniProgram({
            appId: "wxcc2e4fbc5887661e",
            path: "/pages/card-detail/card-detail?out_order_no=" + this.data.OutOrderNo,
            extraData: {
                // "out_order_no": this.data.OutOrderNo,
            },
            success(res) {
                console.log("success", res)
            },
            fail(res) {
                console.log("fail", res)
            },
        })
    },

    // async getRe(){
    //     var res = await app.db.cardRe()
    // },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})