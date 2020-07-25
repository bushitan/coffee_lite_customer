


var APP_ID = "wxeb9623bdc85a64f4"
// var host_url = 'https://xcx.308308.com/huaxun_2/api/';
// var API_308_URL = 'https://api.308308.com/';
// var XCX_308_URL = 'http://127.0.0.1:8000/live/';
// var XCX_308_URL = 'http://192.168.199.203:8000/live/';
// var XCX_308_URL = 'https://www.12xiong.top/live/';
// request.init(XCX_308_URL + 'lite/login/', APP_ID)
 
// var HOST = "https://www.51zfgx.com/"  // 第2正式版本
// var HOST = "https://www.51zfgx.com/coffee_server_2019_6_15_v1_3_10/" //第2正式版本
// var HOST = "https://www.51zfgx.com/coffee_server_2019_7_12_v1_5_2/" //第3正式版本

var HOST = "https://www.51zfgx.com/coffee_server_2019_8_29_v1_6_1/" //第4正式版本
// var HOST = "http://123.207.38.251/dev/"


// var HOST = "https://www.51zfgx.com/coffee_server_2019_10_2_v2_1_1/" // 当前测试版本
// var HOST = "https://www.51zfgx.com/dev/"  // 测试版本


var URL = HOST + "lite/"

module.exports = {
    UUID: "uuid",
    USER_ID: "user_id",
    USER_INFO: "user_info",
    OPEN_ID: "open_id",
    APP_ID: "app_id",
    UNION_ID: "union_id",
    ROUTE_USER_LOGIN: `${URL}route/user/login/`,
    ROUTE_USER_UPDATE: `${URL}route/user/update/`,

    STORE_INFO: `${URL}store/info/`,

    STORE_LIST_CUSTOMER: `${URL}store/list/customer/`,
    STORE_DATA_CUSTOMER: `${URL}store/data/customer/`,
    STORE_DETAIL_CUSTOMER: `${URL}store/detail/customer/`,
    STORE_SHARE_CUSTOMER: `${URL}store/share/customer/`,
    REFRESH_CUSTOMER: `${URL}refresh/customer/`,
    SCAN_AUTO_SHARE_CUSTOMER: `${URL}scan/auto_share/customer/`,
    SCAN_WM_CUSTOMER: `${URL}scan/wm/customer/`,
    SCAN_WM_CHECK_CUSTOMER: `${URL}scan/wm/check/customer/`,
    STORE_GET_AD: `${URL}store/get_ad/customer/`, //获取广告
    
    
}

