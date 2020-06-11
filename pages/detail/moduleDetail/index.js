const app = getApp();
let global = require('../../../utils/global.js');
Page({
    data: {
        detailType: '',
        userInfo: {},
        title: "房源详情", //默认标题
        schoolNearby: [],
        schoolRecommend: [],
        gardenNearby: [],
        flexInfo: {}, //flex传参
        searchBox: "", // 详情参数对象
        markers: {},
        showBlock: false,
        hasUserInfo: false, // 是否已经登录了
        id: '',
        houseImages: [],
        bannerImgUrl: [],
        houseInfo: {}, //房源的信息
        agents: [], //经纪人
        isShare: 0, //是否为分享
        isCollection: '1', // 1未关注 2已关注
        noData: true, // 是否有数据
        debugId: false
    },
    onLoad: function (options) {
        console.log(options, 'optionsoptions')
        let type = options.detailType;
        let isShare = options.isShare;
        let id = options.id || null;
        let bool = false;
        let scene = decodeURIComponent(options.scene);

        if (scene !== 'undefined') { // 经纪人邀请用户进入详情的情况
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


        let token = wx.getStorageSync(global.STORE.BAIDU_TOKEN);
        if (token) {
            bool = true;
        }
        this.setData({
            hasUserInfo: bool,
            id: id,
            isShare: isShare,
            debugId: app.globalData.debugId // 获取全局 是否调试模式展示id
        });
        this.makeInfoBox(type)

    },
    //数据过滤
    makeInfoBox: function (type) {
        switch (type) {
            case 'apart':
                this.setData({
                    searchBox: {
                        detailType: type,
                        title: '房源详情',
                        detailPath: global.URL.GET_RENT_APARTMENT_HOUSE_DETAIL,
                        parme: {
                            websiteHouseId: this.data.id
                        },
                        posPath: global.URL.GET_RENT_APARTMENT_SUBWAYGEO, // 获取坐标
                    }
                });
                break;
            case 'garden':
                this.setData({
                    searchBox: {
                        detailType: type,
                        title: '小区详情',
                        detailPath: global.URL.GET_GARDEN_DETAIL,
                        parme: {
                            gardenId: this.data.id,
                            mobileInfo: app.globalData.deviceInfo.model, // 需要添加设备型号参数
                            temporaryId: app.globalData.radomId // 用户临时id
                        },
                        nearbyPath: global.URL.GET_GARDENS_NEARBY,
                        nearbyParme: {
                            gardenId: this.data.id
                        },
                        isCollectPath: global.URL.ISGET_COLLECT__GARDEN, //是否关注
                        isCollectParme: {
                            gardenId: this.data.id
                        },
                        collectPath: global.URL.COLLECT__HOUSE, //关注
                        collectParme: {
                            gardenId: this.data.id,
                            mobileInfo: app.globalData.deviceInfo.model,
                        },
                        cancleCollectPath: global.URL.CANCEL_COLLECT, // 取关
                        cancleCollectParme: {
                            gardenId: this.data.id
                        }
                    }
                });

                break;
            case 'school':
                this.setData({
                    searchBox: {
                        detailType: type,
                        title: '学校详情',
                        detailPath: global.URL.GET_SCHOOL_DETAIL,
                        parme: {
                            schoolId: this.data.id,
                            mobileInfo: app.globalData.deviceInfo.model, // 需要添加设备型号参数
                            temporaryId: app.globalData.radomId // 用户临时id
                        },
                        nearbyPath: global.URL.GET_SCHOOL_NEARBY, // 附近小区
                        nearbyParme: {
                            schoolId: this.data.id,
                            pageSize: 20,
                            currentPage: 1
                        },
                        recommendPath: global.URL.GET_SCHOOL_RECOMMEND, // 推荐小区
                        recommendParme: {
                            schoolId: this.data.id,
                            pageSize: 5,
                        },
                        isCollectPath: global.URL.ISCOLLECT_SCHOOL, //是否关注
                        isCollectParme: {
                            schoolId: this.data.id
                        },
                        collectPath: global.URL.COLLECT_SCHOOL, //关注
                        collectParme: {
                            schoolId: this.data.id,
                            mobileInfo: app.globalData.deviceInfo.model,
                        },
                        cancleCollectPath: global.URL.CANCLE_COLLECT_SCHOOL, // 取关
                        cancleCollectParme: {
                            schoolId: this.data.id
                        }
                    }
                });
                break;
        }
        wx.setNavigationBarTitle({
            title: this.data.searchBox.title
        });
        this.getForDetail(this.data.searchBox.detailPath, this.data.searchBox.parme);
    },
    // 获取详情信息
    getForDetail: function (url, parme) {
        const ctx = this;
        global.requestGet(url, parme, res => {
            switch (ctx.data.searchBox.detailType) {
                case 'school':
                    ctx.setData({
                        houseInfo: res.data,
                        houseImages: res.data.schoolImageList,
                        noData: false
                    });
                    //获取对口小区
                    ctx.getListBlock(ctx.data.searchBox.nearbyPath, ctx.data.searchBox.nearbyParme, 'schoolNearby')
                    // 获取房源推荐
                    ctx.getListBlock(ctx.data.searchBox.recommendPath, ctx.data.searchBox.recommendParme, 'schoolRecommend')
                    //图片列表整理
                    ctx.manageImg(res.data.schoolImageList)
                    break;
                case 'garden':
                    // 获取坐标点
                    let position = [{
                        iconPath: '../../../image/common/icon-location@3x.png',
                        longitude: res.data.longitude,
                        latitude: res.data.latitude,
                        id: 'map',
                        width: 16,
                        height: 16
                    }];
                    ctx.setData({
                        houseInfo: res.data,
                        houseImages: res.data.outdoorImageList,
                        markers: position,
                        noData: false
                    });
                    //获取周边小区
                    ctx.getListBlock(ctx.data.searchBox.nearbyPath, ctx.data.searchBox.nearbyParme, 'gardenNearby')
                    //图片列表整理
                    ctx.manageImg(res.data.outdoorImageList)
                    break;
                case 'apart': // 公寓详情
                    ctx.setData({
                        houseInfo: res.data.house,
                        agents: res.data.brokers, //经纪人  
                        houseImages: res.data.houseImages,
                        noData: false
                    });
                    let parme = {
                        parentId: res.data.house.parentId
                    }
                    ctx.getApartPos(ctx.data.searchBox.posPath, parme)
                    break;
            }
            this.setData({ //集中展示list-block
                showBlock: true
            });
            if (app.globalData.token) {
                this.hasWathch(this.data.searchBox.isCollectPath, this.data.searchBox.isCollectParme);
            }
        })
    },
    // 获取对应房源
    getListBlock: function (url, parme, flag) {
        const ctx = this;
        global.requestGet(url, parme, res => {
            switch (flag) {
                case 'schoolNearby': //获取学校对口小区
                    ctx.setData({
                        schoolNearby: res.data.items
                    });

                    break;
                case 'schoolRecommend': //获取学校推荐房源小区
                    ctx.setData({
                        schoolRecommend: res.data
                    });
                    break;
                case 'gardenNearby': //获取小区周边小区
                    ctx.setData({
                        gardenNearby: res.data
                    });
                    break;
                default:
                    type = 0;
            }
        })
    },
    // 获取房型公寓坐标
    getApartPos: function (url, parme) {
        const ctx = this;
        global.requestGet(url, parme, res => {
            ctx.setData({
                apartPos: res.data
            });
        })
    },
    // 跳转招生简章
    toEstateRule: function () {
        wx.navigateTo({
            url: '../../homePage/brandList/index?brandId=' + this.data.houseInfo.brandId
        });
    },
    // 跳转品牌列表
    toBrandList: function () {
        wx.navigateTo({
            url: '../../homePage/brandList/index?brandId=' + this.data.houseInfo.brandId
        });
    },
    // 调往文字介绍页面
    toTextPage: function (e) {
        wx.navigateTo({
            url: '../../detail/textPage/index?type=' + e.currentTarget.dataset.type + '&id=' + this.data.searchBox.parme.schoolId
        });
    },
    // 图片数组整理
    manageImg: function (imgList) {

        this.setData({
            bannerImgUrl: imgList
        });
    },
    // 收藏以及取消收藏
    handleRentCollect: function () {
        let ctx = this;
        if (this.data.isCollection == '2') {
            // 取消关注
            global.requestPost(this.data.searchBox.cancleCollectPath, this.data.searchBox.cancleCollectParme, res => {
                if (res.success) {
                    wx.showToast({
                        title: '取消收藏',
                        icon: 'success',
                        duration: 1500,
                        mask: true
                    });
                    ctx.setData({
                        isCollection: '1'
                    });
                } else {
                    wx.showToast({
                        title: res.message,
                        icon: 'none',
                        duration: 2000,
                        mask: true
                    });
                }
            });
        } else {
            //关注
            global.requestPost(this.data.searchBox.collectPath, this.data.searchBox.collectParme, res => {
                if (res.success) {
                    wx.showToast({
                        title: '收藏成功',
                        icon: 'success',
                        duration: 1500,
                        mask: true
                    });
                    ctx.setData({
                        isCollection: '2'
                    });
                } else {
                    wx.showToast({
                        title: res.message,
                        icon: 'none',
                        duration: 2000,
                        mask: true
                    });
                }
            });
        }

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
                            this.hasWathch(this.data.searchBox.isCollectPath, this.data.searchBox.isCollectParme);
                        }
                    );
                }
            );
        }
    },
    // 回到首页
    handleGoHome: function () {
        // 回首页
        wx.reLaunch({
            url: '/pages/homePage/index/index'
        });
    },
    // 判断是否已经收藏
    hasWathch: function (path, parme) {
        let ctx = this;
        global.requestGet(path, parme, res => {
            if (res.success) {
                ctx.setData({
                    isCollection: res.data
                });
            }
        });
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