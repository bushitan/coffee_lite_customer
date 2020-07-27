// pages3/stamp/stamp.js
var stampUtils = require('../../utils/stamp/index.js')

var touches = []
var isCheck = false
var interval 

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var points1 = [[0, 0], [50, 0], [50, 50], [0, 50]]

        var points2 = [[0, 0], [100, 0], [100, 100], [0, 95]]
        var scrop =stampUtils.getResult(points1, points2)
        console.log(scrop)
    },



    // 获取点击位置相对于父级的坐标
    getPosRelaParent (event, parent) {
        const touchPos = { x: event.pageX, y: event.pageY };
        const parentPos = { x: parent.getBoundingClientRect().x, y: parent.getBoundingClientRect().y };
        const posReduce = { x: touchPos.x - parentPos.x, y: touchPos.y - parentPos.y };
        const xIn = posReduce.x > 0 && posReduce.x < parent.width;
        const yIn = posReduce.y > 0 && posReduce.y < parent.height;
        if (xIn && yIn) return { x: touchPos.x - parentPos.x, y: touchPos.y - parentPos.y }
    },



    /*********印章触摸*********/
    touchstart(e) {
        // console.log(e)
        touches = e.touches
        this.loop(touches)
        // this.check(e.touches)
    },
    touchmove(e) {
        // console.log(e.touches[0].clientX)
        // console.log(e.changedTouches[0].clientX, e.changedTouches[0].clientY, e.changedTouches[0].pageX, e.changedTouches[0].pageY)

        touches = e.touches
        this.loop(touches)
     
        // this.check(e.touches)
    },
    touchend(e) {
        console.log(e)

    },

    loop(touches){
        if (touches.length == 4) {
            var points1 = [[0, 0], [50, 0], [50, 50], [0, 50]]
            // var points2 = [[0, 0], [100, 0], [100, 100], [0, 95]]
            var points2 = []
            for (var i = 0; i < touches.length; i++)
                points2.push([touches[i].clientX, touches[i].clientY])

            var scrop = stampUtils.getResult(points1, points2)
            console.log("scrop:", scrop)
            if(scrop>92){
                this.check(touches)
            }

        } else {
            console.log("不是4个点")
        }
    },


    check(touches) {
        console.log(touches)
        if (isCheck)
            return
        if (touches.length > 2) {
            wx.showModal({
                title: '集点成功',
                content: '',
                success() {
                    isCheck = false
                },
            })
            isCheck = true
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})