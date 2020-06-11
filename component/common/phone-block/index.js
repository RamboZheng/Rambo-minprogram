Component({
    /**
     * 组件的属性列表
     */
    properties: {
        number: {
            type: String,
            value: ''
        },
        showBlock: {
            type: Boolean,
            value: false
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
        // 拨号
        callIn: function () {
            let phone = this.properties.number;
            wx.makePhoneCall({
                phoneNumber: phone,
                success: result => {},
                fail: () => {},
                complete: () => {
                    console.log('call++++++++++++');
                }
            });
        },
        cancelPhone: function () {
            this.triggerEvent('cancel', {
                showPhone: false
            });
        },

    },
    ready: function () {
        console.log(this.properties, '进入phone-block')
    }
});