const http = require('./http');
const api = require('./api');

/**
 * 校验登录
 */
const checkLogin = (e, isAgent, loginCode, success, fail) => {
    // 检测当存在缓存code 并且checksession成功的情况下可以触发登录
    if (loginCode) {
        wx.checkSession({
            success: function () {
                const parme = {
                    code: loginCode,
                    encryptedData: e.detail.encryptedData,
                    iv: e.detail.iv
                };
                if (isAgent.length == 11) {
                    parme.flag = 1
                    parme.inviterPhoneNumber = isAgent
                }
                // 清空code缓存
                wx.setStorageSync(api.STORE.LOGIN_CODE, "");
                http.requestPost(api.URL.PHONE_LOGIN_BY_WECHAT, parme, function (
                    res
                ) {
                    if (!res.data) {
                        //失败
                        if (res.status !== 'C0000') {
                            wx.showToast({
                                title: '登录失败,请重新登录',
                                icon: 'none',
                                duration: 1000
                            });
                        }
                        if (typeof fail == 'function') {
                            fail();
                        }
                    } else {
                        //成功
                        wx.setStorageSync(
                            api.STORE.BAIDU_USERINFO,
                            res.data.userInfo
                        );
                        wx.setStorageSync(api.STORE.BAIDU_TOKEN, res.data.wxtoken);
                        wx.showToast({
                            title: '登录成功',
                            icon: 'none',
                            duration: 1000
                        });
                        typeof success == 'function' && success();
                    }
                });
            },
            fail: function () {
                typeof fail == 'function' && fail();
            }
        });
    } else {
        typeof fail == 'function' && fail();
    }
};

/**
 * 登录
 */
const login = (e, isAgent, loginCode, success, fail) => {
    checkLogin(e, isAgent, loginCode, success, fail,
        () => {
            console.log('checkLogin成功');
        },
        () => {
            remoteLogin(e, isAgent, success, fail);
            console.log('login成功')
        }
    );
};

/**
 * 服务端请求登录
 */
const remoteLogin = (e, isAgent, success, fail) => {
    //调用登录接口
    wx.login({
        success: re => {
            const parme = {
                code: re.code,
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv
            };
            // 如果经纪人邀请登录传1
            if (isAgent.length == 11) {
                parme.flag = 1
                parme.inviterPhoneNumber = isAgent
            }
            http.requestPost(api.URL.PHONE_LOGIN_BY_WECHAT, parme, function (
                res
            ) {
                if (!res.data) {
                    //失败
                    if (res.status !== 'C0000') {
                        wx.showToast({
                            title: '登录失败,请重新登录',
                            icon: 'none',
                            duration: 1000
                        });
                    }
                    if (typeof fail == 'function') {
                        fail();
                    }
                } else {
                    //成功
                    wx.setStorageSync(
                        api.STORE.BAIDU_USERINFO,
                        res.data.userInfo
                    );
                    wx.setStorageSync(api.STORE.BAIDU_TOKEN, res.data.wxtoken);
                    wx.removeStorageSync(api.STORE.BAIDU_RADOMID);
                    wx.showToast({
                        title: '登录成功',
                        icon: 'none',
                        duration: 1000
                    });
                    typeof success == 'function' && success();
                }
            });
        },
        fail: re => {
            console.log('登录失败')
        }
    });
};


module.exports = {
    login: login,
    checkLogin: checkLogin,
    remoteLogin: remoteLogin
};