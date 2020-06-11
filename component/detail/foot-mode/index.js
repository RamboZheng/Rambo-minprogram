Component({
    /**
     * 组件的属性列表
     */
    properties: {
        type: { //item类型
            type: String,
            value: 'house'
        },
        isCollect: { //item类型
            type: String,
            value: '1'
        },
        infoList: { //经纪人列表
            type: Array,
            value: []
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        showSingle: true // 经纪人底部组件是否展示一个
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 拨打电话实现功能
        callIn(e) {
            let phone = e.currentTarget.dataset['phone'];
            wx.makePhoneCall({
                phoneNumber: phone,
                success: result => {},
                fail: () => {},
                complete: () => {}
            });
        },
        // 跳转经纪人详情
        toBrokerDetail(e) {
            wx.navigateTo({
                url: '../../detail/brokerDetail/index?brokerId=' + e.currentTarget.dataset.id
            });
        },
        // 显示更多的经纪人电话
        showAll() {
            let ctx = this;
            this.setData({
                showSingle: !ctx.data.showSingle
            });
        },
        //经纪人详情底部按钮触发
        triggerItem(e) {
            this.triggerEvent('triggerFoot', {
                footType: e.currentTarget.dataset.type
            })
        }
    },
    ready() {
        console.log(this.properties, '进入foot-mode')
    }
});