// const wxParse = require('/wxParse/wxParse.js').wxParse; // 解决HTML及markdown解析
const app = getApp()
const urlBase = getApp().globalData.urlBase;
const formatTime = function(timestamp) {

  var d = new Date();

  var newtimestamp = parseInt(timestamp) * 1000

  var date = d.getDate(newtimestamp)

  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var day = d.getDate()

  var hour = d.getHours()
  var minute = d.getMinutes()
  var second = d.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')

}
const formatNumber = function(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const $get = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header: {
        'Content-Type': 'json',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: resolve,
      fail: function(err) {
        wx.showToast({
          icon: 'none',
          title: `网络错误！`,
          duration: 3000,
        })
        console.log('----error---')
        console.log(error)
        console.log('----error---')
        reject(err)
      }
    })
  })
}

const convertToStarsArray = (diff) => {
  const star = 'on';
  let result = [];
  for (let i = 0; i < diff; i++) {
    result.push(star)
  }
  return result
}

function getCurrentPageUrlWithArgs(pageObj) {
  var url = pageObj.route //当前页面url
  var options = pageObj.options //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}

function getImgInfo(imgUrl) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '请稍等',
    })
    wx.getImageInfo({
      src: imgUrl,
      success: (res) => {
        wx.hideLoading();
        resolve(res.path)
      },
      fail(err) {
        wx.hideLoading();
        reject(err)
      }
    })
  })

}

function saveImg(imgUrl) {
  getImgInfo(imgUrl).then((tempUrl) => {
    wx.saveImageToPhotosAlbum({
      success: (res) => {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      },
      filePath: tempUrl,
      //用户未开启相册访问权限
      fail(err) {
        if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny' || err.errMsg === 'saveImageToPhotosAlbum:fail auth denied') {
          wx.showModal({
            title: '提示',
            content: '您未开启保存图片至相册的授权，是否开启？',
            confirmText: '开启',
            success(res) {
              if (res.confirm) {
                wx.openSetting()
              } else if (res.cancel) {}
            }
          })
        }
      }
    })
  })

};

function postFormId(formId) {
  console.log('formId--' + formId)
  wx.request({
    url: urlBase + '/v3/wechat/wechat_msg_push', // 仅为示例，并非真实的接口地址
    method: 'POST',
    data: {
      openid: wx.getStorageSync('openid'),
      formId: formId
    },
    header: {
      token: wx.getStorageSync('token'),
      uid: wx.getStorageSync('uid')
    },
    success(res) {
      console.log(res)
    },
    fail(err) {
      console.log(err)
    }
  })
};
module.exports = {
  formatTime,
  $get,
  saveImg,
  convertToStarsArray,
  getCurrentPageUrlWithArgs, //获取当前页面带参完整路由getCurrentPageUrlWithArgs(this)
  postFormId
}