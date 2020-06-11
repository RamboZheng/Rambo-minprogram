//index.js
//获取应用实例
const app = getApp();
let global = require('../../../utils/global.js');

Page({
    data: {
        oldPhone: '',
        phone: '',
        code: '',
        flag: false,
        isAbled: false,
        isDisabled: false,
        hasClicked: false,
        isShow: false,
        smsStatus: false,
        sendBtnStatus: true,
        time: 0,
        loginBtnStatus: false,
        sendBtnContent: '获取验证码',
        validateInfo: '',
        //login返回的session_key
        session_key: '',
        userInfo: {},
        hasUserInfo: false,
        list: ''
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../../homePage/index/index'
        });
    },
    // 输入手机号码
    _getPhone: function (e) {
        // console.log(e.detail.keyCode);
        const phone = e.detail.value;
        // const reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        const reg = /^1[3456789]\d{9}$/;
        if (phone.length == 11 && reg.test(phone)) {
            this.setData({
                isAbled: true,
                sendBtnStatus: false,
                oldPhone: phone,
                phone: phone
            });
        } else {
            this.setData({
                sendBtnStatus: true,
                isAbled: false,
                phone: phone
            });
        }
    },
    //验证用户输入的手机号码是否符合要求及是否点亮获取验证码按钮
    _isPhoneTrue: function (e) {
        const phone = e.detail.value;
        const reg = /^1[3456789]\d{9}$/;
        if (phone.length === 0) {
            wx.showToast({
                title: '请输入手机号码',
                icon: 'none',
                duration: 2000
            });
            this.setData({
                isAbled: false,
                isDisabled: false
            });
        } else if (!reg.test(phone)) {
            wx.showToast({
                title: '请输入正确的手机号码',
                icon: 'none',
                duration: 2000
            });
            this.setData({
                isAbled: false,
                isDisabled: false
            });
        } else {
            this.setData({
                isAbled: true,
                isDisabled: true,
                phone
            });
            if (this.data.time == 0) {
                this.setData({
                    sendBtnStatus: false,
                    sendBtnContent: '获取验证码'
                });
            }
        }
    },
    //发送验证码
    _sendSms: function () {
        this.data.sendBtnStatus = true;
        const that = this;
        const parme = {
            phone: this.data.phone
        };
        global.requestPost(global.URL.GET_LOGIN_SMS, parme, function (res) {
            // console.log(res);
            if (res.status === 'C0000') {
                setTimeout(() => {
                    that.setData({
                        smsStatus: true
                    });
                    wx.showToast({
                        title: '验证码发送成功',
                        icon: 'none',
                        duration: 1000
                    });
                    that.data.sendBtnStatus = true;
                    let seconds = 60;
                    that.setData({
                        smsStatus: !that.data.smsStatus,
                        sendBtnContent: `${seconds} s后重发`
                    });
                    const timer = setInterval(() => {
                        seconds--;
                        that.setData({
                            sendBtnStatus: true,
                            sendBtnContent: `${seconds} s后重发`,
                            time: seconds
                        });
                        if (
                            seconds === 0 &&
                            that.data.phone === that.data.oldPhone
                        ) {
                            clearInterval(timer);
                            that.setData({
                                sendBtnStatus: false,
                                sendBtnContent: '重新获取',
                                time: seconds
                            });
                            that.hasClicked = false;
                        } else if (
                            (seconds === 0 || seconds !== 0) &&
                            that.data.phone !== that.data.oldPhone
                        ) {
                            clearInterval(timer);
                            that.setData({
                                sendBtnStatus: false,
                                sendBtnContent: '获取验证码',
                                time: seconds
                            });
                            that.hasClicked = false;
                        }
                    }, 1000);
                    clearTimeout();
                }, 500);
            } else {
                wx.showToast({
                    title: res.message,
                    icon: 'none',
                    duration: 2000
                });
                that.setData({
                    smsStatus: false
                });
            }
        });

        // console.log("已点击");
    },
    //判断验证码是否有效
    _getCode: function (e) {
        const code = e.detail.value;
        if (code.length !== 6) {
            this.setData({
                loginBtnStatus: false,
                code
            });
        } else {
            if (/^[0-9]*$/.test(code)) {
                this.setData({
                    loginBtnStatus: true,
                    code
                });
            }
        }
    },
    phoneCheck: function () {
        let phone = this.data.phone;
        const reg = /^1[3456789]\d{9}$/;
        if (phone === '') {
            this.handleToast('请输入手机号码');
            return false;
        }
        if (!reg.test(phone)) {
            this.handleToast('请输入正确的手机号码');
            return false;
        }
        return true;
    },
    codeCheck: function (e) {
        let code = this.data.code;
        let reg = /^\d{6}$/;
        if (code === '') {
            this.handleToast('请输入验证码');
            return false;
        }
        if (!reg.test(code)) {
            this.handleToast('验证码错误');
            return false;
        }
        return true;
    },
    handleToast: function (mes) {
        wx.showToast({
            title: mes,
            icon: 'none',
            duration: 2000
        });
    },
    handleLogin: function () {
        if (this.phoneCheck() && this.codeCheck()) {
            this._login();
        }
    },
    //手机号验证码登录
    _login: function () {
        const that = this;
        const reg = /^1[3456789]\d{9}$/;
        const parme = {
            phone: this.data.phone,
            code: this.data.code
        };
        // console.log(parme);
        global.requestPost(global.URL.PHONE_LOGIN_BY_CODE, parme, function (
            res
        ) {
            // console.log(res);
            if (res.status === 'C0000') {
                wx.setStorageSync(global.STORE.BAIDU_USERINFO, res.data.userInfo);
                wx.setStorageSync(global.STORE.BAIDU_TOKEN, res.data.wxtoken);
                wx.navigateBack();
            } else {
                that.setData({
                    code: ''
                });
                that.handleToast(res.message);
            }
        });
    },
    onLoad: function () {},
    //微信授权登录
    getPhoneNumber: function (e) {
        //登录
        global.login(
            e, app.globalData.agentPhone, wx.getStorageSync(global.STORE.LOGIN_CODE),
            () => {
                app.globalData.token = wx.getStorageSync(global.STORE.BAIDU_TOKEN);
                console.log('登录成功++++++++++');
                const timer = setInterval(() => {
                    wx.navigateBack();
                    clearInterval(timer);
                }, 1000);
            },
            () => {
                app.globalData.token = wx.getStorageSync(global.STORE.BAIDU_TOKEN);
                const timer = setInterval(() => {
                    wx.navigateBack();
                    clearInterval(timer);
                }, 1000);
                console.log('失败++++++++++++++');
            }
        );
    }

});