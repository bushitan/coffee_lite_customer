
var app = getApp()
module.exports = Behavior({
    data: {
        poiLongitude: "108.40997314453125",
        poiLatitude: "22.844457626342773",
        poiList: [],
        poiMarkers: [],
        
        poiCurrent:{},
        poiDialogShow:false,
    },
    ready() {
        console.log("poi ready")
        this.getPOIList()
        this.onInit11()
    },
    methods: {

        /**
         * @method 获取小地图坐标点
         */
        async getPOIList() {
           var res = await app.db.liteMapGetPOIList()
           console.log(res)
           this.setData({
               poiList:res.data
           })
        },


        onInit11() {
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
                    console.log(JSON.stringify(list))
                    this.setData({
                        poiList: list
                    })
                    this.addMarkers()
                    // wx.setStorageSync("list", list)
                },
            })
        },

        /**
         * @method 将POI点转化为markers
         */
        addMarkers() {
            var tempList = []
            for (var i = 0; i < this.data.poiList.length; i++) {
                var marker = this.data.poiList[i]
                tempList.push({
                    iconPath: "/images/menu_address.png",
                    id: i,
                    latitude: m[1],
                    longitude: m[0],
                    width: 30,
                    height: 30
                })
            }
            this.setData({
                poiMarkers: tempList
            })
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