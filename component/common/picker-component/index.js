const app = getApp()

Component({
    properties: {
        pickData: {
            type: Object,
            value: {},
            observer: function (newVal) {
                if (typeof newVal === 'object') {
                    this.setData({
                        listData: Object.values(newVal)
                    })
                }
            }
        },
        sureStyle: {
            type: String,
            value: ''
        },
        pickerType: {
            type: String,
            value: ''
        },
        valueName: {
            type: String,
            value: ''
        },
        cancelStyle: {
            type: String,
            value: ''
        },
        open: {
            type: Boolean,
            value: false,
            observer: function (newVal) {
                if (String(newVal) === 'true') {
                    this.setData({
                        isOpen: true
                    })
                    this._openClosePicker()
                }

                // 更改默认值为上次选中的数值
                let list = this.properties.pickerType == 'loanRate' ? this.properties.pickData.businessLoanArr : this.properties.pickData.publicLoanArr,
                    valueArr = [];
                for (var i = 0; i < list.length; i++) {
                    if (this.properties.valueName == list[i]) {
                        valueArr.push(i)
                        this.setData({
                            defaltValue: valueArr
                        })
                    }
                }
            }
        },
        maskStyle: {
            type: String,
            value: ''
        },
        indicatorStyle: {
            type: String,
            value: ''
        },
    },
    data: {
        isOpen: false,
        pickerBoxAnimation: {},
        pickerAnimation: {},
        pickeDate: [],
        listData: [],
        value: [],
        inputPadding: 0,
        defaltValue: [],
        rate: "", //输入的利率
        info: {
            H: '',
            W: ''
        }
    },
    attached() {
        this._getScreen()
    },
    methods: {
        _getScreen() {
            let that = this
            wx.getSystemInfo({
                success: function (res) {
                    let H = res.windowHeight
                    let W = res.windowWidth
                    const {
                        info
                    } = that.data
                    info.H = H
                    info.W = W
                    that.setData({
                        info
                    })
                }
            })

        },
        _closePicker() {
            let {
                pickeDate
            } = this.data
            this.triggerEvent('close', pickeDate)
            this.setData({
                isOpen: false
            })
            this._openClosePicker(1)
        },
        _bindChange(e) {
            const val = e.detail.value
            let {
                pickeDate
            } = this.data
            Object.values(this.data.pickData).forEach((item, i) => {
                pickeDate[i] = item[val[i]]
            })
            this.setData({
                pickeDate,
                value: val
            })
        },
        // 输入事件
        inputTyping: function (e) {
            if (e.detail.value > 100) {
                wx.showToast({
                    title: '输入数值不得大于100',
                    icon: 'none',
                    duration: 2000
                });
                this.setData({
                    rate: 100
                });;
            } else {
                this.setData({
                    rate: e.detail.value
                });;
            }

        },
        //键盘失去焦点
        inputBlur() {
            this.setData({
                inputPadding: 0
            })
        },
        //键盘获取焦点
        inputFocus() {
            this.setData({
                inputPadding: 50
            })
        },
        add() {
            if (this.data.rate == "" || this.data.rate == 0) {
                wx.showToast({
                    title: '请输入自定义利率',
                    icon: 'none',
                    duration: 2000
                });
                return
            }
            this.triggerEvent('add', this.data.rate)
            this.setData({
                isOpen: false
            })


        },
        _surePicker() {
            let {
                pickeDate
            } = this.data
            this.triggerEvent('sure', pickeDate)
            this.setData({
                isOpen: false,
                rate: ""
            })
            this._openClosePicker(1)
        },
        _openClosePicker(flag) {
            let animation = wx.createAnimation({
                duration: 500,
                timingFunction: 'ease',
            })
            let animationBox = wx.createAnimation({
                duration: 500,
                timingFunction: 'ease',
            })
            if (flag === 1) {
                animation.bottom('-100%').step()
                animationBox.bottom('-100%').step()
            } else {
                animation.bottom(0).step()
                animationBox.bottom(0).step()
            }
            this.setData({
                pickerBoxAnimation: animation.export(),
                pickerAnimation: animationBox.export()
            })
        }
    },
    ready() {
        console.log('0000000000')
    }
})