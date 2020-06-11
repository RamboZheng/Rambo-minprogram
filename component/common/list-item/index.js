let WxParse = require('../../wxParse/wxParse');
let global = require('../../../utils/global.js');
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
        },
        needTips: {
            type: Boolean,
            value: true
        },
        price: {
            type: String,
            value: ''
        },
        showBorder: { // 是否展示底边框
            type: Boolean,
            value: true
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        looked: false, // 默认未浏览过
        unitPrice: '',
        newGardenName: '',
        emptyImg: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/img-238pic-default@2x.png'
    },
    /**
     * 组件的方法列表
     */
    //事件处理函数
    methods: {
        toDetail: function (e) {
            this.makeFootPrints(e.currentTarget.dataset.id)
            // 需要做判断，已下架不能点击
            wx.navigateTo({
                url: '/pages/detail/index/index?detailType=house&id=' +
                    e.currentTarget.dataset.id
            });
        },
        // 去往模块化详情页（小区列表、公寓列表、学校列表）
        toModuleDetail: function (e) {
            this.makeFootPrints(e.currentTarget.dataset.id)
            wx.navigateTo({
                url: '/pages/detail/moduleDetail/index?detailType=' +
                    this.data.detailType +
                    '&id=' +
                    e.currentTarget.dataset.id
            });

        },
        toRentDetail: function (e) {
            this.makeFootPrints(e.currentTarget.dataset.id)
            let newType = this.data.detailType;
            // 租房情况下要给详情传递type类型是后端返回的
            if (
                newType == 'rent' ||
                newType == 'combine' ||
                newType == 'intact'
            ) {
                newType = e.currentTarget.dataset.type || 'SHARED_RENT';
            }
            wx.navigateTo({
                url: '/pages/detail/rentDetail/index?detailType=' +
                    newType +
                    '&id=' +
                    e.currentTarget.dataset.id
            });
        },
        // 记录浏览足迹
        makeFootPrints: function (id) {
            this.setData({
                looked: true
            });
            let footArr = wx.getStorageSync(global.STORE.FOOT_PRINTS) || [];
            footArr.push(id)
            wx.setStorageSync(global.STORE.FOOT_PRINTS, footArr);
        },
        //清洗单位
        clearData: function () {
            let unitPrice = this.data.price;
            let newUnitPrice = unitPrice.replace(/[元/㎡]/g, '');
            this.setData({
                unitPrice: newUnitPrice
            });
            // console.log(this.data.unitPrice);
        }
    },
    ready: function () {
        const that = this;
        if (this.data.listItem.brand && this.data.listItem.name) {
            WxParse.wxParse(
                'titleH5',
                'html',
                this.data.listItem.brand + ' · ' + this.data.listItem.name,
                that,
                5
            );
        } else if (this.data.listItem.title) {
            WxParse.wxParse(
                'titleH5',
                'html',
                this.data.listItem.title,
                that,
                5
            );
            if (this.data.listItem.gardenName) {
                WxParse.wxParse(
                    'gardenNameA',
                    'html',
                    this.data.listItem.gardenName,
                    that,
                    5
                );
            }
        } else if (this.data.listItem.schooleName) {
            WxParse.wxParse(
                'schoolName',
                'html',
                this.data.listItem.schooleName,
                that,
                5
            );
        } else {
            WxParse.wxParse(
                'titleH5',
                'html',
                this.data.listItem.gardenName,
                that,
                5
            );
        }
        if (this.data.listItem.gardenName) {
            let garden = this.data.listItem.gardenName.replace("<em>", '')
            this.setData({
                newGardenName: garden.replace("</em>", '')
            })
        }
        this.clearData();
        // * 1.bindName绑定的数据名(必填)
        // * 2.type可以为html或者md(必填)
        // * 3.data为传入的具体数据(必填)
        // * 4.target为Page对象,一般为this(必填)
        // * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)

        let footArr = wx.getStorageSync(global.STORE.FOOT_PRINTS) || [];
        // 遍历是否浏览过
        if (footArr.length > 0) {
            for (let item of footArr) {
                if (this.properties.detailType == 'flat') {
                    if (item == this.data.listItem.outNetId) {
                        this.setData({
                            looked: true
                        })
                    }
                } else if (this.properties.detailType == 'family') {
                    if (item == this.data.listItem.websiteHouseId) {
                        this.setData({
                            looked: true
                        })
                    }
                } else {
                    if (item == this.data.listItem.id) {
                        this.setData({
                            looked: true
                        })
                    }
                }

            }
        }
    }
});