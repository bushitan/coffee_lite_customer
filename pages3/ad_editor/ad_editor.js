// pages/editor/editor.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        MODE_SWIPER: app.dbAD.AD.MODE_SWIPER,
        MODE_BANNER: app.dbAD.AD.MODE_BANNER,
        MODE_STORE: app.dbAD.AD.MODE_STORE,

        CLICK_IMAGE: app.dbAD.AD.CLICK_IMAGE,
        CLICK_WEB_VIEW: app.dbAD.AD.CLICK_WEB_VIEW,
        CLICK_LITE: app.dbAD.AD.CLICK_LITE,
        CLICK_LIVE: app.dbAD.AD.CLICK_LIVE,
        imgList: [],
        imageMax:6,


        logoList: [],
        logoMax: 1,

        store:{
            isShow:true,
            mode: app.dbAD.AD.MODE_SWIPER,
            clickType: app.dbAD.AD.CLICK_WEB_VIEW,
        },
    },
    // 选择广告模式
    choiceMode() {
        wx.showActionSheet({
            itemList: ['轮播图', 'Banner', '店铺广告'],
            success:(res)=>{
                var store = this.data.store
                store.mode = res.tapIndex + 1
                this.setData({
                    store: store
                })
            }
        })
     },
    choiceClickType(){
        wx.showActionSheet({
            itemList: ['打开图片','跳转网页', '跳转小程序', '打开直播间'],
            success: (res) => {
                var store = this.data.store
                store.clickType = res.tapIndex + 1
                this.setData({
                    store: store
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            adID: options.adID || ''
        })

        this.onInit()
    },

    async onInit(){
        if (this.data.adID == "")
            return 
        var res = await app.dbAD.getNode({
            adID : this.data.adID
        })
        var store = res.data
        this.setData({
            store: store ,
        })

        var showImageUrl = store.showImageUrl || ""
        if (showImageUrl != "")
            this.setData({
                logoList: [showImageUrl]
            })

        var clickImageUrl = store.clickImageUrl || ""
        if (clickImageUrl != "")
            this.setData({
                imgList: [clickImageUrl]
            })

        // if (store.noticeUrl != "" 
        //     && store.noticeUrl != undefined
        //     && store.noticeUrl != null )
        //     this.setData({
        //         imgList: store.noticeUrlList
        //     })

       
        
    },

    // 保存
    async save(e) {
        // console.log('form发生了submit事件，携带数据为：', e.detail.value)

        // console.log(this.data.imgList)

        var formData = e.detail.value
        var store = this.data.store

        formData.sn = parseInt( formData.sn )
        formData._id = this.data.adID
        formData.mode = store.mode
        formData.clickType = store.clickType
        
        var userID = 1     
        // 上传showImageUrl
        if (this.data.logoList[0] != this.data.store.showImageUrl) {
            // todo 验证图片是否为新上传的
            const filePath = this.data.logoList[0]
            if (filePath) {
                var cloudName = "ad/" + userID + "_" + new Date().getTime()
                console.log(cloudName)
                // 上传图片
                const cloudPath = cloudName + filePath.match(/\.[^.]+?$/)[0]
                formData.showImageUrl = await app.dbAD.uploadImage({
                    filePath: filePath,
                    cloudPath: cloudPath,
                })
            } else {
                formData.showImageUrl = ""
            }
        }

        if (this.data.imgList[0] != this.data.store.clickImageUrl) {
            // todo 验证图片是否为新上传的
            const filePath = this.data.imgList[0]
            if (filePath) {
                var cloudName = "ad/" + userID + "_" + new Date().getTime()
                console.log(cloudName)
                // 上传图片
                const cloudPath = cloudName + filePath.match(/\.[^.]+?$/)[0]
                formData.clickImageUrl = await app.dbAD.uploadImage({
                    filePath: filePath,
                    cloudPath: cloudPath,
                })
            } else {
                formData.clickImageUrl = ""
            }
        }

        // var noticeUrlList = []
        // for (var i = 0; i < this.data.imgList.length; i++) {
        //     var filePath = this.data.imgList[i]
        //     // var isLocal = /^http:\/\/tmp\//.test(filePath) // 检查是否含有本地图片，有则上传，没有按顺序添加到数组
        //     var isLocal = /^cloud:\/\//.test(filePath) // 检查是否含有本地图片，有则上传，没有按顺序添加到数组
        //     if (isLocal) {
        //         noticeUrlList.push(filePath)
        //     } else{
        //         var cloudName = "ad/" + userID + "_" + new Date().getTime()
        //         var cloudPath = cloudName + filePath.match(/\.[^.]+?$/)[0]
        //         var noticeUrl = await app.db.uploadImage({
        //             filePath: filePath,
        //             cloudPath: cloudPath,
        //         })
        //         noticeUrlList.push(noticeUrl)
        //     }
        // }
        // formData.noticeUrlList = noticeUrlList
        // formData.addressList = this.data.store.addressList
        // formData.bgColor = this.data.bgColor || "#e54d42"

        console.log(formData)
        // return   
        var r
        if (formData._id == "")
            r = await app.dbAD.addNode(formData) 
        else
            r = await app.dbAD.updateNode(formData) 
        wx.showModal({
            title: r.msg,
            showCancel:false,
            success(res){
                var prePage = app.getPrePage()
                prePage.onInit()
                wx.navigateBack({}) 
            },
        })

        // var r = await app.db.editorSelfStore(formData)
        
    },


    // 选择颜色
    colorChange(e){
        var color = e.detail.value
        // var store = this.data.store
        // store.bgColor = color
        this.setData({
            bgColor: color
        })
    },


    /***********上传logo图片***********/
    DelLogo(e) {
        wx.showModal({
            title: '确定要删除这长图片?',
            success: res => {
                if (res.confirm) {
                    this.data.logoList.splice(e.currentTarget.dataset.index, 1);
                    this.setData({
                        logoList: this.data.logoList
                    })
                }
            }
        })
    },
    ViewLogo(e) {
        wx.previewImage({
            urls: this.data.logoList,
            current: e.currentTarget.dataset.url
        });
    },
    async ChooseLogo() {
        wx.chooseImage({
            count: this.data.imageMax, //默认9
            sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
            // sourceType: ['album'], //从相册选择
            success: (res) => {
                if (this.data.logoList.length != 0) {
                    this.setData({
                        logoList: this.data.logoList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        logoList: res.tempFilePaths
                    })
                }
            }
        });
    },

    /****** 上传公告图片 ******/
    DelImg(e) {
        wx.showModal({
            title: '确定要删除这长图片?',
            // content: '？',
            success: res => {
                if (res.confirm) {
                    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
                    this.setData({
                        imgList: this.data.imgList
                    })
                }
            }
        })
    },
    ViewImage(e) {
        wx.previewImage({
            urls: this.data.imgList,
            current: e.currentTarget.dataset.url
        });
    },

    async ChooseImage() {
        wx.chooseImage({
            count: this.data.imageMax, //默认9
            sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
            // sourceType: ['album'], //从相册选择
            success: (res) => {
                if (this.data.imgList.length != 0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
            }
        });
    },



    /****** 路由 ******/
    toAddress(){
        wx.navigateTo({
            url: '/pages/address/address',
        })
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})