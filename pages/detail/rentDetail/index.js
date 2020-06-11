const app = getApp();
let global = require('../../../utils/global.js');
// let bmap = require('../../../lib/bmap-wx.min.js');
var QQMapWX = require('../../../lib/qqmap-wx-jssdk.js');


Page({
    data: {
        detailType: 'combine',
        userInfo: {},
        hasUserInfo: false, // 是否已经登录了
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        id: '10902419',
        houseImages: [],
        bannerImgUrl: [],
        typeIcon: [],
        // type 整租(intact)，合租(combine)，公寓(flat)， 公寓下面的房源（family）
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
                type: 'family',
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
        houseInfo: {}, //房源的信息
        agents: [], //经纪人
        longitude: null,
        latitude: null,
        houseUrl: '', // 地址
        isShare: 0, //是否为分享
        similarItem: [], // 相似房源列表
        isCollection: false,
        toggleParams: {
            flag: null, // 0为收起，1为展开
            show: null // 有展开
        },
        subwayInfo: {},
        subwayLine: [], //地铁线
        houseDesc: [],
        houseRoomsInfo: [],
        showLayer: false,
        loading: false,
        // 公寓下面的户型
        dataBaseList: [], //备用的数据
        remarkNum: 0,
        flatPage: 1,
        flatTypeOn: 0,
        flatTypeHouse: ['全部', '一居', '二居+'],
        flatHouse: {
            item: [],
            total: ''
        },
        debugId: false,
        noData: false
    },
    onLoad: function (options) {
        let type =
            options.detailType === 'SHARED_RENT' ?
            'combine' :
            options.detailType === 'ENTIRE_RENT' ?
            'intact' :
            options.detailType === 'flat' ?
            'flat' :
            'family';
        let isShare = options.isShare;
        let id = options.id;
        let bool = false;

        let scene = decodeURIComponent(options.scene);
        if (scene === 'undefined') {} else {
            // 经纪人邀请用户进入详情的情况
            if (scene.substring(0, 1) == 'P') {
                scene = scene.substring(12);
            }
            // 通过二维码扫码
            let typeReg = /[a-z][a-z]*/g;
            let idReg = /[1-9][0-9]*/g;
            type = scene.match(typeReg)[0];
            id = scene.match(idReg)[0];
            isShare = 1;
        }

        // 标题
        let pageTitle = '';
        if (type === 'intact') {
            pageTitle = '整租详情';
        } else if (type === 'combine') {
            pageTitle = '合租详情';
        } else if (type === 'flat') {
            pageTitle = '公寓详情';
        } else {
            pageTitle = '房源详情';
        }
        wx.setNavigationBarTitle({
            title: pageTitle
        });

        let userInfo = wx.getStorageSync(global.STORE.BAIDU_USERINFO);
        if (userInfo.hasOwnProperty('userId')) {
            bool = true;
        }

        this.setData({
            hasUserInfo: bool,
            detailType: type,
            id: id,
            debugId: app.globalData.debugId, // 获取全局 是否调试模式展示id
            isShare: isShare
        });
        this.getForDetail();
    },
    getForDetail: function () {
        let data = {
            websiteHouseId: this.data.id
        };
        let type = this.data.detailType;
        let url = global.URL.GET_RENT_HOUSE_DETAIL;

        if (type === 'combine') {
            // 合租
            url = global.URL.GET_RENT_HOUSE_SHARE_DETAIL;
        }

        if (type === 'flat') {
            // 公寓详情
            url = global.URL.GET_RENT_APARTMENT_DETAIL;
            data = {
                outNetId: this.data.id
            };
            // let len = res.data.tabList.length;
            // if (len > 0) {
            //     this.getApartmentList(3);
            // }
        }
        if (type === 'family') {
            url = global.URL.GET_RENT_APARTMENT_HOUSE_DETAIL;
        }

        global.requestGet(url, data, res => {
            let result = res.data;
            // 已有的设备
            let hasDevice = res.data.house.facilities || [];
            let item = this.data.alloctaionIcon.filter(
                item => item.type === type
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
            let flatNewData = {};
            // 是公寓的时候不请求
            if (type !== 'flat') {
                let gardenId =
                    type === 'flat' ?
                    this.data.id :
                    type === 'family' ?
                    result.house.parentId :
                    result.house.gardenId;
                this.getMetroInfo(gardenId, result.house);
            } else {
                flatNewData = {
                    longitude: res.data.house.longitude,
                    latitude: res.data.house.latitude,
                    subwayInfo: {
                        distance: null,
                        faddress: null,
                        flineno: null,
                        gardenName: res.data.house.brand,
                        regionName: res.data.house.region || res.data.house.bizArea
                    },
                    flatTypeHouse: res.data.tabList,
                    flatTypeOn: res.data.tabList.length > 0 ? res.data.tabList[0].id : 0
                };
            }

            let houseDesc;
            // 房源描述的分段
            if (result.house.desc) {
                houseDesc = result.house.desc.split(/[\s\n]/);
                for (var i = 0; i < houseDesc.length; i++) {
                    if (houseDesc[i] == undefined || houseDesc[i] === '') {
                        houseDesc.splice(i, 1);
                        i = i - 1;
                    }
                }
            } else {
                houseDesc = '';
            }

            // 背景图片
            let imgArrList = [];
            let imgs = result.houseImages;
            for (let i in imgs) {
                let name = imgs[i].imageType;
                let imgList = {
                    imgUrl: imgs[i].url +
                        '?x-oss-process=image/resize,m_lfit,h_750,w_420',
                    parent: name
                };
                // 查找是否存在这个参数
                let index = imgArrList.findIndex(item => item.name === name);
                if (index > -1) {
                    let newArr = imgArrList[index].imgList;
                    newArr.push(imgList);
                } else {
                    let arr = [];
                    arr.push(imgList);
                    let obj = {
                        name: name,
                        imgList: arr
                    };
                    imgArrList.push(obj);
                }
            }

            if (res.success) {
                this.setData({
                        houseInfo: result.house,
                        houseImages: imgArrList,
                        agents: result.brokers,
                        typeIcon: item,
                        isCollection: result.hasCollect,
                        houseRoomsInfo: result.houseRooms,
                        houseDesc: houseDesc,
                        loading: true,
                        ...flatNewData
                    },
                    () => {
                        this.manageImg();
                        if (result.house.desc) {
                            this.checkRemarkToggle();
                        }
                        if (type === 'flat') {
                            this.getMapAddress();
                            let len = res.data.tabList.length;
                            if (len > 0) {
                                this.getApartmentList(3);
                            }
                        }
                    }
                );
            } else {
                this.setData({
                    noData: true
                });
            }
        });
    },
    // 跳转品牌列表
    toBrandList: function (e) {
        wx.navigateTo({
            url: '../../homePage/brandList/index?brandId=' + this.data.houseInfo.brandId + '&name=' + e.currentTarget.dataset.name
        });
    },
    manageImg: function () {
        let houseImages = this.data.houseImages;
        let imgs = [];
        for (let i in houseImages) {
            let list = houseImages[i].imgList;
            for (let j in list) {
                let data = list[j];
                data['cType'] = i;
                imgs.push(data);
            }
        }
        this.setData({
            bannerImgUrl: imgs
        });
    },
    getMapAddress: function () {
        let latitude = this.data.latitude;
        let longitude = this.data.longitude;
        var that = this;
        var QMap = new QQMapWX({
            key: 'ZJIBZ-QNB3P-L2WDE-LGLK2-4Z3JH-WXFBH' // 必填
        });

        QMap.reverseGeocoder({
            location: {
                latitude: latitude,
                longitude: longitude
            },
            coord_type: 3,
            success: function (res) {
                var location = res.result.ad_info.location;
                var market = [{
                    iconPath: '../../../image/common/icon-location@3x.png',
                    /* longitude: location.lng,
                    latitude: location.lat, */
                    longitude: res.result.location.lng,
                    latitude: res.result.location.lat,
                    id: 'map',
                    width: 16,
                    height: 16
                }];
                that.setData({
                    /* latitude: location.lat,
                    longitude: location.lng, */
                    longitude: res.result.location.lng,
                    latitude: res.result.location.lat,
                    markers: market,
                    houseUrl: res.result.address_component.province +
                        res.result.address_component.city +
                        res.result.formatted_addresses.rough
                });
            }
        });

        /*
        var BMap = new bmap.BMapWX({
            ak: app.globalData.ak
        });

        var fail = function(data) {
            console.log(data, 'faiil');
        };
        var success = function(data) {
            // console.log(data, '地址');
            wxMarkerData = data.wxMarkerData;
            that.setData({
                markers: wxMarkerData,
                latitude: wxMarkerData[0].latitude,
                longitude: wxMarkerData[0].longitude,
                houseUrl:
                    wxMarkerData[0].address + ' (' + wxMarkerData[0].desc + ')'
            });
        };
        let latitude = this.data.latitude;
        let longitude = this.data.longitude;

        BMap.regeocoding({
            location: `${latitude},${longitude}`,
            iconPath: '../../../image/common/icon-location@3x.png',
            fail: fail,
            width: 16,
            height: 16,
            success: success
        });
        */
    },
    resembleHouse: function (address, info) {
        // 相似房源
        let detailType = this.data.detailType;
        let url = global.URL.GET_RENT_HOUSE_SIMILARS;
        let type = '';
        switch (detailType) {
            case 'intact':
                type = 0;
                break;
            case 'combine':
                type = 1;
                break;
            case 'family':
                type = 2;
                break;
            default:
                type = 0;
        }
        let data = {
            gardenLongitude: address.gardenLongitude,
            gardenLatitude: address.gardenLatitude,
            websiteHouseId: this.data.id,
            tenementType: type
        };
        if (detailType === 'combine') {
            data.minPrice = info.minPrice;
            data.maxPrice = info.maxPrice;
        }
        if (detailType === 'intact') {
            data.bedRoom = info.bedRoom;
        }
        /*
         * 整租相似房源 推荐周边3km内，同价格、同户型、同面积的房源
         * 合租像是房源 推荐周边3km内，同价格、同面积的房源
         */
        /* if (detailType === 'intact') {
            data = {
                gardenLongitude: address.gardenLongitude,
                gardenLatitude: address.gardenLatitude,
                minPrice: info.minPrice,
                maxPrice: info.maxPrice,
                maxRoomArea: info.maxRoomArea,
                minRoomArea: info.minRoomArea,
                bedRoom: info.bedRoom,
                livingRoom: info.livingRoom,
                kitchen: info.kitchen,
                bathRoom: info.bathRoom
            };
        } else {
            data = {
                gardenLongitude: address.gardenLongitude,
                gardenLatitude: address.gardenLatitude,
                minPrice: info.minPrice,
                maxPrice: info.maxPrice,
                maxRoomArea: info.maxRoomArea,
                minRoomArea: info.minRoomArea,
                bedRoom: info.bedRoom,
                livingRoom: info.livingRoom,
                kitchen: info.kitchen,
                bathRoom: info.bathRoom
            };
        } */
        global.requestGet(url, data, res => {
            if (res.success) {
                this.setData({
                    similarItem: res.data.items
                });
            } else {
                console.log(res);
            }
        });
    },
    // 收藏以及取消收藏
    handleRentCollect: function () {
        // 收藏房源
        let url = global.URL.POST_RENT_HOUSE_COLLECT;
        let {
            detailType
        } = this.data;
        //0整租1合租2公寓3户型
        // type 整租(intact)，合租(combine)，公寓(flat)， 公寓下面的房源（family）
        // let type = detailType === 'flat' ? 1 : detailType === 'family' ? 2 : 0;
        let type = '';
        switch (detailType) {
            case 'intact':
                type = 0;
                break;
            case 'combine':
                type = 1;
                break;
            case 'flat':
                type = 2;
                break;
            case 'family':
                type = 3;
                break;
            default:
                type = 0;
        }

        let data = {
            websiteHouseId: this.data.id,
            source: 0,
            houseType: type
        };
        if (this.data.isCollection) {
            // 取消收藏房源
            url = global.URL.POST_RENT_HOUSE_UNCOLLECT;
        }

        global.requestPost(url, data, res => {
            // console.log(res);
            if (res.success) {
                if (this.data.isCollection) {
                    wx.showToast({
                        title: '取消收藏',
                        icon: 'success',
                        duration: 1500,
                        mask: true
                    });
                } else {
                    wx.showToast({
                        title: res.message,
                        icon: 'success',
                        duration: 1500,
                        mask: true
                    });
                }

                this.setData({
                    isCollection: !this.data.isCollection
                });
            } else {
                wx.showToast({
                    title: res.message,
                    icon: none,
                    duration: 1500,
                    mask: true
                });
            }
        });
    },
    // 拨打电话实现功能
    callIn: function (e) {
        let phone = e.currentTarget.dataset['phone'];
        if (!phone) {
            return;
        }
        wx.makePhoneCall({
            phoneNumber: phone,
            success: result => {},
            fail: () => {},
            complete: () => {
                console.log('22');
            }
        });
    },
    toSetMap: function () {
        wx.navigateTo({
            url: '../setMap/index?longitude=' +
                this.data.longitude +
                '&latitude=' +
                this.data.latitude
        });
    },
    // 登录
    getUserInfo: function (e) {
        let that = this;
        if (e.detail.errMsg === 'getPhoneNumber:fail user deny') {
            return;
        } else {
            global.login(
                e,
                app.globalData.agentPhone,
                wx.getStorageSync(global.STORE.LOGIN_CODE),
                () => {
                    console.log('验证成功++++++++++');
                    app.globalData.token = wx.getStorageSync(
                        global.STORE.BAIDU_TOKEN
                    );
                    that.setData({
                            hasUserInfo: true
                        },
                        () => {
                            let {
                                detailType,
                                id
                            } = this.data;
                            this.hasWathch(detailType, id);
                        }
                    );
                }
            );
        }
    },
    handleGoHome: function () {
        // 回首页
        wx.reLaunch({
            url: '/pages/homePage/index/index'
        });
    },
    // 附近地铁站信息
    getMetroInfo: function (id, houseInfo) {
        let url = global.URL.GET_RENT_HOUSE_SUBWAY;
        /* let data = {
            longitude: longitude,
            latitude: latitude,    

            distance: 1
        }; */
        let data = {
            gardenId: id
        };
        if (this.data.detailType === 'family') {
            url = global.URL.GET_RENT_APARTMENT_SUBWAYGEO;
            data = {
                parentId: id
            };
        }
        global.requestGet(url, data, res => {
            if (res.success) {
                let data = res.data;
                data.distance = Math.ceil(data.distance);
                let time = this.computedTime(data.distance);
                data.time = time;

                let type = this.data.detailType;

                if (type === 'intact' || type === 'combine') {
                    // 整租和合租有相似房源
                    this.resembleHouse(data, houseInfo);
                }

                this.setData({
                        subwayInfo: data,
                        longitude: res.data.gardenLongitude,
                        latitude: res.data.gardenLatitude
                    },
                    () => {
                        this.getMapAddress();
                    }
                );
            }
        });
    },
    checkRemarkToggle: function () {
        let that = this;
        let query = wx.createSelectorQuery();
        query.select('.intro').boundingClientRect();
        query.exec(function (res) {
            let height = res[0].height;
            if (height > 290) {
                that.setData({
                    toggleParams: {
                        flag: 1,
                        show: true
                    }
                });
            }
        });
    },
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
    // 计算时间
    computedTime: function (total) {
        let time = Math.ceil(total / 60);
        if (time > 60) {
            let hourse = Math.floor(time / 60);
            let minute = time % 60;
            return hourse + '小时' + minute + '分钟';
        } else {
            return time + '分钟';
        }
    },
    getMetroList: function (data) {
        let url = global.URL.GET_FLATS_CONDITION;
        global.requestGet(url, '', res => {
            if (res.success) {
                let data = res.data;
                let name = '地铁';
                for (let i in data) {
                    if (data[i].name === name) {
                        this.setData({
                            subwayLine: data[i]
                        });
                    }
                }
            }
        });
    },
    getApartmentList: function (type) {
        // 公寓的再租房源
        const url = global.URL.GET_RENT_APARTMENT_HOUSE_LLIST;
        let data = {
            outNetId: this.data.id,
            currentPage: this.data.flatPage,
            pageSize: 5,
            bedRooms: this.data.flatTypeOn
        };
        global.requestGet(url, data, res => {
            if (res.success) {
                if (this.data.flatPage > 1) {
                    let newData = res.data.items;
                    let oldData = this.data.dataBaseList;
                    let combineData = newData.concat(oldData);
                    let deepCopyData = JSON.parse(JSON.stringify(combineData));
                    let num = 3 + (this.data.flatPage - 1) * 5;

                    let showData = combineData.slice(0, num);

                    this.setData({
                        flatHouse: {
                            total: res.data.recordTotal,
                            item: showData
                        },
                        dataBaseList: deepCopyData,
                        remarkNum: num
                    });
                } else {
                    let standbyData = res.data.items;
                    let showData = res.data.items.slice(0, 3);
                    this.setData({
                        dataBaseList: standbyData,
                        flatHouse: {
                            total: res.data.recordTotal,
                            item: showData
                        },
                        remarkNum: 3
                    });
                }
            }
        });
    },
    handleTabList: function (e) {
        // 再租房源的tab切换
        let index = e.currentTarget.dataset['tid'];
        // console.log(index)
        this.setData({
                flatPage: 1,
                flatTypeOn: index,
                remarkNum: 3,
                dataBaseList: [],
                flatHouse: {
                    item: [],
                    total: 0
                }
            },
            () => {
                this.getApartmentList(3);
            }
        );
    },
    handleMoreList: function () {
        let {
            remarkNum,
            flatHouse: {
                total,
                item
            }
        } = this.data;
        let dataBase = this.data.dataBaseList;

        if (remarkNum >= total) {
            let database = item.slice(0, 3);
            this.setData({
                flatHouse: {
                    item: database,
                    total: total
                },
                remarkNum: 3
            });
            return;
        }

        // 再租房源的查看更多
        this.setData({
                flatPage: this.data.flatPage + 1
            },
            () => {
                let num = 3 + (this.data.flatPage - 1) * 5;
                if (total == dataBase.length || dataBase.length > num) {
                    let deepCopyData = JSON.parse(JSON.stringify(dataBase));
                    let showData = deepCopyData.slice(0, num);
                    this.setData({
                        flatHouse: {
                            item: showData,
                            total: total
                        },
                        remarkNum: num
                    });
                    return;
                }
                this.getApartmentList(5);
            }
        );
    },
    // 公寓详情跳转在租房型
    toApartDeatil: function (e) {
        let id = e.currentTarget.dataset['id'];
        let type = e.currentTarget.dataset['type'];
        wx.navigateTo({
            url: '../../detail/moduleDetail/index?detailType=' + type + '&id=' + id
        });
    },
    handleJumpDetail: function (e) {
        let id = e.currentTarget.dataset['id'];
        let type = e.currentTarget.dataset['type'];
        // let detailType =
        //     type === '合租' ? 'combine' : type === '整租' ? 'intact' : 'family';
        /* let detailType =
            type === 'SHARED_RENT' ?
            'combine' :
            type === 'ENTIRE_RENT' ?
            'intact' :
            'family'; */
        wx.navigateTo({
            url: '../../detail/rentDetail/index?detailType=' + type + '&id=' + id
        });
    },
    handleCheckShow: function (event) {
        // 禁止滚动
        let bool = event.detail.name;
        // 是否显示层级最高层级的经纪人
        this.setData({
            showLayer: bool,
            showAgent: !bool,
            show: false
        });
    },
    // 判断是否已经收藏
    hasWathch: function (houseType, id) {
        let type = '';
        switch (houseType) {
            case 'intact':
                type = 0;
                break;
            case 'combine':
                type = 1;
                break;
            case 'flat':
                type = 2;
                break;
            case 'family':
                type = 3;
                break;
            default:
                type = 0;
        }

        const url = global.URL.GET_RENT_HASWATCH_OPTION;
        let data = {
            websiteHouseId: id,
            houseType: type
        };
        global.requestPost(url, data, res => {
            if (res.success) {
                this.setData({
                    isCollection: res.data
                });
            }
        });
    },
    // 查看房源--合租下的其他房源
    chatCurrentPage: function (e) {
        let id = e.currentTarget.dataset['id'];
        let type = e.currentTarget.dataset['type'];
        let check = e.currentTarget.dataset['check'];
        let isJump = check === 'INCOMING' && id !== this.data.id ? true : false;
        if (isJump) {
            wx.navigateTo({
                url: '../../detail/rentDetail/index?detailType=' +
                    type +
                    '&id=' +
                    id
            });
        }
    },
    // 分享
    onShareAppMessage: function () {
        let title = this.data.houseInfo.title;
        let type =
            this.data.detailType === 'flat' ?
            'flat' :
            this.data.houseInfo.tenementType;
        return {
            title: title,
            desc: '快来看看房源信息吧，更多房源信息就在自定义！',
            path: '/pages/detail/rentDetail/index?detailType=' +
                type +
                '&id=' +
                this.data.id +
                '&isShare=1',
            success: function (res) {
                console.log('转发成功:' + JSON.stringify(res));
                // that.shareClick();
            }
        };
    }
});