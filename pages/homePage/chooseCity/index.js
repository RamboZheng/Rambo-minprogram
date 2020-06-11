// pages/homePage/chooseCity/index.js
let global = require('../../../utils/global.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        currentCity: {},
        openeds: [
            {
                fullPinyin: 'shenzhen',
                id: '1',
                name: '深圳',
                simplePinyin: 'sz'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getCurrentCity();
    },

    handleafresh: function() {
        this.getCurrentCity();
    },
    handleChoose: function(e) {
        global.STORE.SET_CITY = e.currentTarget.dataset.city;
        wx.navigateBack({});
    },

    getCurrentCity: function() {
        // 获取当前的位置
        global.requestGet(global.URL.GET_CURRENT_CITY, '', res => {
            console.log(res);
            if (res.status === 'C0000') {
                this.setData({
                    currentCity: res.data
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
});
