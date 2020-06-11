Component({
    /**
     * 组件的属性列表
     */
    properties: {
        itemType: { //item类型
            type: String,
            value: 'school'
        },
        itemList: {
            type: Array,
            value: []
        },
        title: {
            type: String,
            value: '对口小区'
        },
        moreText: {
            type: String,
            value: '更多'
        },
        showMore: {
            type: Boolean,
            value: false
        },
        maxLength: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        list: [],
        unitPrice: '',
        newGardenName: '',
        emptyImg: 'https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/img-238pic-default@2x.png'
    },
    /**
     * 组件的方法列表
     */
    methods: {
        moreItem: function () {
            let concatList = this.data.list;
            let moreList = [];

            moreList = this.properties.itemList.length >= 3 ? this.properties.itemList.splice(0, 3) : this.properties.itemList

            concatList = concatList.concat(moreList)
            this.setData({
                list: concatList
            });
            console.log(this.data.list, 'moreListmoreListv')
        },
        getMore: function () {
            let concatList = this.data.list;
            let moreList = [];

            moreList = this.properties.itemList.length >= 3 ? this.properties.itemList.splice(0, 3) : this.properties.itemList

            concatList = concatList.concat(moreList)
            this.setData({
                list: concatList
            });
            console.log(this.data.list, 'moreListmoreListv')
        },
    },
    ready: function () {
        console.log(this.properties, '进入list-block')
        if (this.properties.showMore) {
            this.moreItem()
        } else {
            if (this.properties.maxLength > 0) {
                this.setData({
                    list: this.properties.itemList.slice(0, this.properties.maxLength)
                });
            } else {
                this.setData({
                    list: this.properties.itemList
                });
            }

        }
    }
});