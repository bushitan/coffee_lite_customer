/**
 * 印章功能
 * 一、getStamp，根据store_uuid获取印章点列表
 * 2、addStamp ， 上传印章列表，作为内部函数使用
 */
class dbStamp {

    constructor() {
    }

    getStamp(data) {
        return new Promise((reslove, reject) => {
            data = data || {}
            data['action'] = "get"
            wx.cloud.callFunction({
                name: 'stamp',
                data: data,
                success: res => {
                    if (res.result.code == 0)
                        reslove(res.result)
                },
                fail: res => {
                    console.log(res.result)
                    wx.hideLoading()
                },
            })
        })
        // return adList
    }
    
    // 查询广告节点
    addStamp(data) {
        return new Promise((reslove, reject) => {
            data = data || {}
            data['action'] = "add"
            wx.cloud.callFunction({
                name: 'stamp',
                data: data,
                success: res => {
                    if (res.result.code == 0)
                        reslove(res.result)
                },
                fail: res => {
                    console.log(res.result)
                    wx.hideLoading()
                },
            })
        })
        return adList
    }
    // 增加广告节点
    addNode(data) {
        return new Promise((reslove, reject) => {
            data = data || {}
            data['action'] = "add_node"
            wx.cloud.callFunction({
                name: 'ad',
                data: data,
                success: res => {
                    if (res.result.code == 0)
                        reslove(res.result)
                },
                fail: res => {
                    console.log(res.result)
                    wx.hideLoading()
                },
            })
        })
        return adList
    }



}


module.exports = new dbStamp()