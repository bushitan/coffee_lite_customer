

// import dbFather from '../db/db_acitivy.js'
var dbFather = require('db_5_customer.js')
class dbSon  extends dbFather {


    constructor() {
        super()

    }

    /**
     * @method 1 获取直播房间
     * @return 
     *      []
     */
    roomGetList(data) {
        return new Promise((reslove, reject) => {
            wx.showLoading()
            data = data || {}
            data['action'] = "get_list"
            wx.cloud.callFunction({
                name: 'room',
                data: data,
                success: res => {
                    wx.hideLoading()
                    if (res.result.code == 0)
                        reslove(res.result)
                    else
                        wx.showToast({
                            icon: "none",
                            title: res.result.msg,
                        })
                },
                fail: res => {
                    console.log(res.result)
                    wx.hideLoading()
                },
            })
        })
    }
    /**
     * @method 2 天机直播房间
     * @return 
     *      []
     */
    roomAdd(data) {
        return new Promise((reslove, reject) => {
            wx.showLoading()
            data = data || {}
            data['action'] = "add"
            wx.cloud.callFunction({
                name: 'room',
                data: data,
                success: res => {
                    wx.hideLoading()
                    if (res.result.code == 0)
                        reslove(res.result)
                },
                fail: res => {
                    console.log(res.result)
                    wx.hideLoading()
                },
            })
        })
    }


    // 上传报名表
    livePlayerRegister(data) {
        return new Promise((reslove, reject) => {
            wx.showLoading()
            data = data || {}
            data['action'] = "register"
            wx.cloud.callFunction({
                name: 'live_player',
                data: data,
                success: res => {
                    wx.hideLoading()
                    if (res.result.code == 0)
                        reslove(res.result)
                    else
                        wx.showToast({
                            icon: "none",
                            title: res.result.msg,
                        })
                },
                fail: res => {
                    console.log(res.result) 
                    wx.hideLoading() 
                },
            })
        })
    }



}


module.exports = dbSon