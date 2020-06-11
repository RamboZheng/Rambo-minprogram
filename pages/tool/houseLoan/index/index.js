//index.js
//获取应用实例
let global = require('../../../../utils/global.js');
const app = getApp();
Page({
    data: {
        tabList: ['商业贷款', '组合贷款', '公积金贷款'],
        calculateName: '按房屋总价',
        calculateArr: ['按房屋总价', '按贷款总额'],
        calculateValue: 0,
        rateName: '按最新LPR',
        rataValue: 0,
        rateArr: ['按最新LPR', '按旧版基准利率'],
        businessLoanName: '旧版基准利率(4.9%)',
        businessLoanArr: ['8.5折(4.165%)', '9折(4.441%)', '9.5折(4.655%)', '旧版基准利率(4.9%)', '1.1倍(5.39%)', '1.2倍(5.88%)', '1.3倍(6.37%)'],
        publicLoanName: '最新基准利率(3.25%)',
        publicLoanArr: ['最新基准利率(3.25%)', '1.1倍(3.575%)', '1.2倍(3.9%)', '1.3倍(4.225%)'],
        baseLength: 5, // 默认基点可输入长度
        currentIndex: 0,
        totalPrice: "", // 房屋总价
        totalLoan: "", // 总利息
        firstPrecent: 30, // 首付比例
        firstPrice: "", // 首付金额
        businessLoan: "", // 商贷金额
        businessYear: 30, // 商贷年限
        LPR: 4.8, // LPR数值
        baseRate: "", // LPR基准
        loanRate: 4.8, //商贷利率
        publicTime: 30, // 公积金年限
        publicLoan: "", // 公积金金额
        publicRate: 3.25, // 公积金利率
        totalInterest: "", //利息总额
        showTip: false, // 是否展示提示
        showLPR: false, //是否展示LPR提示
        showBaseRate: false, //是否展示基点提示
        showPicker: false, // 是否展示底部picker组件
        displays: 'none',
        pickerType: "",
        maxPublic: 90, // 公积金最大额度
        openPicker: false,
        isAdd: false, // 是否是输入利率
        publicList: {
            publicLoanArr: ['最新基准利率(3.25%)', '1.1倍(3.575%)', '1.2倍(3.9%)', '1.3倍(4.225%)'],
        },
        bussinessList: {
            businessLoanArr: ['8.5折(4.165%)', '9折(4.441%)', '9.5折(4.655%)', '旧版基准利率(4.9%)', '1.1倍(5.39%)', '1.2倍(5.88%)', '1.3倍(6.37%)'],
        },
        value: '',
        LPRlist: [{
                "year": "一年及以内",
                "LPR": "一年期LPR"
            },
            {
                "year": "一至五年",
                "LPR": "由银行自主选择"
            },
            {
                "year": "五年及以上",
                "LPR": "五年期LPR"
            }
        ]
    },
    selectType: function (e) {
        switch (e.currentTarget.dataset.type) {
            case 'calculateName':
                this.setData({
                    calculateName: this.data.calculateArr[e.detail.value],
                    calculateValue: e.detail.value
                });
                break;
            case 'rateName': // 商业贷款的利率方式
                if (e.detail.value == '1') {
                    this.setData({
                        rateName: this.data.rateArr[e.detail.value],
                        rataValue: e.detail.value,
                        loanRate: 4.9 // 旧式算法默认4.9
                    });

                } else {
                    this.setData({
                        rateName: this.data.rateArr[e.detail.value],
                        rataValue: e.detail.value,
                        loanRate: 4.8
                    });
                }
                break;
        }
    },
    sure(e) {
        if (this.data.pickerType == 'loanRate') {
            let num = e.detail[0] || '旧版基准利率(4.9%)'
            this.setData({
                isAdd: false,
                openPicker: false,
                businessLoanName: num,
                displays: 'none',
                loanRate: num.split("(")[1].split("%")[0]
            })
        } else {
            let num = e.detail[0] || '最新基准利率(3.25%)'
            this.setData({
                isAdd: false,
                openPicker: false,
                publicLoanName: num,
                displays: 'none',
                publicRate: num.split("(")[1].split("%")[0]
            })
        }
    },
    add(e) {
        let num = e.detail
        if (this.data.pickerType == 'loanRate') {
            this.setData({
                isAdd: true,
                openPicker: false,
                businessLoanName: num,
                loanRate: num,
                displays: 'none',
            })
        } else {
            this.setData({
                isAdd: true,
                openPicker: false,
                publicLoanName: num,
                publicRate: num,
                displays: 'none',
            })
        }
    },
    close() {
        this.setData({
            openPicker: false,
            displays: 'none'
        })
    },
    hidePicker(e) {
        this.setData({
            showPicker: false
        })
        this.close();

    },
    openPick(e) {
        this.setData({
            showPicker: true,
            pickerType: e.currentTarget.dataset.pickertype,
            openPicker: true,
            displays: 'blcok'
        })
    },
    // 获取当前tabIndex
    getIndex: function (e) {
        this.setData({
            currentIndex: e.detail.index,
            totalPrice: "", // 房屋总价
            totalLoan: "", // 总利息
            firstPrecent: 30, // 首付比例
            firstPrice: "", // 首付金额
            businessLoan: "", // 商贷金额
            businessYear: 30, // 商贷年限
            LPR: 4.8, // LPR数值
            baseRate: "", // LPR基准
            loanRate: 4.8, //商贷利率
            publicTime: 30, // 公积金年限
            publicLoan: "", // 公积金金额
            publicRate: 3.25, // 公积金利率
            totalInterest: "", //利息总额
        });
    },
    // 输入数值
    inputNum: function (e) {
        let num = 0;
        switch (e.currentTarget.dataset.type) {
            case 'totalPrice': // 房屋总价
                let total = e.detail.value;
                if (!total || total == 0) {
                    this.setData({
                        firstPrecent: 30,
                        firstPrice: null,
                        publicLoan: null,
                        totalPrice: null,
                    });
                    return
                }
                let firstMoney = (this.data.firstPrecent / 100 * total).toFixed(0); // 首付金额
                // 公积金贷款最大额度90
                if (this.data.currentIndex == 2) {
                    let pubMoney = total - firstMoney > this.data.maxPublic ? this.data.maxPublic : total - firstMoney; // 获取公积金金额
                    if (total - firstMoney > 90) {
                        wx.showToast({
                            title: '目前深圳公积金贷款上限为个人50万、家庭90万',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                    this.setData({
                        firstPrice: firstMoney,
                        publicLoan: pubMoney,
                        totalPrice: total
                    });
                } else {
                    if (Number(total) < Number(this.data.businessLoan) + Number(this.data.publicLoan)) {
                        this.setData({
                            totalPrice: total,
                            firstPrecent: 0,
                            firstPrice: null,
                            businessLoan: total
                        });
                    } else {
                        this.setData({
                            totalPrice: total,
                            firstPrice: firstMoney,
                            businessLoan: Number(total) - Number(firstMoney) - Number(this.data.publicLoan)
                        });
                    }
                }
                break;
            case 'firstPrecent': // 首付比例
                let precent = e.detail.value;
                if (Number(this.data.totalPrice) == 0) {
                    wx.showToast({
                        title: '房屋总价不能为空',
                        icon: 'none',
                        duration: 2000
                    });
                    this.setData({
                        firstPrecent: 30,
                        firstPrice: null,
                        businessLoan: null,
                        publicLoan: null,
                    });
                } else if (precent >= 100) { // 比例大于100的时候首付=本金
                    this.setData({
                        firstPrecent: 100,
                        firstPrice: this.data.totalPrice,
                        businessLoan: null,
                        publicLoan: null,
                    });
                } else if (precent == 0 || !precent) { //输入值为空
                    this.setData({
                        firstPrecent: null,
                        firstPrice: null,
                        businessLoan: Number(this.data.totalPrice),
                        publicLoan: null,
                    });
                } else {
                    let firstMoney = ((Number(precent) / 100) * Number(this.data.totalPrice)).toFixed(0); // 首付金额      
                    if (this.data.currentIndex == 0) {
                        this.setData({
                            firstPrecent: precent,
                            firstPrice: firstMoney,
                            businessLoan: Number(this.data.totalPrice) - Number(firstMoney)
                        });
                    } else if (this.data.currentIndex == 1) { // 混合贷
                        if (Number(this.data.publicLoan) == 0) {
                            this.setData({
                                firstPrecent: precent,
                                firstPrice: firstMoney,
                                businessLoan: Number(this.data.totalPrice) - Number(firstMoney)
                            });
                        } else if (Number(this.data.publicLoan) > 0) {
                            this.setData({
                                firstPrecent: precent,
                                firstPrice: firstMoney,
                                businessLoan: Number(this.data.totalPrice) - Number(firstMoney) >= Number(this.data.publicLoan) + Number(this.data.publicLoan) ?
                                    (Number(this.data.totalPrice) - Number(firstMoney) - Number(this.data.publicLoan)) : Number(this.data.totalPrice) - Number(firstMoney),
                                publicLoan: Number(this.data.totalPrice) - Number(firstMoney) >= Number(this.data.publicLoan) + Number(this.data.publicLoan) ?
                                    Number(this.data.publicLoan) : 0
                            });
                        }

                    } else if (this.data.currentIndex == 2) { // 公积金贷款
                        this.setData({
                            firstPrecent: precent,
                            firstPrice: firstMoney,
                        });
                    }
                }
                break;
            case 'firstPrice': // 首付金额
                let first = e.detail.value;
                console.log(first, 'firstfirstfirstfirst+++')
                if (Number(first) == 0 || !first) {
                    this.setData({
                        firstPrice: null,
                        firstPrecent: 30,
                        publicLoan: null,
                        businessLoan: null
                    });
                } else if (first > Number(this.data.totalPrice)) {
                    wx.showToast({
                        title: '首付金额高于房屋总价',
                        icon: 'none',
                        duration: 2000
                    });
                    this.setData({
                        firstPrice: this.data.totalPrice,
                        firstPrecent: 100,
                        publicLoan: null,
                        businessLoan: null
                    });

                } else {
                    if (this.data.currentIndex == 0) {
                        this.setData({
                            firstPrice: first,
                            firstPrecent: (Number(first) / Number(this.data.totalPrice) * 100).toFixed(2),
                            businessLoan: Number(this.data.totalPrice) - Number(first)
                        });

                    } else if (this.data.currentIndex == 1) {
                        this.setData({
                            firstPrice: first,
                            firstPrecent: (Number(first) / Number(this.data.totalPrice) * 100).toFixed(2),
                        });
                        if ((Number(this.data.totalPrice) - Number(first)) <= (Number(this.data.businessLoan) + Number(this.data.publicLoan))) {
                            if ((Number(this.data.totalPrice) - Number(first) - Number(this.data.publicLoan)) <= Number(this.data.businessLoan)) {
                                this.setData({
                                    businessLoan: Number(this.data.totalPrice) - Number(first) - Number(this.data.publicLoan)
                                });
                            } else {
                                this.setData({
                                    businessLoan: null,
                                    publicLoan: Number(this.data.totalPrice) - Number(first)
                                });
                            }
                        }
                    } else if (this.data.currentIndex == 2) {
                        if ((Number(this.data.totalPrice) - Number(first)) > this.data.maxPublic) {
                            wx.showToast({
                                title: '目前深圳公积金贷款上限为个人50万、家庭90万',
                                icon: 'none',
                                duration: 2000
                            });
                            this.setData({
                                firstPrice: first,
                                firstPrecent: (Number(first) / Number(this.data.totalPrice) * 100).toFixed(2),
                                publicLoan: this.data.maxPublic
                            });
                        } else {
                            this.setData({
                                firstPrice: first,
                                firstPrecent: (Number(first) / Number(this.data.totalPrice) * 100).toFixed(2),
                                publicLoan: Number(this.data.totalPrice) - Number(first)
                            });
                        }
                    }
                }
                break;
            case 'wholeLoan': // 商贷总额
                let loan = e.detail.value;
                if (!loan) return
                this.setData({
                    wholeLoan: loan,
                    businessLoan: loan,
                    publicLoan: 0
                });

                break;
            case 'businessLoan': // 商贷金额
                let bus = e.detail.value;
                if (!bus) return
                if (this.data.calculateName == "按房屋总价") {
                    if (Number(this.data.totalPrice) == 0) {
                        wx.showToast({
                            title: '请输入房屋总价',
                            icon: 'none',
                            duration: 2000
                        });
                        this.setData({
                            businessLoan: 0
                        });
                    } else if (bus > Number(this.data.totalPrice)) {
                        this.setData({
                            publicLoan: 0,
                            firstPrecent: 0,
                            firstPrice: 0,
                            businessLoan: this.data.totalPrice
                        });
                    } else {
                        if (this.data.currentIndex == 1) {
                            if (Number(this.data.totalPrice) - Number(this.data.publicLoan) - bus > 0) {
                                let first = Number(this.data.totalPrice) - Number(this.data.publicLoan) - bus;
                                this.setData({
                                    businessLoan: bus,
                                    firstPrice: first,
                                    firstPrecent: (first / Number(this.data.totalPrice) * 100).toFixed(2),
                                });
                            } else {
                                if (Number(this.data.totalPrice) < bus) {
                                    this.setData({
                                        businessLoan: this.data.totalPrice,
                                        firstPrice: null,
                                        firstPrecent: null,
                                        publicLoan: null
                                    });
                                } else {
                                    this.setData({
                                        businessLoan: bus,
                                        firstPrice: null,
                                        firstPrecent: null,
                                        publicLoan: Number(this.data.totalPrice) - bus
                                    });
                                }
                            }
                        } else {
                            this.setData({
                                businessLoan: bus,
                                firstPrice: Number(this.data.totalPrice) - bus,
                                firstPrecent: ((Number(this.data.totalPrice) - bus) / Number(this.data.totalPrice) * 100).toFixed(2),
                            });
                        }

                    }
                } else { //以贷款总额计算
                    if (this.data.currentIndex == 1) {
                        // 混合贷款
                        let topPub = Number(this.data.wholeLoan) - bus;
                        if (topPub >= this.data.maxPublic) {
                            wx.showToast({
                                title: '目前深圳公积金贷款上限为个人50万、家庭90万',
                                icon: 'none',
                                duration: 2000
                            });
                            this.setData({
                                businessLoan: Number(this.data.wholeLoan) - Number(this.data.maxPublic),
                                publicLoan: Number(this.data.maxPublic)
                            });
                        } else {
                            this.setData({
                                businessLoan: bus,
                                publicLoan: topPub
                            });
                        }
                    } else {
                        this.setData({
                            businessLoan: bus
                        });
                    }

                }
                break;
            case 'businessYear': // 商贷年限
                //暂时不用
                if (e.detail.value > 30) {
                    this.setData({
                        businessYear: 30
                    });
                } else {
                    this.setData({
                        businessYear: e.detail.value
                    });
                }
                break;
            case 'baseRate': // 基准利率
                if (e.detail.value > 1000) {
                    this.setData({
                        baseRate: 10000,
                        loanRate: this.data.LPR + 1
                    });
                } else if (e.detail.value < 0) {
                    this.setData({
                        baseRate: 0,
                        loanRate: this.data.LPR
                    });
                } else {
                    let point = String(e.detail.value).indexOf("."); //获取小数点的位置
                    num = (this.data.LPR + e.detail.value / 10000).toFixed(5);
                    this.setData({
                        baseRate: e.detail.value,
                        loanRate: num,
                        baseLength: point == 1 ? 4 : 5 // 保留两位小数
                    });
                }
                break;
            case 'publicTime': // 公积金年限
                let time = e.detail.value
                if (time > 30) {
                    time = 30;
                }
                this.setData({
                    publicTime: time
                });
                break;

            case 'publicLoan': // 公积金总额
                let money = e.detail.value;
                if (!money) return
                if (this.data.calculateName == "按房屋总价") {
                    // 混合贷款
                    if (this.data.currentIndex == 1) {
                        if (Number(this.data.totalPrice) == 0) {
                            wx.showToast({
                                title: '请输入房屋总价',
                                icon: 'none',
                                duration: 2000
                            });
                            this.setData({
                                publicLoan: 0,
                            });
                            break
                        } else if (money > Number(this.data.totalPrice)) {
                            this.setData({
                                businessLoan: null,
                                firstPrice: null,
                                firstPrecent: 0,
                                publicLoan: this.data.totalPrice
                            });
                            break
                        } else if (money > (Number(this.data.totalPrice) - Number(this.data.firstPrice))) {
                            console.log(Number(this.data.totalPrice) - Number(this.data.firstPrice), 'Number(this.data.totalPrice) - Number(this.data.firstPrice)Number(this.data.totalPrice)')
                            this.setData({
                                businessLoan: 0,
                                publicLoan: Number(this.data.totalPrice) - Number(this.data.firstPrice)
                            });
                            break
                        } else if (money > this.data.maxPublic) {
                            wx.showToast({
                                title: '目前深圳公积金贷款上限为个人50万、家庭90万',
                                icon: 'none',
                                duration: 2000
                            });
                            this.setData({
                                publicLoan: this.data.maxPublic,
                                businessLoan: Number(this.data.totalPrice) - Number(this.data.maxPublic) - Number(this.data.firstPrice)
                            });
                        } else {
                            console.log('22222222')
                            this.setData({
                                publicLoan: money,
                                businessLoan: Number(this.data.totalPrice) - Number(money) - Number(this.data.firstPrice)
                            });
                        }
                    } else { // 公积金贷款
                        if (Number(this.data.totalPrice) == 0) {
                            wx.showToast({
                                title: '请输入房屋总价',
                                icon: 'none',
                                duration: 2000
                            });
                            this.setData({
                                publicLoan: 0,
                            });
                            break
                        } else if (money > Number(this.data.totalPrice)) {
                            this.setData({
                                firstPrecent: 0,
                                firstPrice: 0,
                                publicLoan: this.data.totalPrice
                            });
                            break
                        } else if (money > this.data.maxPublic) {
                            wx.showToast({
                                title: '目前深圳公积金贷款上限为个人50万、家庭90万',
                                icon: 'none',
                                duration: 2000
                            });
                            this.setData({
                                publicLoan: this.data.maxPublic,
                                firstPrice: Number(this.data.totalPrice) - Number(this.data.maxPublic),
                                firstPrecent: ((Number(this.data.totalPrice) - Number(this.data.maxPublic)) / Number(this.data.totalPrice) * 100).toFixed(2),

                            });
                        } else {
                            this.setData({
                                publicLoan: money,
                                firstPrice: Number(this.data.totalPrice) - Number(money),
                                firstPrecent: ((Number(this.data.totalPrice) - Number(money)) / Number(this.data.totalPrice) * 100).toFixed(2),

                            });
                        }
                    }
                } else {
                    if (this.data.currentIndex == 1) {
                        if (!this.data.wholeLoan) {
                            wx.showToast({
                                title: '请输入贷款总额',
                                icon: 'none',
                                duration: 2000
                            });
                            this.setData({
                                publicLoan: 0,
                            });
                            break
                        } else if (money > Number(this.data.wholeLoan)) {
                            this.setData({
                                businessLoan: 0,
                                wholeLoan: money
                            });
                            break
                        }
                        if (money > this.data.maxPublic) {
                            wx.showToast({
                                title: '目前深圳公积金贷款上限为个人50万、家庭90万',
                                icon: 'none',
                                duration: 2000
                            });
                            this.setData({
                                publicLoan: this.data.maxPublic,
                                businessLoan: Number(this.data.wholeLoan) - Number(this.data.maxPublic)

                            });
                        } else {
                            this.setData({
                                publicLoan: money,
                                businessLoan: Number(this.data.wholeLoan) - Number(money)
                            });
                        }
                    } else {
                        this.setData({
                            publicLoan: money
                        });
                    }
                }
                break;
            case 'totalLoan': // 利息总额
                this.setData({
                    totalLoan: e.detail.value
                });
                break;
            case 'wholeLoan': // 贷款总额
                this.setData({
                    wholeLoan: e.detail.value
                });
                break;
        }
    },
    showTip: function (e) {
        this.setData({
            showTip: true
        });
        if (e.currentTarget.dataset.type == 'LPR') {
            this.setData({
                showBaseRate: false,
                showLPR: true,
                displays: 'block'
            });
        } else {
            this.setData({
                showBaseRate: true,
                showLPR: false,
                displays: 'block'
            });
        }
    },
    hideNav: function () {
        this.setData({
            showTip: false,
            displays: 'none'
        });
    },
    //跳转结果
    countPrice: function () {
        // 商贷年限
        let monthNum = this.data.businessYear * 12; // 还款月数
        let monthRate = this.data.loanRate / 1200; // 月利率
        //公积金年限
        let monthPublic = this.data.publicTime * 12; // 还款月数
        let publicRate = this.data.publicRate / 1200; // 月利率
        let {
            totalMoney,
            totalInterest,
            firstMonth,
            reduceLoan,
            loanNum,
            everyMonth
        } = 0
        if (this.data.currentIndex == 0) {
            if (!this.data.businessYear || !this.data.businessLoan) {
                wx.showToast({
                    title: '商贷年限与金额不能为空！',
                    icon: 'none',
                    duration: 1500,
                    mask: true
                });
                return
            }
            // 本息总额：还款月数×(总贷款额×月利率-月利率×(总贷款额÷还款月数)*(还款月数-1)÷2+总贷款额÷还款月数)
            totalMoney = (monthNum * (this.data.businessLoan * monthRate - monthRate * (this.data.businessLoan / monthNum) * (monthNum - 1) / 2 + this.data.businessLoan / monthNum)).toFixed(2);
            // 总利息
            totalInterest = (totalMoney - this.data.businessLoan).toFixed(2);
            // 首月月供金额：(贷款本金÷还款月数)+(贷款本金)×月利率
            firstMonth = ((this.data.businessLoan / monthNum + this.data.businessLoan * monthRate) * 10000).toFixed(0);
            // 月供递减金额：贷款本金÷还款月数×月利率
            reduceLoan = (this.data.businessLoan / monthNum * monthRate * 10000).toFixed(2);
            // 月供金额：贷款本金 × [月利率 × (1+月利率)^还款月数] ÷ [(1+月利率)^还款月数 - 1]
            everyMonth = (monthNum * (this.data.businessLoan * monthRate - monthRate * (this.data.businessLoan / monthNum) * (monthNum - 1) / 2 + this.data.businessLoan / monthNum) / monthNum * 10000).toFixed(2);
            loanNum = this.data.businessLoan; // 总贷款
        } else if (this.data.currentIndex == 1) {
            // 复合贷款(商贷+公积金)
            if (!this.data.businessYear || !this.data.businessLoan) {
                wx.showToast({
                    title: '商贷年限与金额不能为空！',
                    icon: 'none',
                    duration: 1500,
                    mask: true
                });
                return
            }
            if (!this.data.publicLoan || !this.data.publicTime) {
                wx.showToast({
                    title: '公积金年限与金额不能为空！',
                    icon: 'none',
                    duration: 1500,
                    mask: true
                });
                return
            }
            // 本息总额：还款月数×(总贷款额×月利率-月利率×(总贷款额÷还款月数)*(还款月数-1)÷2+总贷款额÷还款月数)
            totalMoney = ((monthNum * (this.data.businessLoan * monthRate - monthRate * (this.data.businessLoan / monthNum) * (monthNum - 1) / 2 + this.data.businessLoan / monthNum)) +
                (monthPublic * (this.data.publicLoan * publicRate - publicRate * (this.data.publicLoan / monthPublic) * (monthPublic - 1) / 2 + this.data.publicLoan / monthPublic))).toFixed(2);
            // 总利息
            totalInterest = (totalMoney - this.data.businessLoan - this.data.publicLoan).toFixed(2);
            // 首月月供金额：(贷款本金÷还款月数)+(贷款本金)×月利率
            firstMonth = (((this.data.businessLoan / monthNum + this.data.businessLoan * monthRate) + (this.data.publicLoan / monthPublic + this.data.publicLoan * publicRate)) * 10000).toFixed(0);
            // 月供递减金额：贷款本金÷还款月数×月利率
            reduceLoan = ((this.data.businessLoan / monthNum * monthRate + this.data.publicLoan / monthPublic * publicRate) * 10000).toFixed(2);
            // 月供金额：贷款本金 × [月利率 × (1+月利率)^还款月数] ÷ [(1+月利率)^还款月数 - 1]
            everyMonth = (((monthNum * (this.data.businessLoan * monthRate - monthRate * (this.data.businessLoan / monthNum) * (monthNum - 1) / 2 + this.data.businessLoan / monthNum) / monthNum) +
                (monthPublic * (this.data.publicLoan * publicRate - publicRate * (this.data.publicLoan / monthPublic) * (monthPublic - 1) / 2 + this.data.publicLoan / monthPublic) / monthPublic)) * 10000).toFixed(2);
            loanNum = parseInt(this.data.businessLoan) + parseInt(this.data.publicLoan); // 总贷款

        } else if (this.data.currentIndex == 2) {
            if (!this.data.publicLoan || !this.data.publicTime) {
                wx.showToast({
                    title: '公积金年限与金额不能为空！',
                    icon: 'none',
                    duration: 1500,
                    mask: true
                });
                return
            }
            // 公积金贷款
            totalMoney = (monthPublic * (this.data.publicLoan * publicRate - publicRate * (this.data.publicLoan / monthPublic) * (monthPublic - 1) / 2 + this.data.publicLoan / monthPublic)).toFixed(2); // 本息总额
            totalInterest = (totalMoney - this.data.publicLoan).toFixed(2); // 总利息
            firstMonth = ((this.data.publicLoan / monthPublic + this.data.publicLoan * publicRate) * 10000).toFixed(0); // 首月月供金额
            reduceLoan = (this.data.publicLoan / monthPublic * publicRate * 10000).toFixed(2); // 月供递减金额
            everyMonth = (monthPublic * (this.data.publicLoan * publicRate - publicRate * (this.data.publicLoan / monthPublic) * (monthPublic - 1) / 2 + this.data.publicLoan / monthPublic) / monthPublic * 10000).toFixed(2); // 月供金额
            loanNum = this.data.publicLoan; // 总贷款
        }

        // 页面跳转
        if (this.data.calculateName == "按房屋总价") {
            wx.navigateTo({
                url: '../result/index?totalMoney=' + totalMoney +
                    '&totalInterest=' + totalInterest +
                    '&firstMonth=' + firstMonth +
                    '&reduceLoan=' + reduceLoan +
                    '&firstPrecent=' + this.data.firstPrecent +
                    '&loanNum=' + loanNum +
                    '&everyMonth=' + everyMonth +
                    '&firstPrice=' + this.data.firstPrice +
                    '&currentIndex=' + this.data.currentIndex +
                    '&publicLoan=' + this.data.publicLoan +
                    '&publicTime=' + this.data.publicTime +
                    '&publicRate=' + this.data.publicRate +
                    '&businessLoan=' + this.data.businessLoan +
                    '&businessYear=' + this.data.businessYear +
                    '&totalPrice=' + this.data.totalPrice +
                    '&loanRate=' + this.data.loanRate

            });
        } else {
            wx.navigateTo({
                url: '../result/index?totalMoney=' + totalMoney +
                    '&totalInterest=' + totalInterest +
                    '&firstMonth=' + firstMonth +
                    '&reduceLoan=' + reduceLoan +
                    '&firstPrice=0&firstPrecent=0&loanNum=' + loanNum +
                    '&everyMonth=' + everyMonth +
                    '&currentIndex=' + this.data.currentIndex +
                    '&publicLoan=' + this.data.publicLoan +
                    '&publicTime=' + this.data.publicTime +
                    '&publicRate=' + this.data.publicRate +
                    '&businessLoan=' + this.data.businessLoan +
                    '&businessYear=' + this.data.businessYear +
                    '&loanRate=' + this.data.loanRate +
                    '&totalPrice=' + this.data.totalPrice +
                    '&wholeLoan=' + this.data.wholeLoan

            });
        }
    },
    onLoad: function () {
        this.setData({
            loanRate: this.data.LPR
        });
    },
});