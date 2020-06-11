let global = require('../../../utils/global.js');
Component({
    properties: {
        moreCondition: {
            type: Array,
            value: ''
        },
        infoBox: {
            type: Object,
            value: ''
        }
    },
    data: {
        // 下拉菜单
        tabList: {
            first: '区域', //对应currentTab=》0
            second: '售价', //对应currentTab=》1
            thirds: '户型', //对应currentTab=》2
            fours: '更多', //对应currentTab=》3
            fifth: '方式', //对应currentTab=》4
            seven: '租金', //对应currentTab=》6
            eight: '品牌', //对应currentTab=》7
            nine: '类型', //对应currentTab=》9

            eleven: '均价', //对应currentTab=》10
            twelve: '楼龄', //对应currentTab=》11
            thirteen: '用途', //对应currentTab=》12

        },
        //复杂排序
        iconCondition: [{
                code: '',
                name: '默认排序'
            },
            {
                code: 'o2',
                name: '总价从低到高'
            },
            {
                code: 'o1',
                name: '总价从高到低'
            },
            {
                code: 'o4',
                name: '单价从低到高'
            },
            {
                code: 'o3',
                name: '单价从高到低'
            },
            {
                code: 'o6',
                name: '面积从小到大'
            },
            {
                code: 'o5',
                name: '面积从大到小'
            }
        ],
        //简易排序
        simpleCondition: [{
                code: '',
                name: '默认排序'
            },
            {
                code: 'o4',
                name: '价格从低到高'
            },
            {
                code: 'o3',
                name: '价格从高到低'
            }
        ],
        //简易排序
        gardenCondition: [{
                code: '',
                name: '默认排序'
            },

            {
                code: 'd1',
                name: '均价从高到底'
            },
            {
                code: 'd2',
                name: '均价从低到高'
            },
            {
                code: 'd3',
                name: '建筑年代由远及近'
            },
            {
                code: 'd4',
                name: '建筑年代由近及远'
            },
        ],
        schoolType: [], // 学校类型数组
        upArrow: "https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/icon-screen-uparrow-selected@2x.png?tdsourcetag=s_pcqq_aiomsg",
        downArrow: "https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/ic-home-arrow-huise@2x.png?tdsourcetag=s_pcqq_aiomsg",
        brandUrl: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/img-238pic-default@2x.png',
        // 存储过滤分类数组
        patternList: '',
        metroList: '',
        priceList: '',
        regionList: '',
        brandList: '',
        areaList: '',
        moneyList: '',
        rentalList: '',
        ageBuildingList: '',
        averagePriceList: '',
        usesList: '',
        moreList: [], //更多条件
        methodList: [],


        selectedCode: "",
        currentTab: "100",
        selectId: '', // 被选中的code
        minValue: "",
        maxValue: "",
        maxPrice: '', //价格筛选最大值
        minPrice: '', //价格筛选最小值
        chooseArr: [], // 未过滤前的筛选条件
        displays: 'none',
        clearCon: true, // 区域三级菜单是否高亮 ‘不限’
        selectType: "", // 选择下拉的类型

        regionStr: [], // 选择区域的筛选条件
        moneyStr: [], //选择输入金额的筛选条件
        rentalStr: [], // 选中租金的筛选条件
        methodStr: [], // 选择方式的筛选条件
        brandStr: [], // 选择品牌的筛选条件
        metroStr: [], // 选择地铁的筛选条件
        priceStr: [], // 选择售价的筛选条件
        patternStr: [], // 选择房型的筛选条件
        moreStr: [], // 选择更多的筛选条件
        iconStr: [], // 选择图片的筛选条件
        ageBuildingStr: [], // 选择楼龄的筛选条件
        averagePriceStr: [], // 选择均价的筛选条件
        usesStr: [], // 选择用途的筛选条件
        newCon: [], // 传父组件的筛选条件

        // 选中单项的名称
        selectedName: "",
        priceName: "", // 选择售价的筛选名称
        patternName: "", // 选择房型的筛选名称
        moreName: "", // 选择更多的筛选名称
        methodName: "", // 选择方式的筛选名称
        rentalName: "", // 选中租金的筛选名称
        typeName: "", //学校类型名称
        averagePriceName: "", // 选择均价的筛选条件
        ageBuildingName: "", // 选择楼龄的筛选名称
        brandName: "", // 选择品牌的筛选名称
        usesName: "" // 选择用途的筛选名称
    },

    methods: {
        // 上拉tab
        hideNav: function () {
            this.setData({
                displays: 'none',
                currentTab: "100"
            });
            this.triggerEvent('openItem', false);
        },
        // 下拉tab
        tabNav: function (e) {
            if (this.data.currentTab == e.target.dataset.current) {
                this.hideNav()
            } else {
                this.triggerEvent('openItem', true);
                this.setData({
                    currentTab: e.target.dataset.current,
                    displays: 'block'
                });
                if (this.data.currentTab == '7') {
                    if (!this.data.brandList) {
                        this.getBrandsCon()
                    }
                }
                if (this.data.metroStr.length != 0 || this.data.regionStr.length != 0) {
                    return
                } else {
                    this.setData({
                        selectedM: false,
                        selectedR: true
                    });
                }
            }
        },
        // 下拉切换中的切换
        clickItem: function (e) {
            if (e.target.dataset.type == 'region') {
                this.setData({
                    selectedR: true,
                    selectedM: false,
                    areaList: [],
                    selectedCode: ""
                });
            } else if (e.target.dataset.type == 'metro') {
                this.setData({
                    selectedR: false,
                    selectedM: true,
                    areaList: [],
                    selectedCode: ""
                });
            }
        },
        // 区域的选中与切换
        selectedItem: function (e) {
            const ctx = this;
            let index = e.target.dataset.index;

            this.setData({
                selectedCode: index,
                metroStr: [],
                regionStr: []

            });
            if (this.data.selectedCode == 'noRegion') {
                this.setData({
                    areaList: [],
                    regionStr: ""
                });
            } else if (this.data.selectedCode == 'noMetro') {
                this.setData({
                    areaList: [],
                    metroStr: ""
                });
            } else {
                let parme = {
                    code: e.target.dataset.index
                };
                global.requestGet(global.URL.SEARCH_BY_CODE, parme, function (res) {
                    //res就是接口返回的数据
                    ctx.setData({
                        areaList: res.data.list
                    });
                });
            }
        },
        // 选中区域/地铁
        checkboxChange: function (e) {
            if (this.data.selectedM) {
                this.setData({
                    metroStr: e.detail.value

                });

                if (this.data.metroStr.length != 0) {
                    this.setData({
                        clearCon: false
                    });
                } else {
                    this.setData({
                        clearCon: true
                    });
                }


            } else if (this.data.selectedR) {
                this.setData({
                    regionStr: e.detail.value
                });
                if (this.data.regionStr.length != 0) {
                    this.setData({
                        clearCon: false
                    });
                } else {
                    this.setData({
                        clearCon: true
                    });
                }

            }
        },
        //选中品牌
        checkBrand: function (e) {
            const value = e.detail.value
            if (!value[value.length - 1] || !value) {
                // 检测是否点击全部品牌
                let item = this.data.brandList;
                for (let i in item) {
                    item[i].checked = false;
                }
                this.setData({
                    clearCon: true,
                    brandStr: [],
                    brandList: item
                });
            } else {
                // 去掉空元素
                let lastCon = [];
                for (let item of value) {
                    if (item) {
                        lastCon.push(item)
                    }
                }
                this.setData({
                    brandStr: lastCon
                });
                if (this.data.brandStr.length != 0) {
                    this.setData({
                        clearCon: false
                    });
                } else {
                    this.setData({
                        clearCon: true
                    });
                }
            }
        },
        // 条件选中
        chooseCon: function (e) {
            const code = e.currentTarget.dataset.code;
            let type = e.currentTarget.dataset.type; // 类型
            let index = e.currentTarget.dataset.id; // 下标

            //选中价格
            if (this.data.currentTab == 1) {

                let newCon = this.data.priceStr;
                if (newCon.indexOf(code) == -1) {
                    newCon.unshift(code);
                } else {
                    for (let i = 0; i < newCon.length; i++) {
                        if (newCon[i] == code) {
                            newCon.splice(i, 1);
                        }
                    }
                }
                this.setData({
                    priceStr: newCon,
                    minPrice: '',
                    maxPrice: '',
                    minValue: '',
                    maxValue: ''
                });
                let currentList = this.data[type];
                let bool = currentList.resultList[index].isChoose;

                this.setData({
                    selectId: e.currentTarget.dataset.id,
                    [type + '.resultList[' + index + '].isChoose']: !bool
                });
            }
            //选中租金
            if (this.data.currentTab == 6) {

                let newCon = this.data.rentalStr;
                if (newCon.indexOf(code) == -1) {
                    newCon.unshift(code);
                } else {
                    for (let i = 0; i < newCon.length; i++) {
                        if (newCon[i] == code) {
                            newCon.splice(i, 1);
                        }
                    }
                }
                this.setData({
                    rentalStr: newCon,
                    minPrice: '',
                    maxPrice: '',
                    minValue: '',
                    maxValue: ''
                });
                let currentList = this.data[type];
                let bool = currentList.resultList[index].isChoose;

                this.setData({
                    selectId: e.currentTarget.dataset.id,
                    [type + '.resultList[' + index + '].isChoose']: !bool
                });
            }
            // 选中户型
            if (this.data.currentTab == 2) {

                let newCon = this.data.patternStr;
                if (newCon.indexOf(code) == -1) {
                    newCon.unshift(code);
                } else {
                    for (let i = 0; i < newCon.length; i++) {
                        if (newCon[i] == code) {
                            newCon.splice(i, 1);
                        }
                    }
                }
                this.setData({
                    patternStr: newCon,
                });
                let currentList = this.data[type];
                let bool = currentList.resultList[index].isChoose;

                this.setData({
                    selectId: e.currentTarget.dataset.id,
                    [type + '.resultList[' + index + '].isChoose']: !bool
                });
            }
            // 选中方式
            if (this.data.currentTab == 4) {
                let currentList = this.data[type];
                let fid = e.currentTarget.dataset.fid;
                currentList = currentList[fid];
                let bool = currentList.resultList[index].isChoose;
                let newCon = this.data.methodStr;
                if (newCon.indexOf(code) == -1) {
                    newCon.unshift(code);
                    if (code == 'rb0') {
                        this.typeFilter(code) // 选择全部
                    } else if (code == 'sr0') {
                        this.typeFilter(code)
                    } else {
                        let Mobj = {};
                        // 选择非全部按钮则置空全部按钮
                        if (code.slice(0, 2) == 'rb') {
                            Mobj = this.data[type];
                            Mobj[0].resultList[0].isChoose = false;
                            for (let i = 0; i < newCon.length; i++) {
                                if (newCon[i] == 'rb0') {
                                    newCon.splice(i, 1, "");
                                }
                            }
                        } else if (code.slice(0, 2) == 'sr') {
                            Mobj = this.data[type];
                            Mobj[1].resultList[0].isChoose = false;
                            for (let i = 0; i < newCon.length; i++) {
                                if (newCon[i] == 'sr0') {
                                    newCon.splice(i, 1, "");
                                }
                            }
                        }
                        // 去除空元素
                        let lastCon = [];
                        for (let item of newCon) {
                            if (item) {
                                lastCon.push(item)
                            }
                        }
                        this.setData({
                            methodList: Mobj,
                            methodStr: lastCon,
                            selectId: e.currentTarget.dataset.id,
                            [type +
                                '[' +
                                fid +
                                ']' +
                                '.resultList[' +
                                index +
                                '].isChoose'
                            ]: !bool
                        });
                    }
                } else {
                    for (let i = 0; i < newCon.length; i++) {
                        if (newCon[i] == code) {
                            newCon.splice(i, 1);
                        }
                    }
                    this.setData({
                        methodStr: newCon,
                        selectId: e.currentTarget.dataset.id,
                        [type +
                            '[' +
                            fid +
                            ']' +
                            '.resultList[' +
                            index +
                            '].isChoose'
                        ]: !bool
                    });
                }

            }
            // 选中更多
            if (this.data.currentTab == 3) {
                let currentList = this.data[type];
                let fid = e.currentTarget.dataset.fid;
                currentList = currentList[fid];
                let bool = currentList.resultList[index].isChoose;
                let newCon = this.data.moreStr;
                if (newCon.indexOf(code) == -1) {
                    newCon.unshift(code);
                } else {
                    for (let i = 0; i < newCon.length; i++) {
                        if (newCon[i] == code) {
                            newCon.splice(i, 1);
                        }
                    }
                }
                this.setData({
                    moreStr: newCon,
                    selectId: e.currentTarget.dataset.id,
                    [type +
                        '[' +
                        fid +
                        ']' +
                        '.resultList[' +
                        index +
                        '].isChoose'
                    ]: !bool
                });
            }
            //选中均价
            if (this.data.currentTab == 10) {

                let newCon = this.data.averagePriceStr;
                if (newCon.indexOf(code) == -1) {
                    newCon.unshift(code);
                } else {
                    for (let i = 0; i < newCon.length; i++) {
                        if (newCon[i] == code) {
                            newCon.splice(i, 1);
                        }
                    }
                }
                this.setData({
                    averagePriceStr: newCon,
                    minPrice: '',
                    maxPrice: '',
                    minValue: '',
                    maxValue: ''
                });
                let currentList = this.data[type];
                let bool = currentList.resultList[index].isChoose;

                this.setData({
                    selectId: e.currentTarget.dataset.id,
                    [type + '.resultList[' + index + '].isChoose']: !bool
                });
            }
            // 选中楼龄
            if (this.data.currentTab == 11) {

                let newCon = this.data.ageBuildingStr;
                if (newCon.indexOf(code) == -1) {
                    newCon.unshift(code);
                } else {
                    for (let i = 0; i < newCon.length; i++) {
                        if (newCon[i] == code) {
                            newCon.splice(i, 1);
                        }
                    }
                }
                this.setData({
                    ageBuildingStr: newCon,
                });
                let currentList = this.data[type];
                let bool = currentList.resultList[index].isChoose;

                this.setData({
                    selectId: e.currentTarget.dataset.id,
                    [type + '.resultList[' + index + '].isChoose']: !bool
                });
            }
            // 选中用途
            if (this.data.currentTab == 12) {

                let newCon = this.data.usesStr;
                if (newCon.indexOf(code) == -1) {
                    newCon.unshift(code);
                } else {
                    for (let i = 0; i < newCon.length; i++) {
                        if (newCon[i] == code) {
                            newCon.splice(i, 1);
                        }
                    }
                }
                this.setData({
                    usesStr: newCon,
                });
                let currentList = this.data[type];
                let bool = currentList.resultList[index].isChoose;

                this.setData({
                    selectId: e.currentTarget.dataset.id,
                    [type + '.resultList[' + index + '].isChoose']: !bool
                });
            }
            // 选中icon（选中复合下拉排序 || 选中简易下拉排序 || 选中学校类型下拉）
            if (this.data.currentTab == 99 || this.data.currentTab == 98 || this.data.currentTab == 9) {
                //学校筛选类型排序取名称
                if (this.data.currentTab == 9) {
                    this.setData({
                        typeName: this.isSingle(e.currentTarget.dataset.code)
                    });
                }
                this.setData({
                    iconStr: e.currentTarget.dataset.code
                });
                this.commitCon()
            }
        },
        //方式选项的筛选
        typeFilter: function (con) {
            let methodObj = this.data.methodList,
                Mlist = [];;
            if (con == 'rb0') {
                Mlist = methodObj[0]
            } else {
                Mlist = methodObj[1]
            }

            for (let Mitem of Mlist.resultList) {
                if (Mitem.code != con) {
                    Mitem.isChoose = false
                } else {
                    Mitem.isChoose = true
                }
            }
            let newCon = this.data.methodStr;
            for (let i = 0; i < newCon.length; i++) {
                if (newCon[i] != con && newCon[i].slice(0, 2) == con.slice(0, 2)) {
                    newCon.splice(i, 1, "");
                }
            }
            if (con == 'rb0') {
                methodObj[0] = Mlist
            } else {
                methodObj[1] = Mlist
            }
            // 去掉空元素
            let lastCon = [];
            for (let item of newCon) {
                if (item) {
                    lastCon.push(item)
                }
            }
            this.setData({
                methodList: methodObj,
                methodStr: lastCon,
                selectId: con,
            });
        },
        // 清空条件
        clearCon: function (e) {
            // 用来显示是否高亮‘不限’按钮
            if (e) {
                this.setData({
                    clearCon: e.currentTarget.dataset.con
                });
            }
            let item,
                newObj = ""

            if (this.data.currentTab == 3) { // 清空更多
                item = this.data.moreList;
                for (let i in item) {
                    let list = item[i].resultList;
                    for (let j in list) {
                        list[j].isChoose = false;
                    }
                }
                this.setData({
                    moreStr: [],
                    moreList: item
                });

            } else if (this.data.currentTab == 4) { // 清空方式

                item = this.data.methodList;
                for (let i in item) {
                    let list = item[i].resultList;
                    for (let j in list) {
                        list[j].isChoose = false;
                    }
                }
                this.setData({
                    methodStr: [],
                    methodList: item
                });
            } else if (this.data.currentTab == 6) { // 清空租金

                item = this.data.rentalList.resultList;
                for (let i in item) {
                    item[i].isChoose = false;
                }
                newObj = this.data.rentalList
                newObj.resultList = item
                this.setData({
                    rentalStr: [],
                    rentalList: newObj,
                    minPrice: "",
                    maxPrice: "",
                    maxValue: "",
                    minValue: ""

                });
            } else if (this.data.currentTab == 7) { // 清空品牌

                item = this.data.brandList;
                for (let i in item) {
                    item[i].checked = false;
                }
                this.setData({
                    clearCon: true,
                    brandStr: [],
                    brandList: item
                });
            } else if (this.data.currentTab == 1) { //清空房价

                item = this.data.priceList.resultList;
                for (let i in item) {
                    item[i].isChoose = false;
                }
                newObj = this.data.priceList
                newObj.resultList = item
                this.setData({
                    priceStr: [],
                    priceList: newObj,
                    minPrice: "",
                    maxPrice: "",
                    maxValue: "",
                    minValue: ""

                });

            } else if (this.data.currentTab == 2) { //清空户型
                item = this.data.patternList.resultList;
                for (let i in item) {
                    item[i].isChoose = false;
                }
                newObj = this.data.patternList
                newObj.resultList = item
                this.setData({
                    patternStr: [],
                    patternList: newObj
                });

            } else if (this.data.currentTab == 10) { // 清空商圈
                item = this.data.averagePriceList.resultList;
                for (let i in item) {
                    item[i].isChoose = false;
                }
                newObj = this.data.averagePriceList
                newObj.resultList = item
                this.setData({
                    averagePriceStr: [],
                    averagePriceList: newObj,
                    minPrice: "",
                    maxPrice: "",
                    maxValue: "",
                    minValue: ""

                });

            } else if (this.data.currentTab == 11) { //清空楼龄
                item = this.data.ageBuildingList.resultList;
                for (let i in item) {
                    item[i].isChoose = false;
                }
                newObj = this.data.ageBuildingList
                newObj.resultList = item
                this.setData({
                    ageBuildingStr: [],
                    ageBuildingList: newObj
                });

            } else if (this.data.currentTab == 12) { // 清空用途
                item = this.data.usesList.resultList;
                for (let i in item) {
                    item[i].isChoose = false;
                }
                newObj = this.data.usesList
                newObj.resultList = item
                this.setData({
                    usesStr: [],
                    usesList: newObj
                });
            } else if (this.data.selectedR) { //清空区域
                this.setData({
                    clearCon: true,
                    regionStr: [],
                    metroStr: [],
                    areaList: [],
                    selectedCode: ""
                });

            } else if (this.data.selectedM) { // 清空地铁
                this.setData({
                    clearCon: true,
                    metroStr: [],
                    regionStr: [],
                    selectedCode: "",
                    areaList: []
                });
            }
        },
        // 确认条件
        commitCon: function () {
            // 如果输入价格进行判断(pfy最小值 pty最大值)
            let moneyStr = "";
            if (this.data.maxPrice && this.data.minPrice) {
                if (parseInt(this.data.maxPrice) >= parseInt(this.data.minPrice)) {
                    if (this.data.infoBox.type == 'garden') { // 小区情况下的自定义均价
                        moneyStr =
                            'jb' +
                            this.data.minPrice +
                            ',je' +
                            this.data.maxPrice;
                    } else if (this.data.infoBox.type == 'intact' || this.data.infoBox.type == 'rentIndex' || this.data.infoBox.type == 'combine') {
                        moneyStr =
                            'brp' +
                            this.data.minPrice +
                            ',erp' +
                            this.data.maxPrice;
                    } else if (this.data.infoBox.type == 'flat') {
                        moneyStr =
                            'bap' +
                            this.data.minPrice +
                            ',eap' +
                            this.data.maxPrice;
                    } else { // 二手房情况下的自定义总价
                        moneyStr =
                            'pfy' +
                            this.data.minPrice +
                            ',pty' +
                            this.data.maxPrice;
                    }
                } else if (parseInt(this.data.maxPrice) < parseInt(this.data.minPrice)) {
                    if (this.data.infoBox.type == 'garden') { // 小区情况下的自定义均价
                        moneyStr =
                            'jb' +
                            this.data.maxPrice +
                            ',je' +
                            this.data.minPrice;
                    } else if (this.data.infoBox.type == 'intact' || this.data.infoBox.type == 'rentIndex' || this.data.infoBox.type == 'combine') { // 租房情况下的自定义均价
                        moneyStr =
                            'brp' +
                            this.data.maxPrice +
                            ',erp' +
                            this.data.minPrice;
                    } else if (this.data.infoBox.type == 'flat') {
                        moneyStr =
                            'bap' +
                            this.data.maxPrice +
                            ',eap' +
                            this.data.minPrice;
                    } else { // 二手房情况下的自定义总价
                        moneyStr =
                            'pfy' +
                            this.data.maxPrice +
                            ',pty' +
                            this.data.minPrice;
                    }

                    this.setData({
                        minPrice: this.data.maxPrice,
                        maxPrice: this.data.minPrice,
                        maxValue: this.data.minPrice, //清空数值
                        minValue: this.data.maxPrice
                    });
                }
            } else if (this.data.maxPrice && !this.data.minPrice) {
                if (this.data.infoBox.type == 'garden') { // 小区情况下的自定义均价
                    moneyStr = 'jb0,je' + this.data.maxPrice; // 只输入最大值 默认最小值为0
                } else if (this.data.infoBox.type == 'intact' || this.data.infoBox.type == 'rentIndex' || this.data.infoBox.type == 'combine') {
                    moneyStr = 'brp0,erp' + this.data.maxPrice; // 只输入最大值 默认最小值为0
                } else if (this.data.infoBox.type == 'flat') {
                    moneyStr = 'bap0,eap' + this.data.maxPrice; // 只输入最大值 默认最小值为0
                } else { // 二手房情况下的自定义总价
                    moneyStr = 'pfy0,pty' + this.data.maxPrice; // 只输入最大值 默认最小值为0
                }
            } else if (!this.data.maxPrice && this.data.minPrice) {
                if (this.data.infoBox.type == 'garden') { // 小区情况下的自定义均价
                    moneyStr = 'jb' + this.data.minPrice + ',je100000'; // 只输入最小值 默认最大值100000
                } else if (this.data.infoBox.type == 'intact' || this.data.infoBox.type == 'rentIndex' || this.data.infoBox.type == 'combine') {
                    moneyStr = 'brp' + this.data.minPrice + ',erp100000'; // 只输入最小值 默认最大值100000
                } else if (this.data.infoBox.type == 'flat') {
                    moneyStr = 'bap' + this.data.minPrice + ',eap100000'; // 只输入最小值 默认最大值100000
                } else { // 二手房情况下的自定义总价
                    moneyStr = 'pfy' + this.data.minPrice + ',pty100000'; // 只输入最小值 默认最大值100000
                }
            }
            this.setData({
                moneyStr: moneyStr
            });
            // 检测是否存在当选
            this.checkChoose()
            let arr = [],
                brand = [];
            arr = arr.concat(
                this.data.regionStr).concat(
                this.data.metroStr).concat(
                this.data.selectedCode).concat(
                this.data.patternStr).concat(
                this.data.priceStr).concat(
                this.data.iconStr).concat(
                this.data.moreStr).concat(
                this.data.methodStr).concat(
                this.data.ageBuildingStr).concat(
                this.data.averagePriceStr).concat(
                this.data.usesStr).concat(
                this.data.rentalStr).concat(
                this.data.moneyStr).join();
            if (arr[0] == ',') {
                arr = arr.replace(',', '')
            }
            // 公寓的品牌参数单独输出
            brand = this.data.brandStr.join();
            if (brand[0] == ',') {
                brand = brand.replace(',', '')
            }
            this.setData({
                newCon: arr // 复选框为arr || 排序选择为单选
            });
            // 需要为租房首页和公寓提供筛选样式
            this.triggerEvent('changeCon', {
                newCon: this.data.newCon,
                brandStr: brand,
                selectedName: this.data.selectedName, // 页面筛选组件名称
                regionStr: this.data.regionStr,
                metroStr: this.data.metroStr,
                rentalName: this.data.rentalName, // 页面筛选组件名称  
                rentalStr: this.data.rentalStr,
                moreName: this.data.moreName, // 页面筛选组件名称
                moreStr: this.data.moreStr,
                methodName: this.data.methodName, // 页面筛选组件名称
                methodStr: this.data.methodStr
            });
            this.hideNav()
        },
        // 最小值输入
        inputTyping1(e) {
            if (this.properties.infoBox.type == 'house') { // 二手房价格
                let item = this.data.priceList.resultList;
                for (let i in item) {
                    item[i].isChoose = false;
                }
                let newObj = this.data.priceList
                newObj.resultList = item
                this.setData({
                    priceStr: [],
                    priceList: newObj,
                });
            } else if (this.properties.infoBox.type == 'garden') { //小区均价
                let item = this.data.averagePriceList.resultList;
                for (let i in item) {
                    item[i].isChoose = false;
                }
                let newObj = this.data.averagePriceList
                newObj.resultList = item
                this.setData({
                    averagePriceStr: [],
                    averagePriceList: newObj,
                });
            } else { //租房租金
                let item = this.data.rentalList.resultList;
                for (let i in item) {
                    item[i].isChoose = false;
                }
                let newObj = this.data.rentalList
                newObj.resultList = item
                this.setData({
                    rentalStr: [],
                    rentalList: newObj,
                });
            }
            this.setData({
                minPrice: e.detail.value
            });
        },
        // 最大值输入
        inputTyping2(e) {
            if (this.properties.infoBox.type == 'house') { // 二手房价格
                let item = this.data.priceList.resultList;
                for (let i in item) {
                    item[i].isChoose = false;
                }
                let newObj = this.data.priceList
                newObj.resultList = item
                this.setData({
                    priceStr: [],
                    priceList: newObj,
                });
            } else if (this.properties.infoBox.type == 'garden') { //小区均价
                let item = this.data.averagePriceList.resultList;
                for (let i in item) {
                    item[i].isChoose = false;
                }
                let newObj = this.data.averagePriceList
                newObj.resultList = item
                this.setData({
                    averagePriceStr: [],
                    averagePriceList: newObj,
                });
            } else { //租房租金
                let item = this.data.rentalList.resultList;
                for (let i in item) {
                    item[i].isChoose = false;
                }
                let newObj = this.data.rentalList
                newObj.resultList = item
                this.setData({
                    rentalStr: [],
                    rentalList: newObj,
                });
            }

            this.setData({
                maxPrice: e.detail.value
            });
        },
        // 获取公寓品牌
        getBrandsCon() {
            const ctx = this
            global.requestGet(global.URL.GET_BRANDS_CONDITION, "", function (res) {
                let list = res.data
                for (let i in list) {
                    list[i].checked = false;
                }
                ctx.setData({
                    brandList: list
                });
            });
        },
        // 检测是否存在单选
        checkChoose() {
            //检测区域/地铁是否长度为1
            if (this.data.regionStr.length == 0 && this.data.metroStr.length == 0 && this.data.selectedCode) {
                this.setData({
                    selectedName: this.isSingle(this.data.selectedCode)
                });
            } else {
                this.setData({
                    selectedName: ""
                });
            }
            //检测售价
            if (this.data.priceStr.length == 1) {
                this.setData({
                    priceName: this.isSingle(this.data.priceStr[0])
                });
            } else {
                this.setData({
                    priceName: ""
                });
            }
            //检测户型
            if (this.data.patternStr.length == 1) {
                this.setData({
                    patternName: this.isSingle(this.data.patternStr[0])
                });
            } else {
                this.setData({
                    patternName: ""
                });
            }
            //检测更多
            if (this.data.moreStr.length == 1) {
                this.setData({
                    moreName: this.isSingle(this.data.moreStr[0])
                });
            } else {
                this.setData({
                    moreName: ""
                });
            }
            //检测方式
            if (this.data.methodStr.length == 1) {
                this.setData({
                    methodName: this.isSingle(this.data.methodStr[0])
                });
            } else {
                this.setData({
                    methodName: ""
                });
            }
            //检测租金
            if (this.data.rentalStr.length == 1) {
                this.setData({
                    rentalName: this.isSingle(this.data.rentalStr[0])
                });
            } else {
                this.setData({
                    rentalName: ""
                });
            }
            //检测均价
            if (this.data.averagePriceStr.length == 1) {
                this.setData({
                    averagePriceName: this.isSingle(this.data.averagePriceStr[0])
                });
            } else {
                this.setData({
                    averagePriceName: ""
                });
            }
            //检测均价
            if (this.data.ageBuildingStr.length == 1) {
                this.setData({
                    ageBuildingName: this.isSingle(this.data.ageBuildingStr[0])
                });
            } else {
                this.setData({
                    ageBuildingName: ""
                });
            }
            //检测用途
            if (this.data.usesStr.length == 1) {
                this.setData({
                    usesName: this.isSingle(this.data.usesStr[0])
                });
            } else {
                this.setData({
                    usesName: ""
                });
            }
            //检测品牌
            if (this.data.brandStr.length == 1) {
                for (let item of this.data.brandList) {
                    if (item.brandId == this.data.brandStr[0]) {
                        this.setData({
                            brandName: item.name
                        });
                    }
                }
            } else {
                this.setData({
                    brandName: ""
                });
            }
        },
        // 取出单选的汉字名称
        isSingle(code) {
            for (let obj of this.properties.moreCondition) {
                for (let item of obj.resultList) {
                    if (item.code == code) {
                        return item.name
                    }
                }
            }
        },
        // 传入参数的过滤器
        conditionFilter(arr) {
            if (arr.length > 0) {
                for (let item of arr) {
                    if (item.type == 'roomPattern') {
                        let list = item.resultList;
                        for (let i in list) {
                            list[i].isChoose = false;
                        }
                        item.resultList = list;

                        this.setData({
                            patternList: item
                        });
                    } else if (item.type == 'metro') {
                        this.setData({
                            metroList: item
                        });
                    } else if (item.type == 'region') {
                        this.setData({
                            regionList: item
                        });
                    } else if (item.type == 'price') {
                        let list = item.resultList;
                        for (let i in list) {
                            list[i].isChoose = false;
                        }
                        item.resultList = list;

                        this.setData({
                            priceList: item
                        });
                    } else if (item.type == 'averagePrice') {
                        let list = item.resultList;
                        for (let i in list) {
                            list[i].isChoose = false;
                        }
                        item.resultList = list;

                        this.setData({
                            averagePriceList: item
                        });
                    } else if (item.type == 'ageBuilding' && this.properties.infoBox.type == 'garden') {
                        let list = item.resultList;
                        for (let i in list) {
                            list[i].isChoose = false;
                        }
                        item.resultList = list;

                        this.setData({
                            ageBuildingList: item
                        });

                    } else if (item.type == 'uses' && this.properties.infoBox.type == 'garden') {
                        let list = item.resultList;
                        for (let i in list) {
                            list[i].isChoose = false;
                        }
                        item.resultList = list;

                        this.setData({
                            usesList: item
                        });

                    } else if (item.type == 'aptPrice' || item.type == 'rentPrice') {
                        // 租金(公寓/租金)
                        let list = item.resultList;
                        for (let i in list) {
                            list[i].isChoose = false;
                        }
                        item.resultList = list;

                        this.setData({
                            rentalList: item
                        });

                    } else if (item.type == 'rsort') {
                        // 租房排序
                        this.setData({
                            iconCondition: item.resultList
                        });

                    } else if (item.type == 'shareRent' || item.type == 'singleRent') {
                        // 方式
                        let methodList = this.data.methodList;
                        let list = item.resultList;

                        if (item.type == 'shareRent' && this.properties.infoBox.type == 'combine') {
                            // 进入整租列表 默认整租全选中
                            let newCon = []
                            for (let i in list) {
                                if (list[i].code == "sr0") {
                                    list[i].isChoose = true;
                                    newCon.unshift(list[i].code)
                                }
                            }
                            this.setData({
                                methodStr: newCon
                            })
                        } else if (item.type == 'singleRent' && this.properties.infoBox.type == "intact") {
                            // 进入合租列表 默认合租全选中
                            let newCon = []
                            for (let i in list) {
                                if (list[i].code == "rb0") {
                                    list[i].isChoose = true;
                                    newCon.unshift(list[i].code)
                                }
                            }
                            this.setData({
                                methodStr: newCon
                            })
                        } else {
                            // 进入正常列表 无默认选中
                            for (let i in list) {
                                list[i].isChoose = false;
                            }
                        }
                        item.resultList = list;
                        let total = methodList.concat(item);
                        this.setData({
                            methodList: total
                        });
                    } else if (item.type == 'school') { // 学校类型
                        this.setData({
                            schoolType: item.resultList
                        });
                    } else { // 更多
                        let moreList = this.data.moreList;
                        let list = item.resultList;
                        if (this.properties.infoBox.type == 'newHouse' && list[0].type == "characteristic") {
                            // 进入新上房源列表
                            let newCon = []
                            for (let i in list) {
                                if (list[i].code == "f5") {
                                    list[i].isChoose = true;
                                    newCon.unshift(list[i].code)
                                }
                            }
                            this.setData({
                                moreStr: newCon
                            })
                        } else if (this.properties.infoBox.type == 'cutMoney' && list[0].type == "characteristic") {
                            // 进入降价房源列表
                            let newCon = []
                            for (let i in list) {
                                if (list[i].code == "f6") {
                                    list[i].isChoose = true;
                                    newCon.unshift(list[i].code)
                                }
                            }
                            this.setData({
                                moreStr: newCon
                            })
                        } else {
                            // 进入正常列表 无默认选中
                            for (let i in list) {
                                list[i].isChoose = false;
                            }
                        }
                        item.resultList = list;
                        let total = moreList.concat(item);
                        this.setData({
                            moreList: total
                        });
                    }
                }
            }
            // 进入页面就要检测是否存在单选条件
            this.checkChoose()
        }
    },
    ready: function () {
        this.conditionFilter(this.properties.moreCondition);
    }
});