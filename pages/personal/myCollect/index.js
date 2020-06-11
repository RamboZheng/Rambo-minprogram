//index.js
//获取应用实例
const app = getApp();
const global = require('../../../utils/global.js');

Page({
    data: {
        navTab: ['二手房', '小区', '租房', '经纪人'],
        currentTab: 0,
        houseList: [],
        gardenList: [],
        rentingList: [],
        flatList: [],
        brokerList: [],
        pageNum: 1,
        listSize: 30,
        swiperH: 0,
        showMore: false,
        showEnd: false, //展示没有数据了
        info: {}
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../../homePage/index/index'
        });
    },
    onShow: function () {
        this.setData({ // 数据重置
            houseList: [],
            gardenList: [],
            rentingList: [],
            flatList: [],
            brokerList: [],
            showMore: false,
            swiperH: 0,
            showEnd: false
        })
        this.getListType(this.data.currentTab);
    },
    //让nav与内容展示关联
    currentTab: function (e) {
        if (this.data.currentTab == e.currentTarget.dataset.idx) {
            return;
        }
        this.setData({ // 数据重置
                currentTab: e.currentTarget.dataset.idx,
                pageNum: 1,
                houseList: [],
                gardenList: [],
                rentingList: [],
                flatList: [],
                brokerList: [],
                showMore: false,
                swiperH: 0,
                showEnd: false
            },
            () => {
                this.getListType();
            }
        );
    },
    curChange: function (e) {
        if (e.detail.source === 'touch') {
            this.setData({ // 数据重置
                currentTab: e.detail.current,
                pageNum: 1,
                houseList: [],
                gardenList: [],
                rentingList: [],
                flatList: [],
                brokerList: [],
                showMore: false,
                swiperH: 0,
                showEnd: false
            });
            this.getListType();
        }
    },
    // 房源、公寓 按钮切换
    getRentType: function (e) {
        let listInfo = {};
        this.setData({ // 数据重置
            pageNum: 1,
            houseList: [],
            gardenList: [],
            rentingList: [],
            flatList: [],
            brokerList: [],
            showMore: false,
            swiperH: 0,
            showEnd: false
        });
        if (e.currentTarget.dataset.type == 'rent') {

            listInfo = {
                type: 'rent',
                path: global.URL.COLLECT_RENTLIST,
                parme: {
                    type: 0,
                    currentPage: this.data.pageNum,
                    pageSize: this.data.listSize
                }
            }
        } else if (e.currentTarget.dataset.type == 'flat') {
            listInfo = {
                type: 'flat',
                path: global.URL.COLLECT_RENTLIST,
                parme: {
                    type: 1,
                    currentPage: this.data.pageNum,
                    pageSize: this.data.listSize
                }
            }
        }
        this.getCollectDataList(listInfo.path, listInfo.parme, listInfo.type);
        this.setData({
            info: listInfo
        });
    },
    //上拉加载
    onReachBottom: function () {
        this.setData({
            pageNum: this.data.pageNum + 1,
            showMore: true
        });
        if (!this.data.showEnd) {
            this.getListType();
        }
    },
    // 根据tab类型获取list
    getListType: function (tab) {
        let listInfo = {};
        switch (tab || this.data.currentTab) {
            case 0:
                listInfo = {
                    type: 'house',
                    path: global.URL.COLLECT_HOUSELIST,
                    parme: {
                        currentPage: this.data.pageNum,
                        pageSize: this.data.listSize
                    }
                }
                break;
            case 1:
                listInfo = {
                    type: 'garden',
                    path: global.URL.COLLECT_GARDENLIST,
                    parme: {
                        currentPage: this.data.pageNum,
                        pageSize: this.data.listSize
                    }
                }
                break;
            case 2: // 存在公寓和租房两种
                if (this.data.info.type == 'flat') {
                    listInfo = {
                        type: 'flat',
                        path: global.URL.COLLECT_RENTLIST,
                        parme: {
                            type: 1,
                            currentPage: this.data.pageNum,
                            pageSize: this.data.listSize
                        }
                    }
                } else {
                    listInfo = {
                        type: 'rent',
                        path: global.URL.COLLECT_RENTLIST,
                        parme: {
                            type: 0,
                            currentPage: this.data.pageNum,
                            pageSize: this.data.listSize
                        }
                    }
                }
                break;
            case 3:
                listInfo = {
                    type: 'broker',
                    path: global.URL.COLLECT_BROKER,
                    parme: {
                        currentPage: this.data.pageNum,
                        pageSize: this.data.listSize
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
            if (!res.data) return
            ctx.setData({
                showEnd: res.data.items.length < ctx.data.listSize ? true : false
            });
            switch (flag) {
                case 'house':
                    if (res.data !== null) {
                        let hList = ctx.data.houseList;
                        ctx.setData({
                            houseList: hList.concat(res.data.items)
                        });
                        ctx.computHeight(flag, ctx.data.houseList)
                    }
                    break;
                case 'garden':
                    if (res.data !== null) {
                        let gList = ctx.data.gardenList;
                        ctx.setData({
                            gardenList: gList.concat(res.data.items)
                        });
                        ctx.computHeight(flag, ctx.data.gardenList)
                    }
                    break;
                case 'rent':
                    if (res.data !== null) {
                        let rList = ctx.data.rentingList;
                        ctx.setData({
                            rentingList: rList.concat(res.data.items)
                        });
                        ctx.computHeight(flag, ctx.data.rentingList)
                    }
                    break;
                case 'flat':
                    if (res.data !== null) {
                        let fList = ctx.data.rentingList;
                        ctx.setData({
                            rentingList: fList.concat(res.data.items)
                        });
                        ctx.computHeight(flag, ctx.data.rentingList)
                    }
                    break;
                case 'broker':
                    if (res.data !== null) {
                        let bList = ctx.data.brokerList;
                        ctx.setData({
                            brokerList: bList.concat(res.data.items)
                        });
                        ctx.computHeight(flag, ctx.data.brokerList)
                    }
                    break;
            }
        });
    },
    // 动态计算sipwer高度以及加载状态
    computHeight: function (flag, list) {
        let heightNum = list.length;
        if (flag == 'broker') { // 不同类型计算的高度不同
            this.setData({
                swiperH: heightNum * 200
            });
        } else if (flag == 'flat') {
            this.setData({
                swiperH: heightNum * 770
            });
        } else {
            this.setData({
                swiperH: heightNum * 300
            });
        }

        if (list.length < this.data.listSize || !list) {
            this.setData({
                showEnd: true
            });
        }
    }
});