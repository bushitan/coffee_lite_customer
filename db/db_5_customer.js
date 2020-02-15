

// import dbFather from '../db/db_acitivy.js'
var dbFather = require('db_4_ad.js')
class dbCustomer extends dbFather {


    constructor() {
        super()

    }

    /**
     * @method 1 获取心跳
     * @return 
     *      []
     */
    customerGetHeart() {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/QrCode/CustomerGetHeart/",
                // data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    /**
     * @method 2 扫描二维码
     * @param
     *      qrcodeUUID :""
     * @return 
     *      []
     */
    customerScanQrCode(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/QrCode/CustomerScanQrCode/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }
}


module.exports = dbCustomer