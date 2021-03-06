
var app = getApp()
var API = require('../../api/api.js')
var DB = require('../../api/db.js')
var db = new DB()

/**
 * 进入route有5种情况：
 * 1、普通登录，进入店铺列表list
 * 2、扫店铺码登录，进入店铺详情页store
 * 3、点击好友分享到对话中的分享券，进入提示页alert(success or fail)
 * 4、扫自动领券码，进入分享券页面share
 * 5、外卖扫自动领券码，进入分享券页面share或者积分成功
 */

// 进入店铺
// pages/route/route?mode=store&&store_uuid=ff1f7ada-63d8-11e9-a3f6-b83312f00bac

// 点击分享券，进入店铺集点
// pages/route/route?mode=share&store_uuid=68e54718-7156-11e9-b456-e95aa2c51b5d&share_uuid=c024b862-72c4-11e9-be1f-e95aa2c51b5d

// 扫码直接领分享券,短链接，
//  scene= sh自助积分_店铺id_sellerid_unix结束时间  ( sh分享， sc积分 )
// pages/route/route?scene=sh_1_1_1559939515

    // scan 函数扫描结果
    // res = {
    //     charSet:"utf-8",
    //     errMsg:"scanCode:ok",
    //     path:"pages/route/route?scene=sh_1_1_1559939515",
    //     rawData:"bGIxbCtOcmk6b35qI2JkczlEeUJrWC5fMTU1OTkyNTgyMw==",
    //     result:"",
    //     scanType:"WX_CODE",
    // }
var store_uuid = ""
class routeUtils {
    constructor() {
    }

    /**********进入小程序的4中模式**********/
    /**
     * @method 1、普通登录 
     */
    modeNormal() {
        wx.redirectTo({
            url: `/pages/list/list`,
        })
    }

    /**
     * @method 2、扫店铺码登录，进入店铺详情页store
     */
    modeStore(store_uuid) {
        wx.redirectTo({
            url: `/pages/store/store?store_uuid=${store_uuid}`,
        })  
    }


    /**
     * @method 3、点击好友分享到对话中的分享券，进入提示页alert(success or fail)
     */
    modeShare(store_uuid, share_uuid) {
        db.storeShare(share_uuid).then(res => {
            var message = res.message
            var data = res.data

            //接受分享成功，其余都是失败
            var status = message.code == app.code.CODE_SHARE_RECEIVE ? app.alert.STATUS_SUCCESS : app.alert.STATUS_FAIL            

            console.log(status)
            app.alert.redirect({
                status: status,
                mode: app.alert.MODE_SHARE,
                nav: app.alert.NAV_REDIRECT,
                store_uuid: store_uuid,
                title: res.message.title,
                content: res.message.content,
            })


            // wx.showModal({
            //     title: message.title || "",
            //     content: message.content || "",
            // })
            // GP.toStore(store_uuid)
        })
    }


    /**
     * @method 4、扫自动领券码 , 去alert页面
     */
    modeAuto(mode, store_id, seller_id, unix) {
        // if (mode == app.route.MODE_AUTO_SHARE) { //分享模式
        db.scanAutoShareCustomer(store_id, seller_id, unix).then(res => {
            console.log(res)
            var store = res.data
            if (res.message.code == app.code.CODE_SHARE_SUCCESS) {
                app.share.redirect({
                    nav: app.alert.NAV_REDIRECT,
                    store_uuid: store.uuid,
                })
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
            else {  // 系统出错失败
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
        // }
    }

    /**
     * @method 5、外卖扫码自动领取集点和券
     */
    modeWm(wm_short_uuid){

        wx.getLocation({
            type: "wgs84",
            success: function (res) { },
        })


        db.scanWMCustomer(wm_short_uuid).then(res=>{
            console.log(res)
            store_uuid = res.data.store_uuid
            var code = res.message.code
            var title = res.message.title
            var content = res.message.content
            

            // 增加扫码的记录
            this.getUserLocation()

            switch (code) {
                case app.code.CODE_WM_SCORE: //集点模式
                    app.alert.redirect({
                        status: app.alert.STATUS_SUCCESS, nav: app.alert.NAV_REDIRECT,
                        store_uuid: store_uuid, title: title, content: content,
                    })
                    break;
                case app.code.CODE_WM_SHARE: //分享模式
                    wx.showModal({
                        title: title,
                        content: content,
                    })
                    app.share.redirect({
                        nav: app.alert.NAV_REDIRECT,
                        store_uuid: store_uuid,
                    })
                    break;
                case app.code.CODE_WM_ALL: //全模式
                    wx.showModal({title: title,content: content,})
                    app.share.redirect({
                        nav: app.alert.NAV_REDIRECT,
                        store_uuid: store_uuid,
                    })
                    break;
                case app.code.CODE_WM_CLOSE: //店铺已关闭
                    this.modeNormal()
                    break;
                case app.code.CODE_WM_TIME_OUT: //二维码不存在
                    this.modeNormal()
                    break;

                /**
                 * 出错
                 * 已使用、已删除、已集满
                 */
                default:
                    app.alert.redirect({
                        status: app.alert.STATUS_FAIL, 
                        nav: app.alert.NAV_REDIRECT,
                        store_uuid: store_uuid, 
                        title: title || "网络错误", 
                        content: content || "请重新尝试",
                    })


                // case app.code.CODE_WM_USED: //已使用
                //     app.alert.redirect({
                //         status: app.alert.STATUS_FAIL, nav: app.alert.NAV_REDIRECT,
                //         store_uuid: store_uuid, title: title, content: content,
                //     })
                //     break;
                // case app.code.CODE_WM_DELETE: //已删除
                //     app.alert.redirect({
                //         status: app.alert.STATUS_FAIL, nav: app.alert.NAV_REDIRECT,
                //         store_uuid: store_uuid, title: title, content: content,
                //     })
                //     break;
                // case app.code.CODE_WM_FULL: //已集满
                //     app.alert.redirect({
                //         status: app.alert.STATUS_FAIL, nav: app.alert.NAV_REDIRECT,
                //         store_uuid: store_uuid, title: title, content: content,
                //     })
                //     break;
            }
        })
    }


    

    // 检测是否用户授权
    checkHasAuth() {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success(res) {
                    console.log(res.authSetting)
                    resolve(res.authSetting.hasOwnProperty("scope.userInfo"))
                }
            })
        })
    }


