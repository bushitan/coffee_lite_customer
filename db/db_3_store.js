

// import dbFather from '../db/db_system.js'
// var dbFather = require('db_2_system.js')
var dbFather = require('db_2_system.js')
class dbStore extends dbFather {
    constructor() {
        super()

    }



    /**
     * @method 1 获取我的店铺列表
     * @param
     *      page:1,
     *      limit:10,
     * @return 
*      [{
        *  myScore: 0
            storeDes: ""
            storeLogo: "http://img.12xiong.top/coffee_image/upload/hwkYm6fZ.jpg"
            storeMaxScore: 0
            storeMinScore: 10
            storeName: "飞碟君"
            storeUUID: "6eab462e-0884-11ea-bda6-e95aa2c51b5d"
        * }]
     */
    storeMyGetStoreInfo(data) {
        return new Promise((resolve, reject) => {
            data = data || {}
            data.page = data.page || 1
            data.limit = data.limit || 100
            wx.showLoading({})
            this.base({
                url: this.HOST_URL + "api/lite/store/MyGetStoreInfo/",
                data: data,
                method: "POST",
            }).then(res => {
                wx.hideLoading()
                console.log(res)
                if (res.code == 0) 
                    resolve(res.data)
                else
                    resolve({})
            }).catch(res => {
                wx.hideLoading()
                reject({})
            })
        })
    }


    /**
     * @method 2 获取店铺信息
     * @param
     *      storeUUID
     *      storeID
     * @return 
     *      coverCollectScore: 0
            coverLimitTime: 0
            coverLiveTime: null
            defaultCoverBgImgUrl: null
            endTime: "2020-11-15 23:18:00"
            latitude: 0
            longitude: 0
            noticImageList: []
            startTime: "2019-11-16 23:18:00"
            storeDes: ""
            storeLoadImage: null
            storeLogo: "http://img.12xiong.top/coffee_image/upload/hwkYm6fZ.jpg"
            storeMaxScore: 0
            storeMinScore: 10
            storeName: "飞碟君"
            storeShopUrl: null
            storeSummary: "满10个飞碟，送1个13块钱内的"
     */
    storeGetStore(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/GetStore/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res.data)
            }).catch(res => reject(res))
        })
    }

    /**
     * @method 3  客户获取该店铺的积分
     * @param
     *      storeUUID
     *      page
     *      limit
     * @return 
     *      []
     */
    storeCustomerGetStoreScore(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/CustomerGetStoreScore/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res.data)
            }).catch(res => reject(res))
        })
    }


    /**
     * @method 4  客户获取该店铺的兑换
     * @param
     *      storeUUID
     *      page
     *      limit
     * @return 
     *      []
     */
    storeCustomerGetStorePrize(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/CustomerGetStorePrize/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    /**
     * @method 5  客户获兑换的详情
     * @param
     *      prizeUUID
     * @return 
     *      []
     */
    storeCustomerGetStorePrize(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/CustomerGetStorePrizeDetail/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    

}


module.exports = dbStore