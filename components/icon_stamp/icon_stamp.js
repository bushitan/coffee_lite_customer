// components/xx_cover_news/xx_cover_news.js

var IMAGE_CHECK = "../../images/stamp_check.png"  //已集点图片
var IMAGE_UN_CHECK = "../../images/stamp_un_check.png" //未集点图片
var IMAGE_FULL = "../../images/stamp_full.png" //满点图片
var IMAGE_UN_FULL = "../../images/stamp_un_full.png" //满点图片
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        // score: {
        //     type: Number,
        //     value: 0,
        // },
        // exchange: {
        //     type: Number,
        //     value: 10,
        // },
        num: {
            type: Array,
            value: [0,10],
            observer: 'setStamp'
        },
        check: {
            type: String,
            value: IMAGE_CHECK,
            observer: function (newVal, oldVal) {
                this.setData({ checkImage: newVal || IMAGE_CHECK})
            }
        },
        uncheck: {
            type: String,
            value: IMAGE_UN_CHECK,
            observer: function (newVal, oldVal) {
                this.setData({ unCheckImage: newVal || IMAGE_UN_CHECK })
            }
        },
        full: {
            type: String,
            value: IMAGE_FULL,
            observer: function (newVal, oldVal) {
                this.setData({ fullImage: newVal || IMAGE_FULL })
            }
        },
        unfull: {
            type: String,
            value: IMAGE_UN_FULL,
            observer: function (newVal, oldVal) {
                this.setData({ unFullImage: newVal || IMAGE_UN_FULL })
            }
        },
  },

  /**
   * 组件的初始数据
   */
    data: {
        checkImage: IMAGE_CHECK,
        unCheckImage: IMAGE_UN_CHECK,
        fullImage: IMAGE_FULL,
        unFullImage: IMAGE_UN_FULL,
        

        stampList: new Array(10),
        firstList: [],
    },

  /**
   * 组件的方法列表
   */
    methods: {
        // 改变
        _change(newVal, oldVal) {
        },

        /**设置印章 */
        setStamp(newVal, oldVal){
            if (newVal) {
                var score = newVal[0] || 0
                var full = newVal[1] || 10
                // var score = 7
                // var full = 10
                console.log(score,full)


                var stampList = []
                // 除开倒数第一个，对比杯数
                for(var i=0 ; i<full - 1; i++){
                    stampList.push({ src: this.data.unCheckImage})
                }
                for (var i = 0; i < score ; i++) {
                    if (i < full - 1)
                        stampList[i].src = this.data.checkImage
                }

                // 判断最后一个是否满杯
                if (score >= full)
                    stampList.push({ src: this.data.fullImage })
                else 
                    stampList.push({ src: this.data.unFullImage })

                this.setData({ stampList: stampList})

            }
        },


    }
})
