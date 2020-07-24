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
        }
    },
    options: {
        styleIsolation: 'apply-shared'
    },
    /**
     * 组件的初始数据
     */
    data: {
        node:{},
        SHOW_IMAGE: app.dbAD.AD.SHOW_IMAGE,
        SHOW_BUTTON: app.dbAD.AD.SHOW_BUTTON,
    },

    ready(){
        this.onInit()
    },
    /**
     * 组件的方法列表
     */
    methods: {

        onInit(){
            var data = {
                mode: app.dbAD.AD.MODE_BANNER
            }
            app.dbAD.getList(data).then(res=>{

                this.setData({
                    node: res.data[0],
                })
            })
            // this.addAD()
        },


        clickAD(e) {
            // console.log(e.currentTarget.dataset.index)
            // var index = e.currentTarget.dataset.index
            // var ad = this.data.list[index]

            var ad = this.data.node
            // 点击广告的动作
            app.dbAD.clickAction(ad, this.data.storeUUID)
            // 添加记录
            app.dbAD.addRecord({
                "mode": app.dbAD.AD.RECORD_BANNER,
                "adID": ad._id,
                "storeUUID" : this.data.storeUUID,
            }) 
        },


        addAD(){
            var data = {
                sn: 10,

                mode: 2, // 1轮播图 、2banner、3门店内容
                storeUUID: "",

                isShow: true,
                showType: 1,    //
                showImageUrl: "cloud://cup-customer-release.6375-cup-customer-release-1301587562/ad/202006301.jpg",
                showDes: "一份咖啡饮品优惠攻略，承包今夏全部的快乐",
                showBtnText: "",

                clickType: 2, // 1打开图片  2跳文字  3打开小程序 4打开直播

                clickImageUrl: "",

                clickContentUrl: "https://mp.weixin.qq.com/s/MXy9NfnbWvcoEJO-iY8n2A",

                clickLiteAppID: "",
                clickLitePath: "",
                clickLiteExtraData: "",
                clickLiteEnvVersion: "",

                clickRoomID: "",
            }
            app.dbAD.addNode(data) 
        },
        // clickAction(ad){

          
        // },



        addAD(){
            var data = {


                "sn": 0,
                "mode": 3,  // 1轮播图 、2banner、3门店内容
                "storeUUID": "3554b450-748e-11e9-98e6-e95aa2c51b5d",

                "isShow": true,
                "showType": 1,// 1图片 2按钮 3纯文字
                "showImageUrl": "cloud://cup-customer-release.6375-cup-customer-release-1301587562/ad/202005241000.jpg",
                "showDes": "",
                "showBtnText": "",

                "clickType": 2,   ////1图片 2链接  3小程序 4直播间

                "clickImageUrl": "",

                "clickContentUrl": "https://mp.weixin.qq.com/s/WvFyc9X54Fks1jtHQfDHnw",

                "clickLiteAppID": "",
                "clickLitePath": "",
                "clickLiteExtraData": "",
                "clickLiteEnvVersion": "",

                "clickRoomID": "",
            }

            app.dbAD.addNode( data )
            
        }
    }
})
