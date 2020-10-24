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
        this.onInit()
    },

    async onInit(){
        var res = await this.productGetList({
            detail: {
                // type: 1
            }
        }) 
        
        this.setData({
            list : res.data
        })
    },
    async add(){
        var res = await this.productAdd({
            isShow:false,
            sn:-2
        })
        wx.showToast({
            title: res.msg,
        })
        this.onInit()
    },

    // 获取详情
    async getDetal(_id){
        var res = await this.productGetByID({
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
        formData.image = await this.getHttpsImage(this.data.detail.image, "image")
        // formData.icon = await this.getHttpsImage(this.data.detail.icon,"icon")        
        var detail = formData
        var res = await this.productUpdate({
            _id:this.data.detail._id,
            detail: detail
        })
        wx.showToast({
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
            url: '/pages3/mall/store/store?isSelect=true',
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
        var storeList = this.data.detail.storeList.concat(list)
        var res = await this.productUpdate({
            _id: this.data.detail._id,
            detail: {
                storeList: storeList
            }
        })

        wx.showToast({
            title: res.msg,
        })

        this.getDetal(this.data.detail._id)
    },

    async deleteNode(e){
        var index = e.currentTarget.dataset.index
        var storeList = this.data.detail.storeList
        storeList.splice(index, 1)
        wx.showLoading({
            title: '删除中',
            mask:true
        })
        var res = await this.productUpdate({
            _id: this.data.detail._id,
            detail: {
                storeList: storeList
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