// components2/mall-map/mall-map.js
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
        brandList: [
            {
                icon: "/images/icon_cup_right.png",
                name: "小杯子集点卡",
                des:"去集点吧",
                callout:"集点活动",
            },
            {
                icon: "https://6375-cup-customer-release-1301587562.tcb.qcloud.la/product/1xuelan.jpg?sign=325d40c590368e76b69feb357cc4789a&t=1602998954",
                name: "雪兰",
                des: "新鲜牛奶",
                callout: "鲜奶自提点",
            },
            {
                icon: "https://6375-cup-customer-release-1301587562.tcb.qcloud.la/product/2yeshengzhiwu.jpg?sign=f76c93869c21ea8850967178a851355c&t=1602998966",
                name: "野生植物",
                des: "健身饮品",
                callout: "植物奶自提点",
            },
            {
                icon: "https://6375-cup-customer-release-1301587562.tcb.qcloud.la/product/3bingboke.jpg?sign=13ff9be4487fcf437853724dfbf2fec2&t=1602998973",
                name: "冰博客",
                des: "提纯高蛋白",
                callout: "精炼奶自提点",
            },
        ],

        poiLongitude: "108.34024047851562",
        poiLatitude: "22.816320419311523",

        poiList: [],
        poiMarkers: [],
    },

    ready() {
        this.onInit()
    },


    /**
     * 组件的方法列表
     */
    methods: {

        /**
         * @method 初始化
         */
        async onInit() {
            // await this.getBrandList() //获取品牌列表
            var list = await this.getStoreList() // 获取当前门店的列表
            console.log(list)
            this.setStoreListToMap(list)
        },

        /**
         * @method 点击品牌 刷新地图
         */
        async clickBrand(e){
            this.changeBrandIndex(e)
            var list = await this.getStoreList() // 获取当前门店的列表
            console.log(list)
            this.setStoreListToMap(list)
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
        getStoreList(){
            return new Promise((reslove, reject) => {
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
                        // var list = []
                        // for (var i = 0; i < temp.length; i++)
                        //     list.push({
                        //         "count": 100,
                        //         "lng": temp[i].geo.coordinates[0],
                        //         "lat": temp[i].geo.coordinates[1]
                        //     })


                        if (res.result.code == 0)
                            reslove(temp)
                        // this.setData({
                        //     poiList: list
                        // })
                    
                        // wx.setStorageSync("list", list)
                    },
                })
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
                        longitude: list[i].geo.coordinates[0],
                        latitude: list[i].geo.coordinates[1],
                        width: 30,
                        height: 30,
                        callout:{
                            content: this.data.brandList[this.data.brandIndex].callout || "自提点",
                            color:"#ffffff",
                            bgColor:"#efaf30",
                            display:"ALWAYS",
                            padding:5,
                        },
                        label:{
                            content:"白日梦想家"
                        },
                    })
                }
                this.setData({
                    poiMarkers: tempList
                })
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
            console.log(e)
            wx.navigateTo({
                // url: `/pages/store/store?store_uuid=68e54718-7156-11e9-b456-e95aa2c51b5d`,
                url: `/pages/store/store?store_uuid=54931e42-7c67-11e9-b94e-e95aa2c51b5d`,
                
            })


            // console.log(e.detail.markerId)
            // var i = e.detail.markerId
            // console.log(this.data.poiList[i])

            // this.setData({
            //     poiDetail: this.data.poiList[i]
            // })
            // this.poiSwitchDialog()



        },
    }
})
