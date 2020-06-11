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
    data: {},
    /**
     * 组件的方法列表
     */
    //学校地址跳转
    methods: {
        // 跳转文字介绍页面
        toTextPage: function (e) {
            wx.navigateTo({
                url: '../../detail/textPage/index?type=' + e.currentTarget.dataset.type
            });
        },
        //跳转地图
        toSetMap: function () {
            // console.log(this.data.info)
            const name = this.data.info.name || this.data.info.alias || '学校地址'
            wx.navigateTo({
                url: '../setMap/index?longitude=' +
                    this.properties.info.longitude +
                    '&latitude=' +
                    this.properties.info.latitude +
                    '&type='+ name
            });
        },
    },
    ready: function () {
        console.log(this.properties, '进入base-info')
    }
});