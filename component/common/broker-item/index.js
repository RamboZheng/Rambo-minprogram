Component({
    /**
     * 组件的属性列表
     */
    properties: {
        type: { //item类型
            type: String,
            value: 'view'
        },
        info: { //传入信息
            type: Object,
            value: {}
        },
    },

    /**
     * 组件的初始数据
     */
    data: {},
    /**
     * 组件的方法列表
     */
    methods: {
        // 拨打电话实现功能
        callIn: function (e) {
            let phone = e.currentTarget.dataset['phone'];
            if (phone) {
                wx.makePhoneCall({
                    phoneNumber: phone,
                    success: result => {},
                    fail: () => {},
                    complete: () => {}
                });
            } else {
                wx.showToast({
                    title: '联系人手机号不存在',
                    icon: 'none',
                    duration: 2000
                });
            }

        },
        // 跳转经纪人详情
        toBrokerDetail: function (e) {
            wx.navigateTo({
                url: '../../detail/brokerDetail/index?brokerId=' + e.currentTarget.dataset.id
            });
        },
    },
    ready: function () {
        console.log(this.properties, '进入broker-item')
    }
});