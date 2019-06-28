
var API = require('api.js')
var IS_CUSTOMER = true
class db {
    constructor() {
    }
    // 封装基础的请求
    base(options){
        return new Promise((resolve, reject) => {
            var data = options.data || {}
            data['customer_uuid'] = wx.getStorageSync(API.UUID)
            wx.request({
                url: options.url,
                method: options.method || "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                data: data,
                success(res) {
                    resolve(res)
                },
                fail(res) {
                    console.log(res)
                    reject(res)
                },
            })
        })
    }

    // 获取微信code
    getWXCode(){
        return new Promise((resolve, reject) => {
            wx.login({
                success(res) { resolve(res.code)},
            })
        })
    }

    /****业务详情****/
    //用户登录认证
    login() {
        return new Promise((resolve, reject) => {
            // API 
            this.getWXCode().then(code => {
                // API 
                this.base({
                    url: API.ROUTE_USER_LOGIN,
                    data: {
                        code: code,
                        is_customer: IS_CUSTOMER,
                        uuid: wx.getStorageSync(API.UUID),
                    }
                }).then(res => resolve(res.data.data))
            })
        })
    }

    //用户更新信息
    userUpdate(userInfo) {
        return new Promise((resolve, reject) => {
            var data = userInfo
            data['is_customer'] = IS_CUSTOMER
            data['uuid'] = wx.getStorageSync(API.UUID)       
            this.base({
                url: API.ROUTE_USER_UPDATE,
                data: data
            }).then(res => resolve(res.data.data))
        })
    }

    // 获取店铺列表
    storeList() {
        return new Promise((resolve, reject) => {
            this.base({
                url: API.STORE_LIST_CUSTOMER,
            }).then(res => resolve(res.data.data))
        })
    }

    // 店铺自身信息
    storeInfo(store_uuid) {
        return new Promise((resolve, reject) => {
           this.base({

                url: API.STORE_INFO,
                data: {
                    store_uuid: store_uuid,
                }
           }).then(res => resolve(res.data.data))
        })
    }

    // 店铺总共详细数据
    storeData(store_uuid) {
        return new Promise((resolve, reject) => {
            this.base({
                url: API.STORE_DATA_CUSTOMER,
                data: {
                    // model:model,
                    store_uuid: store_uuid,
                }
            }).then(res => resolve(res.data))
        })
    }
    // 店铺单项详细数据
    storeDetail(model, store_uuid) {
        return new Promise((resolve, reject) => {
            this.base({
                url: API.STORE_DETAIL_CUSTOMER,
                data: {
                    model:model,
                    store_uuid: store_uuid,
                }
            }).then(res => resolve(res.data.data))
        })
    }


    // 店铺单项详细数据
    storeShare( share_uuid) {
        return new Promise((resolve, reject) => {
            this.base({
                url: API.STORE_SHARE_CUSTOMER,
                data: {
                    share_uuid: share_uuid
                }
            }).then(res => resolve(res.data))
        })
    }



    // 获取更新数据
    refresh(model, store_uuid) {
        return new Promise((resolve, reject) => {
            this.base({
                url: API.REFRESH_CUSTOMER,
                data: {
                    model: model,
                    store_uuid: store_uuid,
                }
            }).then(res => resolve(res.data))
        })
    }


    // 获取更新数据
    scanAutoShareCustomer(store_id, seller_id, unix) {
        return new Promise((resolve, reject) => {
            this.base({
                url: API.SCAN_AUTO_SHARE_CUSTOMER,
                data: {
                    store_id: store_id,
                    seller_id: seller_id,
                    unix: unix,
                }
            }).then(res => resolve(res.data))
        })
    }
    // 获取更新数据
    scanWMCustomer(wm_short_uuid) {
        return new Promise((resolve, reject) => {
            this.base({
                url: API.SCAN_WM_CUSTOMER,
                data: {
                    wm_short_uuid: wm_short_uuid,
                }
            }).then(res => resolve(res.data))
        })
    }
    


    scanCheckWmTicketCustomer(wm_short_uuid){
        return new Promise((resolve, reject) => {
            this.base({
                url: API.SCAN_WM_CHECK_CUSTOMER,
                data: {
                    wm_short_uuid: wm_short_uuid,
                }
            }).then(res => resolve(res.data))
        })
        
    }
     // 获取更新数据 （已废弃）
    // scanAutoShareCustomer11111(qrBase64) {
    //     return new Promise((resolve, reject) => {
    //         this.base({
    //             url: API.SCAN_AUTO_SHARE_CUSTOMER,
    //             data: {
    //                 qr_base64: qrBase64,
    //             }
    //         }).then(res => resolve(res.data))
    //     })
    // }
}

module.exports = db