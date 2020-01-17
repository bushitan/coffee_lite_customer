// pages2/store/store.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        store:{

            logo:"https://image.weilanwl.com/color2.0/index.jpg",
            summary:"213",
            start_time:"是否",
            end_time:"撒旦",
        },





        cardCur: 0,
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        }, {
            id: 1,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
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



    // 天梯
    scrollSteps() {
        this.setData({
            scroll: this.data.scroll == 9 ? 0 : this.data.scroll + 1
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