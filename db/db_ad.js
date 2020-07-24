

// import dbFather from '../db/db_6_seller.js'

// 点击的样式
// var AD_TYPE_IMAGE = 1//打开图片
// var AD_TYPE_WEB_VIEW = 2//打开webview
// var AD_TYPE_LITE = 3 //打开小程序
// var AD_TYPE_LIVE = 4 //打开打开直播


class dbAD {

    AD = {
        // 广告的展示模式
        MODE_SWIPER: 1,
        MODE_BANNER: 2,
        MODE_STORE: 3,

        // 展示的类型
        SHOW_IMAGE: 1,
        SHOW_BUTTON: 2,
        SHOW_TEXT: 3,

        //点击后的类型
        CLICK_IMAGE: 1,
        CLICK_WEB_VIEW: 2,
        CLICK_LITE: 3,
        CLICK_LIVE: 4,

        RECORD_SWIPER: 1,
        RECORD_BANNER: 2,
        RECORD_STORE: 3,
        RECORD_LITE_SUCCESS: 4,
        RECORD_LITE_FAIL: 5,
    }

    constructor() {
    }

    /**
     * @method 获取列表
     *    var adList = [
            {
                _id: "2132132",
                'sn': 0, // 排序

                'mode':1, // 1轮播图 、2banner、3门店内容
                'storeUUID': "68e54718-7156-11e9-b456-e95aa2c51b5d",

                'isShow': true,
                'showType': 1, // 1 图片 2按钮 3纯文字
                'showImageUrl': "http://img.12xiong.top/coffee_image/upload/psSYv6fZ.jpg",
                'showDes': "商城每单立享8元",
                'showBtnText': "点击查看",

                'clickType': 3, //1图片 2链接  3小程序 4直播间

                'clickImageUrl': "http://img.12xiong.top/coffee_image/upload/psSYv6fZ.jpg",

                'clickContentUrl': "https://mp.weixin.qq.com/s/XJ2ir0X4PCLLcV890BzL_w",

                'clickLiteAppID': "wx97e90498901fb752",
                'clickLitePath': "pages/menu/menu",
                'clickLiteExtraData': "",
                'clickLiteEnvVersion': "",

                'clickRoomID': "",
            },
        ]
     */
    getList(data) {
        return new Promise((reslove, reject) => {
            data = data || {}
            data['action'] = "get_list"
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
        // return adList
    }
    
    // 查询广告节点
    getNode(data) {
        return new Promise((reslove, reject) => {
            data = data || {}
            data['action'] = "get_node"
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

    // 更新广告节点
    updateNode(data) {
        return new Promise((reslove, reject) => {
            data = data || {}
            data['action'] = "update_node"
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





    /**
     * @method 添加记录
     */
    addRecord(data){
        return new Promise((reslove, reject) => {
            data = data || {}
            data['action'] = "add_record"
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

    /**
     * @method 添加记录
     */
    getRecord(data) {
        return new Promise((reslove, reject) => {
            data = data || {}
            data['action'] = "get_record"
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




    /**
     * @method 点击广告的动作
     *   AD = {
        // 广告的展示模式
        MODE_SWIPER: 1,
        MODE_BANNER: 2,
        MODE_STORE: 3,

        // 展示的类型
        SHOW_IMAGE: 1,
        SHOW_BUTTON: 2,
        SHOW_TEXT: 3,

        //点击后的类型
        CLICK_IMAGE: 1,
        CLICK_WEB_VIEW: 2,
        CLICK_LITE: 3,
        CLICK_LIVE: 4,

    }
     */
    clickAction(ad, storeUUID){
        var clickType = ad.clickType
        if (clickType == this.AD.CLICK_IMAGE) {
            console.log(ad.imageUrl)
            wx.previewImage({
                urls: [ad.clickImageUrl] // 需要切换为内容图片
            })
        }
        if (clickType == this.AD.CLICK_WEB_VIEW) {
            wx.navigateTo({ url: `/pages/article/article?url=${ad.clickContentUrl}`, })
        }
        if (clickType == this.AD.CLICK_LITE) {
            wx.navigateToMiniProgram({
                appId: ad.clickLiteAppID,
                path: ad.clickLitePath,
                extraData: ad.clickLiteExtraData,
                envVersion: ad.clickLiteEnvVersion,
                success:res=> {
                    // 打开成功
                    this.addRecord({
                        "mode": this.AD.RECORD_LITE_SUCCESS,
                        "adID": ad._id,
                        "storeUUID": storeUUID,
                    }) 
                },
                fail: res =>{

                    this.addRecord({
                        "mode": this.AD.RECORD_LITE_FAIL,
                        "adID": ad._id,
                        "storeUUID": storeUUID,
                    }) 
                }
            })
        }
        if (clickType == this.AD.CLICK_LIVE) {
            // TODO 缺少 直播的type和roomID
            wx.navigateTo({
                url: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + ad.clickRoomID,
            })
        }
    }

    // 上传图片
    uploadImage(obj) {
        return new Promise((reslove, reject) => {
            // var data = {}
            // reslove(data)
            wx.showLoading({ title: "图片上传中" })
            wx.cloud.uploadFile({
                cloudPath: obj.cloudPath,
                filePath: obj.filePath,
                success: res => {
                    wx.hideLoading()
                    // console.log('[上传文件] 成功：', res)

                    // app.globalData.fileID = res.fileID
                    // app.globalData.cloudPath = cloudPath
                    // app.globalData.imagePath = filePath
                    // debugger
                    reslove(res.fileID)
                },
                fail: e => {
                    console.error('[上传文件] 失败：', e)
                    wx.showToast({
                        icon: 'none',
                        title: '上传失败请重试',
                    })
                    // reject()
                },
                complete: () => {
                    wx.hideLoading()
                }
            })
        })
    }
}


module.exports = new dbAD()