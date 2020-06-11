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
        gardenId: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        list: [],
        boxInfo: {}, // 分类信息
        showItem: false, //是否展示item
        recordTotal: "" // 列表长度
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 分类信息
        initBox: function () {
            let boxInfo = {};
            switch (this.properties.type) {
                case 'houseUserComment': //获取用户评价列表
                    boxInfo = {
                        type: this.properties.type,
                        title: '用户点评',
                        path: global.URL.GET_HOUSE_COMMENTLIST,
                        parme: {
                            currentPage: 1,
                            pageSize: 2,
                            houseId: this.properties.gardenId
                            // houseId: '12256452'
                        }
                    }
                    this.setData({
                        boxInfo: boxInfo
                    });
                    this.getCommentList(boxInfo.path, boxInfo.parme, boxInfo.type)
                    break;
                case 'houseBrokerComment': //获取经纪人评价列表
                    boxInfo = {
                        type: this.properties.type,
                        title: '用户点评',
                        path: global.URL.GET_HOUSE_COMMENTLIST,
                        iconUrl: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/dianhua%202@1.5x.png',
                        parme: {
                            currentPage: 1,
                            pageSize: 2,
                            houseId: this.properties.gardenId
                            // houseId: '12256452'
                        }
                    }
                    this.setData({
                        boxInfo: boxInfo
                    });
                    this.getCommentList(boxInfo.path, boxInfo.parme, boxInfo.type)
                    break;
            }
        },
        // 重新获取列表
        refreshList: function () {
            this.setData({
                showItem: false
            });
            this.getCommentList(this.data.boxInfo.path, this.data.boxInfo.parme, this.data.boxInfo.type)
        },
        // 获取列表数据
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
                            schoolRecommend: res.data
                        });
                        break;
                }
            })
        },
        // 跳转评价列表页面
        toCommentList: function () {
            wx.navigateTo({
                url: '../../homePage/commentList/index?type=' +
                    this.data.boxInfo.type +
                    '&id=' +
                    this.data.boxInfo.parme.houseId
            });
        },
    },
    ready: function () {
        console.log(this.properties, '进入comment-box')
        this.initBox()
    }
});