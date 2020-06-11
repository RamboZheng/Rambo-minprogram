//index.js
//获取应用实例
let global = require('../../../utils/global.js');
const app = getApp();
Page({
    data: {
        showList: [], // 展示列表
        noData: false, // 是否无数据展示
        showMore: false, // 展示正在加载
        showEnd: false, // 展示已无更多数据
        conditionList: "", // 筛选条件
        showCon: false, // 控制筛选栏在获取筛选条件以后再渲染（重要勿删）
        showTop: false, // 是否展示顶部筛选栏
        conStr: "", //筛选条件字符串
        banMove: false, // 是否禁止页面滑动
        pageNum: 1,
        listType: 'recommand',
        downArrow: "https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/ic-home-arrow-huise@2x.png?tdsourcetag=s_pcqq_aiomsg",
        searchBox: {
            conStr: "",
            type: "rentIndex"
        },
        iconPath: [{
                text: '整租',
                img: "https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/icon-renting-whole@2x.png",
                type: 'intact'
            },
            {
                text: '合租',
                img: "https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/icon-renting-sharing@2x.png",
                type: 'combine'
            },
            {
                text: '独栋公寓',
                img: "https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/icon-renting-apartment@2x.png",
                type: 'flat'
            }
        ],

        selectedName: "", // 页面筛选组件名称
        regionStr: "",
        metroStr: "",
        rentalName: "", // 页面筛选组件名称  
        rentalStr: "",
        methodStr: "",
        methodName: "", // 页面筛选组件名称
        methodStr: "",
        moreStr: "",
        moreName: "",

    },
    //事件处理函数
    toBlock: function () {
        wx.navigateTo({
            url: '../../detail/blockDetail/index'
        });

    },
    toList: function (e) {
        wx.navigateTo({
            url: '../../homePage/resultList/index?type=' + e.currentTarget.dataset.type
        });
    },
    indexNav: function (e) {
        wx.pageScrollTo({
            scrollTop: 180,
            duration: 400
        });
        setTimeout(() => {
            this.selectComponent("#condition").tabNav(e);
        }, 300)
    },

    // 检测是否打开筛选组件
    isBanMove: function (e) {
        this.setData({
            banMove: e.detail,
            showTop: true
        });

        // 关闭筛选栏以后保持页面位置
        if (!this.data.banMove) {
            wx.pageScrollTo({
                scrollTop: 180,
                duration: 0
            });
        }
    },
    // 数据请求
    getListData: function (conStr, url, page) {
        const ctx = this;
        let parme = {
            located: 'false',
            currentPage: page || 1,
            pageSize: 30,
            condition: conStr
        };
        global.requestGet(url, parme, function (res) {
            if (ctx.data.pageNum == 1) {
                // // 查询小区有出售房间的情况
                if (res.data.items && res.data.items.length > 0) {
                    ctx.setData({
                        showList: res.data.items,
                        showTop: false
                    });
                    if (res.data.recordCount > 0) {
                        wx.showToast({
                            title: '找到' + res.data.recordCount + '套房源',
                            icon: 'success',
                            duration: 2000
                        });
                    }
                    if (res.data.recordTotal > 0) {
                        wx.showToast({
                            title: '找到' + res.data.recordTotal + '套房源',
                            icon: 'success',
                            duration: 2000
                        });
                    }


                } else {
                    // 没有出售的话使用推荐
                    ctx.setData({
                        noData: true,
                        showTop: false
                    });
                }
            } else {
                if (res.data.items.length > 0) {
                    let newList = res.data.items
                    let oldList = ctx.data.showList
                    ctx.setData({
                        showList: oldList.concat(newList),
                        showTop: false,
                        showMore: false
                    });
                } else {
                    ctx.setData({
                        showTop: false,
                        showEnd: true
                    });
                }
            }
        });
    },
    // 筛选更多条件请求
    getCondition: function () {
        const ctx = this;
        global.requestGet(global.URL.GET_RENT_CONDITION, '', function (res) {
            //res就是接口返回的数据
            ctx.setData({
                conditionList: res.data,
                showCon: true
            });
        });
    },
    // 获取子组件传值
    refreshList: function (e) {
        if (e.detail) {
            this.setData({
                showList: "",
                conStr: e.detail.newCon,
                showList: false,
                noData: false,
                showMore: false,
                pageNum: 1,
                listType: "condition",
                selectedName: e.detail.selectedName, // 页面筛选组件名称
                regionStr: e.detail.regionStr,
                metroStr: e.detail.metroStr,
                rentalName: e.detail.rentalName, // 页面筛选组件名称  
                rentalStr: e.detail.rentalStr,
                moreName: e.detail.moreName, // 页面筛选组件名称
                methodStr: e.detail.methodStr,
                methodName: e.detail.methodName, // 页面筛选组件名称
                methodStr: e.detail.methodStr,
                moreStr: e.detail.moreStr,
                moreName: e.detail.moreName,
            });
            this.getListData(this.data.conStr, global.URL.GET_RENT_LIST_DATA, this.data.pageNum);
        } else {
            this.setData({
                showList: "",
                conStr: "",
                pageNum: 1,
                showMore: false,
                listType: "recommand"
            });
            this.getListData("", global.URL.GET_RENT_RECOMMEND_LIST, this.data.pageNum);
        }
    },
    // onUnload: function () { //如果页面被卸载时被执行
    //     console.log('11111111111111')
    // },
    onLoad: function () {
        app.globalData.searchText = '你想找的小区、商圈' //初始化
        // 获取推荐列表数据
        this.getListData("", global.URL.GET_RENT_RECOMMEND_LIST, 1);
    },
    onShow: function () {
        app.globalData.searchText = '你想找的小区、商圈' //初始化
        // 回退到本页面重置筛选条件
        this.setData({
            showCon: false
        });
        // 获取筛选条件
        this.getCondition();
    },
    // 下拉加载
    // onPullDownRefresh: function () {
    //     wx.showNavigationBarLoading()
    //     this.setData({
    //         showList: []
    //     });
    //     // 获取推荐列表数据
    //     if (this.data.listType == 'recommand') {
    //         this.getListData("", global.URL.GET_RENT_RECOMMEND_LIST, 1);
    //     } else if (this.data.listType == 'condition') {
    //         this.getListData(this.data.conStr, global.URL.GET_RENT_LIST_DATA, this.data.pageNum);
    //     }
    //     wx.stopPullDownRefresh()
    // },
    onPageScroll: function (e) {
        setTimeout(() => {
            if (e.scrollTop >= 180) {
                this.setData({
                    showTop: true
                });
            } else {
                this.setData({
                    showTop: false
                });
            }
        }, 300);
    },
    // 加载下一页数据
    onReachBottom: function () {
        if (this.data.showList.length > 0) {
            let addPage = this.data.pageNum
            addPage = addPage + 1
            this.setData({
                showMore: true,
                pageNum: addPage
            });
            if (this.data.listType == 'recommand' && this.data.showList.length > 0) {
                this.getListData("", global.URL.GET_RENT_RECOMMEND_LIST, this.data.pageNum);
            } else if (this.data.listType == 'condition' && this.data.showList.length > 0) {
                this.getListData(this.data.conStr, global.URL.GET_RENT_LIST_DATA, this.data.pageNum);
            }
        };
    },
});