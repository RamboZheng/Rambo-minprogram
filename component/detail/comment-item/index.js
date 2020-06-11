const app = getApp();
let global = require('../../../utils/global.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        type: { //item类型
            type: String,
            value: ''
        },
        item: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        list: [],
        boxInfo: {},
        unitPrice: '',
        isPraised: false,
        newGardenName: '',
        isLogin: false,
        PraiseIcon: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/img-238pic-default@2x.png'
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 点赞
        praised: function (e) {
            let parme = {
                    houseEvaluationId: e.currentTarget.dataset.commentid
                },
                ctx = this;
            if (!this.data.isPraised) {
                global.requestGet(global.URL.GET_HOUSE_COMMENTPRAISE, parme, res => {
                    if (res.success) {
                        wx.showToast({
                            title: '点赞成功',
                            icon: 'none',
                            duration: 2000
                        });
                        ctx.setData({
                            isPraised: true
                        });
                    } else {
                        wx.showToast({
                            title: '点赞失败',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                })
            } else {
                global.requestGet(global.URL.GET_HOUSE_COMMENTUNPRAISE, parme, res => {
                    if (res.success) {
                        wx.showToast({
                            title: '取消点赞成功',
                            icon: 'none',
                            duration: 2000
                        });
                        ctx.setData({
                            isPraised: false
                        });
                    } else {
                        wx.showToast({
                            title: '取消点赞失败',
                            icon: 'none',
                            duration: 2000
                        });
                    }

                })
            }
        },
        //拨打经纪人
        callBoker: function () {
            let concatList = this.data.list;
            let moreList = [];

            moreList = this.properties.itemList.length >= 3 ? this.properties.itemList.splice(0, 3) : this.properties.itemList

            concatList = concatList.concat(moreList)
            this.setData({
                list: concatList
            });
        },
        // 去往经纪人列表
        toBokerList: function () {
            let concatList = this.data.list;
            let moreList = [];

            moreList = this.properties.itemList.length >= 3 ? this.properties.itemList.splice(0, 3) : this.properties.itemList

            concatList = concatList.concat(moreList)
            this.setData({
                list: concatList
            });
            console.log(this.data.list, 'moreListmoreListv')
        },
        //微信授权登录
        getPhoneNumber: function (e) {
            //登录
            let ctx = this;
            global.login(e, app.globalData.agentPhone, wx.getStorageSync(global.STORE.LOGIN_CODE), () => {
                app.globalData.token = wx.getStorageSync(global.STORE.BAIDU_TOKEN);
                console.log('check成功')
                ctx.setData({
                    isLogin: true
                });
                ctx.triggerEvent('refresh', {});
            }, () => {
                // console.log('2222222')
                // app.globalData.token = wx.getStorageSync(global.STORE.BAIDU_TOKEN);
                ctx.setData({
                    isLogin: false
                });
                // ctx.triggerEvent('refesh', {});
            });
        }
    },
    ready: function () {
        console.log(this.properties, '进入comment-item')
        const token = wx.getStorageSync(global.STORE.BAIDU_TOKEN) || '';
        if (token) {
            this.setData({
                isLogin: true,
                isPraised: this.properties.item.isPraised
            });
        }
    }
});