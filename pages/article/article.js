// pages/article/article.js
var GP
var API = require('../../api/api.js')
var db = require('../../api/db.js')
var APP = getApp()

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

      var url = options.url
      // var url = "https://sj.qskjad.top/product/detail/c76567ef-4a8b-4969-95fd-abf13d1334d8"

      this.setData({ url: url})

      //如果支付成功，这里重新刷新h5页面，并把支付成功的状态传递给h5
      if (options.payOk) {
        this.setData({
          url: "https://sj.qskjad.top/order/index.html?type=2"
        })
      }
    },

    // /**
    //  * 用户点击右上角分享
    //  */
    // onShareAppMessage: function () {

    // }
})