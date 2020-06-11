// component/personal/list-item/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        listItem: {
            type: Object,
            value: ''
        },
        detailType: {
            type: String,
            value: 'house'
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
        toDetail: function(e) {
            // 需要做判断，已下架不能点击
            wx.navigateTo({
                url:
                    '../../detail/index/index?detailType=' +
                    this.data.detailType +
                    '&id=' +
                    e.currentTarget.dataset.id
            });
        }
    }
});
