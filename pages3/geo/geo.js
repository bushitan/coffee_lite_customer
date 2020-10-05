// pages3/geo/geo.js
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        storeUUID:"",
        longitude:"108.40997314453125",
        latitude:"22.844457626342773",


        list:[],
        markers:[],

        TabCur: 0,
        SortMenu: [
            { id: 0, name: "今天数据", range: 1, },
            { id: 1, name: "3天数据", range: 3, },
            { id: 2, name: "7天数据", range: 7,},
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        var storeUUID = options.store_uuid
        this.setData({
            storeUUID: storeUUID,

            longitude: options.longitude,
            latitude: options.latitude,
        })

        if (!storeUUID){
            wx.showModal({
                title: '暂无权限查阅数据',
            })
            return 
        }
            


        this.onInit()
    },

    onInit(){
                //查看集点结果
        wx.cloud.callFunction({
            name: 'geo',
            data: {
                "action":"get_geo_store_list",
                store_uuid: this.data.storeUUID,
                // isToday: this.data.TabCur == 0?true :false,
                range: this.data.SortMenu[this.data.TabCur].range
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

            var m = this.wgs84togcj02(marker.lng, marker.lat)
            tempList.push({
                iconPath: "/images/menu_address.png",
                id: i,
                latitude: m[1],
                longitude: m[0],
                width: 30,
                height: 30
            })
            // tempList.push({
            //     iconPath: "/images/location.png",
            //     id: i,
            //     latitude: marker.lat,
            //     longitude: marker.lng,
            //     width: 30,
            //     height: 30
            // })
        }
        this.setData({
            markers: tempList
        })
    },

    /**
     * WGS84转GCj02
     * @param lng
     * @param lat
     * @returns {*[]}
     */
   wgs84togcj02(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        if (this.out_of_china(lng, lat)) {
            return [lng, lat]
        } else {
            var dlat = this.transformlat(lng - 105.0, lat - 35.0);
            var dlng = this.transformlng(lng - 105.0, lat - 35.0);
            var radlat = lat / 180.0 * PI;
            var magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            var sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
            var mglat = lat + dlat;
            var mglng = lng + dlng;
            return [mglng, mglat]
        }
    },
    out_of_china(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        // 纬度3.86~53.55,经度73.66~135.05 
        return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
    },
    transformlat(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
        return ret
    },
    transformlng(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
        return ret
    },

    /**
    * @method 点击选项卡
    */
    async tabSelect(e) {
        console.log(e)
        var id = e ? e.currentTarget.dataset.tab_id : this.data.TabCur
        this.setData({
            TabCur: id,
            list: [],
        })
        this.onInit()
        // switch (id) {
        //     case 0: var res = await app.db.orderGetList({
        //         Page: 1, Limit: 100, FilterStatus: app.db.SELLER_PENDING, CreatedAtMin: today
        //     }); break;
        //     case 1: this.onInit() ; break;
        // }
        // this.setData({
        //     list: res.data
        // })
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})




    // /**
    //     https://github.com/wandergis/coordtransform/blob/master/index.js
    //      * Created by Wandergis on 2015/7/8.
    //      * 提供了百度坐标（BD09）、国测局坐标（火星坐标，GCJ02）、和WGS84坐标系之间的转换
    //      */
    // //UMD魔法代码
    // // if the module has no dependencies, the above pattern can be simplified to
    // (function (root, factory) {
    //     if (typeof define === 'function' && define.amd) {
    //         // AMD. Register as an anonymous module.
    //         define([], factory);
    //     } else if (typeof module === 'object' && module.exports) {
    //         // Node. Does not work with strict CommonJS, but
    //         // only CommonJS-like environments that support module.exports,
    //         // like Node.
    //         module.exports = factory();
    //     } else {
    //         // Browser globals (root is window)
    //         root.coordtransform = factory();
    //     }
    // }(this, function () {
    //     //定义一些常量
    //     var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
    //     var PI = 3.1415926535897932384626;
    //     var a = 6378245.0;
    //     var ee = 0.00669342162296594323;
    //     /**
    //      * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
    //      * 即 百度 转 谷歌、高德
    //      * @param bd_lon
    //      * @param bd_lat
    //      * @returns {*[]}
    //      */
    //     var bd09togcj02 = function bd09togcj02(bd_lon, bd_lat) {
    //         var bd_lon = +bd_lon;
    //         var bd_lat = +bd_lat;
    //         var x = bd_lon - 0.0065;
    //         var y = bd_lat - 0.006;
    //         var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
    //         var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
    //         var gg_lng = z * Math.cos(theta);
    //         var gg_lat = z * Math.sin(theta);
    //         return [gg_lng, gg_lat]
    //     };

    //     /**
    //      * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
    //      * 即谷歌、高德 转 百度
    //      * @param lng
    //      * @param lat
    //      * @returns {*[]}
    //      */
    //     var gcj02tobd09 = function gcj02tobd09(lng, lat) {
    //         var lat = +lat;
    //         var lng = +lng;
    //         var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    //         var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    //         var bd_lng = z * Math.cos(theta) + 0.0065;
    //         var bd_lat = z * Math.sin(theta) + 0.006;
    //         return [bd_lng, bd_lat]
    //     };

    //     /**
    //      * WGS84转GCj02
    //      * @param lng
    //      * @param lat
    //      * @returns {*[]}
    //      */
    //     var wgs84togcj02 = function wgs84togcj02(lng, lat) {
    //         var lat = +lat;
    //         var lng = +lng;
    //         if (out_of_china(lng, lat)) {
    //             return [lng, lat]
    //         } else {
    //             var dlat = transformlat(lng - 105.0, lat - 35.0);
    //             var dlng = transformlng(lng - 105.0, lat - 35.0);
    //             var radlat = lat / 180.0 * PI;
    //             var magic = Math.sin(radlat);
    //             magic = 1 - ee * magic * magic;
    //             var sqrtmagic = Math.sqrt(magic);
    //             dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
    //             dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
    //             var mglat = lat + dlat;
    //             var mglng = lng + dlng;
    //             return [mglng, mglat]
    //         }
    //     };

    //     /**
    //      * GCJ02 转换为 WGS84
    //      * @param lng
    //      * @param lat
    //      * @returns {*[]}
    //      */
    //     var gcj02towgs84 = function gcj02towgs84(lng, lat) {
    //         var lat = +lat;
    //         var lng = +lng;
    //         if (out_of_china(lng, lat)) {
    //             return [lng, lat]
    //         } else {
    //             var dlat = transformlat(lng - 105.0, lat - 35.0);
    //             var dlng = transformlng(lng - 105.0, lat - 35.0);
    //             var radlat = lat / 180.0 * PI;
    //             var magic = Math.sin(radlat);
    //             magic = 1 - ee * magic * magic;
    //             var sqrtmagic = Math.sqrt(magic);
    //             dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
    //             dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
    //             var mglat = lat + dlat;
    //             var mglng = lng + dlng;
    //             return [lng * 2 - mglng, lat * 2 - mglat]
    //         }
    //     };

    //     var transformlat = function transformlat(lng, lat) {
    //         var lat = +lat;
    //         var lng = +lng;
    //         var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    //         ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    //         ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    //         ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    //         return ret
    //     };

    //     var transformlng = function transformlng(lng, lat) {
    //         var lat = +lat;
    //         var lng = +lng;
    //         var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    //         ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    //         ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    //         ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    //         return ret
    //     };

    //     /**
    //      * 判断是否在国内，不在国内则不做偏移
    //      * @param lng
    //      * @param lat
    //      * @returns {boolean}
    //      */
    //     var out_of_china = function out_of_china(lng, lat) {
    //         var lat = +lat;
    //         var lng = +lng;
    //         // 纬度3.86~53.55,经度73.66~135.05 
    //         return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
    //     };

    //     return {
    //         bd09togcj02: bd09togcj02,
    //         gcj02tobd09: gcj02tobd09,
    //         wgs84togcj02: wgs84togcj02,
    //         gcj02towgs84: gcj02towgs84
    //     }
    // }));