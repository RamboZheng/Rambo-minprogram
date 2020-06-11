//index.js
//获取应用实例
const global = require('../../../utils/global.js');
const app = getApp();
Page({
    data: {
        homeList: [], // 二手房推荐列表
        rentList: [], // 租房推荐列表
        listType: 'house',
        showMore: false,
        showEnd: false,
        showIcon: false,
        showAgent: false, //展示经纪人信息
        agentPhone: "", // 存储经纪人手机号
        city: {},
        entranceList: [{
            name: '二手房',
            lebal: 'house',
            iconUrl: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/index-house.png'
        }, {
            name: '租房',
            lebal: 'rent',
            iconUrl: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/index-rent.png'
        }, {
            name: '小区',
            lebal: 'block',
            iconUrl: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/index-garden.png'
        }, {
            name: '学校',
            lebal: 'school',
            iconUrl: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/index-school.png'
        }, {
            name: '房屋资质',
            lebal: 'houseMeans',
            iconUrl: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/index-means.png'
        }, {
            name: '算房贷',
            lebal: 'houseLoan',
            iconUrl: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/index-loan.png'
        }, {
            name: '新上房源',
            lebal: 'newHouse',
            iconUrl: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/index-newHouse.png'
        }, {
            name: '降价房',
            lebal: 'cutMoney',
            iconUrl: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/index-onSale.png'
        }],
        pageNum: 1 //当前列表页数
    },
    onShow: function () {
        app.globalData.searchText = '你想找的小区、商圈'; //初始化
    },
    onLoad: function () {
        //检测是否有位置信息
        const locateInfo = wx.getStorageSync(global.STORE.BAIDU_LOCATEINFO) || '';
        if (locateInfo) {
            app.globalData.latitude = locateInfo.latitude;
            app.globalData.longitude = locateInfo.longitude;
        } else {
            this.getLocation()
        }
        // 获取推荐列表数据
        this.getHouseList(1);
        this.getRentList(1);
        let chooseCity = global.STORE.SET_CITY;
        let obj = Object.getOwnPropertyNames(chooseCity);
        if (obj.length > 0) {
            this.setData({
                city: chooseCity
            });
        }
    },
    // 右上角分享按钮
    onShareAppMessage: function () {
        var that = this;
        return {
            title: '自定义小程序',
            path: 'pages/homePage/index/index',
            imageUrl: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/img-share-home@2x.png',
            success: function (res) {
                console.log("转发成功:" + JSON.stringify(res));
                that.shareClick();
            },

            fail: function (res) {
                console.log("转发失败:" + JSON.stringify(res));
            }
        }
    },
    //微信获取位置
    getLocation: function () {
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                wx.setStorageSync(global.STORE.BAIDU_LOCATEINFO, res);
                app.globalData.latitude = res.latitude;
                app.globalData.longitude = res.longitude;
            }
        })
    },
    // 下拉加载
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading()
        if (this.data.listType == 'house') {
            this.getHouseList(1)
        } else if (this.data.listType == 'rent') {
            this.getRentList(1)
        }
        wx.stopPullDownRefresh()
    },
    // 暂时取消上拉加载
    // onReachBottom: function () {
    //     let addPage = this.data.pageNum;
    //     addPage = addPage + 1;
    //     this.setData({
    //         showMore: true,
    //         pageNum: addPage
    //     });
    //     if (this.data.listType == 'house' && this.data.homeList.length > 0) {
    //         this.getHouseList(this.data.pageNum)
    //     } else if (this.data.listType == 'rent' && this.data.rentList.length > 0) {
    //         this.getRentList(this.data.pageNum)
    //     }
    // },
    intoEntrance: function (e) {
        let lebal = e.currentTarget.dataset.lebal;
        switch (lebal) {
            case 'house':
                wx.navigateTo({
                    url: '../../homePage/resultList/index?type=house'
                });
                break;
            case 'rent':
                wx.navigateTo({
                    url: '../../homePage/renting/index'
                });
                break;
            case 'block':
                wx.navigateTo({
                    url: '../../homePage/resultList/index?type=garden'
                });
                break;
            case 'school':
                wx.navigateTo({
                    url: '../../homePage/resultList/index?type=school'
                });
                break;
            case 'houseMeans':
                wx.navigateTo({
                    url: '../../tool/houseMeans/index'
                });
                break;
            case 'houseLoan':
                wx.navigateTo({
                    url: '../../tool/houseLoan/index/index'
                });
                break;
            case 'newHouse':
                wx.navigateTo({
                    url: '../../homePage/resultList/index?type=newHouse'
                });
                break;
            case 'cutMoney':
                wx.navigateTo({
                    url: '../../homePage/resultList/index?type=cutMoney'
                });
                break;

        }
    },
    //跳转租房
    toRenting: function () {
        wx.navigateTo({
            url: '../../homePage/renting/index'
        });
    },
    // 跳转二手房列表
    toResultList: function () {
        wx.navigateTo({
            url: '../../homePage/resultList/index?type=house'
        });
    },
    // 切换列表类型
    switchType: function (e) {
        this.setData({
            listType: e.currentTarget.dataset.type,
            pageNum: 1
        });

    },
    // 请求二手房推荐
    getHouseList: function (pageNum) {
        const ctx = this;
        let parme = {
            currentPage: pageNum,
            pageSize: 10,
            keyword: "",
            condition: ""
        };
        global.requestGet(global.URL.GET_LIST_DATA, parme, function (res) {
            //res就是接口返回的数据
            if (pageNum == 1) {
                ctx.setData({
                    homeList: res.data.items,
                    city: res.data.city
                });
            } else {
                // 已经没有更多加载
                if (res.data.items.length == 0) {
                    ctx.setData({
                        homeList: newList.concat(res.data.items),
                        showEnd: true
                    });
                } else {
                    let newList = res.data.items;
                    let oldList = ctx.data.homeList;
                    ctx.setData({
                        homeList: oldList.concat(newList)
                    });
                }
            }
        });
    },
    // 请求租房推荐
    getRentList: function (pageNum) {
        const ctx = this;
        let parme = {
            located: 'false',
            currentPage: pageNum || 1,
            pageSize: 10
        };
        global.requestGet(global.URL.GET_RENT_RECOMMEND_LIST, parme, function (res) {
            //res就是接口返回的数据
            if (pageNum == 1) {
                ctx.setData({
                    rentList: res.data.items,
                    city: res.data.city
                });
            } else {
                // 已经没有更多加载
                if (res.data.items.length == 0) {
                    ctx.setData({
                        rentList: newList.concat(res.data.items),
                        showEnd: true
                    });
                } else {
                    let newList = res.data.items;
                    let oldList = ctx.data.rentList;
                    ctx.setData({
                        rentList: oldList.concat(newList)
                    });
                }
            }
        });
    },
    // 滚动监听回到顶部icon
    onPageScroll: function (e) {
        if (e.scrollTop >= 500) {
            this.setData({
                showIcon: true
            });
        } else {
            this.setData({
                showIcon: false
            });
        }
    },
    toTop: function () {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    }
});