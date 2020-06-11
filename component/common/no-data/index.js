Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        pageType: {
            type: String,
            value: 'list'
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

    },
    ready: function () {

        console.log('no-data', this.properties.pageType)
    }
});