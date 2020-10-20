// components2/mall-map/mall-map.js
var BRAND_TYPE_ALL = 1
var mapContext 
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    options: {
        styleIsolation: 'apply-shared'
    },

    /**
     * 组件的初始数据
     */
    data: {
        brandIndex:0,
        brandList: [],

        poiLongitude: "108.34024047851562",
        poiLatitude: "22.816320419311523",

        storeList: [],
        poiMarkers: [],
    },

    ready() {
        this.onInit()
        mapContext = wx.createMapContext('map', this);
    },


    /**
     * 组件的方法列表
     */
    methods: {

        /**
         * @method 初始化
         */
        async onInit() {
            var res = await this.getBrandList({
                detail:{
                    type : BRAND_TYPE_ALL,
                    isShow:true,
                }
            }) //获取品牌列表
            var brandList = res.data
            this.setData({
                brandList: brandList
            })

            var res = await this.getStoreList({ brandID: brandList[0]._id  }) // 获取当前门店的列表
            this.setStoreListToMap(res.data)
        },

        /**
         * @method 点击品牌 刷新地图
         */
        async clickBrand(e){
            this.changeBrandIndex(e)
            var res = await this.getStoreList({ brandID: this.data.brandList[ this.data.brandIndex ]._id }) // 获取当前门店的列表

            this.setStoreListToMap(res.data)
        },

        /**
         * @method 修改品牌点击位置
         */
        changeBrandIndex(e){
            this.setData({
                brandIndex: e.currentTarget.dataset.index
            })
        },

        /**
         * @method 获取门店列表
         */
        getStoreList(data){
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "store_get_list_by_brandid"
                wx.cloud.callFunction({
                    name: 'mall',
                    data: data,
                    success: res => {
                        if (res.result.code == 0){                           
                            reslove(res.result)
                        }
                            
                    },
                    fail: res => {
                    },
                })
                // wx.cloud.callFunction({
                //     name: 'geo',
                //     data: {
                //         "action": "get_geo_store_list",
                //         store_uuid: "54931e42-7c67-11e9-b94e-e95aa2c51b5d",
                //         // isToday: this.data.TabCur == 0?true :false,
                //         // range: this.data.SortMenu[this.data.TabCur].range
                //         range: 3
                //     },
                //     success: res => {
                //         console.log(res)
                //         var temp = res.result.data
                //         // var list = []
                //         // for (var i = 0; i < temp.length; i++)
                //         //     list.push({
                //         //         "count": 100,
                //         //         "lng": temp[i].geo.coordinates[0],
                //         //         "lat": temp[i].geo.coordinates[1]
                //         //     })


                //         if (res.result.code == 0)
                //             reslove(temp)
                //         // this.setData({
                //         //     poiList: list
                //         // })
                    
                //         // wx.setStorageSync("list", list)
                //     },
                // })
            })
        },


        /**
         * @method 将门店列表放入map
         */
        setStoreListToMap(list) { 
            var tempList = []
            // debugger
            for (var i = 0; i < list.length; i++) {
                var marker = list[i]
                tempList.push({
                    iconPath: this.data.brandList[this.data.brandIndex].icon ,
                    id: i,
                    longitude: marker.location.coordinates[0],
                    latitude: marker.location.coordinates[1],
                    width: 40,
                    height: 40,
                    callout:{
                        content: this.data.brandList[this.data.brandIndex].callout || "自提点",
                        color:"#ffffff",
                        bgColor: this.data.brandList[this.data.brandIndex].calloutBgColor || "#efaf30",
                        display:"ALWAYS",
                        padding:5,
                    },
                    label:{
                        content: marker.name
                    },
                })
            }
            console.log(tempList)
            this.setData({
                poiMarkers: tempList,
                storeList: list,
            })

            mapContext.includePoints({
                padding: [100, 80, 100, 80],
                points: tempList, //放入所有坐标轴的数组   并引用此方法
                success: (res) => {
                    console.log(res)
                }, 
                fail: (res) => {
                    console.log(res)
                },
            },this)

        },

        // 获取品牌列表
        getBrandList(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "brand_get_list"
                wx.cloud.callFunction({
                    name: 'mall',
                    data: data,
                    success: res => {
                        if (res.result.code == 0)
                            reslove(res.result)
                    },
                    fail: res => {
                        // (res.result)
                        // console.log(res.result)
                        // wx.hideLoading()
                    },
                })
            })
        },


        /**
         * @method 点击坐标点
         */
        poiMarkerTap(e) {
            console.log(e.detail.markerId)
            var index = e.detail.markerId
            var store = this.data.storeList[index]
            if (store.relateUUID)
                wx.navigateTo({
                    // url: `/pages/store/store?store_uuid=68e54718-7156-11e9-b456-e95aa2c51b5d`,
                    url: `/pages/store/store?store_uuid=` + store.relateUUID,                
                })
            else
                wx.openLocation({
                    name: store.name,
                    address: store.address,
                    longitude: store.location.coordinates[0],
                    latitude: store.location.coordinates[1],                    
                    scale: 14,
                })
        },
    }
})
