Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: []
        },
        type: {
            type: String,
            value: 'apart'
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        typeIcon: [],
        // type 整租(intact)，合租(combine)，公寓(flat)， 公寓下面的房源（apart）
        alloctaionIcon: [{
                type: 'intact',
                list: [{
                        name: '床',
                        hasicon: 'icon-renting-bed@2x.png',
                        noicon: 'icon-renting-bed-ash@2x.png',
                        nickname: 'BED',
                        has: false
                    },
                    {
                        name: '衣柜',
                        hasicon: 'icon-renting-wardrobe@2x.png',
                        noicon: 'icon-renting-wardrobe-ash@2x.png',
                        nickname: 'CLOSET',
                        has: false
                    },
                    {
                        name: '空调',
                        hasicon: 'icon-renting-air conditioner@2x.png',
                        noicon: 'icon-renting-air conditioner-ash@2x.png',
                        nickname: 'AIRCONDITIONER',
                        has: false
                    },
                    {
                        name: '电视',
                        hasicon: 'icon-renting-tv@2x.png',
                        noicon: 'icon-renting-tv-ash@2x.png',
                        nickname: 'TV',
                        has: false
                    },
                    {
                        name: '冰箱',
                        hasicon: 'icon-renting-refrigerator@2x.png',
                        noicon: 'icon-renting-refrigerator-ash@2x.png',
                        nickname: 'REFRIGERATOR',
                        has: false
                    },
                    {
                        name: '宽带',
                        hasicon: 'icon-renting-broadband@2x.png',
                        noicon: 'icon-renting-broadband-ash@2x.png',
                        nickname: 'BROADBAND',
                        has: false
                    },
                    {
                        name: '热水器',
                        hasicon: 'icon-renting-heater@2x.png',
                        noicon: 'icon-renting-heater-ash@2x.png',
                        nickname: 'CALORIFIER',
                        has: false
                    },
                    {
                        name: '洗衣机',
                        hasicon: 'icon-renting-washing machine@2x.png',
                        noicon: 'icon-renting-washing machine-ash@2x.png',
                        nickname: 'WASHER',
                        has: false
                    },
                    {
                        name: '天然气',
                        hasicon: 'icon-renting-natural gas@2x.png',
                        noicon: 'icon-renting-natural gas-ash@2x.png',
                        nickname: 'NATURALGAS',
                        has: false
                    }
                ]
            },
            {
                type: 'combine',
                list: [{
                        name: '床',
                        hasicon: 'icon-renting-bed@2x.png',
                        noicon: 'icon-renting-bed-ash@2x.png',
                        nickname: 'BED',
                        has: false
                    },
                    {
                        name: '衣柜',
                        hasicon: 'icon-renting-wardrobe@2x.png',
                        noicon: 'icon-renting-wardrobe-ash@2x.png',
                        nickname: 'CLOSET',
                        has: false
                    },
                    {
                        name: '书桌',
                        hasicon: 'icon-renting-desk@2x.png',
                        noicon: 'icon-renting-desk-ash@2x.png',
                        nickname: 'DESK',
                        has: false
                    },
                    {
                        name: '空调',
                        hasicon: 'icon-renting-air conditioner@2x.png',
                        noicon: 'icon-renting-air conditioner-ash@2x.png',
                        nickname: 'AIRCONDITIONER',
                        has: false
                    },
                    {
                        name: '冰箱',
                        hasicon: 'icon-renting-refrigerator@2x.png',
                        noicon: 'icon-renting-refrigerator-ash@2x.png',
                        nickname: 'REFRIGERATOR',
                        has: false
                    },
                    {
                        name: '热水器',
                        hasicon: 'icon-renting-heater@2x.png',
                        noicon: 'icon-renting-heater-ash@2x.png',
                        nickname: 'CALORIFIER',
                        has: false
                    },
                    {
                        name: '洗衣机',
                        hasicon: 'icon-renting-washing machine@2x.png',
                        noicon: 'icon-renting-washing machine-ash@2x.png',
                        nickname: 'WASHER',
                        has: false
                    },
                    {
                        name: '智能锁',
                        hasicon: 'icon-renting-lock@2x.png',
                        noicon: 'icon-renting-lock-ash@2x.png',
                        nickname: '',
                        has: false
                    },
                    {
                        name: '油烟机',
                        hasicon: 'icon-renting-range hood@2x.png',
                        noicon: 'icon-renting-range hood-ash@2x.png',
                        nickname: '',
                        has: false
                    },
                    {
                        name: '微波炉',
                        hasicon: 'icon-renting-microwave oven@2x.png',
                        noicon: 'icon-renting-microwave oven-ash@2x.png',
                        nickname: '',
                        has: false
                    },
                    {
                        name: '燃气灶',
                        hasicon: 'icon-renting-gas stove@2x.png',
                        noicon: 'icon-renting-gas stove-ash@2x.png',
                        nickname: '',
                        has: false
                    }
                ]
            },
            {
                type: 'flat',
                list: [{
                        name: '地铁',
                        hasicon: 'icon-renting-metro@2x.png',
                        noicon: 'icon-renting-metro-ash@2x.png',
                        nickname: '',
                        has: false
                    },
                    {
                        name: '电梯',
                        hasicon: 'icon-renting-elevator@2x.png',
                        noicon: 'icon-renting-elevator-ash@2x.png',
                        nickname: '',
                        has: false
                    },
                    {
                        name: '便利店',
                        hasicon: 'icon-renting-store@2x.png',
                        noicon: 'icon-renting-store-ash@2x.png',
                        nickname: '',
                        has: false
                    },
                    {
                        name: '停车场',
                        hasicon: 'icon-renting-parking lot@2x.png',
                        noicon: 'icon-renting-parking lot-ash@2x.png',
                        nickname: '',
                        has: false
                    },
                    {
                        name: '健身房',
                        hasicon: 'icon-renting-gym@2x.png',
                        noicon: 'icon-renting-gym-ash@2x.png',
                        nickname: '',
                        has: false
                    },
                    {
                        name: '活动场地',
                        hasicon: 'icon-renting-activity@2x.png',
                        noicon: 'icon-renting-activity-ash@2x.png',
                        nickname: '',
                        has: false
                    },
                    {
                        name: '安全监控',
                        hasicon: 'icon-renting-monitor@2x.png',
                        noicon: 'icon-renting-monitor-ash@2x.png',
                        nickname: '',
                        has: false
                    },
                    {
                        name: '书吧',
                        hasicon: 'icon-renting-book bar@2x.png',
                        noicon: 'icon-renting-book bar-ash@2x.png',
                        nickname: '',
                        has: false
                    },
                    {
                        name: '吧台',
                        hasicon: 'icon-renting-bar counter@2x.png',
                        noicon: 'icon-renting-bar counter-ash@2x.png',
                        nickname: '',
                        has: false
                    }
                ]
            },
            {
                type: 'apart',
                list: [{
                        name: '床',
                        hasicon: 'icon-renting-bed@2x.png',
                        noicon: 'icon-renting-bed-ash@2x.png',
                        nickname: 'BED',
                        has: false
                    },
                    {
                        name: '衣柜',
                        hasicon: 'icon-renting-wardrobe@2x.png',
                        noicon: 'icon-renting-wardrobe-ash@2x.png',
                        nickname: 'CLOSET',
                        has: false
                    },
                    {
                        name: '空调',
                        hasicon: 'icon-renting-air conditioner@2x.png',
                        noicon: 'icon-renting-air conditioner-ash@2x.png',
                        nickname: 'AIRCONDITIONER',
                        has: false
                    },
                    {
                        name: '电视',
                        hasicon: 'icon-renting-tv@2x.png',
                        noicon: 'icon-renting-tv-ash@2x.png',
                        nickname: 'TV',
                        has: false
                    },
                    {
                        name: '冰箱',
                        hasicon: 'icon-renting-refrigerator@2x.png',
                        noicon: 'icon-renting-refrigerator-ash@2x.png',
                        nickname: 'REFRIGERATOR',
                        has: false
                    },
                    {
                        name: '宽带',
                        hasicon: 'icon-renting-broadband@2x.png',
                        noicon: 'icon-renting-broadband-ash@2x.png',
                        nickname: 'BROADBAND',
                        has: false
                    },
                    {
                        name: '热水器',
                        hasicon: 'icon-renting-heater@2x.png',
                        noicon: 'icon-renting-heater-ash@2x.png',
                        nickname: 'CALORIFIER',
                        has: false
                    },
                    {
                        name: '洗衣机',
                        hasicon: 'icon-renting-washing machine@2x.png',
                        noicon: 'icon-renting-washing machine-ash@2x.png',
                        nickname: 'WASHER',
                        has: false
                    },
                    {
                        name: '天然气',
                        hasicon: 'icon-renting-natural gas@2x.png',
                        noicon: 'icon-renting-natural gas-ash@2x.png',
                        nickname: 'NATURALGAS',
                        has: false
                    }
                ]
            }
        ],
    },
    methods: {
        initData: function () {
            let hasDevice = this.properties.list || [];
            let item = this.data.alloctaionIcon.filter(
                item => item.type === this.properties.type
            );
            if (hasDevice.length > 0) {
                let list = item[0].list;
                for (let i in hasDevice) {
                    for (let j in list) {
                        if (list[j].name === hasDevice[i]) {
                            list[j].has = true;
                        }
                    }
                }
                item[0].list = list;
            }
            this.setData({
                typeIcon: item
            })
        }
    },
    /**
     * 组件的方法列表
     */
    ready: function () {
        console.log(this.properties, '进入devoce-box')
        this.initData()
    }
});