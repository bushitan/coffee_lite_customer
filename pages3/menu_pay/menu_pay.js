// pages3/menu_pay/menu_pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order: { "0_2_": { "ProductId": 166, "Quantity": 5, "Attributes": [], "cover": "https://wm.51zfgx.com/images/thumbs/0001246_-8-oz.jpeg", "name": "冰博克 （热 8 OZ）", "price": 30, "total": "150.00", "attDes": "", "categoryIndex": 0, "itemIndex": 2, "attIndex": 0, "valueIndex": 0 }, "0_1_": { "ProductId": 146, "Quantity": 2, "Attributes": [], "cover": "https://wm.51zfgx.com/images/thumbs/0000192_12-oz.jpeg", "name": "热美式咖啡（12 OZ）", "price": 22, "total": "44.00", "attDes": "", "categoryIndex": 0, "itemIndex": 1, "attIndex": 0, "valueIndex": 0 }, "0_3_0_0_": { "ProductId": 174, "Quantity": 1, "Attributes": [{ "Id": 135, "Value": 220 }], "cover": "https://wm.51zfgx.com/images/thumbs/0001251_-12-oz.jpeg", "name": "热 伊丽莎白 招牌特调（12 OZ）", "price": 30, "total": "30.00", "attDes": "正常", "categoryIndex": 0, "itemIndex": 3, "attIndex": 0, "valueIndex": 0 } },
        preOrder:{
            order_discount:1,
            wm_cost:1,
            order_total: 224,
            order_with_discount: 224,
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },


    clickPay(){
        wx.requestPayment({
            timeStamp: '',
            nonceStr: '',
            package: '',
            signType: '',
            paySign: '',
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})