// pages/loginNew/loginNew.js

const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendAuthCodeText: "发送验证码",
    countdown: "",
    sendAuthCodeColor: "#999",
    sendAuthCodeDisabled: false,
    border: "1rpx solid #999",
    color: "white",
    submitDisabled: true,
    submitBackgroundColor: "#999",
    navHeight: app.globalData.navHeight,
    zoneMask:false,
    zoneData: app.globalData.zoneData,
    preZone:'86'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.goodsId) {
      this.setData({
        courseTitle: options.courseTitle,
        coursePrice: options.coursePrice,
        courseType: options.courseType,
        courseLevel: options.courseLevel,
        goodsId: options.goodsId,
      })
    }

  },
  closeZoneMask(){
    this.setData({
      zoneMask: false
    })
  },
  choseZone(e){
    this.setData({
      zoneMask : false,
      preZone: e.target.dataset.zone
    })
  },
  showZone() {
    this.setData({
      zoneMask: true
    })
  },
  // 输入验证
  bindTelephone(e) {
    var telephone = e.detail.value.trim()
    this.setData({
      telephone: telephone
    });
    // if (this.data.telephone.length == 11) {
    //   this.setData({
    //     sendAuthCodeDisabled: false,
    //     sendAuthCodeColor: "#7048d1",
    //     border: "1rpx solid #7048d1",
    //   })
    // } else {
    //   this.setData({
    //     sendAuthCodeDisabled: true,
    //     sendAuthCodeColor: "#999",
    //     border: "1rpx solid #999",
    //   })
    // }
    this.setData({
      sendAuthCodeDisabled: false,
      sendAuthCodeColor: "#7048d1",
      border: "1rpx solid #7048d1",
    })
    if (this.data.authCode) {
      this.setData({
        submitDisabled: false,
        submitBackgroundColor: "#7048d1",
      })
    } else {
      this.setData({
        submitDisabled: true,
        submitBackgroundColor: "#999",
      })
    }
  },

  bindAuthCode(e) {
    var authCode = e.detail.value.trim()
    this.setData({
      authCode: authCode
    })
    //if (this.data.telephone.length == 11 && this.data.authCode) {
    if (this.data.authCode) {
      this.setData({
        submitDisabled: false,
        submitBackgroundColor: "#7048d1",
      })
    } else {
      this.setData({
        submitDisabled: true,
        submitBackgroundColor: "#999",
      })
    }
  },

  // 发送验证码
  sendAuthCode(e) {
    wx.showToast({
      title: `已发送！`,
      duration: 1000,
    })
    util.$get(`${getApp().globalData.urlBase}/v3/ucsms`, {
      phone: this.data.telephone,
      zone: this.data.preZone
    }).then(res => {
      if (res.data.error == 0) {
        wx.showToast({
          title: '发送成功',
          duration: 1500,
        })
        this.sendAuthCodeTextChange()
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
          duration: 3500,
        })
      }
    }).catch(e => {
      wx.showToast({
        title: `网络错误！`,
        duration: 1000,
        icon: "none"
      })
    })
  },

  sendAuthCodeTextChange() {
    var second = 60

    this.setData({
      sendAuthCodeText: "重新发送",
      countdown: second + "s",
      sendAuthCodeColor: "#999",
      sendAuthCodeDisabled: true,
      border: "1rpx solid #999",
    })

    var timer = setInterval(function () {

      if (second == 0) {
        this.setData({
          sendAuthCodeText: "发送验证码",
          countdown: "",
          sendAuthCodeColor: "#7048d1",
          border: "1rpx solid #7048d1",
          sendAuthCodeDisabled: false
        })
        clearInterval(timer)
        return
      }

      second--

      second = Number(second)

      if (second < 10) {
        second = "0" + second
      }

      this.setData({
        countdown: second + "s"
      })

    }.bind(this), 1000)
  },

  formSubmit: function (e) {
    wx.showLoading({
      title: '正在登录',
    })
    var telephone = e.detail.value.telephone.trim()

    var authCode = e.detail.value.authCode.trim()

    var cmd = `${getApp().globalData.urlBase}/v3/users/login/`;
    var type;
    if (wx.getStorageSync('inviteId')) {
      type = '1'
    } else if (wx.getStorageSync('from')) {
      type = '2'
    }
    var newdata = {
      'phone': telephone,
      'verify': authCode,
      'zone': 86,
      'type': type
    }

    var inviteId = wx.getStorageSync('inviteId')

    if (inviteId) {
      newdata.invite_id = inviteId
    }
    console.log(newdata)

    wx.request({
      method: 'post',
      url: cmd,
      data: newdata,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'bundle-id': 'com.immusician.music'
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data.error == 0) {
          var token = res.data.data.token
          var uid = res.data.data.uid
          var avatar = res.data.data.avatar
          var nickname = res.data.data.nickname
          wx.setStorageSync('uid', uid)
          wx.setStorageSync('token', token)
          wx.setStorageSync('avatar', avatar)
          wx.setStorageSync('nickname', nickname)
          wx.setStorageSync('telephone', telephone)
          if (this.data.goodsId) {
            wx.navigateBack({
              delta: 1
            })
          } else if (res.data.data.new_reg == 1) {
            wx.navigateTo({
              url: '../receivePrize/receivePrize?token=' + token + '&uid=' + uid
            })
          } else {
            wx.switchTab({
              url: '../me/me'
            })
          }
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.msg,
            duration: 3000,
          })
        }


      },
      fail: () => {
        wx.showToast({
          title: `网络错误！`,
          duration: 1000
        })
      }
    })
  },

})