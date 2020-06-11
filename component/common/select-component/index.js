// Componet/Componet.js
Component({
  /**
   * 组件的属性列表
   */
  // select传入的参数数组
  properties: {
    propArray: {
      type: Array,
    },
    // 传入的初始选项
    nowText: {
      type: String,
      value: "请选择"
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false, //初始option不显示
    //初始内容
    animationData: {} //右边箭头的动画
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //option的显示与否
    selectToggle: function () {
      let nowShow = this.data.selectShow; //获取当前option显示的状态
      //创建动画
      let animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
    },
    //设置内容
    setText: function (e) {
      let nowData = this.properties.propArray; //当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      let nowIdx = e.target.dataset.index; //当前点击的索引
      let nowText = nowData[nowIdx].text; //当前点击的内容
      //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
      this.animation.rotate(0).step();
      this.setData({
        selectShow: false,
        nowText: nowText,
        animationData: this.animation.export()
      })
      let newData = {
        id: nowIdx,
        text: nowText
      }
      this.triggerEvent('setData', newData)
    }
  }
})