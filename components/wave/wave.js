// components/xx_cover_news/xx_cover_news.js
var API = require('../../api/api.js')
Component({
  /**
   * 组件的属性列表
   */
    properties: {


        store : {
            type: Object,
            value: {},
        },
        score: {
            type: Number,
            value: 0,
        },
        exchange: {
            type: Number,
            value: 10,
        },
        logo: {
            type: String,
            value: "",
        },
        title: {
            type: String,
            value: "",
        },
        summary: {
            type: String,
            value: "",
        },
        start_time: {
            type: String,
            value: "",
        },
        end_time: {
            type: String,
            value: "",
        },
        color: {
            type: String,
            value: "#000",
        }
  },

    /**
     * 组件的初始数据
     */
    data: {
        sn:"",
    },

    ready(){
        this.setData({
            sn: "SN10" + wx.getStorageSync(API.USER_INFO).id + "："
        })
    },
        
    /**
     * 组件的方法列表
     */
    methods: {
        // 改变
        _change(newVal, oldVal) {
        },


        toExchange() {
            wx.navigateTo({ url: `/pages/exchange/exchange?store_uuid=${this.data.store.uuid}` })
        },

        toAddress() {
            wx.openLocation({
                name: this.data.store.title,
                address: this.data.store.address,
                latitude: this.data.store.latitude,
                longitude: this.data.store.longitude,
                scale: 18
            })
        },

    }
})
