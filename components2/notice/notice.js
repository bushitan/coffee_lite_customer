// components2/notice/notice.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        text: {
            type: String,
            value: "",
        },
        list: {
            type: Array,
            value: [],
        },
    },

    options: {
        styleIsolation: 'apply-shared'
    },
    /**
     * 组件的初始数据
     */
    data: {

    },
    created(){
    },
    /**
     * 组件的方法列表
     */
    methods: {

        preview(e) {
            wx.previewImage({
                urls: this.data.list,
                current: e.currentTarget.dataset.url
            })
        }
    }
})
