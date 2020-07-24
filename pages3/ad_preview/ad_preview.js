var app =getApp()

var STATUS_PREPARE = 10
var STATUS_PROCESSING = 20
var STATUS_COMPLETE = 30
Page({

    /**
     * 页面的初始数据
     */
    data: {

        tel:"suojun_tech_test",
        showForm:false,

        MODE_SWIPER: app.dbAD.AD.MODE_SWIPER,
        MODE_BANNER: app.dbAD.AD.MODE_BANNER,
        MODE_STORE: app.dbAD.AD.MODE_STORE,

        CLICK_IMAGE: app.dbAD.AD.CLICK_IMAGE,
        CLICK_WEB_VIEW: app.dbAD.AD.CLICK_WEB_VIEW,
        CLICK_LITE: app.dbAD.AD.CLICK_LITE,
        CLICK_LIVE: app.dbAD.AD.CLICK_LIVE,
        tabIndex: app.dbAD.AD.MODE_SWIPER,  
        tabList: [
            {
                id: app.dbAD.AD.MODE_SWIPER,  
                name: '轮播图',
            },
            {
                id: app.dbAD.AD.MODE_BANNER,
                name: 'Banner',
            },
            {
                id: app.dbAD.AD.MODE_STORE,
                name: '门店广告',
            },
            {
                id: 4,
                name: '已关闭',
            },
        ],
        list:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()

        // this.testPay()
    },

    async onInit(){
        this.getList(this.data.tabIndex)
    },

    // 点击tab换页面
    tabSelect(e){
        var tabID = e.currentTarget.dataset.tab_id
        this.setData({
            tabIndex: tabID
        })
        if (tabID == 3)
            this.getUnShowList(tabID)
        else
            this.getList(tabID)
    },

    async getList(mode){

        var res = await app.dbAD.getList({
            // mode: mode
        })
        console.log(res.data)
        this.setData({
            list: res.data
        })
    },

    async getUnShowList(mode) {

        var res = await app.dbAD.getList({
            mode: mode,
            isShow:false
        })
        console.log(res.data)
        this.setData({
            list: res.data
        })
    },


    // 打开广告预览
    toPreview(e){
        var index = e.currentTarget.dataset.index
        var ad = this.data.list[index]  
        // 点击广告的动作
        app.dbAD.clickAction(ad, "")
    },

    toADEditor(e){
        var adID = e.currentTarget.dataset.ad_id || ""
        console.log(adID)
        wx.navigateTo({
            url: '/pages3/ad_editor/ad_editor?adID=' + adID,
        })
    },



    // 上报信息
    async formSubmit(e){
         var that = this
        var formData = e.detail.value

        console.log(formData)
        // 检查报名信息
        for(var i in formData) {
            if( formData[i] == ""){
                wx.showModal({
                    title: '请填写信息完毕',
                    showCancel:false,
                })
                return 
            }
        }

        // 上报报名信息
        var res = await app.db.livePlayerRegister(formData)
        wx.showModal({
            title: res.msg,
        })
        this.hideModal()
    },

    copyWX(){
        wx.previewImage({
            urls: ["cloud://cup-customer-release.6375-cup-customer-release-1301587562/sys/live_contact.jpg"],
        })
        // wx.setClipboardData({
        //     data: this.data.tel
        // })
    },
    /*********路由****************/

    toRoom(e){
        var roomID = e.currentTarget.dataset.room_id
        let customParams = { pid: "12" }
        wx.navigateTo({
            url: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + roomID + "&custom_params=" + encodeURIComponent(JSON.stringify(customParams))
        })
    },

    toGood(e){
        var goodUrl = e.currentTarget.dataset.good_url
        wx.navigateTo({
            url: '/pages/article/article?url=' + goodUrl,
        })
    },

    /***********************/

    showModal() {
        this.setData({
            showForm: true,
        })
    },

    hideModal(){
        this.setData({
            showForm:false,
        })
    },


    //  添加直播间
    // 老谭 头像   cloud://cup-customer-release.6375-cup-customer-release-1301587562/logo/tan_jn.jpg   拉花谭老师
    async addRoom() { 
        var res = await app.db.roomAdd({
            isShow: true,
            sn: 0,
            roomID: 33,
            title: "花式写手帐 英文书法秀",
            coverUrl: "cloud://cup-customer-release.6375-cup-customer-release-1301587562/cover/2020-3-19-3.jpg",
            status: STATUS_PREPARE, // 1、进行中  2、已结束                 
            hostLogoUrl: "cloud://cup-customer-release.6375-cup-customer-release-1301587562/logo/tan_jn.jpg",
            hostName: "谭老师",
            desc: "花体字",
            goodUrl: "", // 商品连接
            startTime: "2020-03-20 21:00", 
        })
        console.log(res)
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})

