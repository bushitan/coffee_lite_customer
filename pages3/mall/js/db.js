
var app = getApp()
module.exports = Behavior({
    data: {
        
    },
    ready() {
        // console.log("poi ready")
        // this.poiGetList()
        //  this.poiOnInit()
    },
    methods: {
      

        // 获取品牌列表
        brandGetList(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "brand_get_list"
                wx.cloud.callFunction({
                    name: 'mall',
                    data: data,
                    success: res => {
                        if (res.result.code == 0)
                            reslove(res.result)
                    },
                })
            })
        },

        // 获取品牌详情
        brandGetByID(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "brand_get_by_id"
                wx.cloud.callFunction({
                    name: 'mall',
                    data: data,
                    success: res => {
                        if (res.result.code == 0)
                            reslove(res.result)
                    },
                })
            })
        },
        // 获取品牌更新
        brandUpdate(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "brand_update"
                wx.cloud.callFunction({
                    name: 'mall',
                    data: data,
                    success: res => {
                        if (res.result.code == 0)
                            reslove(res.result)
                    },
                })
            })
        },

        

        /**基础功能****/
        // 新增
        add() {
            this.setData({ detail: {} })
            this.switchEditor()
        },

        // 切换开关
        switchEditor() { this.setData({ isEditor: !this.data.isEditor, }) },

        // 浏览图片
        ViewLogo(e) {
            wx.previewImage({
                urls: [e.currentTarget.dataset.url],
                // current: e.currentTarget.dataset.url
            });
        },

        // 选择图片
        ChooseLogo(e) {
            wx.chooseImage({
                count: 1, //默认9
                sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
                // sourceType: ['album'], //从相册选择
                success: (res) => {
                    var key = e.currentTarget.dataset.key
                    var detail = this.data.detail
                    detail[key] = res.tempFilePaths[0]
                    this.setData({
                        detail: detail
                    })
                }
            });
        },

        /**上传****/

        // 获取https链接的图片
        async getHttpsImage(filePath,marker){
            var filePath = filePath
            var isWeb = /^https:\/\//.test(filePath)
            if (isWeb) {
                // formData.logo = this.data.detail.logo
                return filePath
                // reslove(url)
            }
            else {
                var cloudPath = "mall/" + this.data.detail._id + "_" + marker + filePath.match(/\.[^.]+?$/)[0]
                var fileID = await this.uploadImage({
                    filePath: filePath,
                    cloudPath: cloudPath,
                })
                return this.getTempFileURL(fileID)
            }
        },

        // 上传图片
        uploadImage(obj) {
            return new Promise((reslove, reject) => {
                wx.showLoading({ title: "图片上传中" })
                wx.cloud.uploadFile({
                    cloudPath: obj.cloudPath,
                    filePath: obj.filePath,
                    success: res => {
                        wx.hideLoading()
                        reslove(res.fileID)
                    },
                    fail: e => {
                        console.error('[上传文件] 失败：', e)
                        wx.showToast({
                            icon: 'none',
                            title: '上传失败请重试',
                        })
                        // reject()
                    },
                    complete: () => {
                        wx.hideLoading()
                    }
                })
            })
        },

        getTempFileURL(fileID){
            return new Promise((reslove, reject) => {
                wx.cloud.getTempFileURL({
                    fileList: [{
                        fileID: fileID,
                        // maxAge: 60 * 60, // one hour
                    }]
                }).then(res => {
                    // get temp file URL
                    // console.log(res.fileList)
                    reslove(res.fileList[0].tempFileURL)
                })
            })
        },
        
    },

    // onLoad() {
    //     console.log("behavior onload")
    // },
    // created() {
    //     console.log("created")
    // },

    // attached() {
    //     debugger
    //     console.log("attached")
    // },

    // ready() {
    // },
    // moved() {
    //     console.log("moved")
    // },

    // detached() {
    //     console.log("detached")
    // },
})

