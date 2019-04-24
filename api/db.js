
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
                    reject(err)
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
    async login() {
        var code = await this.getWXCode()
        var res = await this.base({
            url: API.ROUTE_USER_LOGIN,
            data: {
                code: code,
                is_customer: IS_CUSTOMER,
                uuid: wx.getStorageSync(API.UUID),
            }
        })
        return res.data.data
    }

    //用户更新信息
    async userUpdate(userInfo) {
        var data = userInfo
        data['is_customer'] = IS_CUSTOMER
        data['uuid'] = wx.getStorageSync(API.UUID)       
        var res = await this.base({
            url: API.ROUTE_USER_UPDATE,
            data: data
        })
        return res.data.data
    }

    // 获取店铺列表
    async storeList(){
        var res = await this.base({
            url: API.STORE_LIST_CUSTOMER,
        })
        return res.data.data
    }
    // 店铺自身信息
    async storeInfo(store_uuid) {
        var res = await this.base({

            url: API.STORE_INFO,
            data: {
                store_uuid: store_uuid,
            }
        })
        return res.data.data
    }

    // 店铺单项详细数据
    async storeData(store_uuid) {
        var res = await this.base({
            url: API.STORE_DATA_CUSTOMER,
            data: {
                // model:model,
                store_uuid: store_uuid,
            }
        })
        return res.data.data
    }
    // 店铺单项详细数据
    async storeDetail(model,store_uuid) {
        var res = await this.base({
            url: API.STORE_DETAIL_CUSTOMER,
            data: {
                model:model,
                store_uuid: store_uuid,
            }
        })
        return res.data.data
    }



    // 获取更新数据
    async refresh(model,store_uuid) {
        var res = await this.base({
            url: API.REFRESH_CUSTOMER,
            data: {
                model: model,
                store_uuid: store_uuid,
            }
        })
        return res.data.data
    }
}

module.exports = db