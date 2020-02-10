

// import dbFather from '../db/db_system.js'
// var dbFather = require('db_2_system.js')
var dbFather = require('db_2_system.js')
class dbStore extends dbFather {
    constructor() {
        super()

    }
    
    /**
     * @method 1 用户登录
     * @param
     *      
     * @return 
     * 
     */
    test(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/lite/store/MyGetStoreInfo/",
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