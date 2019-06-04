// components/xx_cover_news/xx_cover_news.js
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        isFull: {
            type: Boolean,
            value: false,
        },
        isAuto: {
            type: Boolean,
            value: false,
        }

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
        // 改变
        _change(newVal, oldVal) {
        },

      exchange() {
          this.triggerEvent("exchange")
       },

      qr() {
          this.triggerEvent("qr")
       },

      scan() { 
          this.triggerEvent("scan")
      },
  }
})