    /*************增加位置记录************/

    // 获取经纬度统计
    getUserLocation() {
        let vm = this
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
                    // console.log('authSetting:status:拒绝授权后再次进入重新授权', res.authSetting['scope.userLocation'])
                    wx.showModal({
                        title: '',
                        content: '需要获取你的地理位置，请确认授权',
                        success: function (res) {
                            if (res.cancel) {
                                wx.showToast({
                                    title: '拒绝授权',
                                    icon: 'none'
                                })
                                setTimeout(() => {
                                    wx.navigateBack()
                                }, 1500)
                            } else if (res.confirm) {
                                wx.openSetting({
                                    success: function (dataAu) {
                                        // console.log('dataAu:success', dataAu)
                                        if (dataAu.authSetting["scope.userLocation"] == true) {
                                            //再次授权，调用wx.getLocation的API
                                            vm.getLocation(dataAu)
                                        } else {
                                            wx.showToast({
                                                title: '授权失败',
                                                icon: 'none'
                                            })
                                            setTimeout(() => {
                                                wx.navigateBack()
                                            }, 1500)
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
                // 初始化进入，未授权
                else if (res.authSetting['scope.userLocation'] == undefined) {
                    // console.log('authSetting:status:初始化进入，未授权', res.authSetting['scope.userLocation'])
                    //调用wx.getLocation的API
                    vm.getLocation(res)
                }
                // 已授权
                else if (res.authSetting['scope.userLocation']) {
                    // console.log('authSetting:status:已授权', res.authSetting['scope.userLocation'])
                    //调用wx.getLocation的API

                    vm.getLocation(res)  //不主动授权
                }
            }
        })
    }
    // 微信获得经纬度
    getLocation(userLocation) {
        let vm = this
        wx.getLocation({
            type: "wgs84",
            success: function (res) {
                // console.log('getLocation:success', res)
                var latitude = res.latitude
                var longitude = res.longitude
                vm.addGeoNode(latitude, longitude)
            },
            fail: function (res) {
                // console.log('getLocation:fail', res)
                if (res.errMsg === 'getLocation:fail:auth denied') {
                    wx.showToast({
                        title: '拒绝授权',
                        icon: 'none'
                    })
                    setTimeout(() => {
                        wx.navigateBack()
                    }, 1500)
                    return
                }
                if (!userLocation || !userLocation.authSetting['scope.userLocation']) {
                    vm.getUserLocation()
                } else if (userLocation.authSetting['scope.userLocation']) {
                    wx.showModal({
                        title: '',
                        content: '请在系统设置中打开定位服务',
                        showCancel: false,
                        success: result => {
                            if (result.confirm) {
                                wx.navigateBack()
                            }
                        }
                    })
                } else {
                    wx.showToast({
                        title: '授权失败',
                        icon: 'none'
                    })
                    setTimeout(() => {
                        wx.navigateBack()
                    }, 1500)
                }
            }
        })
    }

    addGeoNode(  latitude, longitude){
        var data = data || {}
        data['action'] = "add_geo"
        data['type'] = 1
        data['store_uuid'] = store_uuid
        data['latitude'] = latitude
        data['longitude'] = longitude

        wx.cloud.callFunction({
            name: 'geo',
            data: data,
        })
    }

}
module.exports = routeUtils