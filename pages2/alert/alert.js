// pages2/alert/alert.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status:false,
        storeUUID:"",
        title:"集点成功",
        cardCur: 0,
        swiperList: [],
    }, 

    onLoad(options){


        this.setData({
            status: options.status || "",
            storeUUID: options.storeUUID || "",
            title: options.title || "",
        })
        this.onInit()
    },

    async onInit(){
        var ad = await app.db.adSysGetAdList({ storeUUID: this.data.storeUUID, type: app.db.AD_ALERT })
        this.setData({
            adList: ad,
        })
    },


    /**
     * @method 返回店铺
     */
    toStore(){
        var url = '/pages2/store/store?storeUUID=' + this.data.storeUUID
        if (this.data.storeUUID == "")
            url = '/pages2/self/self',
        wx.redirectTo({
                url: url,
        })
    },


    // cardSwiper
    cardSwiper(e) {
        this.setData({
            cardCur: e.detail.current
        })
    },

})