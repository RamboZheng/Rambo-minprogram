let global = require('../utils/global.js');
const app = getApp();
Component({
    data: {
        code: '',
        phone: '',
        btnStatus: true,
        selected: 0,
        status: 'getPhoneNumber',
        color: '#878D99',
        selectedColor: '#475266',
        list: [{
                pagePath: '/pages/homePage/index/index',
                iconPath: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/tab_icon_record@3x.png',
                selectedIconPath: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/tab_icon_record_selected@3x.png',
                text: '首页'
            },
            {
                pagePath: '/pages/personal/index/index',
                iconPath: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/tab_icon_info@3x.png',
                selectedIconPath: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/tab_icon_info_selected@3x.png',
                text: '我的'
            }
        ]
    },
    ready: function () {
        if (app.globalData.token || app.globalData.agentPhone) {
            this.setData({
                btnStatus: false
            });
        } else {
            this.setData({
                btnStatus: true
            });
        }
        wx.login({
            success(res) {
                if (res.code) {
                    wx.setStorageSync(global.STORE.LOGIN_CODE, res.code);
                }
            }
        })

    },

    methods: {
        goPath: function (e) {
            const url = e.currentTarget.dataset.path;
            console.log(url, 'eeeeeeeeeee')
            wx.switchTab({
                url
            });
        },
        //微信授权登录
        getPhoneNumber: function (e) {
            const url = e.currentTarget.dataset.path;
            // 判断是否允许授权
            if (
                e.detail.errMsg === 'getPhoneNumber:fail user deny'
            ) {
                wx.switchTab({
                    url
                });
                // 首次切换tab，未登录的情况下弹出登录
                this.setData({
                    btnStatus: false
                });
                return;
            } else {
                ///登录
                global.login(
                    e, app.globalData.agentPhone, wx.getStorageSync(global.STORE.LOGIN_CODE),
                    () => {
                        wx.switchTab({
                            url
                        });
                        app.globalData.token = wx.getStorageSync(global.STORE.BAIDU_TOKEN);
                        console.log('check成功++++++++++++++');
                        this.setData({
                            btnStatus: false
                        });
                    },
                    () => {
                        wx.switchTab({
                            url
                        });
                        app.globalData.token = wx.getStorageSync(global.STORE.BAIDU_TOKEN);
                        console.log('login++++++++++++++');
                        this.setData({
                            btnStatus: false
                        });
                    }
                );
            }
        }
    }
});