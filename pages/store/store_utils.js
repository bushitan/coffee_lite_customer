
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
    getScorePrizeSucess(){
        var pages = getCurrentPages()
        var currentPage = pages[pages.length - 1]
        if (currentPage.__route__ == "pages/qrcode/qrcode") {
            // var prePage = pages[pages.length - 2]
            // prePage.updateStoreData()
            wx.navigateBack({})
        } else if (currentPage.__route__ == "pages/store/store") {

        }    
    }
    
    /**
     *  分享成功
     */
    shareSucess(){
        wx.navigateTo({
            url: `/pages/share/share?store_uuid=${GP.data.store.uuid}`
        })
    }
}
module.exports = StoreUtils
