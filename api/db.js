
var API = require('api.js')
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
    async login(){
        var code = await this.getWXCode()
        var res = await this.base({
            url:API.ROUTE_USER_LOGIN,
            data: { 
                code:code,
                is_customer:true,
                uuid: wx.getStorageSync(API.UUID),
            }
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

    // 店铺数据
    async storeDetail(store_uuid) {
        var res = await this.base({
            url: API.STORE_DATA_CUSTOMER,
            data: {
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