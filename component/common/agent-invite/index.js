let global = require('../../../utils/global.js');
const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        agentInfo: "",
        showAgent: 'none'
    },

    /**
     * 组件的方法列表
     */
    //事件处理函数
    methods: {
        // 隐藏经纪人
        hideAgent: function () {
            this.setData({
                showAgent: 'none'
            });
        },
        // 经纪人点击登录
        getPhoneNumber: function (e) {
            //登录
            global.login(e, app.globalData.agentPhone, wx.getStorageSync(global.STORE.LOGIN_CODE), () => {
                app.globalData.token = wx.getStorageSync(global.STORE.BAIDU_TOKEN);
                console.log('check成功')
                this.hideAgent()
            }, () => {
                app.globalData.token = wx.getStorageSync(global.STORE.BAIDU_TOKEN);
                console.log('重新登录')
                this.hideAgent()
            });
        },
        // 获取经纪人信息
        getAgentInfo: function () {
            let parme = {
                phone: app.globalData.agentPhone,
            };
            const ctx = this
            global.requestGet(global.URL.GET_AGENT_INFO, parme, function (res) {
                ctx.setData({
                    showAgent: 'block',
                    agentInfo: res.data
                });
            });
        }
    },
    ready: function () {
        // 检测用户是否为经纪人邀请
        if (app.globalData.agentPhone && !app.globalData.token) {
            this.getAgentInfo()
        }
    }
});