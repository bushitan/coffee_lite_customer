Page({
  //h5传过来的参数
  onLoad: function(options) {
    console.log("onload , webview传过来的参数", options)
    // //字符串转对象
    // let payData = JSON.parse(options.payDataStr)
    // // console.log("orderId", payData.orderId)

    var orderId = options.orderId
    var money = options.money

    let that = this;

    wx.showLoading({
      title: '正在跳转支付,ok',
    })
    // jscode：“13”
    // tradeId：“交易订单”
    this.getCode().then(code=>{
        wx.request({
          url: 'https://sj.qskjad.top/TenPayV3/GetMiniProOpenId',
            data:{
              tradeId: orderId,
              money: money,
              jscode:code,
            },
            success(res) {
              console.log("获取订单成功", res)
              that.goPay(res.data.data)
              wx.hideLoading()
            },
            fail(res){
                console.log("获取订单失败", res)
              wx.hideLoading()
            },

        })
    })

  },

  getCode() {
    return new Promise((resolve, reject) => {
      wx.login({
        success(e) {
          console.log(e)
          var code = e.code
          resolve(code)
        }
      })
    })
  },



  //微信支付
  goPay(payData) {

    var that = this
    console.log(payData)
    wx.requestPayment({
      timeStamp: payData.timeStamp,
      nonceStr: payData.nonceStr,
      package: payData.package,
      signType: payData.signType,
      paySign: payData.paySign,
      success(res) {
        console.log("支付成功", res)
        //你可以在这里支付成功以后，再跳会webview页，并把支付成功状态传回去
        // wx.navigateTo({
        //   url: '/pages/wePay/wePay?payOk=true',
        // })
        // that.toShopCard()

        var current = getCurrentPages()
        var backPage = current[current.length - 2]
        backPage.setData({
          url: "https://sj.qskjad.top/order/index.html?type=2"
        })
        wx.navigateBack()

      },
      fail(res) {
        console.log("支付失败", res)
      }
    })
  },

  toShopCard(){
    var current = getCurrentPages()
    var backPage = current[current.length - 2]
    backPage.setData({
      url: "https://sj.qskjad.top/order/index.html?type=0"
    })
    wx.navigateBack()
  },

})


    // wx.cloud.callFunction({
    //   name: "pay",
    //   data: {
    //     orderId: payData.orderId,
    //     money: payData.money
    //   },
    //   success(res) {
    //     console.log("获取成功", res)
    //     that.goPay(res.result);
    //   },
    //   fail(err) {
    //     console.log("获取失败", err)
    //   }
    // })