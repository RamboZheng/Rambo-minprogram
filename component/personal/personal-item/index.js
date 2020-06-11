const app = getApp();
const api = require('../../../utils/lib/api');
const global = require('../../../utils/global.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        personalItem: {
            type: Object,
            value: ''
        },
        loginStatus: {
            type: Boolean,
            value: false
        },
        boxStatus: {
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
        toPersonalItem: function(e) {
            const token = wx.getStorageSync(api.STORE.BAIDU_TOKEN);

            if (!token && e.currentTarget.dataset.verify) {
                wx.showToast({
                    title: '请先登录',
                    icon: 'none',
                    duration: 2000
                });
                return;
            }
            // 拨打客服电话
            if (
                e.currentTarget.dataset.path ===
                '../../personal/phoneNumber/index'
            ) {
                wx.makePhoneCall({
                    phoneNumber: '4000485858'
                });
                return;
            }
            // 意见反馈
            if (
                e.currentTarget.dataset.path === '../../personal/advice/index'
            ) {
                return;
            }
            // 退出登录
            if (
                e.currentTarget.dataset.path === '../../personal/loginOut/index'
            ) {
                // console.log(this.data.boxStatus);
                this.triggerEvent('change', this.data.changeStatus);
                // this.setData({
                //     boxStatus: true
                // });
                return;
            }

            // console.log(e.currentTarget.dataset.path);
            wx.navigateTo({
                url: e.currentTarget.dataset.path
            });
        }
    }
});
