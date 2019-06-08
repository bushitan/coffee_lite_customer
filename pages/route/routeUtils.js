
var app = getApp()
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()

/**
 * 进入route有4种情况：
 * 1、普通登录，进入店铺列表list
 * 2、扫店铺码登录，进入店铺详情页store
 * 3、点击好友分享到对话中的分享券，进入提示页alert(success or fail)
 * 4、扫自动领券码，进入分享券页面share
 */

class routeUtils {
    constructor() {
    }


    /**
     * @method 1、普通登录 
     */
    modeNormal(){
        wx.redirectTo({
            url: `/pages/list/list`,
        })
    }



    /**
     * @method 4、扫自动领券码 , 去alert页面
     */
    modeAuto(mode, store_id, seller_id, unix) {
        if (mode == app.route.MODE_AUTO_SHARE) { //分享模式
            db.scanAutoShareCustomer(store_id, seller_id, unix).then(res => {
                console.log(res)
                var store = res.data
                if (res.message.code == app.code.CODE_SHARE_SUCCESS) {
                    // TODO 跳转到分享页面
                }
                else if (res.message.code == app.code.CODE_SHARE_AUTO_TIME_OUT) { //已超时
                    app.alert.redirect({
                        status: app.alert.STATUS_FAIL,
                        mode: app.alert.MODE_SHARE,
                        nav: app.alert.NAV_REDIRECT,
                        store_uuid: store.uuid,
                        title: res.message.title,
                        content: res.message.content,
                    })
                }
                else {
                    app.alert.redirect({
                        status: app.alert.STATUS_FAIL,
                        mode: app.alert.MODE_SHARE,
                        nav: app.alert.NAV_REDIRECT,
                        store_uuid: store.uuid,
                        title: res.message.title,
                        content: res.message.content,
                    })
                }
            })
        }
    }

}
module.exports = routeUtils