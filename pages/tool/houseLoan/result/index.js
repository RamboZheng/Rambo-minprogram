//index.js
//获取应用实例
let global = require('../../../../utils/global.js');
import * as echarts from '../../../../component/common/ec-canvas/echarts';
Page({
    data: {
        ec: {},
        currentIndex: '0',
        loanType: '0',
        tabList: ['等额本息', '等额本金'],
        totalMoney: 0, // 本息总额
        totalInterest: 0, //利息总额
        firstMonth: 0, // 首月应还
        reduceLoan: 0, // 递减利息
        firstPrecent: 0, // 首付比例
        firstPrice: 0, // 首付金额
        everyMonth: 0, //月供
        showTip: false, // 是否展示提示
        newCon: "", //推荐房源筛选条件
        // 饼图数据
        pieList: [{
                value: 30,
                name: '商贷本金'
            },
            {
                value: 60,
                name: '商贷利息'
            }
        ],
        loanNum: 0 // 贷款总额
    },
    // 获取当前tabIndex 
    getIndex: function (e) {
        this.init_pieCharts();
        this.setData({
            currentIndex: e.detail.index
        });
    },
    //跳转还款详情
    toLoanDetail: function (e) {
        wx.navigateTo({
            url: '../loanDetail/index?total=' + e.currentTarget.dataset.total +
                '&loanNum=' + this.data.loanNum +
                '&totalInterest=' + this.data.totalInterest +
                '&everyMonth=' + this.data.everyMonth +
                '&firstMonth=' + this.data.firstMonth +
                '&year=' + e.currentTarget.dataset.year +
                '&type=' + this.data.loanType +
                '&reduceLoan=' + this.data.reduceLoan +
                '&rate=' + e.currentTarget.dataset.rate
        })
    },
    // 重新计算
    backIndex: function () {
        wx.navigateTo({
            url: '../index/index'
        });
    },
    // 开关提示
    showTip: function () {
        this.setData({
            showTip: true
        });
    },
    hideNav: function () {
        this.setData({
            showTip: false
        });
    },
    //初始化图表--饼图
    init_pieCharts: function () {
        let list = [{
                value: this.data.loanNum,
                name: '商贷本金'
            },
            {
                value: this.data.totalInterest,
                name: '商贷利息'
            }
        ]
        this.setData({
            pieList: list
        });
        this.piechartsComponnet.init((canvas, width, height) => {
            // 初始化图表
            const pieChart = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            pieChart.setOption(this.getPieOption());
            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return pieChart;
        });
    },
    //绘制饼图
    getPieOption: function () {
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}:{c}万元'
            },
            color: ['#9CBDFF', '#F4A460'],
            calculable: true,
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['45%', '60%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: this.data.pieList
            }]
        };
        return option;
    },
    // 请求二手房推荐
    getHouseList: function () {
        const ctx = this;
        let parme = {
            currentPage: 1,
            keyword: "",
            pageSize: 8,
            condition: this.data.newCon
        };
        global.requestGet(global.URL.GET_LIST_DATA, parme, function (res) {
            //res就是接口返回的数据
            if (res.data.items.length <= 8) {
                ctx.setData({
                    recommandList: res.data.items
                });
            } else {
                let list = res.data.items.slice(0, 8);
                ctx.setData({
                    recommandList: list
                });
            }
        });
    },
    //查看更多
    toMore: function () {
        console.log('00000')
        wx.navigateTo({
            url: '../../../homePage/resultList/index?type=house'
        });
    },
    onLoad: function (option) {
        // 推荐房源展示上下浮动10%左右房源，并且由小到大排列
        console.log(option)
        let newCon = 'o2,pfy' + (option.totalPrice) * 0.9 + 'pty' + (option.totalPrice) * 1.1;
        this.setData({
            totalMoney: option.totalMoney, // 本息总额
            totalInterest: option.totalInterest, //利息总额
            firstMonth: option.firstMonth, // 首月应还
            reduceLoan: option.reduceLoan, // 递减利息
            firstPrecent: option.firstPrecent, // 首付比例
            loanNum: option.loanNum, // 贷款总额
            firstPrice: option.firstPrice, // 首付金额
            everyMonth: option.everyMonth, // 月供
            totalPrice: option.totalPrice, // 房屋总价

            loanType: option.currentIndex, // 贷款类型
            publicLoan: option.publicLoan, // 公积金贷款额
            publicTime: option.publicTime, // 公积金贷款时间
            publicRate: option.publicRate, // 公积金利率
            businessLoan: option.businessLoan, // 商贷金额
            businessYear: option.businessYear, // 商贷时间
            loanRate: option.loanRate, // 商贷利率
            wholeLoan: option.wholeLoan, //贷款总额 
            newCon: newCon // 推荐房源条件

        });
        this.piechartsComponnet = this.selectComponent('#mychart-dom-bar'); //饼图
        this.init_pieCharts();
        this.getHouseList();
    }
});