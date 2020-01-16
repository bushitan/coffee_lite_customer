
// var db = require('../../db/db.js')
class dbTest {


    constructor() {

    }



    // 系统层级
    testSystem(obj){
        console.log("12")
        return 
    }

     /** 基础参数
    @param
        session
    @return
        {
            code:1
            msg:"",
            data:{} || []
        }
        
     */


    /*****************系统操作1****************/
    /** 1.1 登陆
    @mehtod SysLogin  
    @param
        jsCode:"",
        APPID:"", // 1 客户端 ,2 商户端
    @return  {
        session:"",
        sn:"", //序列号 目前已 "10"+ID 显示
    }
    */

    /** 1.2 获取广告信息
    @mehtod SysGetAdList  
    @param
        type:1    //1 图片、2 网页、3 小程序
        storeUUID:"",  //广告所在店铺
    @return  {     
        // 轮播广告  
        normal:[{  
            storeUUID:"",
            coverImage:""
            webUrl:""     //小程序ID
            liteAppID:""  //小程序ID
            litePath:""   //小程序路径
            liteExtraData:"" //小程序页面数据
            liteEnvVersion:"" //版本
        }]
        // 弹窗广告
        dialog:{
            storeUUID:"",
            coverImage:""
            webUrl:""     //小程序ID
            liteAppID:""  //小程序ID
            litePath:""   //小程序路径
            liteExtraData:"" //小程序页面数据
            liteEnvVersion:"" //版本
        }
    }
    */

    /** 1.3 上传点击记录
    @mehtod SysAddRecord  
    @param {
        type:"", //  0 end , 1 start
        adId:"", // 点击广告的ID
        swiperIndex:"",//轮播图位置
        recordCode:"",//记录值
        page:"",      //所在页面
        position:"",  //所在楼层
        createTime:"", //
    }
    @return 
    */

    /** 1.4 上传地理位置
    @mehtod SysAddLocation
    @param
        mode:1  //1 小程序普通进入 , 2 扫店铺码, 3 外卖 , 4 海报
        storeUUID:"", 
        longitude:108.23
        latitude:23.25
    @return  {}
    */




    /*****************我的2****************/
    /** 2.1 获取我的数据
    @mehtod MyGetInfo  
    @param
    @return {
        name:"",
        logo:"",
        bgImage:"",
        allScoreNum:1,
        allPrizeNum:1,
        allStoreNum:1,
    }
    */

    /** 2.2 更新我的数据
    @mehtod MyUpdateInfo  
    @param
        name:"",
        logo:"",
        city:"",
    @return 
    */

    /** 2.3 获取我浏览过的店铺
    @mehtod MyGetInfo  
    @param
    @return [{
        storeUUID:"",  //广告所在店铺
        storeName:"", //店铺名称
        storeLogo:"", //店铺logo
        storeDes:"",  //店铺活动描述
        storeMinScore:6,  //店铺起始兑换点数
        storeMaxScore:10,  //店铺最高兑换点数
        myScore:1,    //此店铺已经集的点数
    }]
    */
    
    /*****************店铺 3****************/
    /** 3.1 获取店铺信息
    @mehtod StoreGetInfo  
    @param
        storeUUID:"",  //店铺UUID
    @return {
        storeName:"", //店铺名称
        storeLogo:"", //店铺logo
        storeLoadImage:"", //店铺loading加载图片
        storeDes:"",  //店铺活动描述
        storeShopUrl:"",  //该店铺的精选商城
        startTime:"",  //活动开始时间
        endTime:"",  //活动结束时间
        longitude:108.23,
        latitude:23.25,
        coverLimitTime:1, //天，单家店内海报领取限制时间。
        coverLiveTime:1, //天，单家店内海报有效时间。
    }
    */

