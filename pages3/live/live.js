// pages3/live/live.js
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

        STATUS_PREPARE: STATUS_PREPARE,
        STATUS_PROCESSING: STATUS_PROCESSING,
        STATUS_COMPLETE: STATUS_COMPLETE,

        list:[
            // {
            //     _id:"",
            //     roomID:29,
            //     title:"咖啡机公开课",
            //     coverUrl: "/images/live/cover.jpg",
            //     status: STATUS_PREPARE, // 1、进行中  2、已结束                 
            //     hostLogoUrl:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
            //     hostName:"拉花谭老师",
            //     desc:"拉花拿铁",
            //     goodUrl:"https://sj.qskjad.top/product/detail/81d2e8fa-5a16-4db6-a389-e8493f500706", // 商品连接
            //     startTime:"2020-03-17 15:12:23",    
            // },           
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },

    async onInit(){
        var res = await app.db.roomGetList()
        console.log(res)


        this.setData({
            list:res.data
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
        wx.navigateTo({
                url: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + roomID,
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
            roomID: 11,
            title: "小白给专业化妆师化妆是怎样的体验",
            coverUrl: "http://mmbiz.qpic.cn/mmbiz_jpg/rysfsJMWkCRnVdkA9yicjWf8Co8v3pPlmxzCqIx7Kmfare2YvzE12OwlF7jI6icKdDKDGiaibibIJfria7KACmRyrAYg/0",
            status: STATUS_COMPLETE, // 1、进行中  2、已结束                 
            hostLogoUrl: "http://mmbiz.qpic.cn/mmbiz_jpg/rysfsJMWkCRnVdkA9yicjWf8Co8v3pPlmxzCqIx7Kmfare2YvzE12OwlF7jI6icKdDKDGiaibibIJfria7KACmRyrAYg/0",
            hostName: "蒋蒋",
            desc: "化妆师",
            goodUrl: "", // 商品连接
            startTime: "2020-03-11 21:01:43", 
        })
        console.log(res)
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})

