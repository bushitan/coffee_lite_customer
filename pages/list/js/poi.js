
var app = getApp()
module.exports = Behavior({
    data: {
        poiLongitude: "108.34024047851562",
        poiLatitude: "22.816320419311523",
        
        poiList: [],
        poiMarkers: [],
        
        poiCurrent:{},
        poiDialogShow:false,

        poiShow:false,
        poiDetail: {
            //展示
            name: "白日梦相机",
            desc: "金湖小店",
            geo: {
                coordinates: [108.34024047851562, 22.816320419311523]
            },

            style: 2, //1 image 2video
            image_url: "https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg",
            video_url: "cloud://cup-customer-release.6375-cup-customer-release-1301587562/video/1_bairimeng.mp4",

            footer_style: 2, // 1 集点卡  2 其他小程序
            footer_discount: "集6赠1",
            footer_btn: "去领券",
            footer_logo: "/images/menu_contact.png",//跳转的小程序logo
            footer_appid: "", //跳转的小程序
            footer_path: "", //跳转的路径
        },
    },
    ready() {
        console.log("poi ready")
        this.poiGetList()
        //  this.poiOnInit()
    },
    methods: {

        poiOnInit() {
            //查看集点结果
            wx.cloud.callFunction({
                name: 'geo',
                data: {
                    "action": "get_geo_store_list",
                    store_uuid: "54931e42-7c67-11e9-b94e-e95aa2c51b5d",
                    // isToday: this.data.TabCur == 0?true :false,
                    // range: this.data.SortMenu[this.data.TabCur].range
                    range: 3
                },
                success: res => {
                    console.log(res)
                    var temp = res.result.data
                    var list = []
                    for (var i = 0; i < temp.length; i++)
                        list.push({
                            "count": 100,
                            "lng": temp[i].geo.coordinates[0],
                            // "lng": temp[i].geo.coordinates[0],
                            "lat": temp[i].geo.coordinates[1]
                        })
                    // console.log(JSON.stringify(list))
                    this.setData({
                        poiList: list
                    })
                    this.poiToMarkers()
                    // wx.setStorageSync("list", list)
                },
            })
        },

        /**
         * @method 获取小地图坐标点
         */
        async poiGetList() {
            var res = await app.db.liteMapGetPOIList()
            // console.log(res)
            this.setData({
                poiList: res.data
            })
            
            //把坐标点，变为marker
            this.poiToMarkers(res.data) 
            
        },


        /**
         * @method 将POI点转化为markers
         */
        poiToMarkers(list) {
            var tempList = []
            for (var i = 0; i < list.length; i++) {
                var marker = list[i]
                tempList.push({
                    iconPath: "/images/menu_address.png",
                    id: i,
                    longitude: list[i].geo.coordinates[0],
                    latitude: list[i].geo.coordinates[1],
                    width: 30,
                    height: 30
                })
            }
            this.setData({
                poiMarkers: tempList
            })
        },

        /**
         * @method 点击坐标点
         */
        poiMarkerTap(e){

            wx.navigateTo({
                url: `/pages/store/store?store_uuid=68e54718-7156-11e9-b456-e95aa2c51b5d`,
            })
            // console.log(e.detail.markerId)
            // var i = e.detail.markerId
            // console.log(this.data.poiList[i])

            // this.setData({
            //     poiDetail: this.data.poiList[i]
            // })
            // this.poiSwitchDialog()



        },
        /**
         * @method 地图的开关
         */
        poiSwitchDialog(){
            if(this.data.poiShow == true){
                var poiDetail = this.data.poiDetail
                poiDetail.video_url = ""
                this.setData({ poiDetail: poiDetail })
            }
            this.setData({ poiShow: !this.data.poiShow})
        },

    },

    // onLoad() {
    //     console.log("behavior onload")
    // },
    // created() {
    //     console.log("created")
    // },

    // attached() {
    //     debugger
    //     console.log("attached")
    // },

    // ready() {
    // },
    // moved() {
    //     console.log("moved")
    // },

    // detached() {
    //     console.log("detached")
    // },
})


        // this.poiOnInit()

        // poiOnInit() {
        //     //查看集点结果
        //     wx.cloud.callFunction({
        //         name: 'geo',
        //         data: {
        //             "action": "get_geo_store_list",
        //             store_uuid: "54931e42-7c67-11e9-b94e-e95aa2c51b5d",
        //             // isToday: this.data.TabCur == 0?true :false,
        //             // range: this.data.SortMenu[this.data.TabCur].range
        //             range: 3
        //         },
        //         success: res => {
        //             console.log(res)
        //             var temp = res.result.data
        //             var list = []
        //             for (var i = 0; i < temp.length; i++)
        //                 list.push({
        //                     "count": 100,
        //                     "lng": temp[i].geo.coordinates[0],
        //                     // "lng": temp[i].geo.coordinates[0],
        //                     "lat": temp[i].geo.coordinates[1]
        //                 })
        //             // console.log(JSON.stringify(list))
        //             this.setData({
        //                 poiList: list
        //             })
        //             this.poiToMarkers()
        //             // wx.setStorageSync("list", list)
        //         },
        //     })
        // },