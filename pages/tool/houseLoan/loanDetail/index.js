// index.js
Page({
    data: {
        listData: [{
            "date": "1",
            "time": "900",
            "content": " 1"
        }, ],
        total: 0,
        year: 0,
        rate: 0,
        everyMonth: 0,
        firstMonth: 0,
        loanNum: 0,
        reduceLoan: 0,
        totalInterest: 0,
        type: 0,

    },

    computeMoney: function () {
        let detailArr = [], // 拼接数组
            itemInfo = {},
            // 获取当前时间
            timestamp = Date.parse(new Date()),
            date = new Date(timestamp),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            yearPlus = 0, // 计算几个年
            num = 0; // 还款期数
        let wholeMoney = (Number(this.data.loanNum) + Number(this.data.totalInterest)) * 10000 // 获取总额
        let monthBase = (this.data.loanNum * 10000 / 12 / this.data.year).toFixed(2); // 月供本金
        let monthInterest = (this.data.totalInterest * 10000 / 12 / this.data.year).toFixed(2); // 月供利息
        if (this.data.type == 0) { //等额本金的情况下
            for (let i = 0; i < this.data.year * 12 + this.data.year + 1; i++) {
                itemInfo = {}; //每次置空
                //计算年号
                if (i == 0) {
                    itemInfo.year = '第1年   (' + year + ')'
                } else if (i == (12 - month) + 13 * yearPlus) {
                    itemInfo.year = '第' + Number(yearPlus + 2) + '年   (' + Number(year + 1 + yearPlus) + ')';
                    yearPlus = yearPlus + 1
                } else {
                    num = num + 1
                    if (wholeMoney > this.data.everyMonth) {
                        wholeMoney = (wholeMoney - this.data.everyMonth).toFixed(2);
                        itemInfo.monthTotal = this.data.everyMonth > 10000 ? (this.data.everyMonth / 10000).toFixed(2) + '万' : this.data.everyMonth + '元'; //月供总额
                    } else {
                        itemInfo.monthTotal = wholeMoney > 10000 ? (wholeMoney / 10000).toFixed(2) + '万' : wholeMoney + '元'; //月供总额  
                        wholeMoney = 0;
                    }
                    itemInfo.date = num; // 期数
                    itemInfo.monthBase = monthBase > 10000 ? (monthBase / 10000).toFixed(2) + '万' : monthBase + '元'; // 月供本金
                    itemInfo.monthInterest = monthInterest > 10000 ? (monthInterest / 10000).toFixed(2) + '万' : monthInterest + '元'; // 月供利息
                    itemInfo.totalMoney = wholeMoney > 10000 ? (wholeMoney / 10000).toFixed(2) + '万' : wholeMoney + '元'; // 剩余总额
                }
                itemInfo.number = i
                detailArr.push(itemInfo)
            }
        } else {
            let firstMonth = Number(this.data.firstMonth);
            monthInterest = firstMonth - monthBase;
            for (let i = 0; i < this.data.year * 12 + this.data.year + 1; i++) {
                itemInfo = {}; //每次置空
                //计算年号
                if (i == 0) {
                    itemInfo.year = '第1年   (' + year + ')'
                } else if (i == (12 - month) + 13 * yearPlus) {
                    itemInfo.year = '第' + Number(yearPlus + 2) + '年   (' + Number(year + 1 + yearPlus) + ')';
                    yearPlus = yearPlus + 1
                } else {
                    num = num + 1
                    wholeMoney = (wholeMoney - firstMonth).toFixed(2);
                    itemInfo.monthTotal = firstMonth > 10000 ? (this.data.everyMonth / 10000).toFixed(2) + '万' : firstMonth + '元'; //月供总额
                    firstMonth = (firstMonth - Number(this.data.reduceLoan)).toFixed(2) < monthBase ? monthBase : (firstMonth - Number(this.data.reduceLoan)).toFixed(2);
                    monthInterest = (monthInterest - Number(this.data.reduceLoan)).toFixed(2) > 0 ? (monthInterest - Number(this.data.reduceLoan)).toFixed(2) : monthInterest;
                    itemInfo.date = num; // 期数
                    itemInfo.monthBase = monthBase > 10000 ? (monthBase / 10000).toFixed(2) + '万' : monthBase + '元'; // 月供本金
                    itemInfo.monthInterest = monthInterest > 10000 ? (monthInterest / 10000).toFixed(2) + '万' : monthInterest + '元'; // 月供利息
                    itemInfo.totalMoney = wholeMoney > 10000 ? (wholeMoney / 10000).toFixed(2) + '万' : wholeMoney + '元'; // 剩余总额
                }
                itemInfo.number = i
                detailArr.push(itemInfo)
            }
        }
        this.setData({
            listData: detailArr
        });

    },

    onLoad: function (option) {
        // 本息总额：还款月数×(总贷款额×月利率-月利率×(总贷款额÷还款月数)*(还款月数-1)÷2+总贷款额÷还款月数)
        this.setData({
            total: Number(option.total), // 贷款总额
            year: Number(option.year), // 时间
            rate: Number(option.rate), // 利率
            everyMonth: Number(option.everyMonth),
            firstMonth: Number(option.firstMonth),
            loanNum: Number(option.loanNum),
            reduceLoan: Number(option.reduceLoan),
            totalInterest: Number(option.totalInterest),
            type: option.type,

        });
        this.computeMoney()
    }
})