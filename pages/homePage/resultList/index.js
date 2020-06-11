//index.js
//获取应用实例
const app = getApp();
let global = require('../../../utils/global.js');

Page({
    data: {
        showList: [], // 展示列表
        resultList: '', // 结果内容
        showResult: 'init', // 结果展示
        searchText: '', // 搜索内容（全局）
        conditionList: '', // 条件列表
        searchWord: '', // 搜索内容（当前）
        showMore: false, // 是否展示加载框
        showEnd: false, // 是否展示无更多内容
        showCon: false, // 是否展示条件筛选组件
        pageNum: 1, //当前列表页数
        noData: false, //是否展示无数据组件
        moreCondiciton: '', // 选取的筛选条件
        searchBox: {}, // 搜索内容主体信息
        banMove: '', // 是否禁止页面滑动
        gardenId: '', //点击租房搜索弹出列表的情况下保存的id
        rentTypes: "", // 存储租房的搜索类型
        recordCount: 0, //首次加载显示的总条数
        isCollect: false // 是否收藏
    },
    //事件处理函数
    toBlock: function (e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../../detail/moduleDetail/index?detailType=garden&id=' + id
        });
    },
    // 收藏房源(只有二手房)
    collectPage: function (e) {
        const ctx = this;
        let parme = {
            gardenId: e.currentTarget.dataset.house,
            mobileInfo: app.globalData.deviceInfo.model // 需要添加设备型号参数
        };
        global.requestPost(global.URL.COLLECT__HOUSE, parme, function (res) {
            if (res.success) {
                wx.showToast({
                    title: '收藏成功',
                    icon: 'success', //图标
                    duration: 2000, //提示的延迟时间
                    success: function () {
                        let list = ctx.data.resultList;
                        for (let item of list) {
                            if (item.outNetId == parme.gardenId) {
                                item.isCollect = true
                            }
                        }

                        ctx.setData({
                            resultList: list
                        });
                    }
                });
            }
        });
    },
    // 取消收藏(只有二手房)
    cancleCollect: function (e) {
        const ctx = this;
        let parme = {
            gardenId: e.currentTarget.dataset.house
        };
        global.requestPost(global.URL.CANCEL_COLLECT, parme, function (res) {
            if (res.success) {
                wx.showToast({
                    title: '取消收藏',
                    icon: 'success', //图标
                    duration: 2000, //提示的延迟时间
                    success: function () {
                        let list = ctx.data.resultList;
                        for (let item of list) {
                            if (item.outNetId == parme.gardenId) {
                                item.isCollect = false
                            }
                        }
                        ctx.setData({
                            resultList: list
                        });

                    }
                });
            }
        });
    },
    // 数据请求
    getListData: function (path, keyword, condition, page) {
        const ctx = this;
        let parme = '';

        if (this.data.searchBox.type == 'house' || this.data.searchBox.type == 'newHouse' || this.data.searchBox.type == 'cutMoney') {
            parme = {
                keyword: keyword || ' ',
                condition: condition.newCon || ' ',
                pageSize: 30,
                currentPage: page || 1
            };
        } else if (this.data.searchBox.type == 'intact') {
            parme = {
                located: false,
                keyword: keyword || ' ',
                condition: condition.newCon || ' ',
                currentPage: page || 1,
                pageSize: 30,
                gardenId: this.data.gardenId || ' '
            };
        } else if (this.data.searchBox.type == 'combine') {
            parme = {
                located: false,
                keyword: keyword || ' ',
                condition: condition.newCon || ' ',
                currentPage: page || 1,
                pageSize: 30,
                gardenId: this.data.gardenId || ' '
            };
        } else if (
            this.data.searchBox.type == 'rent' ||
            this.data.searchBox.type == 'rentIndex'
        ) {
            parme = {
                located: false,
                keyword: keyword || ' ',
                condition: condition.newCon || ' ',
                pageSize: 30,
                houstType: this.data.rentTypes || ' ',
                currentPage: page || 1,
                gardenId: this.data.gardenId || ' '
            };
        } else if (this.data.searchBox.type == 'flat') {
            parme = {
                currentPage: page || 1,
                pageSize: 30,
                condition: condition.newCon,
                // keyword: keyword,
                brandIds: condition.brandStr || ''
            };
        } else if (this.data.searchBox.type == 'garden') {
            parme = {
                keyword: keyword || ' ',
                condition: condition.newCon || ' ',
                pageSize: 30,
                currentPage: page || 1,
                userLocation: app.globalData.latitude + "," + app.globalData.longitude, // 坐标
                userDistance: 3 // 距离
            };
        } else if (this.data.searchBox.type == 'school') {
            parme = {
                keyword: keyword || ' ',
                pageSize: 30,
                condition: condition.newCon || ' ',
                currentPage: page || 1,
            };
        }
        global.requestGet(path, parme, function (res) {
            //列表第一页
            if (ctx.data.pageNum == 1) {
                // 接口返回报错 则直接显示无数据
                if (!res.data) {
                    ctx.setData({
                        noData: true
                    });
                    return;
                } else {
                    ctx.setData({
                        recordCount: res.data.recordCount || res.data.recordTotal
                    });
                }
                ctx.firstPage(res);
            } else { // 第二页加载
                if (ctx.data.showResult == 'showData' || ctx.data.showResult == 'init') {
                    if (res.data && res.data.items && res.data.items.length > 0) {
                        let newList = res.data.items;
                        let oldList = ctx.data.showList;
                        ctx.setData({
                            showMore: false,
                            showList: oldList.concat(newList)
                        });
                    } else {
                        ctx.setData({
                            showEnd: true
                        });
                    }
                } else {
                    if (res.data && res.data.recommendation && res.data.recommendation.length > 0) {
                        let newList = res.data.recommendation;
                        let oldList = ctx.data.showList;
                        ctx.setData({
                            showMore: false,
                            showList: oldList.concat(newList)
                        });
                    } else {
                        ctx.setData({
                            showEnd: true
                        });
                    }
                }
            }
        });
    },
    // 列表首页的加载处理
    firstPage: function (res) {
        if ( // 二手房第一页加载
            this.data.searchBox.type == 'house' ||
            this.data.searchBox.type == 'newHouse' ||
            this.data.searchBox.type == 'cutMoney'
        ) {
            //有小区信息
            if (res.data.garden && res.data.garden.length > 0) {
                this.setData({
                    showResult: 'showData',
                    showList: res.data.items,
                    resultList: res.data.garden
                });
                const token = wx.getStorageSync(global.STORE.BAIDU_TOKEN) || '';
                if (token) { // 检测用户是否登录
                    this.isCollect(res.data.garden);
                }
                if (res.data.items.length == 0) {
                    this.setData({
                        noData: true
                    });
                }
            } else {
                if (res.data.items && res.data.items.length > 0) {
                    this.setData({
                        showList: res.data.items
                    });
                } else {
                    this.setData({
                        showResult: 'noData',
                        showList: res.data.recommendation
                    });
                }
            }
        } else if ( // 小区第一页加载
            this.data.searchBox.type == 'garden'
        ) { //有小区信息
            if (res.data.items && res.data.items.length > 0) {
                this.setData({
                    showResult: 'showData',
                    showList: res.data.items,
                });
            } else {
                let parme = {
                        keyword: '',
                        condition: '',
                        pageSize: 10,
                        currentPage: 1,
                        userLocation: app.globalData.latitude + "," + app.globalData.longitude, // 坐标
                        userDistance: 5 // 距离
                    },
                    ctx = this;
                global.requestGet(this.data.searchBox.listPath, parme, function (res) {
                    ctx.setData({
                        showResult: 'noData',
                        showList: res.data.items
                    });
                });
            }

        } else if ( // 租房第一页加载
            this.data.searchBox.type == 'rent' ||
            this.data.searchBox.type == 'intact' ||
            this.data.searchBox.type == 'combine'
        ) {
            //有租房信息
            if (res.data.items && res.data.items.length > 0) {
                this.setData({
                    showResult: 'showData',
                    showList: res.data.items,
                });
            } else {
                let parme = {
                        located: false,
                        keyword: '',
                        condition: '',
                        currentPage: 1,
                        pageSize: 10,
                        gardenId: ''
                    },
                    ctx = this;
                global.requestGet(this.data.searchBox.listPath, parme, function (res) {
                    ctx.setData({
                        showResult: 'noData',
                        showList: res.data.items
                    });
                });
            }

        } else {
            // 学校,独栋公寓首页进入
            if (res.data.items.length == 0) {
                this.setData({
                    noData: true,
                    showMore: false
                });
            } else {
                this.setData({
                    showResult: 'init',
                    showList: res.data.items
                });
            }

        }
        // 搜索提示语 
        let str = this.data.searchBox.title;
        if (str == '二手房' || str == '租房') {
            str = '套房源'
        } else if (str == '独栋公寓') {
            str = '套公寓'
        } else {
            str = '个' + str
        }
        if (this.data.recordCount > 0) {
            wx.showToast({
                title: '找到' + this.data.recordCount + str,
                icon: 'success',
                duration: 2000
            });
        }
    },
    // 查询是否收藏房源(只有二手房)
    isCollect: function (list) {
        let ctx = this;
        for (let item of list) {
            let parme = {
                gardenId: item.outNetId,
                banLogin: true
            };
            global.requestGet(global.URL.ISGET_COLLECT__GARDEN, parme, function (res) {
                // 1:未关注小区 2:已关注小区
                if (res.data == 2) {
                    item.isCollect = true
                } else {
                    item.isCollect = false
                }
                ctx.setData({
                    resultList: list
                });
            });

        }

    },
    // 获取所有筛选条件请求
    getCondition: function (box) {
        const ctx = this;
        let parme = {
            type: box.conditionType || ""
        }
        global.requestGet(box.conditionPath, parme, function (res) {
            //res就是接口返回的数据
            ctx.setData({
                conditionList: res.data,
                showCon: true
            });
        });
    },
    // 获取选取条件筛选
    refreshList: function (e) {
        this.setData({
            showMore: false,
            noData: false,
            moreCondiciton: e.detail,
            pageNum: 1,
            showList: ''
        });
        this.getListData(
            this.data.searchBox.listPath,
            this.data.searchWord,
            this.data.moreCondiciton,
            1
        );
    },
    // 检测是否打开筛选组件
    isBanMove: function (e) {
        this.setData({
            banMove: e.detail
        });
    },
    onLoad: function (option) {
        // 获取推荐列表数据
        if (app.globalData.searchText !== '你想找的小区、商圈') {
            this.setData({
                searchWord: app.globalData.searchText,
                gardenId: option.gardenId,
                rentTypes: option.rentTypes
            });
        }
        // 创建字典表
        this.typeFilter(option.type);
        this.getListData(
            this.data.searchBox.listPath,
            this.data.searchWord,
            this.data.moreCondiciton,
            1
        );
        // 根据不同类型获取搜索
        this.getCondition(this.data.searchBox);
    },
    // 页面回退的时候检测关注小区状态
    onShow: function () {
        if (this.data.resultList.length > 0) {
            this.isCollect(this.data.resultList);
        }
    },
    // 下拉加载
    // onPullDownRefresh: function () {
    //     wx.showNavigationBarLoading();
    //     this.setData({
    //         showList: []
    //     });
    //     this.getListData(
    //         this.data.searchBox.listPath,
    //         this.data.searchWord,
    //         this.data.moreCondiciton,
    //         1
    //     );
    //     // 根据不同类型获取搜索
    //     this.getCondition(this.data.searchBox.conditionPath);
    //     wx.stopPullDownRefresh();
    // },
    //  创建字典表
    typeFilter: function (type) {
        switch (type) {
            case 'house':
                this.setData({
                    searchBox: {
                        type: 'house',
                        title: '二手房',
                        conStr: '',
                        listPath: global.URL.GET_LIST_DATA,
                        conditionPath: global.URL.GET_CONDITION,
                        conditionType: ""
                    }
                });
                break;
            case 'newHouse': // 新上房源
                this.setData({
                    searchBox: {
                        type: 'newHouse',
                        title: '二手房',
                        conStr: 'f5',
                        listPath: global.URL.GET_LIST_DATA,
                        conditionPath: global.URL.GET_CONDITION,
                        conditionType: ""
                    }
                });
                break;
            case 'cutMoney': // 降价房
                this.setData({
                    searchBox: {
                        type: 'cutMoney',
                        title: '二手房',
                        conStr: 'f6',
                        listPath: global.URL.GET_LIST_DATA,
                        conditionPath: global.URL.GET_CONDITION,
                        conditionType: ""
                    }
                });
                break;
            case 'intact': // 整租
                this.setData({
                    searchBox: {
                        type: 'intact',
                        title: '租房',
                        conStr: 'rb0',
                        listPath: global.URL.GET_RENT_LIST_DATA,
                        conditionPath: global.URL.GET_RENT_CONDITION,
                        conditionType: ""
                    }
                });
                break;
            case 'combine': // 合租
                this.setData({
                    searchBox: {
                        type: 'combine',
                        title: '租房',
                        conStr: 'sr0',
                        listPath: global.URL.GET_RENT_LIST_DATA,
                        conditionPath: global.URL.GET_RENT_CONDITION,
                        conditionType: ""
                    }
                });
                break;
            case 'rent': // 房源（不区分合租整租）
                this.setData({
                    searchBox: {
                        type: 'rent',
                        title: '租房',
                        conStr: '',
                        listPath: global.URL.GET_RENT_LIST_DATA,
                        conditionPath: global.URL.GET_RENT_CONDITION,
                        conditionType: ""
                    }
                });
                break;
            case 'rentIndex': // 租房首页
                this.setData({
                    searchBox: {
                        type: 'rent',
                        title: '租房',
                        conStr: '',
                        listPath: global.URL.GET_RENT_LIST_DATA,
                        conditionPath: global.URL.GET_RENT_CONDITION,
                        conditionType: ""
                    }
                });
                break;
            case 'flat':
                this.setData({
                    searchBox: {
                        type: 'flat',
                        title: '独栋公寓',
                        conStr: '',
                        listPath: global.URL.GET_FLATS_LIST_DATA,
                        conditionPath: global.URL.GET_FLATS_CONDITION,
                        conditionType: ""
                    }
                });
                break;
            case 'garden':
                this.setData({
                    searchBox: {
                        type: 'garden',
                        title: '小区',
                        conStr: '',
                        listPath: global.URL.GET_GARDEN_LIST,
                        conditionPath: global.URL.GET_CONDITION,
                        conditionType: "garden"
                    }
                });
                break;
            case 'school':
                this.setData({
                    searchBox: {
                        type: 'school',
                        title: '学校',
                        conStr: '',
                        listPath: global.URL.GET_SCHOOL_LIST,
                        conditionPath: global.URL.GET_CONDITION,
                        conditionType: "school"
                    }
                });
                break;

        }
        // 动态设置页面标题
        if (this.data.searchBox.type == 'garden') {
            wx.setNavigationBarTitle({
                title: '找小区'
            });
        } else {
            wx.setNavigationBarTitle({
                title: this.data.searchBox.title
            });
        }
        // 点击整租或者合租时直接更新筛条件
        let initCon = {
            newCon: this.data.searchBox.conStr
        };
        this.setData({
            moreCondiciton: initCon
        });
    },
    // // 上拉加载
    onReachBottom: function () {
        if (this.data.showResult == 'noData') {
            return
        }
        this.setData({
            showMore: true
        });
        // 防抖
        setTimeout(() => {
            let addPage = this.data.pageNum;
            addPage = addPage + 1;
            this.setData({
                pageSize: 30,
                pageNum: addPage
            });
            if (this.data.showList.length > 0) {
                this.getListData(
                    this.data.searchBox.listPath,
                    this.data.searchWord,
                    this.data.moreCondiciton,
                    this.data.pageNum
                );
            }
        }, 1000);
    }
});