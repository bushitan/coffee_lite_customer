

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
                        //展示
                        name:"白日梦相机",
                        desc:"金湖小店",
                        geo:{
                            coordinates: [108.34024047851562, 22.816320419311523]
                        }, 
                        
                        style:1, //1 image 2video
                        image_url:"https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg",        
                video_url:"cloud://cup-customer-release.6375-cup-customer-release-1301587562/video/1_bairimeng.mp4",

                        
                      
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