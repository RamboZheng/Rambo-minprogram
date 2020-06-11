// component/common/dialog/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        loginOut: {
            type: Boolean,
            value: ''
        },
        clearFootprint: {
            type: Boolean,
            value: ''
        },
        navTab: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        doSomething: function(e) {
            // console.log(e, 'dialog');
            // 退出登录
            if (this.data.loginOut) {
                if (e.target.dataset.class === 'yes') {
                    this.triggerEvent('exit', false);
                } else {
                    this.triggerEvent('close', true);
                }
            }
            // 清空浏览记录
            if (this.data.clearFootprint) {
                if (e.target.dataset.class === 'yes') {
                    this.triggerEvent('clear', false);
                } else {
                    this.triggerEvent('close', false);
                }
            }
        }
    }
});