    /** 3.2 更新店铺信息
    @mehtod StoreGetInfo  
    @param
        storeUUID:"",  //店铺UUID
        storeName:"", //店铺名称
        storeLogo:"", //店铺logo
        storeLoadImage:"", //店铺loading加载图片
        storeDes:"",  //店铺活动描述
        storeShopUrl:"",  //该店铺的精选商城
        startTime:"",  //活动开始时间
        endTime:"",  //活动结束时间
        longitude:108.23,
        latitude:23.25,
        coverLimitTime:1, //天，单家店内海报领取限制时间。
        coverLiveTime:1, //天，单家店内海报有效时间。
    @return 
    */

    /*****************Customer 顾客 4****************/
    /** 4.1 获取店铺的积分表
    @mehtod CustomerGetStoreScore
    @param
        storeUUID:"",  //店铺UUID
    @return {
        storeMinScore:6,    //店铺起始兑换点数
        storeMaxScore:10,   //店铺最高兑换点数
        myScore:1 ,         //我的积分
        iconMode:1 ,        // 1 杯子图案,   2 印章图案, 3 印章图案
        iconChecImage:""    //已集点印章图标
        iconUnChecImage:""    //未集点印章图标
        iconFullImage:""    //集满点印章图标
        iconUnFullImage:""    //未集满点印章图标
    }
    */

    /** 4.2 获取兑换记录列表
    @mehtod CustomerGetStorePrize
    @param
        storeUUID:"",  //店铺UUID
    @return [{
        prizeUUID:""   //此兑换记录的prizeUUID
        createTime:"", //兑换时间
    }]
    */    
    
    /** 4.3 获取兑换记录详情
    @mehtod CustomerGetStorePrizeDetail
    @param
        prizeUUID:"",  //店铺UUID
    @return {
        prize:{
            sellerName:"",
            createTime:"", //发放时间
        },
        socreList:[{
            scoreUUID:""   //此兑换记录的prizeUUID
            createTime:"", //兑换时间
            scoreSellerName:"",
            mode:1, //1 店主扫码集点, 2 外卖集点 , 3 海报集点
        }]
    }
    */

    /** 4.4 二维码页面的心跳设置，每5秒获取集点结果
    @mehtod CustomerGetHeart
    @param
    @return  {
        mode: 1, // 1 成功 ,0 失败
        storeUUID: store_uuid,
        qrUUID:"", //二维码UUID
    }
    */



    /*****************Seller 商户端 5****************/
    /** 5.1 验证用户是否店员
    @mehtod SellerCheckStroe
    @param
    @return  {
        isSeller:true,  //是否这个点的人员
        isHost:true,    //是否店主
    }
    */

    /** 5.2 扫码集点
    @mehtod SellerScanScore
    @param
        customerUUID:"" //顾客的UUID
    @return  {}
    */

    /** 5.2 扫码兑换礼物
    @mehtod SellerScanPrize
    @param
        customerUUID:"" //顾客的UUID
    @return  {}
    */

    /** 5.3 获取店铺积分
    @mehtod SellerGetData
    @param
        mode:1  //1 总积分 , 2 商户扫码, 3 外卖 , 4 海报
        index:0,
        range:10,
    @return  {}
    */

    /** 5.4 获取店家的海报
    @mehtod SellerGetCover
    @param
    @return  [{
        personNum:"", //剩余领取人数
        score:"", //每个人获得分数
        isAlive:ture, //是否有效
        qrUrl:"",
        limitTime:1, //天，单家店内海报领取限制时间。
        liveTime:1,  //天，单家店内海报有效时间。
    }]
    */

    /** 5.5 新增海报
    @mehtod SellerAddCover
    @param
        personNum:"", //剩余领取人数
        score:"", //每个人获得分数
        liveTime:1,  //天，单家店内海报有效时间。
    @return  [{

    }]
    */

    /** 5.6 修改海报状态
    @mehtod SellerUpdateCover
    @param
        coverUUID:"" // 取消该海报isAlive:ture,
        isAlive:ture, //设置海报是否有效
    @return 
    */


}


module.exports = new dbTest()