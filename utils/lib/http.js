const api = require('./api')
// get请求与方式
function requestGet(url, params, success) {
    this.requestLoading(url, params, 'Get', success);
}
// post请求与方式
function requestPost(url, params, success) {
    this.requestLoading(url, params, 'Post', success);
}

// url:网络请求的url
function requestLoading(url, params, getMethod, success) {
    // 请求中预存token
    let DATA = params || {}
    const token = wx.getStorageSync(api.STORE.BAIDU_TOKEN)
    if (token) {
        DATA.token = token
    } else {
        // 未登录状态下 接口带有radomId
        DATA.radomId = wx.getStorageSync(api.STORE.BAIDU_RADOMID) || ""
    }
    wx.showNavigationBarLoading();
    let message = '';
    wx.showLoading({
        title: message || '加载中'
    });
    wx.request({
        url: url,
        data: DATA,
        method: getMethod,
        success: function (res) {
            wx.hideNavigationBarLoading();
            wx.hideLoading();
            if (res.statusCode == 200) {
                // token过期 跳转登录页 详情页面和搜索小区结果页面不会跳转
                if (res.data.status === 'C0002' && !params.banLogin) {
                    wx.showToast({
                        title: '请登录',
                        icon: "loading",
                        duration: 2000,
                        mask: true,
                        success: function () {
                            //延时跳转
                            setTimeout(function () {
                                wx.navigateTo({
                                    url: '../../login/index/index'
                                });
                            }, 2000) //延迟时间
                        }
                    });
                } else {
                    // 正常数据返回
                    success(res.data);
                }
            } else {
                // 失败判断
                wx.showToast({
                    title: '接口繁忙',
                    icon: 'loading',
                    duration: 2000,
                    mask: true
                });
            }
        },
        fail: function () {
            wx.hideNavigationBarLoading();
            wx.hideLoading();
            wx.showToast({
                title: '网络请求出错',
                icon: "none"
            });
        }
    })
}
module.exports = {
    requestGet: requestGet,
    requestPost: requestPost,
    requestLoading: requestLoading
};