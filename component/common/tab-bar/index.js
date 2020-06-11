Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabList: {
            type: Array,
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        tabIndex: 0,
    },

    /**
     * 组件的方法列表
     */
    //事件处理函数
    methods: {
        //用户点击tab时调用
        titleClick: function (e) {
            console.log(e, 'ope')
            this.setData({
                //拿到当前索引并动态改变
                tabIndex: e.currentTarget.dataset.index
            })
            this.triggerEvent('tabIndex', {
                index: e.currentTarget.dataset.index
            });
        }
    },
    ready: function () {}
});