// components2/mall-map/mall-map.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        store: {
            type: Object,
            value: {},
            observer: 'setStore'
        }
        
    },

    options: {
        styleIsolation: 'apply-shared'
    },
    /**
     * 组件的初始数据
     */
    data: {
        list:[],
    },

    /**
     * 组件的方法列表
     */
    methods: {

        click(e){
            wx.navigateTo({
                url: e.currentTarget.dataset.nav,
            })
        },

        async setStore(newVal, oldVal){
            if (newVal.hasOwnProperty("uuid")) {
                this.setList(newVal)
            }
        },

        async refresh(){
            this.setList(this.data.store)
        },

        async setList(store){
            // var store = newVal
            // todo 查询列表
            var res = await this.getProjectList({
                relateUUID: store.uuid
            })
            console.log()
            var data = res.data
            var tempList = []
            for (var i = 0; i < data.length; i = i + 2) {
                var matrixList = [data[i]]
                if (i + 1 < data.length)
                    matrixList.push(data[i + 1])
                tempList.push(matrixList)
            }

            this.setData({
                list: tempList
            })
        },


        // 根据门店获取产品列表
        getProjectList(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "store_get_product_list_by_uuid"
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


        toShoppingCart(){
            wx.navigateTo({

                url: 'plugin-private://wx34345ae5855f892d/pages/shoppingCart/shoppingCart',

            });

            
        },

        toShoppingOrder(){
            const tabId = 'pendingPay';

            wx.navigateTo({

                url: `plugin-private://wx34345ae5855f892d/pages/orderList/orderList?tabId=${tabId}`,

            });
        },
    }
})
