Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isHandle: { // 是否允许选中星级
            type: Boolean,
            value: false
        },
        starType: { // 星号颜色
            type: String,
            value: 'glod'
        },
        flagLevel: { // 传入的星级
            type: String,
            value: '5'
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        flag: "5", //初始分数
    },
    //事件处理函数
    methods: {
        // 选中星号
        changeColor: function (e) {
            if (this.properties.isHandle) {
                this.setData({
                    flag: e.currentTarget.dataset.level
                });
                this.triggerEvent('commitStar', {
                    starLevel: e.currentTarget.dataset.level
                });
            }
        },
    },
    ready: function () {
        console.log(this.properties, '进入star-level')
        if (!this.properties.isHandle) {
            this.setData({
                flag: this.properties.flagLevel
            });
        }
    }
});