

// import dbFather from '../db/db_acitivy.js'
var dbFather = require('db_7_discount_card.js')
class dbSon  extends dbFather {


    constructor() {
        super()

    }


    /**
     * @method 1 获取先享卡
     * @param
     * 
     * @return 
     * 
     */

    liteMapGetPOIList(data) {
        return new Promise((reslove, reject) => {
            var data = {
                data:[
                    {
                        1:1
                    },
                ]
            }
            reslove(data)
            
            // data = data || {}
            // data['action'] = "get_list"
            // wx.cloud.callFunction({
            //     name: 'ad',
            //     data: data,
            //     success: res => {
            //         if (res.result.code == 0)
            //             reslove(res.result)
            //     },
            //     fail: res => {
            //         console.log(res.result)
            //         wx.hideLoading()
            //     },
            // })
        })
        // return adList
    }
    

}


module.exports = dbSon