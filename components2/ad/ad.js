// components2/ad/ad.js
var AD_TYPE_IMAGE = 1//打开图片
var AD_TYPE_WEB_VIEW = 2//打开webview
var AD_TYPE_LITE = 3 //打开小程序
var AD_TYPE_LIVE = 4 //打开打开直播

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list:{
            type:Array,
            value:[]
        }
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
        /**
         * @method  点击广告
         *
            AD_TYPE_IMAGE: 1,//打开图片
            AD_TYPE_WEB_VIEW: 2,//打开webview
            AD_TYPE_LITE: 3, //打开小程序
            AD_TYPE_LIVE: 4, //打开打开直播
         */
        clickAD(e){
            console.log(e.currentTarget.dataset.index)
            var index = e.currentTarget.dataset.index
            var ad = this.data.list[index]
            var type = ad.type
            if (type == AD_TYPE_IMAGE){
                wx.previewImage({
                    urls: ad.coverImage // 需要切换为内容图片
                })
            } 
            if (type == AD_TYPE_WEB_VIEW ){
                wx.navigateTo({ url: `/pages/article/article?url=${content_url}`, }) 
            } 
            if (type == AD_TYPE_LITE) {
                wx.navigateToMiniProgram({
                    appId: ad.liteAppID,
                    path: ad.litePath,
                    extraData: ad.liteExtraData,
                    envVersion: ad.liteEnvVersion,
                    success(res) {
                        // 打开成功
                    }
                })
            } 
            if (type == AD_TYPE_LIVE) {
                // TODO 缺少 直播的type和roomID
                wx.navigateTo({
                    url: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + ad.roomID,
                })
            } 
            
        },
    }
})
