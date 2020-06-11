var QQMapWX = require('../../../lib/qqmap-wx-jssdk.js');

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        address: {
            type: String,
            value: '暂无数据'
        },
        longitude: {
            type: String,
            value: ''
        },
        latitude: {
            type: String,
            value: ''
        },
        region: {
            type: String,
            value: '暂无数据'
        },
        name: {
            type: String,
            value: '暂无数据'
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        markers: {}
    },
    methods: {
        getMapAddress: function () {
            let latitude = this.properties.latitude;
            let longitude = this.properties.longitude;
            let that = this;
            let QMap = new QQMapWX({
                key: 'ZJIBZ-QNB3P-L2WDE-LGLK2-4Z3JH-WXFBH' // 必填
            });

            QMap.reverseGeocoder({
                location: {
                    latitude: latitude,
                    longitude: longitude
                },
                coord_type: 3,
                success: function (res) {
                    var market = [{
                        iconPath: '../../../image/common/icon-location@3x.png',
                        longitude: res.result.location.lng,
                        latitude: res.result.location.lat,
                        id: 'map',
                        width: 16,
                        height: 16
                    }];
                    that.setData({
                        longitude: res.result.location.lng,
                        latitude: res.result.location.lat,
                        markers: market,
                        houseUrl: res.result.address_component.province +
                            res.result.address_component.city +
                            res.result.formatted_addresses.rough
                    });
                }
            });
        },
        toSetMap: function () {
            wx.navigateTo({
                url: '../setMap/index?longitude=' +
                    this.properties.longitude +
                    '&latitude=' +
                    this.properties.latitude
            });
        }
    },
    /**
     * 组件的方法列表
     */
    ready: function () {
        console.log(this.properties, '进入map')
        this.getMapAddress();
    }
});