// pages3/mall/brand.js
var app = getApp()
var DB = require("../js/db.js")
Page({
    behaviors: [DB],

    /**
     * 页面的初始数据
     */
    data: {
        list:[
            { "name": "品牌", nav: "/pages3/mall/brand/brand" },
            { "name": "门店", nav: "/pages3/mall/store/store" },
            { "name": "产品", nav: "/pages3/mall/product/product"},
        ],
        // detail:{},
        // isEditor:false,
        // isSelect:false,
        // selectList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        this.onInit()
    },

    async onInit(){
        // var res = await this.brandGetList({
        //     detail:{
        //         type: 1
        //     }
        // })   
        // this.setData({
        //     list : res.data
        // })
    },
    nav(e){
        var nav = e.currentTarget.dataset.nav
        wx.navigateTo({
            url: nav,
        })
    },
    /**
     * @method 返回第二页的信息
     */
    callback(list){
        console.log(list)

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