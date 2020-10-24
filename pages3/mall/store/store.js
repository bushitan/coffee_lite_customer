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
    },

    async onInit(){
        if (this.data.isSelect) { //选择
            var page = getCurrentPages()
            var pre = page[page.length - 2]
            res = await this.storeUnSelect({
                storeList: pre.data.detail.storeList
            })
        }
        else { // 全部列表
            var res = await this.storeGetList({
                detail: {
                    // type: 1
                }
            })  
        }
        
        this.setData({
            list : res.data
        })
    },

    // 获取详情
    async getDetal(_id){
        var res = await this.storeGetByID({
            _id: _id
        })
        this.setData({
            detail: res.data
        })
    },

    // 编辑
    async editor(e) {
        this.getDetal(e.currentTarget.dataset._id)
        this.switchEditor()
    },
    

    // 保存
    async save(e) {
        var formData = e.detail.value
        formData.sn = parseInt(formData.sn)
        formData.longitude = parseInt(formData.longitude)
        formData.latitude = parseInt(formData.latitude)
        // formData.logo = await this.getHttpsImage(this.data.detail.logo,"logo")
        // formData.icon = await this.getHttpsImage(this.data.detail.icon,"icon")        
        var detail = formData
        var res = await this.storeUpdate({
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

    // 增加品牌
    addBrand(){
        wx.navigateTo({
            url: '/pages3/mall/brand/brand?isSelect=true',
        })
    },

    // 选择，绑定关系使用
    select(e) {
        var page = getCurrentPages()
        var pre = page[page.length - 2]
        pre.callback(this.data.selectList) //更新成功的回掉
        wx.navigateBack()  //返回
    },
    async callback(list){
        var brandList = this.data.detail.brandList.concat(list)
        var res = await this.storeUpdate({
            _id: this.data.detail._id,
            detail: {
                brandList:brandList
            }
        })

        wx.showToast({
            title: res.msg,
        })

        this.getDetal(this.data.detail._id)
    },

    async deleteNode(e){
        var index = e.currentTarget.dataset.index
        var brandList = this.data.detail.brandList
        brandList.splice(index, 1)
        wx.showLoading({
            title: '删除中',
            mask:true
        })
        var res = await this.storeUpdate({
            _id: this.data.detail._id,
            detail: {
                brandList: brandList
            }
        })
        wx.hideLoading()
        wx.showToast({
            title: res.msg,
        })
        this.getDetal(this.data.detail._id)


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