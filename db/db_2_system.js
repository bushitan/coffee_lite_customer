

var dbFather = require('db_1_base.js')
class dbSystem extends dbFather {


    constructor() {
        super()

    }

    /**
     * @method 1 用户登录
     * @return 
     *      session 
     *      sn 序列号
     */
    sysLogin() {
        return new Promise((resolve, reject) => {
            var that = this 
            wx.showLoading({title: '登陆中...',})
            wx.login({
                success(e) {
                    that.base({
                        url: that.HOST_URL + "ajdm/syslogin/",
                        data: {
                            jscode:e.code,
                            appid: that.APP_ID,
                        },
                        method: "POST",
                    }).then(res => {
                        wx.hideLoading()
                        if (res.code == 0) {
                            wx.setStorageSync(that.KEY_SESSION, res.data.session) //session
                            wx.setStorageSync(that.KEY_SN, "10" + res.data.sn)  //序列号
                        }                        
                        resolve(true)
                    }).catch(res => {
                        wx.hideLoading()
                        resolve(false)
                    })
                },
            })
            
        })
    }

    /**
     * @method 2 获取我的信息
     * @return
            allPrizeNum: 14
            allScoreNum: 126
            allStoreNum: 35
            bgImage: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKVkoe7Viae4llD4mw6pV1zBp67Qeq8tKibBZ8uBicxBqGOTekibaKwQt6IgI1g1zYnYrtBehiaQUT9ejQ/132"
            logo: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKVkoe7Viae4llD4mw6pV1zBp67Qeq8tKibBZ8uBicxBqGOTekibaKwQt6IgI1g1zYnYrtBehiaQUT9ejQ/132"
            name: "this.丰兄"
     *  
     */
    sysMyGetInfo() {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "ajdm/MyGetInfo/",
                method: "POST",
            }).then(res => {
                console.log(res)
                if (res.code == 0)
                    resolve(res.data)
                else
                    resolve({})
            }).catch(res => {
                reject({})
            })
        })
    }

    /**
     * @method 更新用户信息
     * @param
     *      name
     *      logo
     *      city
     * @return
     * 
     */
    sysMyUpdateInfo(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "MyUpdateInfo/",
                data: data,
                method: "POST",
            }).then(res => {
                wx.showModal({
                    title: res.data.msg,
                })
                console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

}


module.exports = dbSystem