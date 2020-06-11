//index.js
//获取应用实例
const app = getApp();
const api = require('../../../utils/lib/api');
const global = require('../../../utils/global.js');
Page({
    data: {
        loginOut: true,
        phone: '',
        token: '',
        loginStatus: false,
        userAvatarUrl: '',
        boxStatus: false,
        avatarUrl:
            'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/img-head@2x.png',
        userInfo: {},
        hasUserInfo: false,
        personalList: [
            {
                iconUrl:
                    'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/icon-my-collection@2x.png',
                name: '我的收藏',
                path: '../../personal/myCollect/index',
                style: 'margin-bottom:2rpx',
                isVerify: true
            },
            {
                iconUrl:
                    'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/icon-my-history@2x.png',
                name: '浏览历史',
                path: '../../personal/history/index',
                style: 'margin-bottom:20rpx',
                isVerify: true
            },
            {
                iconUrl:
                    'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/icon-my-opinion@2x.png',
                name: '意见反馈',
                path: '../../personal/advice/index',
                style: 'margin-bottom:2rpx',
                isVerify: true
            },
            {
                iconUrl:
                    'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/icon-my-phone@2x.png',
                name: '客服电话',
                path: '../../personal/phoneNumber/index',
                style: 'margin-bottom:2rpx',
                phone: '400-048-5858',
                tap: 'tapCall',
                isVerify: false
            },
            {
                iconUrl:
                    'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/icon-my-about@3x.png',
                name: '关于我们',
                path: '../../personal/aboutUs/index',
                style: 'margin-bottom:20rpx',
                isVerify: false
            },
            {
                name: '退出登录',
                path: '../../personal/loginOut/index',
                style: 'margin-bottom:20rpx;justify-content: center;',
                isVerify: true
            }
        ],

        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../../homePage/index/index'
        });
    },
    toLogin: function() {
        if (this.data.token) {
            return;
        }
        wx.navigateTo({
            url: '../../login/index/index'
        });
    },
    onShow: function() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
          let btnStatus = false;
          const token = wx.getStorageSync(api.STORE.BAIDU_TOKEN);
          if (!token) {
            btnStatus = true;
          }
            this.getTabBar().setData({
                selected: 1,
                btnStatus
            });
        }
        //判断用户是否登录
        let phone, token;
        try {
            phone = wx.getStorageSync(api.STORE.BAIDU_USERINFO).phone;
            token = wx.getStorageSync(api.STORE.BAIDU_TOKEN);
        } catch (e) {}
        if (phone) {
            phone = phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
        }
        this.setData({
            phone,
            loginStatus: !!token,
            token
        });
    },
    onLoad: function() {
        // this.getListHeight();
    },
    exit: function(e) {
        wx.showLoading({
            title: '',
            mask: true,
            success: result => {
                const timer = setTimeout(function() {
                    try {
                        wx.removeStorageSync(api.STORE.BAIDU_TOKEN);
                        wx.removeStorageSync(api.STORE.BAIDU_USERINFO);
                        wx.reLaunch({
                            url: '/pages/personal/index/index'
                        });
                    } catch (e) {}
                    wx.showToast({
                        title: '退出成功',
                        icon: 'none',
                        duration: 2000
                    });
                    clearTimeout(timer);
                }, 500);
            }
        });
        this.close(e.detail);
    },
    close: function(status) {
        this.setData({
            loginStatus: status,
            boxStatus: false
        });
    },
    changeStatus: function(e) {
        this.setData({
            boxStatus: true
        });
        // e.detail;
        // console.log(e.detail);
    }
});
