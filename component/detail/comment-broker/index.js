Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tags: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        starLevel: "5", // 初始分数
        tagList: [], // 标签数组
        inputVal: "" // 输入评价
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 获取星级评价
        getLevel: function (e) {
            this.setData({
                starLevel: e.detail.starLevel
            });
        },
        // 选中标签
        chooseTag: function (e) {
            let id = e.currentTarget.dataset.id
            let list = this.data.tagList;
            for (let item of list) {
                if (item.id == id) {
                    item.isChoose = !item.isChoose //选中变色
                }
            }
            this.setData({
                tagList: list
            });
        },
        // 输入评价
        inputTyping: function (e) {
            this.setData({
                inputVal: e.detail.value
            });
        },
        // 点击提交
        handle: function (e) {
            let tags = [];
            for (let item of this.data.tagList) {
                if (item.isChoose) {
                    tags.push(item.id)
                }
            }
            let commentInfo = {
                content: this.data.inputVal || "", //评价内容
                score: this.data.starLevel,
                labelIds: tags
            }
            this.triggerEvent('handleInfo', {
                handleType: e.currentTarget.dataset.type,
                info: commentInfo
            });
        }
    },
    ready: function () {
        console.log(this.properties, '进入comment-broker')
        // 传入参数数据处理
        let list = this.properties.tags;
        if (list.length > 0) {
            for (let item of list) {
                item.isChoose = false;
            }
            this.setData({
                tagList: list
            });
        }
    }
});