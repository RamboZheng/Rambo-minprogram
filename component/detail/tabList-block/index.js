let global = require('../../../utils/global.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        type: {
            type: String,
            value: ''
        },
        blockId: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        list: [], //展示list
        longList: [], //为展示list
        oldList: [], // 原始list
        listType: 'house', //block类型
        tabList: [], //tab列表
        rentRoom: [],
        houseRoom: [],
        selectTab: "", // 选中的按钮
        showEnd: false,
        brokerList: [], // 经纪人房源列表
        dataCount: 0,
        code: 0, // 0是二手房1是租房
        pageNum: 1, // 获取经纪人房源列表的页码
        brokerType: 0 // 0是二手房1为租房
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //获取tab
        getTab(type) {
            let path = type == "house" ? global.URL.GET_GARDEN_RECOMMEND : global.URL.GET_GARDEN_RENTTAB,
                parme = {
                    gardenId: this.properties.blockId || null
                },
                ctx = this;
            global.requestGet(path, parme, res => {
                if (res.success) {
                    if (type == 'house') {
                        ctx.setData({
                            houseRoom: res.data.tagList,
                        });
                    } else {
                        ctx.setData({
                            rentRoom: res.data
                        });
                    }
                    // 如果在售推荐列表为空则展示在租推荐
                    if (ctx.data.houseRoom.length > 0) {
                        ctx.setData({
                            listType: 'house'
                        });
                    } else {
                        ctx.setData({
                            listType: 'rent'
                        });
                    }
                } else {
                    wx.showToast({
                        title: res.message,
                        icon: 'none',
                        duration: 1500,
                        mask: true
                    });
                }

                ctx.getRoomList()
            });
        },
        // 二手房/租房切换
        changeTab(e) {
            this.setData({
                listType: e.currentTarget.dataset.type,
                showEnd: false,
                pageNum: 1,
                brokerList: []
            });
            if (this.properties.type == 'garden') {
                this.getRoomList()
            } else if (this.properties.type == 'broker') {
                this.setData({
                    code: this.data.listType == 'house' ? 0 : 1
                });
                this.getBrokerHouse()
            }
        },
        //获取list
        getRoomList(e) {
            let tabNum,
                ctx = this;
            if (!e) {
                tabNum = this.data.listType == "house" ? this.data.houseRoom[0].bedroomNumber : this.data.rentRoom[0].id + "";
            } else {
                //第一次加载
                tabNum = e.currentTarget.dataset.roomnum + "";
            }
            this.setData({
                selectTab: tabNum || "",
                showEnd: false,
                list: []
            });
            let path, parme;
            if (this.data.listType == "house") {
                path = global.URL.GET_GARDEN_ROOM_RECOMMEND,
                    parme = {
                        gardenId: this.properties.blockId || null,
                        BedroomNumber: this.data.selectTab || null,
                        pageSize: 30
                    }
            } else {
                path = global.URL.GET_GARDEN_RENTLIST;
                parme = {
                    gardenId: this.properties.blockId || null,
                    id: this.data.selectTab || null,
                    pageSize: 30
                }
            }
            global.requestGet(path, parme, res => {
                if (res.success) {
                    let newList = res.data.items.splice(0, 3)
                    ctx.setData({
                        longList: res.data.items,
                        list: newList
                    });
                } else {
                    ctx.setData({
                        longList: []
                    });
                }
            });
        },
        //获取经纪人动态房源
        getBrokerHouse() {
            let ctx = this,
                parme = {
                    brokerId: this.properties.blockId || null,
                    type: this.data.brokerType,
                    pageSize: 30,
                    currentPage: this.data.pageNum,
                    type: this.data.code
                }
            global.requestGet(global.URL.GET_BROKER_TREND, parme, res => {
                if (res.success) {
                    let list = ctx.data.brokerList;
                    list = list.concat(res.data.items);
                    ctx.setData({
                        brokerList: list,
                        showEnd: res.data.items.length == 30 ? false : true,
                        dataCount: res.data.recordCount
                    });
                }
            });
        },
        //显示经纪人更多房源
        getBrokerMore() {
            let num = this.data.pageNum;
            this.setData({
                pageNum: num + 1
            });
            this.getBrokerHouse()
        },
        //显示更多
        getMore() {
            let concatList = this.data.list;
            let moreList = [];
            moreList = this.data.longList.length >= 5 ? this.data.longList.splice(0, 5) : this.data.longList
            concatList = concatList.concat(moreList)
            this.setData({
                list: concatList
            });
            if (this.data.longList.length < 5) {
                this.setData({
                    showEnd: true
                });
            }
        },
        //收起
        packUp() {
            let newList = this.data.list.splice(0, 3)
            this.setData({
                longList: this.data.list,
                list: newList,
                showEnd: false
            });
        },
        //经纪人房源列表收起
        packBrokerUp() {
            this.setData({
                pageNum: 1,
                brokerList: [],
                showEnd: false
            });
            this.getBrokerHouse()
        }
    },
    ready() {
        console.log(this.properties, '进入tabList-block')
        if (this.properties.type == 'garden') {
            this.getTab('house')
            this.getTab('rent')
        } else if (this.properties.type == 'broker') {
            this.getBrokerHouse()
        }
    }
});