// pages3/stamp/stamp.js
var stampUtils = require('../../utils/stamp/index.js')
var touches = []
var isCheck = false
var interval 
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isSuccess:false,

        stampInfo:{}, //印章信息
        stampIndex: -1,//验证成功点印章位置点
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // var points1 = [[0, 0], [50, 0], [50, 50], [0, 50]]

        // var points2 = [[0, 0], [100, 0], [100, 100], [0, 95]]
        // var scrop =stampUtils.getResult(points1, points2)
        // console.log(scrop)

        this.onInit()

    },

// 68e54718-7156-11e9-b456-e95aa2c51b5d  丰丰的咖啡店
// a85e7854-c268-11e9-97aa-e95aa2c51b5d seeking
    async onInit() {
        app.dbStamp.addStamp({
            name:"丰丰的咖啡店",
            store_uuid:"68e54718-7156-11e9-b456-e95aa2c51b5d",
            address_list: [
                {
                    marker: "友爱店",
                    latitude: 22.84466,
                    longitude: 108.3094,
                    range:30,
                    matrix: [[0, 0], [100, 0], [100, 100], [0, 100]],
                    code: 100,
                    seller_uuid :"96b9138a-e2fe-11ea-b741-e95aa2c51b5d",
                },
                {
                    marker: "盛天店",
                    latitude: 22.811095,
                    longitude: 108.342194,
                    range: 30,
                    matrix: [[0, 0], [100, 0], [100, 100], [0, 100]],
                    code: 100,    
                    seller_uuid: "19acf646-e2ff-11ea-a453-e95aa2c51b5d",
                },
            ],
        })
        var res = await app.dbStamp.getStamp({
            store_uuid: "68e54718-7156-11e9-b456-e95aa2c51b5d"
        })
        this.setData({ stampInfo:res.data})
        this.checkPre()
        console.log(res)

    },

    checkPre(){
        return new Promise((resolve,reject)=>{
            wx.getLocation({
                type: "gcj02 ",
                success: res => {
                    // debugger
                    // 测还距离
                    var tempList = this.data.stampInfo.address_list
                    for (var i = 0; i < tempList.length; i++) {
                        var distance = app.getDistance(
                            // res.latitude, res.longitude,

                            22.84466, 108.3094,
                            //  22.84466, 108.3094,
                            tempList[i].latitude, tempList[i].longitude,
                        )
                        console.log(distance)
                        // 当距离小于范围，则设置印章点经纬度位置
                        if (distance < this.data.stampInfo.address_list[i].range) {
                            this.setData({ stampIndex: i })
                            break;
                        }
                    }

                }
            })
        })
        
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
            console.log("不是4个点", touches.length )
        }
    },


    check(touches) {
        console.log(touches)
        if (isCheck)
            return
        if (touches.length > 2) {
            this.setData({
                isSuccess:true,
            })
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


 // // 获取点击位置相对于父级的坐标
    // getPosRelaParent (event, parent) {
    //     const touchPos = { x: event.pageX, y: event.pageY };
    //     const parentPos = { x: parent.getBoundingClientRect().x, y: parent.getBoundingClientRect().y };
    //     const posReduce = { x: touchPos.x - parentPos.x, y: touchPos.y - parentPos.y };
    //     const xIn = posReduce.x > 0 && posReduce.x < parent.width;
    //     const yIn = posReduce.y > 0 && posReduce.y < parent.height;
    //     if (xIn && yIn) return { x: touchPos.x - parentPos.x, y: touchPos.y - parentPos.y }
    // },