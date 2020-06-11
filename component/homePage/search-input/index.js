const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        homeSearch: {
            type: Boolean,
            value: false
        },
        city: {
            type: Object,
            value: {}
        },
        type: {
            type: String,
            value: ""
        },
        jumpNav: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    //事件处理函数
    methods: {
        navToSearch: function () {
            wx.navigateTo({
                url: '../../homePage/search/index?type=' + this.data.type
            });
        },
        // 为了规避小程序的十层页面跳转限制
        radiToSearch: function () {
            if (this.properties.jumpNav) {
                wx.navigateTo({
                    url: '../../homePage/search/index?type=' + this.data.type
                });
            } else {
                wx.redirectTo({
                    url: '../../homePage/search/index?type=' + this.data.type
                });
            }
        },
        toChooseCity: function () {
            wx.navigateTo({
                url: '../../homePage/chooseCity/index'
            });
        }
    },
    ready: function () {
        this.setData({
            searchText: app.globalData.searchText
        });
    }
});