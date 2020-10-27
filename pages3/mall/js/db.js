
var app = getApp()
module.exports = Behavior({
    data: {

        inputValue: "",
    },
    ready() {
        // console.log("poi ready")
        // this.poiGetList()
        //  this.poiOnInit()
    },
    methods: {

        // 添加品牌
        brandAdd(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "brand_add"
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
        // 获取品牌更新
        brandUnSelect(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "brand_get_list_unselect"
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

        // 添加品牌
        storeAdd(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "store_add"
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
        // 获取品牌列表
        storeGetList(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "store_get_list"
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
        storeGetByID(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "store_get_by_id"
                wx.showLoading({mask:true})
                wx.cloud.callFunction({
                    name: 'mall',
                    data: data,
                    success: res => {
                        if (res.result.code == 0)
                            reslove(res.result)
                    },
                    complete: res => { wx.hideLoading() }
                })
            })
        },
        // 获取品牌更新
        storeUpdate(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "store_update"
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
        storeUnSelect(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "store_get_list_unselect"
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
        //////////////
        // 添加产品
        productAdd(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "product_add"
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
        // 获取产品列表
        productGetList(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "product_get_list"
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

        // 获取产品详情
        productGetByID(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "product_get_by_id"
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
        // 获取产品更新
        productUpdate(data) {
            return new Promise((reslove, reject) => {
                data = data || {}
                data['action'] = "product_update"
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


        //选择
        // 选择，绑定关系使用
        select(e) {
            // var old = [1] 
            // old = old.concat(this.data.selectList) //(e.currentTarget.dataset._id)
            // console.log(old)
            var page = getCurrentPages()
            var pre = page[page.length - 2]
            pre.callback(this.data.selectList) //更新成功的回掉
            wx.navigateBack()  //返回
            
        },
        // 多选器
        checkboxChange(e) {
            this.setData({ selectList: e.detail.value })
        },

        // 搜索
        search(e){
            // debugger
            console.log(e.detail.value.input)
            this.setData({
                inputValue:e.detail.value.input
            }) 
        },

        getAddress(){
            wx.chooseLocation({
                success:res=>{
                    console.log(res)
                    var detail = this.data.detail

                    detail.latitude = res.latitude
                    detail.longitude = res.longitude
                    detail.address = res.address
                    this.setData({
                        detail: detail
                    })
                }
            })
        },

        /**上传****/

        // 获取https链接的图片
        async getHttpsImage(filePath,marker){
            if (filePath == "")
                return ""

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




    // // 选择，绑定关系使用
    // select(e){
    //     // var old = [1] 
    //     // old = old.concat(this.data.selectList) //(e.currentTarget.dataset._id)
    //     // console.log(old)


    //     var page = getCurrentPages()
    //     var pre = page[page.length-2]
    //     var detail = pre.data.detail
    //     detail.data.brandList = detail.data.brandList.contact(this.data.selectList) //(e.currentTarget.dataset._id)
    //     pre.setData({
    //         detail: detail
    //     })
    //     pre.callback() //更新成功的回掉
    //     wx.navigateBack()  //返回

    //     // // 更新信息
    //     // var res = await pre.brandUpdate({
    //     //     _id: pre.data.detail._id,
    //     //     detail: {

    //     //     }
    //     // })
    // },