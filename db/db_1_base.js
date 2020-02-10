class dbBase {

    APP_ID =  1 //"wxeb9623bdc85a64f4" //客户端
    // APP_ID = "wx3e0f68d227f05241"  //商户端

    

    KEY_SESSION = "session"
    KEY_SN = "sn"
    KEY_UUID = "uuid"
    KEY_USER_ID= "user_id"
    KEY_USER_INFO= "user_info"
    KEY_OPEN_ID= "open_id"
    KEY_APP_ID= "app_id"
    KEY_UNION_ID="union_id"

    HOST_URL = "http://jdkapi.qskjad.top/" // 主机地址

    constructor() {

    }

    // 封装基础的请求
    base(options) {
        return new Promise((resolve, reject) => {
            var data = options.data || {}
            data['customer_uuid'] = wx.getStorageSync(this.KEY_UUID)


            data['session'] =  wx.getStorageSync(this.KEY_SESSION)  
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
                    console.log("请求错误：" + options.url,res)
                    reject(res)
                },
            })
        })
    }




    /**
     * @method 1 用户登录
     * @param
     *      
     * @return 
     * 
     */
    test(data){
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "ajdm/MyGetInfo/",
                data:data,
                method: "POST",
            }).then(res => {
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    // baseHost(options) {
    //     return new Promise((resolve, reject) => {
    //         this.base({
    //             url: HOST_URL + options.url,
    //             data: options.data,
    //             method: options.method,
    //             success(res) {
    //                 resolve(res)
    //             },
    //             fail(res) {
    //                 console.log(res)
    //                 reject(res)
    //             },
    //         })
    //     })
    // }

    // baseHostNormal() { }



    // base(){
    //     console.log(11)
    // }
}


module.exports = dbBase