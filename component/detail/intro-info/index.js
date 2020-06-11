Component({
    /**
     * 组件的属性列表
     */
    properties: {
        desc: { //描述
            type: String,
            value: ''
        },
        title: { //标题
            type: String,
            value: ''
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        toggleParams: {
            flag: null, // 0为收起，1为展开
            show: null // 有展开
        }
    },
    methods: {
        // desc数据处理
        fliterDesc: function () {
            let houseDesc;
            // 房源描述的分段
            if (this.properties.desc) {
                houseDesc = this.properties.desc.split(/[\s\n]/);
                for (var i = 0; i < houseDesc.length; i++) {
                    if (houseDesc[i] == undefined || houseDesc[i] === '') {
                        houseDesc.splice(i, 1);
                        i = i - 1;
                    }
                }
            } else {
                houseDesc = '';
            }

            if (houseDesc.length > 7) {
                this.setData({
                    toggleParams: {
                        flag: 1,
                        show: true
                    }
                });
            }

            this.setData({
                houseDesc: houseDesc
            });
        },
        //展开收起
        handleToggleShow: function () {
            const {
                flag
            } = this.data.toggleParams;

            this.setData({
                toggleParams: {
                    flag: flag === 0 ? 1 : 0,
                    show: true
                }
            });
        },
    },
    /**
     * 组件的方法列表
     */
    ready: function () {
        console.log(this.properties, '进入intro-info')
        this.fliterDesc();
    }
});