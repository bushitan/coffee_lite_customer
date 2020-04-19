

// import dbFather from '../db/db_acitivy.js'
var dbFather = require('db_6_live.js')
class dbSon  extends dbFather {


    constructor() {
        super()

    }


    /**
     * @method 1 获取先享卡
     * @param
     *      page :""
     *      limit :""
     * @return 
     *      []
     */
    cardGet(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url:"https://sj.qskjad.top/PayScore/InitDiscountShareCard/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }



    // /**
    //  * @method 1 获取先享卡
    //  * @param
    //  *      page :""
    //  *      limit :""
    //  * @return 
    //  *      []
    //  */
    // cardRe(data) {
    //     return new Promise((resolve, reject) => {
    //         this.base({
    //             url: "https://sj.qskjad.top/payscore/recivenotify/",
    //             data: data,
    //             method: "POST",
    //             header:{
    //                 "myheader": "234",
    //             }
    //         }).then(res => {
    //             console.log(res)
    //             resolve(res)
    //         }).catch(res => reject(res))
    //     })
    // }

    /**
     * @method 3 绑定openid
     * @param
     *      page :""
     *      limit :""
     * @return 
     *      []
     */
    cardBind(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: "https://sj.qskjad.top/PayScore/BindDiscountCardUser/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    /**
     * @method 3 绑定openid
     * @param
     *      page :""
     *      limit :""
     * @return 
     *      []
     */
    cardCheck(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: "https://sj.qskjad.top/tenPayV3/CheckUserDiscountCard/",
                data: data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }
    

}


module.exports = dbSon