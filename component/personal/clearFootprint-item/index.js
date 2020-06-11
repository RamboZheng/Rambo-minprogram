// component/personal/clearFootprint-item/index.js
const api = require('../../../utils/lib/api');
let global = require('../../../utils/global.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        boxStatus: {
            type: Boolean,
            value: false
        },
        navTab: {
            type: String,
            value: ''
        },
        needBtn: {
            type: Boolean,
            value: true
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
        clearAll: function(e) {
            this.triggerEvent('change', this.data.changeStatus);
        }
    }
});
