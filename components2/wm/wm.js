// components/address.js
var app = getApp()
var map
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // longitude: {
        //     type: Number,
        //     value: 108
        // },
        // latitude: {
        //     type: Number,
        //     value: 22.81521,
        // },
        // mapMarkers:{

        //     type: Array,
        //     value: []
        // }

        addressList:{
            type: Array,
            value: [],
            observer:"getAddressList",
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isAuthorLocaiton: false,
        longitude: 108.32754,
        latitude: 22.81521,
        mapMarkers: [
            // {
            //     iconPath: "/images/icon/address.png",
            //     id: 0,
            //     longitude: 108.33554,
            //     latitude: 22.82521,
            //     width: 50,
            //     height: 50,
            //     callout: {
            //         content: "seeking咖啡(金湖店)",
            //         color: "#ffffff",
            //         bgColor: "#512B0D",
            //         fontSize: "13",
            //         borderRadius: "5",
            //         padding: "10",
            //         display: "ALWAYS",
            //     },
            // }
        ],
        circles:[
            // {
            //     longitude: 108.33554,
            //     latitude: 22.82521,
            //     color:"#efaf30",
            //     fillColor:"#4770e266",
            //     radius:4000,
            // }
        ],
    },
    created(){
        map = wx.createMapContext("map", this)
    },
    async attached(){

       
        this.setData({
            // isAuthorLocaiton: await app.db.checkAuthorUserLocation()
        })
        // onInit()
        // console.log(this.data.mapMarkers)
    },
    options: {
        styleIsolation: 'apply-shared'
    },
    /**
     * 组件的方法列表
     */
    methods: {

        onInit(){
            map.includePoints()
        },

        // 获取地址，转换为坐标点
        getAddressList(_new,_old){
            console.log(_new,_old)
            if (_new.length > 0) {
                var mapMarkers = []
                var circles = []
                for (var i=0; i<_new.length ;i++){
                    var node = _new[i]
                    mapMarkers.push({
                        iconPath: "/images/icon/address.png",
                        id: 0,
                        longitude: node.longitude,
                        latitude: node.latitude,
                        width: 50,
                        height: 50,
                        callout: {
                            content: node.name,
                            color: "#ffffff",
                            // bgColor: "#efaf30",
                            bgColor: "#ef5830",                            
                            fontSize: "11",
                            borderRadius: "5",
                            padding: "10",
                            display: "ALWAYS",
                        },
                        label:{
                            content: "点击查看导航图",
                            color: "#ffffff",
                            fontSize: "9",
                            anchorX: 8,
                            anchorY: 0,
                            bgColor:"#efaf30",
                            padding:"5",
                            // textAlign:center,

                        }
                    }) 
                    circles.push({
                        longitude: node.longitude,
                        latitude: node.latitude,
                        color: "#efaf30",
                        fillColor: "#4770e266",
                        radius: parseInt(node.radius),
                    })
                }
                this.setData({
                    mapMarkers: mapMarkers,
                    circles: circles,

                    longitude: _new[0].longitude,
                    latitude: _new[0].latitude,
                })

                map.includePoints({
                    points:_new,
                    padding:[60],
                    success(res){ console.log(res)},
                    fail(res) { console.log(res)},
                })
            }
        },

        getNav(){
            wx.openLocation({
                latitude: parseInt(this.data.latitude),
                longitude: parseInt(this.data.longitude),
                scale: 15
            })
        },

        // 授权位置
        async openSetting() {
            this.setData({
                isAuthorLocaiton: await app.db.openSettingLocation()
            })
            this.getSelfLocation() //验证完后，直接刷新自己的定位
        },
        async getSelfLocation() {
            
            var locaotion = await app.db.getLocation()
            if (locaotion) {
                this.setData({
                    longitude:  locaotion.longitude,
                    latitude: locaotion.latitude,
                })

                // 移动到我的位置
                map.moveToLocation({
                    longitude: locaotion.longitude,
                    latitude: locaotion.latitude,
                })
            }

            this.triggerEvent("clickLocation")
        }


    }
})
