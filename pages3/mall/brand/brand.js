// pages3/mall/brand.js
var app = getApp()
var DB = require("../js/db.js")
Page({
    behaviors: [DB],

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        detail:{},
        isEditor:false,
        isSelect:false,
        selectList:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            isSelect: options.isSelect || false
        })
        this.onInit()

        //test 
        // this.editor()
    },

    async onInit(){
        var res = await this.brandGetList({
            detail:{
                type: 1
            }
        })   
        this.setData({
            list : res.data
        })
    },
    // 编辑
    async editor(e) {
        var res = await this.brandGetByID({
            _id: e.currentTarget.dataset._id
        })
        this.setData({
            detail: res.data
        })
        this.switchEditor()
    },
    
    // 选择，绑定关系使用
    select(e){
        // var old = [1] 
        // old = old.concat(this.data.selectList) //(e.currentTarget.dataset._id)
        // console.log(old)
        var page = getCurrentPages()
        var pre = page[page.length-2]
        var detail = pre.data.detail
        detail.data.brandList = detail.data.brandList.contact(this.data.selectList) //(e.currentTarget.dataset._id)
        pre.setData({
            detail: detail
        })
        pre.callback() //更新成功的回掉
        wx.navigateBack()  //返回

        // // 更新信息
        // var res = await pre.brandUpdate({
        //     _id: pre.data.detail._id,
        //     detail: {
                
        //     }
        // })
    },

    // 保存
    async save(e) {
        var formData = e.detail.value
        formData.sn = parseInt(formData.sn)
        formData.type = parseInt(formData.type)
        formData.logo = await this.getHttpsImage(this.data.detail.logo,"logo")
        formData.icon = await this.getHttpsImage(this.data.detail.icon,"icon")        
        var detail = formData
        var res = await this.brandUpdate({
            _id:this.data.detail._id,
            detail: detail
        })
        wx.showModal({
            title: res.msg,
        })

        this.onInit()
        this.switchEditor()
        console.log(detail)
    },

    checkboxChange(e){
        console.log(e.detail)
        this.setData({ selectList:e.detail.value})
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