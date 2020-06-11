// pages/detail/setMap/index.js

const app = getApp();
const bmap = require('../../../lib/bmap-wx.min');
let global = require('../../../utils/global.js');
let wxMarkerData = [];
let lineMarkerData = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    generalities: [
      {
        icon: 'metro',
        type: 'metro',
        name: '地铁',
        alias: 'icon-xiangqing-map-metro@3x',
        id: 1
      },
      {
        icon: 'transit',
        type: 'transit',
        name: '公交',
        alias: 'icon-xiangqing-map-transit@3x',
        id: 2
      },
      {
        icon: 'education',
        type: 'education',
        name: '教育',
        alias: 'icon-xiangqing-map-education@3x',
        id: 3
      },
      {
        icon: 'hospital',
        type: 'hospital',
        name: '医疗',
        alias: 'icon-xiangqing-map-hospital@3x',
        id: 4
      },
      {
        icon: 'bank',
        type: 'banke',
        name: '银行',
        alias: 'icon-xiangqing-map-bank@3x',
        id: 5
      },
      {
        icon: 'xiuxian',
        type: 'xiuxian',
        name: '休闲',
        alias: 'icon-xiangqing-map-xiuxian@3x',
        id: 6
      },
      {
        icon: 'shop',
        type: 'shop',
        name: '购物',
        alias: 'icon-xiangqing-map-shop@3x',
        id: 7
      },
      {
        icon: 'jianshen',
        type: 'jianshen',
        name: '健身',
        alias: 'icon-xiangqing-map-jianshen@3x',
        id: 8
      },
      {
        icon: 'food',
        type: 'food',
        name: '美食',
        alias: 'icon-xiangqing-map-food@3x',
        id: 9
      }
    ],
    on: 1,
    // 地图的相关配置
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
    distance: 1, // 距离
    totalTime: 1,
    isShowLayer: false,
    locationName: '',
    line: '',
    clickNum: 1,
    type: 'garden'
  },
  // 切换时候显示的效果
  handleTab: function(e) {
    let clickNum = 1;
    let currentId = this.data.on;
    let clickId = e.currentTarget.dataset['id'];
    if (currentId == clickId) {
      clickNum = this.data.clickNum + 1;
    } else {
      clickNum = 1;
    }

    this.setData(
      {
        on: e.currentTarget.dataset['id'],
        isShowLayer: false,
        clickNum: clickNum
      },
      () => {
        let id = this.data.on;
        let currentObj = this.data.generalities.find(item => {
          return item.id === id;
        });

        this.setMapType(currentObj.name, currentObj.alias);
      }
    );
  },

  setMapType: function(name, type) {
    let that = this;

    let fail = function(data) {
      console.log(data, 'fail');
    };
    let success = function(data) {
      // console.log(data);
      lineMarkerData = data.originalData;
      wxMarkerData = data.wxMarkerData.map(item => {
        // console.log(item);
        item.stitle = item.title;
        item.title = undefined;
        return item;
      });
      // console.log(wxMarkerData);

      const name = that.data.type==='garden' ? '房源/小区的位置' : that.data.type

      let addData = {
        address: name,
        alpha: 1,
        height: 36,
        iconPath: '../../../image/common/icon-xiangqing-map-weizhi@3x.png',
        iconTapPath: '../../../image/common/icon-xiangqing-map-weizhi@3x.png',
        id: 99,
        latitude: that.data.latitude,
        longitude: that.data.longitude,
        telephone: undefined,
        title: name,
        stitle: name,
        width: 30
      };

      if (wxMarkerData.length > 0) {
        // 这块的代码是为了双数的时候隐藏
        let isHide = that.data.clickNum % 2;
        if (isHide == 0) {
          let newArr = [];
          newArr.push(addData);
          that.setData({
            markers: newArr
          });
          return;
        }

        wxMarkerData.push(addData);

        that.setData({
          markers: wxMarkerData
        });
      } else {
        let newArr = [];
        newArr.push(addData);
        that.setData({
          markers: newArr
        });
      }
    };
    // 发起POI检索请求
    this.BMap.search({
      location: `${this.data.latitude},${this.data.longitude}`,
      query: name,
      fail: fail,
      success: success,
      width: 32,
      height: 40,
      radius: 500,
      // 此处需要在相应路径放置图片文件
      // iconPath: `https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/${type}.png`,
      iconPath: `../../../image/common/${type}.png`,
      iconTapPath: `../../../image/common/${type}.png`
      // 此处需要在相应路径放置图片文件
      // iconTapPath: `https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/${type}.png`
    });
  },

  changeMarkerColor: function(data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      // console.log(j);
      // console.log(i);
      if (j == i) {
        // 此处需要在相应路径放置图片文件
        data[
          j
        ].iconPath = `https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/${type}.png`;
      } else {
        // 此处需要在相应路径放置图片文件
        data[
          j
        ].iconPath = `https://cdn-1.baidu.com/baidu-miniprogram/static/imgs/${type}.png`;
      }
      markers[j](data[j]);
    }
    that.setData({
      markers: markers
    });
  },
  makertap: function(e) {
    var id = e.markerId;

    if (id == 99) {
      return;
    }

    let line;

    if (this.data.on == 1) {
      let address = lineMarkerData.results[id].address;
      if (address.indexOf(';')) {
        let arr = address.split(';');
        line = arr[0];
      } else {
        line = address;
      }
    } else {
      line = '';
    }

    let url = global.URL.GET_COMPUTED_DISTANCE;
    let name = wxMarkerData[id].stitle;
    let data = {
      lng1Str: this.data.longitude,
      lat1Str: this.data.latitude,
      lng2Str: wxMarkerData[id].longitude + '',
      lat2Str: wxMarkerData[id].latitude + ''
    };
    global.requestGet(url, data, res => {
      if (res.status === 'C0000') {
        let data = Math.ceil(res.data);
        let time = this.computedTime(data);
        this.setData({
          distance: data,
          totalTime: time,
          isShowLayer: true,
          locationName: name,
          line: line
        });
      }
    });
    // that.showSearchInfo(wxMarkerData, id);
    // that.changeMarkerColor(wxMarkerData, id);
  },
  computedTime: function(total) {
    let time = Math.ceil(total / 60);
    if (time > 60) {
      let hourse = Math.floor(time / 60);
      let minute = time % 60;
      return hourse + '小时' + minute + '分钟';
    } else {
      return time + '分钟';
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options);
    this.setData({
      longitude: options.longitude,
      latitude: options.latitude,
      type: options.type || 'garden'
    });
    let id = this.data.on;
    let currentObj = this.data.generalities.find(item => {
      return item.id === id;
    });

    this.BMap = new bmap.BMapWX({
      ak: app.globalData.ak
    });

    this.setMapType(currentObj.name, currentObj.alias);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
