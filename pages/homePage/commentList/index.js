const app = getApp();
let global = require('../../../utils/global.js');


Page({
    data: {
        type: "", //显示类型
        id: "", // 传入id
        list: [],
        inputVal: "", // 编辑输入
        boxInfo: {}, // 分类信息
        recordTotal: "", // 评价数量
        showItem: false, // 是否展示列表item
        score: '4.5' // 经纪人评分
    },
    // 数据初始化
    initList: function () {
        let boxInfo = {};
        switch (this.properties.type) {
            case 'houseUserComment': //用户评价
                boxInfo = {
                    type: this.properties.type,
                    path: global.URL.GET_HOUSE_COMMENTLIST,
                    parme: {
                        currentPage: 1,
                        pageSize: 20,
                        houseId: this.properties.id
                    }
                }
                break;
            case 'houseBrokerComment': //经纪人评价
                boxInfo = {
                    type: this.properties.type,
                    path: global.URL.GET_BROKER_COMMENT_LIST,
                    parme: {
                        currentPage: 1,
                        pageSize: 50,
                        brokerId: this.data.id
                    }
                }


                break;
        }
        this.setData({
            boxInfo: boxInfo
        });
        this.getCommentList(boxInfo.path, boxInfo.parme, boxInfo.type)
    },
    // 重新获取列表
    refreshList: function () {
        this.setData({
            showItem: false
        });
        this.getCommentList(this.data.boxInfo.path, this.data.boxInfo.parme, this.data.boxInfo.type)
    },
    // 获取评价列表
    getCommentList: function (url, parme, flag) {
        const ctx = this;
        global.requestGet(url, parme, res => {
            switch (flag) {
                case 'houseUserComment':
                    ctx.setData({
                        recordTotal: res.data.recordTotal,
                        list: res.data.items,
                        showItem: true
                    });
                    break;
                case 'houseBrokerComment':
                    ctx.setData({
                        recordTotal: res.data.recordTotal,
                        list: res.data.items
                    });
                    break;
            }
        })
    },
    // 提交用户评价
    commitComment: function () {
        let parme = {
                content: this.data.inputVal,
                userSource: 'MINI',
                houseId: this.data.id
            },
            ctx = this;
        global.requestPost(global.URL.GET_HOUSE_COMMENTSAVE, parme, res => {
            if (res.success) {
                wx.showToast({
                    title: '点评提交成功',
                    icon: 'none',
                    duration: 2000
                });
                ctx.setData({
                    inputVal: ""
                });
            } else {
                wx.showToast({
                    title: '点评提交失败',
                    icon: 'none',
                    duration: 2000
                });
            }
        })
    },
    // 输入用户评价
    inputTyping: function (e) {
        var ctx = this;
        ctx.setData({
            inputVal: e.detail.value
        });
    },
    onLoad: function (option) {
        this.setData({
            type: option.type,
            id: option.id,
            score: option.score
        });
        this.initList();
    },

})