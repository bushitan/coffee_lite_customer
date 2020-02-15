// components2/score/score.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

        num: { 
            type: Number,
            value:0
        },

        max: {
            type: Number,
            value: 10
        },

        iconScore: {
            type: String,
            value: ""
        },
        iconUnScore: {
            type: String,
            value: ""
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

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
