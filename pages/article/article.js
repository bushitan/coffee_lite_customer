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
        this.setData({url:options.url})
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})