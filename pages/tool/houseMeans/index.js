//index.js
//获取应用实例
Page({
    data: {
        questionInfo: {},
        lastQues: {},
        result: "",
        indexPage: true,
        displays: 'none',
        option: {},
        chooseArr: [],
        bank: [{
                num: '0',
                title: '你的户籍是？',
                answerArr: [{
                    text: '深圳户籍',
                    next: '01'
                }, {
                    text: '非深圳户籍',
                    next: '02'
                }, {
                    text: '在深现役军人',
                    next: '03'
                }, {
                    text: '港澳台居民',
                    next: '03'
                }, {
                    text: '外籍人士',
                    next: '05'
                }]
            },
            //选中1
            {
                num: '01',
                title: '您的婚姻情况？',
                tip: '当前的婚姻状态，只分单身和已婚两类；离异算作单身，复婚算作已婚。',
                answerArr: [{
                    text: '已婚',
                    next: '011'
                }, {
                    text: '单身(不含离异2年内)',
                    next: '012'
                }, {
                    text: '离异2年(含)内',
                    next: '014'
                }]

            }, {
                num: '011',
                title: '您当前家庭在深圳拥有的住房套数？',
                tip: '购买房屋时， 其家庭名下， 登记和网签的所有住房， 均算作家庭名下的房产， 并以家庭为单位计算其住房套数；非同一家庭的2名或以上个人',
                answerArr: [{
                        text: '当前无房',
                        next: '2222'
                    },
                    {
                        text: '当前有一套房',
                        next: '777'
                    },
                    {
                        text: '当前有两套及以上住房',
                        next: '9999',
                        result: true
                    }

                ]
            },
            {
                num: '012',
                title: '您当前家庭在深圳拥有的住房套数？',
                tip: '购买房屋时， 其家庭名下， 登记和网签的所有住房， 均算作家庭名下的房产， 并以家庭为单位计算其住房套数；非同一家庭的2名或以上个人',
                answerArr: [{
                        text: '当前无房',
                        next: '355'
                    },
                    {
                        text: '当前有一套及以上住房',
                        next: '9999',
                        result: true
                    }

                ]
            },
            {
                num: '013',
                title: '您当前家庭在深圳拥有的住房套数？',
                tip: '购买房屋时， 其家庭名下， 登记和网签的所有住房， 均算作家庭名下的房产， 并以家庭为单位计算其住房套数；非同一家庭的2名或以上个人',
                answerArr: [{
                        text: '当前无房',
                        next: '777'
                    },
                    {
                        text: '当前有一套及以上住房',
                        next: '9999',
                        result: true
                    }

                ]
            },
            {
                num: '014',
                title: '您当前家庭在深圳拥有的住房套数？',
                tip: '购买房屋时， 其家庭名下， 登记和网签的所有住房， 均算作家庭名下的房产， 并以家庭为单位计算其住房套数；非同一家庭的2名或以上个人',
                answerArr: [{
                        text: '当前无房',
                        next: '357'
                    },
                    {
                        text: '当前有一套及以上住房',
                        next: '9999',
                        result: true
                    }

                ]
            },
            //选中2
            {
                num: '02',
                title: '是否在深圳连续五年缴纳社保或个税？',
                isJudge: true,
                answerArr: [{
                        text: '是',
                        next: '021'
                    },
                    {
                        text: '否',
                        next: '8888',
                        result: true
                    }
                ]
            },
            {
                num: '021',
                title: '您的婚姻情况？',
                tip: '当前的婚姻状态，只分单身和已婚两类；离异算作单身，复婚算作已婚。',
                answerArr: [{
                    text: '已婚/单身(不含离异2年内)',
                    next: '0211'
                }, {
                    text: '离异2年(含)内',
                    next: '014'
                }]

            },
            {
                num: '0211',
                title: '您当前家庭在深圳拥有的住房套数？',
                tip: '购买房屋时， 其家庭名下， 登记和网签的所有住房， 均算作家庭名下的房产， 并以家庭为单位计算其住房套数；非同一家庭的2名或以上个人',
                answerArr: [{
                        text: '当前无房',
                        next: '355'
                    },
                    {
                        text: '当前有一套及以上住房',
                        next: '9999',
                        result: true
                    }

                ]
            },
            {
                num: '0212',
                title: '您当前家庭在深圳拥有的住房套数？',
                tip: '购买房屋时， 其家庭名下， 登记和网签的所有住房， 均算作家庭名下的房产， 并以家庭为单位计算其住房套数；非同一家庭的2名或以上个人',
                answerArr: [{
                        text: '当前无房',
                        next: '777'
                    },
                    {
                        text: '当前有一套及以上住房',
                        next: '9999',
                        result: true
                    }

                ]
            }, //选中3、4
            {
                num: '03',
                title: '您当前家庭在深圳拥有的住房套数？',
                tip: '购买房屋时， 其家庭名下， 登记和网签的所有住房， 均算作家庭名下的房产， 并以家庭为单位计算其住房套数；非同一家庭的2名或以上个人',
                answerArr: [{
                        text: '当前无房',
                        next: '031'
                    },
                    {
                        text: '当前有一套及以上住房',
                        next: '9999',
                        result: true
                    }

                ]
            },
            {
                num: '031',
                title: '您的婚姻情况？',
                tip: '当前的婚姻状态，只分单身和已婚两类；离异算作单身，复婚算作已婚。',
                answerArr: [{
                    text: '已婚/单身(不含离异2年内)',
                    next: '355'
                }, {
                    text: '离异2年(含)内',
                    next: '357'
                }]

            },

            //选中5
            {
                num: '05',
                title: '您是否已在深圳居住满1年以上，并且有跟公司签署且在劳动局备案最近一年以上的《劳务合同》和劳动局颁发的《就业证》？',
                isJudge: true,
                answerArr: [{
                        text: '是',
                        next: '03'
                    },
                    {
                        text: '否',
                        next: '8888',
                        result: true
                    }
                ]
            },
            {
                num: '357',
                title: '您家庭在全国是否有房贷记录？',
                answerArr: [{
                        text: '本人名下无房贷记录，且离婚家庭名下无住宅',
                        next: 'a1',
                        result: true
                    },
                    {
                        text: '本人名下无房贷记录，且离婚家庭名下仅有1套住宅',
                        next: 'a2',
                        result: true
                    }, {
                        text: '本人名下无房贷记录，且离婚家庭名下有2套及以上住宅',
                        next: 'a5',
                        result: true
                    }, {
                        text: '本人名下有房贷记录且已结清',
                        next: 'a5',
                        result: true
                    }, {
                        text: '本人名下有1笔房贷记录且未结清',
                        next: 'a7',
                        result: true
                    }, {
                        text: '本人名下有2笔及以上房贷记录且未结清',
                        next: 'a8',
                        result: true
                    }
                ]
            },
            // 最后一题
            {
                num: '2222',
                title: '您家庭在全国是否有房贷记录？',
                answerArr: [{
                        text: '无住房贷款',
                        next: 'a1',
                        result: true
                    },
                    {
                        text: '房贷已结清',
                        next: 'a2',
                        result: true
                    }, {
                        text: '有1笔房贷未结清',
                        next: 'a3',
                        result: true
                    },
                    {
                        text: '有2笔及以上房贷未结清',
                        next: 'a4',
                        result: true
                    }
                ]
            },
            {
                num: '777',
                title: '您家庭在全国是否有房贷记录？',
                answerArr: [{
                        text: '无住房贷款',
                        next: 'a5',
                        result: true
                    },
                    {
                        text: '房贷已结清',
                        next: 'a5',
                        result: true
                    }, {
                        text: '有1笔房贷未结清',
                        next: 'a7',
                        result: true
                    },
                    {
                        text: '有2笔及以上房贷未结清',
                        next: 'a8',
                        result: true
                    }
                ]
            },
            {
                num: '355',
                title: '您家庭在全国是否有房贷记录？',
                answerArr: [{
                        text: '无住房贷款',
                        next: 'a9',
                        result: true
                    },
                    {
                        text: '房贷已结清',
                        next: 'a10',
                        result: true
                    }, {
                        text: '有1笔房贷未结清',
                        next: 'a11',
                        result: true
                    },
                    {
                        text: '有2笔及以上房贷未结清',
                        next: 'a12',
                        result: true
                    }
                ]
            },
        ],
        // 结果列表
        answerList: [{
                num: 'a1',
                text: '恭喜！您可以在深圳买两套，最低首付比例3成，执行首套利率。'
            }, {
                num: 'a2',
                text: '恭喜！您可以在深圳买两套，最低首付比例5成，执行首套利率。'
            }, {
                num: 'a3',
                text: '恭喜！您可以在深圳买两套，最低首付比例5成，执行二套利率。'
            }, {
                num: 'a4',
                text: '恭喜！您可以在深圳买两套，但是只能选择全款支付'
            }, {
                num: 'a5',
                text: '恭喜！您可以在深圳买一套，最低首付比例7成，执行首套利率。'
            }, {
                num: 'a7',
                text: '恭喜！您可以在深圳买一套，最低首付比例7成，执行二套利率。'
            }, {
                num: 'a8',
                text: '恭喜！您可以在深圳买一套，但是只能选择全款支付'
            }, {
                num: 'a9',
                text: '恭喜！您可以在深圳买一套，最低首付比例3成，执行首套利率。'
            }, {
                num: 'a10',
                text: '恭喜！您可以在深圳买一套，最低首付比例5成，执行首套利率。'
            }, {
                num: 'a11',
                text: '恭喜！您可以在深圳买一套，最低首付比例5成，执行二套利率。'
            },
            {
                num: 'a12',
                text: '恭喜！您可以在深圳买一套，但是只能选择全款支付'
            }, {
                num: '9999',
                text: '很遗憾不能买了！您已经是土豪了。'
            }, {
                num: '8888',
                text: '很抱歉！您暂时不能买。'
            }
        ]
    },
    beginTest() {
        this.setData({
            indexPage: false
        });
    },
    toNext(e) {
        let quesList = this.data.chooseArr,
            chooseItem = {};
        chooseItem.title = this.data.questionInfo.title;
        chooseItem.answerArr = this.data.questionInfo.answerArr;
        chooseItem.answer = e.currentTarget.dataset.text;
        chooseItem.isJudge = e.currentTarget.dataset.isjudge;
        quesList.push(chooseItem)
        this.setData({
            indexPage: false,
            option: e.currentTarget.dataset,
            lastQues: chooseItem,
            chooseArr: quesList
        });

        if (!this.data.option.result) {

            for (let item of this.data.bank) {
                if (this.data.option.next == item.num) {
                    this.setData({
                        questionInfo: item
                    });
                }
            }
        } else {
            for (let item of this.data.answerList) {
                if (this.data.option.next == item.num) {
                    this.setData({
                        result: item.text,
                    });
                }
            }
        }
    },
    lastQues() {
        let quesList = this.data.chooseArr;
        this.setData({
            questionInfo: quesList[quesList.length - 1]
        });
        if (quesList.length > 1) {
            quesList.splice(quesList.length - 1, 1);
            this.setData({
                chooseArr: quesList,
                lastQues: quesList[quesList.length - 1]
            });
        } else {
            let firstQues = this.data.bank[0];
            this.setData({
                chooseArr: [],
                lastQues: {},
                questionInfo: firstQues
            });
        }
    },
    showDetail() {
        this.setData({
            displays: 'block',
        });
    },
    hideDetail() {
        this.setData({
            displays: 'none',
        });
    },
    hideNav() {
        this.setData({
            displays: 'none',
        });
    },
    onceAgain() {
        this.onLoad();
    },
    //跳转城市
    toChooseCity: function () {
        wx.navigateTo({
            url: '../../homePage/chooseCity/index'
        });
    },
    onLoad: function () {
        let firstQues = this.data.bank[0];
        this.setData({
            questionInfo: firstQues,
            lastQues: {},
            result: "",
            indexPage: true,
            displays: 'none',
            option: {},
            chooseArr: [],
        });
    },
});