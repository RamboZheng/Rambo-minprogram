Component({
    /**
     * 组件的属性列表
     */
    properties: {
        info: {
            type: Object,
            value: ''
        },
        type: {
            type: String,
            value: 'school'
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        unitPrice: '',
        newGardenName: '',
        emptyImg: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/img-238pic-default@2x.png'
    },
    /**
     * 组件的方法列表
     */
    ready: function () {
        console.log(this.properties, '进入flex-info')
    }
});