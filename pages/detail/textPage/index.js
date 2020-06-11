const app = getApp();
let global = require('../../../utils/global.js');
const api = require('../../../utils/lib/api');


Page({
    data: {
        Info: {},
        searchBox: {}
    },
    onLoad: function (options) {
        console.log(options, 'textPage++++++++++++++')
        switch (options.type) {
            case 'schoolDesc': // 学校描述
                this.setData({
                    searchBox: {
                        detailType: options.type,
                        title: '学校介绍',
                        detailPath: global.URL.GET_SCHOOL_DETAIL,
                        parme: {
                            schoolId: options.id,
                            mobileInfo: app.globalData.deviceInfo.model, // 需要添加设备型号参数
                            temporaryId: app.globalData.radomId // 用户临时id
                        },

                    }
                });
                this.getForDetail(this.data.searchBox.detailPath, this.data.searchBox.parme);
                break;
            case 'schoolWays': //升学方式
                this.setData({
                    searchBox: {
                        detailType: options.type,
                        title: '学校详情'
                    }
                });
                break;

        }
        wx.setNavigationBarTitle({
            title: this.data.searchBox.title
        });

    },
    getForDetail: function (url, parme) { // 获取详情信息
        const ctx = this;
        global.requestGet(url, parme, res => {
            ctx.setData({ //集中展示list-block
                info: res.data,
            });
        })

    },
})