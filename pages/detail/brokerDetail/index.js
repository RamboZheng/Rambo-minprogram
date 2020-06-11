//index.js
//获取应用实例
let global = require('../../../utils/global.js');
const app = getApp();
Page({
    data: {
        isLogin: false, // 用户是否登录
        showPhone: false, // 是否展示拨打电话
        showComment: false, // 是否评价经纪人
        brokerId: "", // 存储经纪人id
        borkerInfo: {}, // 存储经纪人信息
        tagList: [], // 提交评论的标签
        brokerComment: [], // 经纪人评价列表
        isCollect: "1", //是否关注房源 1未关注 2关注
        brokerScore: '5' // 当前经纪人的评分
    },
    // 获取经纪人详情
    getBrokerInfo() {
        const ctx = this;
        let parme = {
            brokerId: this.data.brokerId,
            type: 0 // 0为二手房 1为租房
        }
        global.requestGet(global.URL.GET_BROKER_DETAIL, parme, function (res) {
            if (!res.data) return
            //res就是接口返回的数据
            ctx.setData({
                borkerInfo: res.data.broker || ""
            });
            ctx.getScore()
            ctx.getBrokerComment();
            if (app.globalData.token) {
                ctx.isWatchBroker()
            }
        });
    },
    // 获取经纪人评价列表
    getBrokerComment() {
        const ctx = this;
        let parme = {
            pageSize: 2,
            currentPage: 1,
            brokerId: this.data.brokerId,
            // brokerId: '1000000020122441'

        }
        global.requestGet(global.URL.GET_BROKER_COMMENT_LIST, parme, function (res) {
            ctx.setData({
                brokerComment: res.data.items
            });
        });
    },
    // 是否关注当前经纪人
    isWatchBroker() {
        const ctx = this;
        let parme = {
            brokerId: this.data.brokerId
        }
        global.requestGet(global.URL.ISGET_COLLECT_BROKER, parme, function (res) {
            //res就是接口返回的数据
            ctx.setData({
                isLogin: true,
                isCollect: res.data
            });
        });
    },
    //显示更多
    ifCollect() {
        const ctx = this;
        if (this.data.isCollect == '1') {
            let parme = {
                brokerId: this.data.brokerId
            };

            global.requestPost(global.URL.POST_COLLECT_BROKER, parme, res => {
                if (res.success) {
                    ctx.setData({
                        isCollect: '2'
                    });
                    wx.showToast({
                        title: '关注成功',
                        icon: 'none',
                        duration: 2000
                    });
                } else {
                    wx.showToast({
                        title: '关注失败',
                        icon: 'none',
                        duration: 2000
                    });
                }

            });
        } else if (this.data.isCollect == '2') {
            let parme = {
                brokerId: this.data.brokerId
            }
            global.requestPost(global.URL.CANCEL_COLLECT_BROKER, parme, res => {
                if (res.success) {
                    ctx.setData({
                        isCollect: '1'
                    });
                    wx.showToast({
                        title: '取消成功',
                        icon: 'none',
                        duration: 2000
                    });
                } else {
                    wx.showToast({
                        title: '取消失败',
                        icon: 'none',
                        duration: 2000
                    });
                }
            });
        }

    },
    //微信授权登录
    getPhoneNumber(e) {
        //登录
        global.login(
            e, app.globalData.agentPhone, wx.getStorageSync(global.STORE.LOGIN_CODE),
            () => {
                app.globalData.token = wx.getStorageSync(global.STORE.BAIDU_TOKEN);
                console.log('登录成功++++++++++');
                this.isWatchBroker()
            },
            () => {
                app.globalData.token = wx.getStorageSync(global.STORE.BAIDU_TOKEN);
                console.log('失败++++++++++++++');
                this.isWatchBroker()
            }
        );
    },
    // 获取底部组件传值
    clickFooter(e) {
        switch (e.detail.footType) {
            case 'collect': //获取学校对口小区
                this.ifCollect();
                break;
            case 'comment': //获取学校推荐房源小区
                this.getTags()

                break;
            case 'phone': //获取学校推荐房源小区
                if (this.data.borkerInfo.contactPhone || this.data.borkerInfo.contact400) {
                    this.setData({
                        showPhone: true
                    });
                } else {
                    wx.showToast({
                        title: '暂无号码',
                        icon: 'none',
                        duration: 2000
                    });
                }

                break;
        }
    },
    // 获取评论经纪人子组件传值
    clickComment(e) {
        switch (e.detail.handleType) {
            case 'commit': //获取学校对口小区
                if (this.data.isLogin) {
                    this.commitComment(e.detail.info)
                } else {
                    this.getPhoneNumber()
                }
                break;
            case 'cancel': //获取学校推荐房源小区
                this.setData({
                    showComment: false
                });
                break;
        }
    },
    // 获取评价标签
    getTags() {
        const ctx = this;
        global.requestGet(global.URL.GET_BROKER_TAG, "", function (res) {
            if (res.success) {
                //res就是接口返回的数据
                ctx.setData({
                    tagList: res.data,
                    showComment: true // 展示底部评价组件
                });
            } else {
                wx.showToast({
                    title: res.message,
                    icon: 'none',
                    duration: 2000
                });
            }

        });
    },

    // 获取当前经纪人评分
    getScore() {
        const ctx = this;
        let parme = {
            brokerId: this.data.brokerId,
        };
        global.requestGet(global.URL.GET_BROKER_SCORE, parme, function (res) {
            //res就是接口返回的数据
            ctx.setData({
                brokerScore: res.data,
            });
        });
    },
    // 提交评价
    commitComment(info) {
        const ctx = this;
        let parme = {
            content: info.content, //评价内容
            userSource: 'MINI', //	用户来源（MINI）
            brokerId: this.data.brokerId,
            score: info.score,
            brokerName: this.data.borkerInfo.name,
            brokerPhone: this.data.borkerInfo.contactPhone,
            labelIds: info.labelIds
        }
        global.requestPost(global.URL.POST_BROKER_COMMENT, parme, function (res) {
            if (res.success) {
                ctx.setData({
                    showComment: false
                });
                wx.showToast({
                    title: '提交成功',
                    icon: 'none',
                    duration: 2000
                });
            } else {
                wx.showToast({
                    title: res.message,
                    icon: 'none',
                    duration: 2000
                });
            }
        });
    },
    // 取消打电话
    cancelPhone() {
        this.setData({
            showPhone: false
        });
    },
    // 取消打电话
    cancelComment() {
        this.setData({
            showComment: false
        });
    },
    // 跳转评价列表
    toCommentList() {
        wx.navigateTo({
            url: '../../homePage/commentList/index?type=houseBrokerComment&id=' +
                this.data.brokerId + '&score=' + this.data.brokerScore
        });
    },
    onLoad(option) {

        this.setData({
            brokerId: option.brokerId,
            isLogin: app.globalData.token ? true : false
        });
        this.getBrokerInfo();
    },
});