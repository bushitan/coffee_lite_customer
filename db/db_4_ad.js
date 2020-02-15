

// import dbFather from '../db/db_store.js'
var dbFather = require('db_3_store.js')
class dbActivity extends dbFather {


    constructor() {
        super()

    }

    /**
     * @method 1 获取广告
     * @param
     *      page :""
     *      limit :""
     * @return 
     *      []
     */
    adGetPages(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/litead/GetPages/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    /**
     * @method 2  获取列表
     * @param
     *      type :""
     *      storeId :""
     *      storeUUID :""
     *      page :""
     *      limit :""
     * @return 
     *      []
     */
    adSysGetAdList(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/litead/SysGetAdList/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res.data)
            }).catch(res => reject(res))
        })
    }

    /**
     * @method 3  广告点击统计
     * @param
     *      adId :""
     *      type :""
     *      storeId :""
     *      storeUUID :""
     *      swiperIndex :""
     *      recordCode :""
     *      page :""
     *      position :""
     *      createTime:"" 需要改成服务器时间
     * @return 
     *      []
     */
    adAddRecord(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/litead/SysAddRecord/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }
}


module.exports = dbActivity