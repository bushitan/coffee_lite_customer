
// pages/list/list.js
var GP
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()
var app =getApp()
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


    scan() {
        wx.scanCode({
            success(res) {
                var path = res.hasOwnProperty("path")? res.path : ""
                console.log(path)
                console.log(path.split("_"))
                var wm_ticket_short_uuid = path.split("_")[1]
                wm_ticket_short_uuid = "mMIXF6fZ"
                db.scanCheckWmTicketCustomer(wm_ticket_short_uuid).then(res =>{
                    console.log(res)
                    GP.setData({res:res.data})
                })
                
            },
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        return app.onShareAppMessage(res)
    }
})