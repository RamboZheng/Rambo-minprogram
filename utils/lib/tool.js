const http = require('./http')
const api = require('./api')


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



// 获取手机号方法 button传入e
const getPhoneNum = data => {
  const url = data.currentTarget.dataset.path;
  wx.login({
    success: re => {
      const params = {
        code: re.code,
        encryptedData: data.detail.encryptedData,
        iv: data.detail.iv
      };
      http.requestPost(api.URL.GET_PHONE_NUMBER,
        params,
        function (res) {
          try {
            wx.setStorageSync(api.STORE.BAIDU_USERINFO, res.data);
            wx.switchTab({
              url
            });
          } catch (data) {}
        }
      );
    }
  });
}



module.exports = {
  formatTime: formatTime,
  getPhoneNum: getPhoneNum
}