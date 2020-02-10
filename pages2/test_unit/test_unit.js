// pages2/test_unit/test_unit.js

// import dbTest from '../../db/db_test.js'
// var db = require('../../db/db.js')
// var testTest = require('../../db/db_test.js')
// var d = require('../../db/db_test.js')
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
        this.sys()
        // dbTest.testSystem()
        // var t = new testTest()

        // testObject.testSystem()
        // wx.login({
        //     success(e) {
        //         console.log("denglujieguo" + JSON.stringify(e) )
        //     },
        // })
    },

    async sys() {
        app.db.sysLogin()
        app.db.sysMyGetInfo()
        app.db.sysMyUpdateInfo({
            name: "name",
            logo: "logo",
            city: "city",
        })
    },



    getuserinfo(res){
        console.log(res)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})