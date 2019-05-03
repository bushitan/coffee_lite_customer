// pages/list/list.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        GP = this
        GP.getStoreList()
    },

    getStoreList(){
        db.storeList().then(list=>{
            GP.setData({
                list: list
            })
        })
    //    console.log(list)
       
    },


    toStore(e) {
        var store_uuid = e.currentTarget.dataset.store_uuid
        wx.navigateTo({
            url: `/pages/store/store?store_uuid=${store_uuid}`,
        })
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})