// pages/article/article.js
var GP
var API = require('../../api/api.js')
var db = require('../../api/db.js')
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
    onLoad: function (options) {
        console.log(options.url)

        var openId = wx.getStorageSync(app.db.KEY_OPEN_ID)
        var url = options.url + "?discountopenId=" +  openId

      // var url = "https://sj.qskjad.top/product/detail/c76567ef-4a8b-4969-95fd-abf13d1334d8"

      this.setData({ url: url})

      //如果支付成功，这里重新刷新h5页面，并把支付成功的状态传递给h5
      if (options.payOk) {

          var openId = wx.getStorageSync(app.db.KEY_OPEN_ID)
        this.setData({
            url: "https://sj.qskjad.top/order/index.html?type=2&openId=" + openId
        })
      }
    },

    // /**
    //  * 用户点击右上角分享
    //  */
    // onShareAppMessage: function () {

    // }
})