// components2/ad/ad.js

/**
 [
    {
        _id: "2132132",
        sn:0,

        mode:1, // 1轮播图 、2banner、3门店内容
        storeUUID: "68e54718-7156-11e9-b456-e95aa2c51b5d",

        isShow: true,
        showType: 1,
        showImageUrl: "http://img.12xiong.top/coffee_image/upload/psSYv6fZ.jpg",
        showDes: "商城每单立享8元",
        showBtnText: "点击查看",

        clickType: 3,

        clickImageUrl: "http://img.12xiong.top/coffee_image/upload/psSYv6fZ.jpg",

        clickContentUrl: "https://mp.weixin.qq.com/s/XJ2ir0X4PCLLcV890BzL_w",

        clickLiteAppID: "wx97e90498901fb752",
        clickLitePath: "pages/menu/menu",
        clickLiteExtraData: "",
        clickLiteEnvVersion: "",

        clickRoomID: "",
    }
]
 */

var app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        storeUUID:{
            type:String,
            value:"",
            observer:'changeStoreUUID',
            // observer: function (newVal, oldVal) {
            //     this.setData({ checkImage: newVal || IMAGE_CHECK })
            // }
        }
    },
    options: {
        styleIsolation: 'apply-shared'
    },
    /**
     * 组件的初始数据
     */
    data: {
        list:[],
        SHOW_IMAGE: app.dbAD.AD.SHOW_IMAGE,
        SHOW_BUTTON: app.dbAD.AD.SHOW_BUTTON,
    },

    ready(){
        // this.onInit()
    },
    /**
     * 组件的方法列表
     */
    methods: {

        changeStoreUUID(newVal, oldVal){
            console.log(newVal, oldVal)
            if (newVal != ""){
                var data = {
                    mode: app.dbAD.AD.MODE_STORE,
                    storeUUID: this.data.storeUUID
                }
                app.dbAD.getList(data).then(res => {

                    this.setData({
                        list: res.data
                    })
                })
            }
           
           
        },


        clickAD(e) {
            // console.log(e.currentTarget.dataset.index)
            var index = e.currentTarget.dataset.index
            var ad = this.data.list[index]

            // var ad = this.data.node
            // 点击广告的动作
            app.dbAD.clickAction(ad, this.data.storeUUID)
            // 添加记录
            // app.dbAD.getRecord({
            //     // "storeUUID" : this.data.storeUUID,
            // }) 
            app.dbAD.addRecord({
                "mode": app.dbAD.AD.RECORD_STORE,
                "adID": ad._id,
                "storeUUID": this.data.storeUUID,
            }) 
        },


        // clickAction(ad){

          
        // },


    }
})
