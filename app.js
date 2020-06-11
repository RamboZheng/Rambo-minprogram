//app.js
const global = require('utils/global.js');
App({
    data: {
        im: {
            sdkAppID: 10086, // 用户标识接入 SDK 的应用 ID，必填
            accountType: 10086, // 帐号体系集成中的 accountType，必填
            accountMode: 0, //帐号模式，0 - 独立模式 1 - 托管模式
            imId: null, // 用户的 id
            imName: null, // 用户的 im 名称
            imAvatarUrl: null, // 用户的 im 头像 url
            userSig: null // 用户通过 imId 向后台申请的签名值 sig
        }
    },
    onLaunch: function (options) {
        // 获取经纪人手机号
        // 经纪人首页邀请 scene = 手机号
        // 经纪人详情页面邀请 scene = P+手机号+类型+id （P18664900469house10797661）
        let scene = options.query.scene;
        // let scene = 'P18664900469house10797661';
        if (scene && scene != 'undefined') {
            if (scene.length == 11) {
                this.globalData.agentPhone = scene
            } else if (scene.substring(0, 1) == 'P') {
                this.globalData.agentPhone = scene.substring(1, 12);
            }
        }
        // 获取当前设备信息
        try {
            const res = wx.getSystemInfoSync();
            this.globalData.deviceInfo = res;
        } catch (e) {
            wx.showToast({
                title: '无法获取设备信息',
                icon: 'none',
                duration: 2000
            });
        }
        // 用户未登录时生成临时id
        const token = wx.getStorageSync(global.STORE.BAIDU_TOKEN) || '',
            ctx = this;
        if (!token) {
            global.requestGet(global.URL.GET_RANDOM_ID, '', function (res) {
                //res就是接口返回的数据
                ctx.globalData.radomId = res.data;
                wx.setStorageSync(global.STORE.BAIDU_RADOMID, res.data);
            });
        } else {
            this.globalData.token = token;
        }
    },
    globalData: {
        debugId: false, //详情页是否展示房源id(调试专用)
        radomId: null, //未登录用户的临时id
        deviceInfo: null, //设备信息
        userInfo: null,
        searchText: '',
        agentPhone: "", // 经纪人手机号（二维码获取）
        token: "",
        longitude: null,
        latitude: null,
        code: null,
        ak: '10086', // 地图所用参数 勿删
        userId: '', // 存储用户id

    },
    /**
     * 初始化 im 参数，返回成功回调
     */
    initImParams: function (cbOk) {
        var that = this
        // 登录 初始化 im 参数
        // 注意：如果首次使用，后台需要创建【腾讯 im】账号
        wx.login({
            success: res => {
                var appid = '10086'
                var secret = 'd8a1afd2195df1111'
                var uri = '?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code'
                var url = 'https://api.weixin.qq.com' + uri
                wx.request({
                    url: url,
                    method: 'GET',
                    success: res => {
                        // 通过 openid 获取【腾讯 im】签名值
                        var generatedSigUrl = 'http://localhost:8080/generatedSig'
                        var header = {
                            "Content-Type": "application/x-www-form-urlencoded"
                        };
                        var data = {
                            "identifier": res.data.openid
                        }
                        that.data.im.imId = res.data.openid // ocGnM4nO9kZf6W
                        wx.request({
                            url: generatedSigUrl,
                            header: header,
                            method: "POST",
                            data: data,
                            success: res => {
                                // 初始化 im 数据 初始化完毕再返回回调
                                that.data.im.userSig = res.data
                                // 初始化 im 数据
                                that.data.im.imName = '鸭鸭'
                                that.data.im.imAvatarUrl = 'https://wx.qlogo.cn/mmopen/vi_32'

                                cbOk()
                            }
                        })
                    }
                })
            }
        })

    }
});