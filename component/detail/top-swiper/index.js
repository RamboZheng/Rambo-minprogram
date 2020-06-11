// component/common/showImg/index.js
Component({
    options: {
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        bannerImgUrl: {
            type: Array,
            value: []
        },
        houseImages: {
            type: Array,
            value: []
        },
        /*
         * buy (买)房源，二手房，小区
         * rent（租）指合租，独栋，整租，城中村
         */
        type: {
            type: String,
            value: 'buy'
        },
        // 是小区还是房源类型
        houseType: {
            type: String,
            value: 'house'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // bannerImgUrl: [], // 详情的banner图片
        index: 1,
        currentType: 0,
        showLayer: false
    },
    /**
     * 组件的方法列表
     */
    methods: {
        handleChange: function (e) {
            // console.log(e);
            this.setData({
                index: e.detail.current + 1,
                currentType: e.detail.currentItemId
            });
        },
        handleShowBox: function () {
            // console.log(this.data.index);
            if (this.data.bannerImgUrl.length > 0) {
                this.triggerEvent(
                    'checkIsShow', {
                        name: true
                    }, {}
                );

                setTimeout(() => {
                    this.setData({
                        showLayer: true
                    });
                }, 80);
            }
        },
        handleChatImg: function (e) {
            // console.log(e);
            let currentType = this.data.currentType;
            let index = e.currentTarget.dataset['currentype']; // 下标
            // console.log(index);
            if (currentType == index) {
                return;
            }
            let houseImages = this.data.houseImages;
            let arr = houseImages.slice(0, index);
            let total = 0;
            for (let i in arr) {
                total = total + arr[i].imgList.length;
            }

            this.setData({
                currentType: index,
                index: total + 1
            });
            // console.log('total', total + 1);
        },
        handleHideBox: function () {
            this.setData({
                showLayer: false
            });
            setTimeout(() => {
                this.triggerEvent(
                    'checkIsShow', {
                        name: false
                    }, {}
                );
            }, 80);
        },
        manageImg: function () {
            console.log(this.data.houseImages);
            return;
            let houseImages = this.data.houseImages;
            let imgs = [];
            for (let i in houseImages) {
                let list = houseImages[i].imgList;
                for (let j in list) {
                    let data = list[j];
                    data['cType'] = i;
                    imgs.push(data);
                }
                // console.log(imgs);
            }
            this.setData({
                bannerImgUrl: imgs
            });
        }
    },
    ready: function () {
        console.log(this.properties, '进入top-swiper')
    }
});