// pages3/geo/geo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        markers:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },

    onInit(){
                //查看集点结果
        wx.cloud.callFunction({
            name: 'geo',
            data: {
                "action":"get_geo_list",
            },
            success : res => {
                console.log(res)
                var temp = res.result.data
                var list = []
                for (var i = 0; i < temp.length;i++)
                    list.push({
                        "count": 100,
                        "lng": temp[i].geo.coordinates[0],
                        // "lng": temp[i].geo.coordinates[0],
                        "lat": temp[i].geo.coordinates[1]
                    })
                console.log(JSON.stringify( list))
                this.setData({
                    list:list
                })
                this.addMarkers()
                // wx.setStorageSync("list", list)
            },
        })
    },

    addMarkers(){
        var tempList = []
        for(var i=0;i<this.data.list.length ; i++){
            var marker = this.data.list[i]
            tempList.push({
                iconPath: "/images/location.png",
                id: i,
                latitude: marker.lat,
                longitude: marker.lng,
                width: 30,
                height: 30
            })
        }
        this.setData({
            markers: tempList
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})