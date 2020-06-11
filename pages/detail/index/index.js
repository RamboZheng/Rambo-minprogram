//index.js
//获取应用实例
const app = getApp();
import * as echarts from '../../../component/common/ec-canvas/echarts';
var QQMapWX = require('../../../lib/qqmap-wx-jssdk.js');
let global = require('../../../utils/global.js');
let wxMarkerData = [];
let initChart = null;

Page({
    data: {
        loading: false,
        detailType: null,
        id: null,
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        bannerImgUrl: [], // 详情的banner图片
        houseImages: [],
        index: 1,
        // currentType: 0,
        showLayer: false,
        isCollection: false, // 收藏参数
        recommendList: [],
        show: false,
        longitude: null,
        latitude: null,
        showLink: false, // 是否展示外部链接地址
        linkUrl: "", // 外部链接地址
        markers: [],
        blockType: [], // 小区推荐
        currentType: 0,
        currentTxt: '',
        currentTotalNum: 3,
        // 小区房源
        housingList: [],
        // 详情存放数组
        housingInfo: {},
        linkman: false,
        agents: [], // 经纪人列表
        housePriceRecords: [], // 当前二手房的价格雷达
        evalutionList: [{
                username: '张棒棒',
                updateTime: '2019-06-05',
                avatar: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/img-head@2x.png?tdsourcetag=s_pcqq_aiomsg',
                title: '这房子我去看了，户型方正，正南一个大阳台，面对小区泳池，这房子我去看了，户型方正，正南一个大阳台，风景很好，安静不吵。学位是实验学校坂，安静不吵。学位是实验学校坂...',
                contact: '4008959287-0298'
            },
            {
                username: '张棒棒',
                updateTime: '2019-06-05',
                avatar: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/img-head@2x.png?tdsourcetag=s_pcqq_aiomsg',
                title: '这房子我去看了，户型方正，正南一个大阳台，面对小区泳池，这房子我去看了，户型方正，正南一个大阳台，风景很好，安静不吵。',
                contact: '4008959287-0298'
            },
            {
                username: '张棒棒',
                updateTime: '2019-06-05',
                avatar: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/img-head@2x.png?tdsourcetag=s_pcqq_aiomsg',
                title: '这房子我去看了，户型方正，正南一个大阳台，面对小区泳池，这房子我去看了，户型方正，正南一个大阳台，风景很好，安静不吵。学位是实验学校坂...',
                contact: '4008959287-0298'
            },
            {
                username: '张棒',
                updateTime: '2019-06-05',
                avatar: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/img-head@2x.png?tdsourcetag=s_pcqq_aiomsg',
                title: '这房子我去看了，户型方正，正南一个大阳台，面对小区泳池，这房子我去看了，户型方正，正南一个大阳台，风景很好，安静不吵。学位是实验学校坂...',
                contact: '4008959287-0298'
            }
        ],
        garendInfo: {}, //小区信息
        recommendGarend: [], // 备用的小区房源
        // echarts canvas
        ec: {
            lazyLoad: true
        },
        houseUrl: '',
        pageSize: 5,
        currentPage: 1,
        currentTypeTotal: 1, //当前分类的页码数
        isShare: 0, // 是否是分享页面
        currentStatus: false,
        showAgent: true, //是否显示经纪人
        housePriceRecordMap: [], //价格雷达
        houseFeatures: [], // 房源点评
        remarkIndex: 0, //房源点评所属公司
        showPriceAll: false,
        toggleParams: {
            //房源点评查看更多
            flag: null, // 0为收起，1为展开
            show: null // 有展开
        },
        debugId: false,
        noData: false
    },
    // 收藏和取消收藏
    handleCollection: function () {
        let type = this.data.detailType;

        let url = '';
        let data = {
            userId: this.data.userInfo.id
        };

        if (this.data.isCollection) {
            // 取消收藏
            if (type === 'house') {
                // url = '/watch/houseUnWatch';
                url = global.URL.UNCOLLECT_HOUSE;
                data.houseId = this.data.id;
            } else {
                // url = '/watch/gardenUnWatch';
                url = global.URL.CANCEL_COLLECT;
                data.gardenId = this.data.id;
            }
        } else {
            //收藏
            if (type === 'house') {
                // url = '/watch/houseWatch';
                url = global.URL.POST_COLLECT__HOUSE;
                data.houseId = this.data.id;
                data.mobileInfo = app.globalData.deviceInfo.model; // 需要添加设备型号参数
            } else {
                // url = '/watch/gardenWatch';
                url = global.URL.COLLECT__HOUSE;
                data.gardenId = this.data.id;
                data.mobileInfo = app.globalData.deviceInfo.model; // 需要添加设备型号参数
            }
        }

        global.requestPost(url, data, res => {
            if (res.status === 'C0000') {
                this.setData({
                        isCollection: !this.data.isCollection
                    },
                    () => {
                        let message = '';
                        if (this.data.isCollection) {
                            message = '收藏成功';
                        } else {
                            message = '取消收藏';
                        }
                        wx.showToast({
                            title: message,
                            icon: 'success',
                            duration: 1500,
                            mask: true
                        });
                    }
                );
            }
        });
    },
    // 返回首页
    bindViewTap: function () {
        wx.reLaunch({
            url: '/pages/homePage/index/index'
        });
    },
    // 跳转经纪人详情
    toBrokerDetail: function (e) {
        wx.navigateTo({
            url: '../brokerDetail/index?brokerId=' + e.currentTarget.dataset.id
        });
    },
    // 查看小区基本信息详情
    handleBaseInfo: function () {
        // 使用本地缓数据
        wx.setStorageSync('housingBaseInfo', this.data.housingInfo);
        wx.navigateTo({
            url: '../baseInfo/index'
        });
    },
    // 小区详情及更多房源
    handleMore: function (e) {
        wx.navigateTo({
            url: '../moduleDetail/index?detailType=garden&id=' + e.currentTarget.dataset['id']
        });
    },
    // 查看更多看房评价
    handleEvaluateMore: function () {
        // 添加一个id
        wx.navigateTo({
            url: '../appriase/index?id=' + this.data.id
        });
    },
    // 显示更多的经纪人电话
    showAll: function () {
        // console.log(222222);
        let that = this;
        this.setData({
            show: !that.data.show,
            showCan: !this.data.showCan
        });
    },
    // 拨打电话实现功能
    callIn: function (e) {
        let phone = e.currentTarget.dataset['phone'];
        wx.makePhoneCall({
            phoneNumber: phone,
            success: result => {},
            fail: () => {},
            complete: () => {}
        });
    },
    // 去地图所在的附近周边
    toSetMap: function (e) {
        let type = this.data.detailType;
        wx.navigateTo({
            url: '../setMap/index?longitude=' +
                this.data.longitude +
                '&latitude=' +
                this.data.latitude
        });
        /* if (type === 'house') {
            wx.navigateTo({
                url:
                    '../setMap/index?longitude=' +
                    this.data.housingInfo.gardenLongitude +
                    '&latitude=' +
                    this.data.housingInfo.gardenLatitude
            });
        } else {
            wx.navigateTo({
                url:
                    '../setMap/index?longitude=' +
                    this.data.garendInfo.bizAreaLongitude +
                    '&latitude=' +
                    this.data.garendInfo.bizAreaLatitude
            });
        } */
    },
    // 小区查看更多
    handleLoadMore: function () {
        if (this.data.currentStatus) {
            // 收起
            let currentType = this.data.currentType;
            let data = this.data.blockType;
            data[currentType].result = data[currentType].result.slice(0, 3);

            this.setData({
                blockType: data,
                currentStatus: false,
                currentPage: 2
            });
        } else {
            // 查看更多
            let currentTypeTotal = this.data.currentTypeTotal; // 当前的总数
            let currentType = this.data.currentType;
            let currentPage = this.data.currentPage;
            let total = (currentPage - 1) * 5 + 3;
            let list = this.data.recommendGarend; // 另外在存储起来的数据
            let obj = list[currentType];
            let prevPage = obj.prevPage; //上次浏览到的页面

            let data = this.data.blockType;

            // console.log(prevPage, 'shangciliulan');

            if (prevPage >= currentPage) {
                let datum = obj.result;
                let len = datum.length;
                // console.log(len, '@@@@@@');

                if (len <= total) {
                    if (len === 3) {
                        this.setData({
                            currentStatus: true
                        });
                    } else {
                        // new add
                        if (currentTypeTotal >= total) {
                            this.setData({
                                currentStatus: true
                            });
                        }
                        // new add
                        let sliceData = datum.slice(0, len);

                        data[currentType].result = sliceData;
                        this.setData({
                            currentStatus: true,
                            blockType: data
                        });
                    }
                    return false;
                }

                let sliceData = datum.slice(0, total);
                data[currentType].result = sliceData;

                this.setData({
                    blockType: data,
                    currentPage: currentPage + 1,
                    currentTotalNum: this.data.currentTotalNum + 5
                });
            } else {
                // console.log('22222222#@#');
                this.getGardenRecommends(1);
            }
        }
    },
    // 获取详情
    getForDetail: function () {
        let detailType = this.data.detailType;
        let url = '';
        let data = {};
        // 房源详情 house 房源 block小区
        if (detailType === 'house') {
            // url = '/house/detail';
            url = global.URL.GET_HOUSE_DETAIL;
            data = {
                houseId: this.data.id,
                mobileInfo: app.globalData.deviceInfo.model, // 需要添加设备型号参数
                temporaryId: app.globalData.radomId // 用户临时id
            };
        } else {
            // url = '/garden/detail';
            url = global.URL.GET_GARDEN_DETAIL;
            data = {
                gardenId: this.data.id,
                mobileInfo: app.globalData.deviceInfo.model, // 需要添加设备型号参数
                temporaryId: app.globalData.radomId // 用户临时id
            };
        }

        global.requestGet(url, data, res => {
            if (res.status === 'C0000') {
                if (detailType === 'house') {
                    // 房源
                    let housePrice = res.data.housePriceRecordGroupBySource;
                    let houseMap = [];
                    let count = 0;
                    for (let i in housePrice) {
                        let obj = {
                            name: i,
                            list: housePrice[i]
                        };
                        count += housePrice[i].length;
                        houseMap.push(obj);
                    }

                    this.setData({
                            recommendList: res.data.recommendationSeo,
                            housingInfo: res.data.house,
                            houseImages: res.data.houseImages,
                            housePriceRecords: houseMap,
                            longitude: res.data.house.gardenLongitude,
                            latitude: res.data.house.gardenLatitude,
                            housePriceRecordMap: res.data.housePriceRecordGroupByChangPriceDate,
                            houseFeatures: res.data.houseFeatures,
                            computerPriceLen: count, //价格雷达 -- 展开全部的条数
                            // linkUrl: res.data.houseFeatures[0].featureSourceUrl,
                            linkUrl:
                                res.data.houseFeatures.length > 0
                                    ? res.data.houseFeatures[0].featureSourceUrl
                                    : '',
                            loading: true
                        },
                        () => {
                            this.manageImg();
                            this.getRecommends();
                            this.getMapAddress();
                            if (houseMap.length > 0) {
                                this.init_echarts();
                            }
                            if (res.data.houseFeatures.length > 0) {
                                this.checkRemarkToggle();
                            }
                        }
                    );
                } else {
                    // 小区
                    this.setData({
                            garendInfo: res.data,
                            houseImages: res.data.outdoorImageList,
                            loading: true,
                            // longitude: res.data.bizAreaLongitude,
                            // latitude: res.data.bizAreaLatitude
                            longitude: res.data.longitude,
                            latitude: res.data.latitude
                        },
                        () => {
                            this.manageImg();
                            this.getMapAddress();
                        }
                    );
                    // 小区房源
                    this.getGardenRecommends(0);
                    // 周边小区
                    this.getCircumGarend();
                }
            } else {
                this.setData({
                    noData: true
                });
            }
        });
    },
    // 是否收藏该小区
    isWatchHouse: function (type, id) {
        let userId = wx.getStorageSync(global.STORE.BAIDU_USERINFO).userId;

        let url = '';
        let data = {};
        if (type === 'house') {
            url = global.URL.ISGET_COLLECT__HOUSE;
            data = {
                houseId: id,
                userId: userId,
                banLogin: true
            };
        } else {
            url = global.URL.ISGET_COLLECT__GARDEN;
            data = {
                gardenId: id,
                userId: userId,
                banLogin: true
            };
        }

        global.requestGet(url, data, res => {
            if (res.status === 'C0000') {
                let state = res.data;
                if (state == 2) {
                    this.setData({
                        isCollection: true
                    });
                } else {
                    this.setData({
                        isCollection: false
                    });
                }
            }
        });
    },
    // 处理banner图片以及放大后的图片显示
    manageImg: function () {
        let houseImages = this.data.houseImages;
        let imgs = [];
        let type = this.data.detailType;
        if (type === 'house') {
            for (let i in houseImages) {
                let list = houseImages[i].imgList;
                for (let j in list) {
                    let data = list[j];
                    data['cType'] = i;
                    data['imgUrl'] =
                        data['imgUrl'] +
                        '?x-oss-process=image/resize,m_lfit,h_750,w_420';
                    imgs.push(data);
                }
            }
        } else {
            for (let i in houseImages) {
                let item = houseImages[i];
                item['cType'] = i;
                item['url'] =
                    item['url'] +
                    '?x-oss-process=image/resize,m_lfit,h_750,w_420';
                imgs.push(item);
            }
        }

        this.setData({
            bannerImgUrl: imgs
        });
    },
    // 显示来源链接
    showLink() {
        this.setData({
            showLink: !this.data.showLink
        })
    },
    //复制链接
    copyUrl: function () {
        var ctx = this;
        wx.setClipboardData({
            //去找上面的数据
            data: ctx.data.linkUrl,
            success: function (res) {
                wx.showToast({
                    title: '复制链接成功',
                });
            }
        });
    },
    onLoad: function (options) {
        // console.log(options);
        let id;
        let type;
        let isShare;
        // wx.navigateTo({ url: '../setMap/index' });
        // 是否是二维码
        let scene = decodeURIComponent(options.scene);

        if (scene === 'undefined') {
            type = options.detailType;
            id = options.id;
            isShare = options.isShare;
        } else {
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

        let title;
        if (type === 'house') {
            title = '房源详情';
        } else {
            title = '小区详情';
        }
        wx.setNavigationBarTitle({
            title: title
        });

        let userInfo = wx.getStorageSync(global.STORE.BAIDU_USERINFO);
        let bool;

        if (userInfo.hasOwnProperty('userId')) {
            // 是否已经登录，如果已经登录需要判断是否已经收藏，否则不调用请求的接口
            bool = true;
            if (scene === 'undefined') {
                this.isWatchHouse(options.detailType, options.id);
            } else {
                // 分享的页面，如果已经登录后，要判断自己有没有收藏
                this.isWatchHouse(type, id);
            }
        }

        this.setData({
            id: id,
            detailType: type,
            userInfo: userInfo,
            hasUserInfo: bool,
            debugId: app.globalData.debugId, // 获取全局 是否调试模式展示id
            isShare: isShare
        });

        // console.log(scene);

        this.getForDetail();

        this.getAgent();

        this.echartsComponnet = this.selectComponent('#mychart-dom-line');
        // console.log(!this.data.ec);
        // this.init_echarts()
    },
    // 修改时间雷达

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
                            this.isWatchHouse(detailType, id);
                        }
                    );
                }
            );
        }
    },
    handleShowConcate: function (e) {
        if (this.data.show) {
            this.setData({
                show: !this.data.show
            });
        }
        this.setData({
            linkman: !this.data.linkman
        });
    },
    // 重新获取列表
    refreshList: function () {
        this.getCommentList(this.data.boxInfo.path, this.data.boxInfo.parme, boxInfo.type)
    },
    handleChange: function (e) {
        // console.log(e);
        this.setData({
            index: e.detail.current + 1,
            currentType: e.detail.currentItemId
        });
    },
    // 地图
    getMapAddress: function () {
        /* var that = this;
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
        console.log(latitude, longitude);

        BMap.regeocoding({
            coord_type: 3,
            location: `${latitude},${longitude}`,
            // iconPath:
            //     'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/icon-blueyuan@2x.png?tdsourcetag=s_pcqq_aiomsg',
            iconPath: '../../../image/common/icon-location@3x.png',
            fail: fail,
            width: 16,
            height: 16,
            success: success
        }); */
        let latitude = this.data.latitude;
        let longitude = this.data.longitude;
        var that = this;
        // 实例化API核心类
        var demo = new QQMapWX({
            key: 'ZJIBZ-QNB3P-L2WDE-LGLK2-4Z3JH-WXFBH' // 必填
        });
        // 调用接口
        demo.reverseGeocoder({
            location: {
                latitude: latitude,
                longitude: longitude
            },
            /* location: {
                longitude: longitude,
                latitude: latitude
            }, */
            coord_type: 3, //baidu经纬度
            success: function (res) {
                // var location = res.result.ad_info.location;
                // console.log(location);
                var market = [{
                    iconPath: '../../../image/common/icon-location@3x.png',
                    // longitude: location.lng,
                    // latitude: location.lat,
                    longitude: res.result.location.lng,
                    latitude: res.result.location.lat,
                    id: 'map',
                    width: 16,
                    height: 16
                }];
                if (that.data.detailType === 'block') {}
                that.setData({
                    /* latitude: location.lat,
                    longitude: location.lng, */
                    longitude: res.result.location.lng,
                    latitude: res.result.location.lat,
                    markers: market,
                    houseUrl: res.result.address +
                        '(' +
                        res.result.formatted_addresses.rough +
                        ')'
                });
                // console.log(that.data.name)
            }
        });
    },
    // 获取经纪人列表
    getAgent: function () {
        // let url = '/house/brokerDetail';
        const url = global.URL.GET_HOUSE_ANGEN;
        let data = {
            houseId: this.data.id
        };
        global.requestGet(url, data, res => {
            let agentList = res.data;

            for (let i in agentList) {
                agentList[i].photoUrl = agentList[i].photoUrl ?
                    agentList[i].photoUrl.indexOf('?x-oss-process=image') > -1 ?
                    agentList[i].photoUrl :
                    agentList[i].photoUrl +
                    '?x-oss-process=image/resize,m_lfit,h_120,w_120' :
                    '../../../image/common/img-agenthead-colour-default@2x.png';
            }

            if (res.status === 'C0000') {
                this.setData({
                    // agents: res.data,
                    agents: agentList,
                    showAgent: true
                });
            } else {
                this.setData({
                    showAgent: false
                });
            }
        });
    },
    // 获取推荐房源
    getRecommends: function () {
        let url = global.URL.GET_HOUSE_RECOMMENDATION;
        let data = {
            gardenId: this.data.housingInfo.gardenId,
            houseId: this.data.id,
            bedRoom: this.data.housingInfo.bedRoom ?
                this.data.housingInfo.bedRoom : ''
        };

        global.requestGet(url, data, res => {
            if (res.status === 'C0000') {
                this.setData({
                    recommendList: res.data
                });
            } else {
                this.setData({
                    recommendList: []
                });
            }
        });
    },
    // 小区推荐房源
    getGardenRecommends: function (type) {
        // type 0为首次加载
        let pageSize = this.data.pageSize;
        // if (this.data.currentPage > 1) {
        //     pageSize = 5;
        // }
        let url = global.URL.GET_GARDEN_RECOMMENDATION;
        // let url = global.URL.GET_CURRENT_GARDEN_HOUSE;
        let params = {
            gardenId: this.data.id,
            currentPage: this.data.currentPage,
            pageSize: pageSize
        };
        global.requestGet(url, params, res => {
            if (res.status === 'C0000') {
                let data = res.data;

                if (type === 0) {
                    for (let i in data) {
                        data[i].prevPage = this.data.currentPage;
                    }
                    let deepCopy = JSON.parse(JSON.stringify(data));

                    // console.log(deepCopy[0], '第一次存放的');
                    // 第一次显示三条
                    let obj = data[0].result;
                    let slice = obj.slice(0, 3);

                    data[0].result = slice;

                    // console.log(deepCopy[0], '再次查看次存放的');

                    this.setData({
                        blockType: data,
                        currentType: 0,
                        currentTxt: data[0].name,
                        recommendGarend: deepCopy,
                        currentPage: this.data.currentPage + 1,
                        currentTypeTotal: data[0].houseTotal
                    });
                } else {
                    if (data.length > 0) {
                        let blockType = this.data.recommendGarend;
                        let currentType = this.data.currentType; // 当前的类型
                        // 当前的状态 没有数据时， 直接显示收起，没有查看更多和收起
                        let currentTxt = this.data.currentTxt;
                        let isHas = data.find(item => item.name === currentTxt);

                        if (isHas == undefined || !isHas) {
                            this.setData({
                                currentStatus: true
                            });
                        }

                        for (let i in data) {
                            let dataname = data[i].name;
                            let result = data[i].result;

                            for (let i in blockType) {
                                if (blockType[i].name == dataname) {
                                    blockType[i].result = blockType[
                                        i
                                    ].result.concat(result);
                                }
                                blockType[i].prevPage = this.data.currentPage;
                            }
                        }
                        // 因为是引用型数组，因为改变一个会想想另一个，所以需要这行解决此困扰
                        let deepCopy = JSON.parse(JSON.stringify(blockType));

                        // new add 因为第一页是5条只截取3条
                        // console.log('#################################');
                        // console.log(deepCopy[currentType].result);
                        let currentData = blockType[currentType].result;
                        currentData = currentData.slice(
                            0,
                            this.data.currentTotalNum + 5
                        );
                        blockType[currentType].result = currentData;
                        // console.log(blockType[currentType].result);
                        let houseTotal = blockType[currentType].houseTotal;

                        // console.log(houseTotal, '总条数');
                        let currentStatus = false;
                        if (this.data.currentTotalNum + 5 >= houseTotal) {
                            currentStatus = true;
                        }
                        // console.log('#################################');

                        this.setData({
                            blockType: blockType,
                            recommendGarend: deepCopy,
                            currentPage: this.data.currentPage + 1,
                            currentTotalNum: this.data.currentTotalNum + 5,
                            currentTypeTotal: houseTotal,
                            currentStatus: currentStatus
                        });
                    } else {
                        let currentTotalNum = this.data.currentTotalNum + 5;
                        let blockType = this.data.blockType;
                        let currentType = this.data.currentType;
                        let currentTypeData = blockType[currentType];
                        let len = currentTypeData.result.length;
                        let total = currentTypeData.houseTotal;

                        let recommendGarend = this.data.recommendGarend;
                        for (let i in recommendGarend) {
                            recommendGarend[i].prevPage = this.data.currentPage;
                        }

                        let recommendList = JSON.parse(
                            JSON.stringify(recommendGarend)
                        );

                        if (len < total) {
                            let resultList = recommendList[currentType].result;
                            resultList = resultList.slice(
                                0,
                                this.data.currentTotalNum + 5
                            );
                        }

                        // console.log(recommendList);
                        // console.log(this.data.recommendGarend);

                        this.setData({
                            currentStatus: true,
                            blockType: recommendList
                        });
                    }
                }
            }
        });
    },
    chooseGarendType: function (e) {
        let index = e.currentTarget.dataset['index'];
        let txt = e.currentTarget.dataset['txt'];
        let data = this.data.blockType;
        let currentData = data[index];
        let arr = currentData.result.slice(0, 3);
        data[index].result = arr;
        let currentTypeTotal = currentData.houseTotal;

        this.setData({
            currentType: index,
            currentTxt: txt,
            currentTotalNum: 3,
            currentStatus: false,
            currentPage: 2,
            blockType: data,
            currentTypeTotal: currentTypeTotal
        });
    },
    // 推荐房源的跳转
    handleRecommend: function (e) {
        // console.log(e);
        let id = e.currentTarget.dataset['id'];
        // console.log(id);
        wx.navigateTo({
            url: '../../detail/index/index?detailType=' +
                this.data.detailType +
                '&id=' +
                id
        });
    },
    // 周边小区
    getCircumGarend: function () {
        let url = global.URL.GET_GARDEN_NEARBY;
        let data = {
            gardenId: this.data.id
        };

        global.requestGet(url, data, res => {
            // console.log(res);
            if (res.status === 'C0000') {
                this.setData({
                    recommendList: res.data
                });
            }
        });
    },
    // canvas
    init_echarts: function () {
        this.echartsComponnet.init((canvas, width, height) => {
            // 初始化图表
            const Chart = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            this.setOption(Chart);
            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return Chart;
        });
    },
    // 排序
    sortUpdate: function (a, b) {
        return Date.parse(a) - Date.parse(b);
    },
    setOption: function (Chart) {
        Chart.clear(); // 清除
        Chart.setOption(this.getOptions()); //获取新数据
    },
    getOptions: function () {
        let houseMap = this.data.housePriceRecords;

        let legend_data = []; //存放房产公司名字
        let dates = []; // echarts series
        let price_data = []; //存放所有的价格
        let max = 0; // 最大值
        let min = 0; // 最小值
        let xData = []; // x轴的时间，先不做截取，因为有可能年份不一样但是月份是一样的

        for (let i in houseMap) {
            let name = houseMap[i].name;
            let list = houseMap[i].list;

            for (let j in list) {
                let time = list[j].changePriceDate;

                price_data.push(list[j].price);

                if (xData.indexOf(time) === -1) {
                    xData.push(time);
                    // 日期排序
                    xData.sort(this.sortUpdate);
                }
            }

            legend_data.push(name);
        }

        max = Math.max.apply(Math, price_data);
        min = Math.min.apply(Math, price_data);
        if (max === min) {
            max = max + 5;
            min = max - 10;
        } else {
            max = parseInt(max + (max - min) / 5);
            min = parseInt(min - (max - min) / 2);
        }

        for (let i in houseMap) {
            let name = houseMap[i].name;
            let values = houseMap[i].list;
            let color = '';
            if (name === 'Q房网' || name === 'Q房') {
                color = '#FFDE86';
            } else if (name === '链家') {
                color = '#3F5E51';
            } else if (name === '乐有家') {
                color = '#D85959';
            } else {
                color = '#AC3737';
            }

            let newPrice = [];
            // 初始化价格
            for (let i = 0; i < xData.length; i++) {
                newPrice.push(null);
            }

            for (let z in values) {
                let time = values[z].changePriceDate;
                let index = xData.indexOf(time);
                // 下标从当前开始，替换到长度的值
                for (let i = index; i < newPrice.length; i++) {
                    newPrice[i] = values[z].price;
                }
            }

            let obj = {
                name: name,
                type: 'line',
                itemStyle: {
                    normal: {
                        color: color
                    }
                },
                data: newPrice
            };
            dates.push(obj);
        }
        // x坐标截取时间长度
        for (let i in xData) {
            xData[i] = xData[i].substring(5, 10);
        }

        var option = {
            tooltip: {
                trigger: 'axis',
                // padding: [10, 10, 10, 20],
                position: function (point, params, dom, rect, size) {
                    // 提示框位置
                    var x = point[0];
                    var y = point[1];
                    // 提示框大小
                    var boxWidth = size.contentSize[0];
                    var boxHeight = size.contentSize[1];
                    // 当前鼠标位置
                    var posX = 0; //x坐标位置
                    var posY = 0; //y坐标位置

                    if (x < boxWidth) {
                        //左边放不开
                        posX = 5;
                    } else {
                        //左边放的下
                        posX = x - boxWidth;
                    }

                    if (y < boxHeight) {
                        //上边放不开
                        posY = 5;
                    } else {
                        //上边放得下
                        posY = y - boxHeight;
                    }

                    return [posX, posY + 6];
                },
                formatter: function (params, ticket, callback) {
                    var res = params[0].name + '\n';
                    for (var i = 0, length = params.length; i < length; i++) {
                        if (params[i].value == undefined) {
                            // res += datas[i].seriesName + '：--万元 \n';
                        } else {
                            res +=
                                params[i].seriesName +
                                ':' +
                                params[i].value +
                                '万元\n';
                        }
                    }
                    return res;
                },
                textStyle: {
                    align: 'left'
                }
            },
            legend: {
                data: legend_data,
                bottom: 0,
                selectedMode: false
            },
            grid: {
                x: 15,
                y: 15,
                x2: 24,
                y2: 24,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                // boundaryGap: true,
                data: xData
            },
            yAxis: {
                x: 'center',
                type: 'value',
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                axisLabel: {
                    formatter: '{value}万'
                },
                min: min,
                max: max
            },
            series: dates
        };

        return option;
    },

    handleCheckShow: function (event) {
        // console.log(event);
        // 禁止滚动
        let bool = event.detail.name;
        // 是否显示层级最高层级的经纪人
        this.setData({
            showLayer: bool,
            showAgent: !bool,
            show: false
        });
    },
    showAllHistory: function () {
        this.setData({
            showPriceAll: true
        });
    },
    // 切换看房评价
    handTabRemark: function (e) {
        let index = e.currentTarget.dataset['index'],
            url = this.data.houseFeatures[index].featureSourceUrl;

        this.setData({
                remarkIndex: index,
                linkUrl: url
            },
            () => {
                this.checkRemarkToggle();
            }
        );
    },
    checkRemarkToggle: function () {
        let that = this;
        let query = wx.createSelectorQuery();
        query.select('.remark-box').boundingClientRect();
        query.exec(function (res) {
            let height = res[0].height;
            if (height > 176) {
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
    errImgFun: function (e) {
        var _errImg = e.target.dataset.errImg;
        var _errObj = {};
        _errObj[_errImg] =
            '../../../image/common/img-agenthead-colour-default@2x.png?x-oss-process=image/resize,m_lfit,h_120,w_120';
        this.setData(_errObj);
    },
    // 分享功能
    onShareAppMessage: function () {
        let title = '';
        if (this.data.detailType === 'house') {
            title = this.data.housingInfo.title;
        } else {
            title = this.data.garendInfo.name;
        }
        return {
            title: title,
            desc: '快来看看房源信息吧，更多房源信息就在自定义！',
            path: '/pages/detail/index/index?detailType=' +
                this.data.detailType +
                '&id=' +
                this.data.id +
                '&isShare=1'
            // path:
            //     '/pages/homePage/index/index?detailType=' +
            //     this.data.detailType +
            //     '&id=' +
            //     this.data.id +
            //     '&isShare=1'
        };
    }
});