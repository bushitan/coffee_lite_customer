// pages2/store/store.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        store:{
            uuid:"68e54718-7156-11e9-b456-e95aa2c51b5d",
            name:"丰丰的咖啡店",
            logo:"http://img.12xiong.top/coffee_image/upload/JhLYr6fZ.jpg",
            summary:"外卖到店兑换，[买6送1]",
            start_time:"2019-6-6",
            end_time: "2020-6-5",
            // prizeCoverImage: "http://img.12xiong.top/coffee_image/upload/GAaYC6fZ.jpg",
            prizeCoverImage: "",
        },

        myScore:5,
        max:10,




        cardCur: 0,
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'https://mmbiz.qpic.cn/mmbiz_jpg/49qhzgz5ydzb8eRMXLDW2dubxnRYVEy8hkaV67hboiaNtqgK862ecCtAXRQZuWRibQlYmtHnbx5r30O8cvibBuZNA/0?wx_fmt=jpeg'
        }, {
            id: 1,
            type: 'image',
                url: 'https://mmbiz.qpic.cn/mmbiz_jpg/49qhzgz5ydyxfDRsLoEkXugwZ0SoSwVdRzDIwBmYA23eNLyA6YaFBvwcicTzDmkFqbhm0DsA6Asb553ThaPyU5A/0?wx_fmt=jpeg',
        }, {
            id: 2,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }, {
            id: 3,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        }, ],


        basicsList: [{
            icon: 'usefullfill',
            name: '开始'
        }, {
            icon: 'radioboxfill',
            name: '等待'
        }, {
            icon: 'roundclosefill',
            name: '错误'
        }, {
            icon: 'roundcheckfill',
            name: '完成'
        },],
        basics: 0,
        numList: [{
            name: '开始'
        }, {
            name: '等待'
        }, {
            name: '错误'
        }, {
            name: '完成'
        },],
        num: 0,
        scroll: 0

    },


    /**********路由**********/
    // 打开集点码
    toScoreQR() {
        wx.navigateTo({ url: `/pages2/qrcode/qrcode?mode=score&store_uuid=${this.data.store.uuid}`, })
    },   
    // 到兑换二维码
    toExchangeQR() {
        wx.navigateTo({ url: `/pages2/qrcode/qrcode?mode=prize&store_uuid=${this.data.store.uuid}`, })
    },
    // 返回我的
    toMy(){
        wx.redirectTo({
            url: '/pages2/main/main',
        })
    },
    toAddress(){
        wx.openLocation({
            name: GP.data.store.title,
            address: GP.data.store.address,
            latitude: GP.data.store.latitude,
            longitude: GP.data.store.longitude,
            scale: 18
        })
    },



    // cardSwiper
    cardSwiper(e) {
        this.setData({
            cardCur: e.detail.current
        })
    },

    


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.scrollSteps()
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