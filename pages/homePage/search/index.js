const app = getApp();
let global = require('../../../utils/global.js');

Page({
    data: {
        inputShowed: true, // 搜索框状态
        inputVal: '', // 搜索框值
        selectArray: [{
                id: '0',
                text: '二手房'
            },
            {
                id: '1',
                text: '租房'
            },
            {
                id: '2',
                text: '小区'
            },
            {
                id: '3',
                text: '学校'
            },
            // {
            //     id: '4',
            //     text: '公寓'
            // }
        ], // 搜索分类
        historyData: [], //获取历史记录
        hotData: [], // 热门搜索
        resultList: [], // 搜索提示
        fromIndex: true, // 是否来自首页
        searchWord: '你想找的小区、商圈', // 搜索提示语
        searchType: "" //进入搜索页面默认为二手房搜索
    },
    // 点击ICON搜索
    search: function () {
        if (this.data.inputVal) {
            app.globalData.searchText = this.data.inputVal
            this.saveData(app.globalData.searchText)
            wx.redirectTo({
                url: '../../homePage/resultList/index?type=' + this.data.searchType
            });
        } else {
            wx.showToast({
                title: '搜索内容不能为空',
                icon: 'none'
            });
            return;
        }
    },
    // 清空历史缓存
    clearStore: function () {
        // 点击取消返回列表页
        if (this.data.searchType == "house") {
            wx.setStorageSync(global.STORE.SECOND_HIS, "");
            this.setData({
                historyData: []
            });
        } else if (this.data.searchType == "rent" || this.data.searchType == "combine" || this.data.searchType == "intact" || this.data.searchType == 'rentIndex') {
            wx.setStorageSync(global.STORE.RENT_HIS, "");
            this.setData({
                historyData: []
            });
        } else if (this.data.searchType == "flat") {
            wx.setStorageSync(global.STORE.FLAT_HIS, "");
            this.setData({
                historyData: []
            });
        } else if (this.data.searchType == "school") {
            wx.setStorageSync(global.STORE.SCHOOL_HIS, "");
            this.setData({
                historyData: []
            });
        } else if (this.data.searchType == "garden") {
            wx.setStorageSync(global.STORE.GARDEN_HIS, "");
            this.setData({
                historyData: []
            });
        }
    },
    // 清除搜索框值
    clearInput: function () {
        this.setData({
            inputVal: '',
            resultList: []
        });
    },
    // 输入联想事件
    inputTyping: function (e) {
        var that = this;
        if (e.detail.value == '') {
            this.clearInput();
        }
        that.setData({
            inputVal: e.detail.value
        });
        this.getSearchData(e.detail.value);
    },
    // 搜索提示/热门搜索
    getSearchData: function (keyword) {
        const ctx = this;
        let parme = {},
            requestPath = ''; //存储二手房/租房请求地址
        // 二手房搜索请求地址
        if (this.data.searchType == "house") {
            requestPath = global.URL.GET_KEYWORD_LIST;
            parme.keyword = keyword;
            parme.type = "garden";
            parme.pageSize = 10;
            // 获取二手房缓存记录
            let secondHis = wx.getStorageSync(global.STORE.SECOND_HIS) || [];
            secondHis = secondHis.length > 10 ? secondHis.slice(0, 10) : secondHis
            this.setData({
                historyData: secondHis
            });

        } else if (this.data.searchType == "rent" || this.data.searchType == "combine" || this.data.searchType == "intact" || this.data.searchType == "rentIndex") {
            // 租房搜索请求地址
            if (!keyword) {
                requestPath = global.URL.GET_RENT_RECOMMEND_LIST;
                parme.currentPage = 1;
                parme.located = 'false';
                parme.pageSize = 10;
                let rentingHis = wx.getStorageSync(global.STORE.RENT_HIS) || [];
                rentingHis = rentingHis.length > 10 ? rentingHis.slice(0, 10) : rentingHis
                this.setData({
                    historyData: rentingHis
                });
            } else {
                requestPath = global.URL.GET_KEYWORD_LIST;
                parme.keyword = keyword;
                parme.type = "rent";
                parme.pageSize = 10;
            }
        } else if (this.data.searchType == "flat") {
            // 公寓搜索请求地址
            requestPath = global.URL.GET_KEYWORD_LIST;
            parme.keyword = keyword;
            parme.type = "apartment";
            parme.pageSize = 10;
            // 获取租房缓存记录
            let flatsHis = wx.getStorageSync(global.STORE.FLAT_HIS) || [];
            this.setData({
                historyData: flatsHis
            });
        } else if (this.data.searchType == "school") {
            // 学校搜索请求地址
            requestPath = global.URL.GET_KEYWORD_LIST;
            parme.keyword = keyword;
            parme.type = "school";
            parme.pageSize = 10;
            // 获取学校缓存记录
            let flatsHis = wx.getStorageSync(global.STORE.SCHOOL_HIS) || [];
            this.setData({
                historyData: flatsHis
            });
        } else if (this.data.searchType == "garden") {
            // 小区搜索请求地址
            requestPath = global.URL.GET_KEYWORD_LIST;
            parme.keyword = keyword;
            parme.type = "garden";
            parme.pageSize = 10;
            // 获取小区缓存记录
            let flatsHis = wx.getStorageSync(global.STORE.GARDEN_HIS) || [];
            this.setData({
                historyData: flatsHis
            });
        }
        global.requestGet(requestPath, parme, function (res) {
            // 首次进入获取热门列表
            if (!keyword && res.data) {
                if (ctx.data.searchType == "house") {
                    ctx.setData({
                        hotData: res.data
                    });
                } else if (ctx.data.searchType == "rent" || ctx.data.searchType == "combine" || ctx.data.searchType == "intact" || ctx.data.searchType == 'rentIndex') {
                    // 暂时隐藏租房热门提示
                    ctx.setData({
                        hotData: res.data.items
                    });
                } else if (ctx.data.searchType == "garden") {
                    ctx.setData({
                        hotData: res.data
                    });
                } else if (ctx.data.searchType == "school") {
                    ctx.setData({
                        hotData: res.data
                    });
                } else if (ctx.data.searchType == "flat") {
                    ctx.setData({
                        hotData: res.data
                    });
                }
            }
            // 有输入内容
            if (keyword && res.data) {
                let list = res.data;
                for (let item of list) {
                    item.nameArr = ctx.getHilightStrArray(item.name, ctx.data.inputVal)
                }
                ctx.setData({
                    resultList: list
                });
                // if (ctx.data.searchType == "house") {
                //     ctx.setData({
                //         resultList: list
                //     });
                // } else if (ctx.data.searchType == "rent" || ctx.data.searchType == "combine" || ctx.data.searchType == "intact" || ctx.data.searchType == 'rentIndex') {
                //     // 暂时隐藏租房热门提示
                //     ctx.setData({
                //         resultList: list
                //     });
                // } else if (ctx.data.searchType == "garden") {
                //     ctx.setData({
                //         resultList: list
                //     });
                // } else if (ctx.data.searchType == "school") {
                //     ctx.setData({
                //         resultList: list
                //     });
                // } else if (ctx.data.searchType == "flat") {
                //     ctx.setData({
                //         resultList: list
                //     });
                // }
            }
        });
    },
    // 获取选中推荐列表中的值
    toResultPage: function (e) {
        app.globalData.searchText = e.currentTarget.dataset.name
        // 开始缓存浏览记录
        this.saveData(e.currentTarget.dataset.name);
        if (this.data.searchType == "rentIndex") {
            this.setData({
                searchType: 'rent'
            });
        }
        // 判断是否存在id
        const id = e.currentTarget.dataset.id ? e.currentTarget.dataset.id : "";
        const rentTypes = e.currentTarget.dataset.type ? e.currentTarget.dataset.type : "";
        // 租房搜索需要id参数 二手房直接使用keyword
        wx.redirectTo({
            url: '../../homePage/resultList/index?type=' + this.data.searchType + '&gardenId=' + id + '&rentTypes=' + rentTypes
        });
    },
    // 点击搜索保存记录
    saveData: function (data) {
        if (data == '') {
            wx.showToast({
                title: '输入数据不能为空',
                icon: 'none'
            });
            return;
        }
        // 根据搜索类别缓存搜索记录
        if (this.data.searchType == 'house') {
            const exprs = wx.getStorageSync(global.STORE.SECOND_HIS) || [];
            if (exprs.indexOf(data) > -1) {
                const index = exprs.indexOf(data);
                exprs.splice(index, 1);
            }
            exprs.unshift(data);
            wx.setStorageSync(global.STORE.SECOND_HIS, exprs);
        } else if (this.data.searchType == 'rent' || this.data.searchType == 'intact' || this.data.searchType == 'combine' || this.data.searchType == 'rentIndex') {
            const exprs = wx.getStorageSync(global.STORE.RENT_HIS) || [];
            if (exprs.indexOf(data) > -1) {
                const index = exprs.indexOf(data);
                exprs.splice(index, 1);
            }
            exprs.unshift(data);
            wx.setStorageSync(global.STORE.RENT_HIS, exprs);
        } else if (this.data.searchType == 'flat') {
            const exprs = wx.getStorageSync(global.STORE.FLAT_HIS) || [];
            if (exprs.indexOf(data) > -1) {
                const index = exprs.indexOf(data);
                exprs.splice(index, 1);
            }
            exprs.unshift(data);
            wx.setStorageSync(global.STORE.FLAT_HIS, exprs);
        } else if (this.data.searchType == 'garden') {
            const exprs = wx.getStorageSync(global.STORE.GARDEN_HIS) || [];
            if (exprs.indexOf(data) > -1) {
                const index = exprs.indexOf(data);
                exprs.splice(index, 1);
            }
            exprs.unshift(data);
            wx.setStorageSync(global.STORE.GARDEN_HIS, exprs);
        } else if (this.data.searchType == 'school') {
            const exprs = wx.getStorageSync(global.STORE.SCHOOL_HIS) || [];
            if (exprs.indexOf(data) > -1) {
                const index = exprs.indexOf(data);
                exprs.splice(index, 1);
            }
            exprs.unshift(data);
            wx.setStorageSync(global.STORE.SCHOOL_HIS, exprs);
        }
    },
    //切割关键词数组
    getHilightStrArray: function (str, key) {
        return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
    },
    // 下拉框获取搜索类型
    getData: function (e) {
        if (e.detail.id == 0) {
            this.setData({
                searchType: 'house',
                inputVal: "",
                hotData: [],
                searchWord: '你想找的小区、商圈',
                resultList: []
            });

        } else if (e.detail.id == 1) {
            this.setData({
                searchType: 'rent',
                inputVal: "",
                hotData: [],
                searchWord: '你想找的小区、商圈',
                resultList: []
            });
        } else if (e.detail.id == 2) {
            this.setData({
                searchType: 'garden',
                inputVal: "",
                hotData: [],
                searchWord: '你想找的小区、商圈',
                resultList: []
            });
        } else if (e.detail.id == 3) {
            this.setData({
                searchType: 'school',
                inputVal: "",
                hotData: [],
                resultList: [],
                searchWord: ' 请输入小学或中学名称',
            });
        } else if (e.detail.id == 4) {
            this.setData({
                searchType: 'flat',
                inputVal: "",
                hotData: [],
                searchWord: '你想找的小区、商圈',
                resultList: []
            });
        }
        this.getSearchData('');
    },
    onLoad: function (option) {
        if (option.type) {
            this.setData({
                searchType: option.type || 'house',
                fromIndex: false
            });
            if (option.type == 'school') {
                this.setData({
                    searchWord: ' 请输入小学或中学名称',
                });
            }
        } else {
            this.setData({
                searchType: 'house',
            });
        }
        // 每次进入搜索栏都为空
        this.getSearchData('');
    }
});