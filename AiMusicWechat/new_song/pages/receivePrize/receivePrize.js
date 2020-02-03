// pages/receivePrize/receivePrize.js

const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    backgroundImg: "https://s.immusician.com/static/wechat/images/prizeBg.jpeg",
    isShow: true,
    title: '领取奖品',
    isModal: false,
  },
  onLoad: function(options) {
    if (options.couponId) {

      var uid = wx.getStorageSync('uid')
      var token = wx.getStorageSync('token')

      this.setData({
        token: token,
        uid: uid,
        couponId: options.couponId,
      })

      this.getCouponGift()

    } else {

      this.setData({
        token: options.token,
        uid: options.uid
      })

      this.getCoupon()
    }

  },
  onShareAppMessage: function() {
    this.shareCount();
    if (this.data.uid) {
      var uid = this.data.uid
    } else {
      var uid = ''
    }
    return {
      title: "AI音乐学院",
      path: '/pages/home/home?inviteId=' + uid,
      imageUrl: 'https://s.immusician.com/miniwechat/aimusicWechatIMG40.jpeg',
      success: function(res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败")
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // },
  shareCount() {
    util.$get(getApp().globalData.urlBase + '/v3/invite/invite_count').then(res => {
      console.log('shareCount 调用成功')
    })
  },
  getCouponGift() {
    var cmd = `${getApp().globalData.urlBase}/v3/invite/invite_coupon`
    var newdata = {
      'coupon_id': this.data.couponId
    }
    var headers = {
      'uid': this.data.uid,
      'token': this.data.token,
      'platform': 1,
      'version': '2.3.8',
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: cmd,
      data: newdata,
      header: headers,
      success: (res) => {
        wx.hideLoading();
        if (res.data.coupon) {
          wx.showToast({
            title: `领取成功！`,
            duration: 1000,
          })
        }
        var coupons = [];
        coupons.push(res.data.coupon)

        this.setData({
          coupons: coupons,
        })

      }
    })
  },

  getCoupon() {
    var cmd = `${getApp().globalData.urlBase}/v3/start`
    var newdata = {
      'instrument_type': 'guitar'
    }
    var headers = {
      'uid': this.data.uid,
      'token': this.data.token,
      'platform': 1,
      'version': '2.3.8',
    }
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: cmd,
      data: newdata,
      header: headers,
      success: (res) => {
        wx.hideLoading();
        console.log(res)
        var coupons = res.data.data.coupon

        console.log(coupons)

        if (coupons.length > 0) {
          console.log("-----------------")
          this.setData({
            coupons: coupons,
          })
          wx.showToast({
            title: `领取成功！`,
            duration: 1000,
          })
        } else {

          this.setData({
            isShow: false,
            backgroundImg: 'https://s.immusician.com/static/wechat/images/pic_cupon_already@3x.png',
          })

          console.log(this.data.isShow)
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

  closeModal() {
    this.setData({
      isModal: false
    })
  },

  popup() {
    this.setData({
      isModal: true,
    })
  },

  previewImage() {
    wx.previewImage({
      urls: ['https://s.immusician.com/miniwechat/aimusicWechatIMG40.jpeg']
    })
  },
  goHome() {
    wx.switchTab({
      url: '../home/home'
    })
  },
  saveImg() {
    util.saveImg('https://s.immusician.com/miniwechat/aimusicWechatIMG40.jpeg')
  }

})