Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        itemTo: {
            type: String,
            value: 'garden'
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    methods: {
        // 房源的跳转
        handleRecommend: function (e) {
            let id = e.currentTarget.dataset['id'];
            if (this.properties.itemTo == 'garden') {
                wx.navigateTo({
                    url: '../../detail/moduleDetail/index?detailType=' +
                        this.properties.itemTo +
                        '&id=' +
                        id
                });
            }
        },
    },
    /**
     * 组件的方法列表
     */
    ready: function () {
        console.log(this.properties, '进入abeam-list')
    }
});