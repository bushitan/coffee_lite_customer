// components/notic/notic.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        sn: { // 属性名
            type: String,
            value: ''
        },
        userInfo: { // 属性名
            type: Object,
            value: {}
        },

        // logo: { // 属性名
        //     type: String,
        //     value: ''
        // },
        // name: { // 属性名
        //     type: String,
        //     value: ''
        // },
        // text: { // 属性名
        //     type: String,
        //     value: ''
        // },
        // img: { // 属性名
        //     type: String,
        //     value: ''
        // },
        // imgList: { // 属性名
        //     type: Array,
        //     value: ''
        // },
    },
    options: {
        styleIsolation: 'apply-shared'
    },
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

        // preview(){
        //     wx.previewImage({
        //         urls: [this.data.img],
        //     })
        // },
        preview(e){
            wx.previewImage({
                urls: this.data.imgList,
                current:e.currentTarget.dataset.url
            })
        }
    }
})
