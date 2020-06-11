//index.js
//获取应用实例
const app = getApp();
const global = require('../../../utils/global.js');

Page({
    data: {
        navTab: ['二手房', '小区', '租房'],
        currentTab: 0,
        houseList: [],
        gardenList: [],
        rentingList: [],
        flatList: [],
        brokerList: [],
        currentPage: 1,
        info: {}
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../../homePage/index/index'
        });
    },
    onShow: function () {
        this.getListType();
    },
    //让nav与内容展示关联
    currentTab: function (e) {
        if (this.data.currentTab == e.currentTarget.dataset.idx) {
            return;
        }
        this.setData({
                currentTab: e.currentTarget.dataset.idx,
                currentPage: 1
            },
            () => {
                this.getListType();
            }
        );
    },
    curChange: function (e) {
        if (e.detail.source === 'touch') {
            this.setData({
                currentTab: e.detail.current
            });
        }
    },
    // 房源、公寓 按钮切换
    getRentType: function (e) {
        // 清空原数组
        this.setData({
            rentingList: []
        });
        let listInfo = {};
        if (e.currentTarget.dataset.type == 'rent') {
            listInfo = {
                type: 'rent',
                path: global.URL.GET_RENT_FOOTPRINT,
                parme: {
                    type: 0,
                    currentPage: 1,
                    pageSize: 50
                }
            }
        } else if (e.currentTarget.dataset.type == 'flat') {
            listInfo = {
                type: 'flat',
                path: global.URL.GET_RENT_FOOTPRINT,
                parme: {
                    type: 1,
                    currentPage: 1,
                    pageSize: 50
                }
            }
        }
        this.getCollectDataList(listInfo.path, listInfo.parme, listInfo.type);
        this.setData({
            info: listInfo
        });
    },
    // 根据tab类型获取list
    getListType: function () {
        let listInfo = {};
        switch (this.data.currentTab) {
            case 0:
                listInfo = {
                    type: 'house',
                    path: global.URL.GET_ALL_FOOTPRINT,
                    parme: {
                        currentPage: 1,
                        pageSize: 50
                    }
                }
                break;
            case 1:
                listInfo = {
                    type: 'garden',
                    path: global.URL.GET_BLOCK_FOOTPRINT,
                    parme: {
                        currentPage: 1,
                        pageSize: 50
                    }
                }
                break;
            case 2:
                listInfo = {
                    type: 'rent',
                    path: global.URL.GET_RENT_FOOTPRINT,
                    parme: {
                        type: 0,
                        currentPage: 1,
                        pageSize: 50
                    }
                }
                break;
            case 3:
                listInfo = {
                    type: 'broker',
                    path: global.URL.COLLECT_BROKER,
                    parme: {
                        currentPage: 1,
                        pageSize: 50
                    }
                }
                break;
        }
        this.setData({
            info: listInfo
        });
        this.getCollectDataList(listInfo.path, listInfo.parme, listInfo.type);
    },
    //获取收藏列表
    getCollectDataList: function (path, parme, flag) {
        let ctx = this;
        global.requestGet(path, parme, function (res) {
            switch (flag) {
                case 'house':
                    if (res.data !== null) {
                        ctx.setData({
                            houseList: res.data.items
                        });
                    }
                    break;
                case 'garden':
                    if (res.data !== null) {
                        ctx.setData({
                            gardenList: res.data.items
                        });
                    }
                    break;
                case 'rent':
                    if (res.data !== null) {
                        ctx.setData({
                            rentingList: res.data.items
                        });
                    }
                    break;
                case 'flat':
                    if (res.data !== null) {
                        ctx.setData({
                            rentingList: res.data.items
                        });
                    }
                    break;
                case 'broker':
                    if (res.data !== null) {
                        ctx.setData({
                            rentingList: res.data.items
                        });
                    }
                    break;
            }
        });
    },
});