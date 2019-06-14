var app = getApp()
class StoreUtils {
    constructor() {
    }

    /**
     *  扫描成功
     */
    scanSuccess(title,uuid){
        var duration = 2000
        wx.showToast({
            title: title,
            duration: duration,
            success() {
                setTimeout(function () {
                    wx.navigateTo({
                        url: `/pages/share/share?store_uuid=${uuid}`
                    })
                }, duration)
            },
        })
    }

    /**
     *  扫描失败
     */
    scanFail(){

        wx.showModal({
            title: '领取失败',
            content: '请跟店员确认',
        })
    }


    /**
     *  获取积分、兑换奖品成功
     */
    getScorePrizeSucess(store_uuid,title,content){
        var pages = getCurrentPages()
        var currentPage = pages[pages.length - 1]
        if (currentPage.__route__ == "pages/qrcode/qrcode") { // 注销掉二维码页面
            // wx.navigateBack({})
            app.alert.redirect({
                status: app.alert.STATUS_SUCCESS,
                // mode: app.alert.MODE_PRIZE,
                nav: app.alert.NAV_BACK,
                store_uuid: store_uuid,
                title: title,
                content: content,
            })
        } else if (currentPage.__route__ == "pages/store/store") {  //店铺页面，跳转
            app.alert.navigate({
                status: app.alert.STATUS_SUCCESS,
                // mode: app.alert.MODE_PRIZE,
                nav: app.alert.NAV_BACK,
                store_uuid: store_uuid,
                title: title,
                content: content,
            })
        } else if (currentPage.__route__ == "pages/share/share") {  //店铺页面，跳转
            app.alert.redirect({
                status: app.alert.STATUS_SUCCESS,
                // mode: app.alert.MODE_PRIZE,
                nav: app.alert.NAV_BACK,
                store_uuid: store_uuid,
                title: title,
                content: content,
            })
        }    
    }
    
    /**
     *  获得分享券
     */
    getShare(store_uuid){
        // wx.navigateTo({
        //     url: `/pages/share/share?store_uuid=${GP.data.store.uuid}`
        // })
        app.share.navigate({
            nav: app.share.NAV_BACK,
            store_uuid: store_uuid,
        })
    }

    getScorePrizeFail(store_uuid, title, content) {
        app.alert.navigate({
            status: app.alert.STATUS_FAIL,
            nav: app.alert.NAV_BACK,
            store_uuid: store_uuid,
            title: title,
            content: content,
        })
    }
}
module.exports = StoreUtils

// app.alert.redirect({
//     status: status,
//     mode: app.alert.MODE_SHARE,
//     nav: app.alert.NAV_REDIRECT,
//     store_uuid: store_uuid,
//     title: res.message.title,
//     content: res.message.content,
// })
