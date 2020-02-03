// pages/me/me.js
const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade: 2,
    loginIn: false,
    firstCourseState: false,
    sum: 0,
    sumTotal: 0,
    navHeight: app.globalData.navHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var uid = wx.getStorageSync('uid')
    var openid = wx.getStorageSync('openid')
    var token = wx.getStorageSync('token')
    var nickname = wx.getStorageSync('nickname')
    var avatar = wx.getStorageSync('avatar')
    var telephone = wx.getStorageSync('telephone')
    if (uid) {
      this.setData({
        loginIn: true,
        uid: uid,
        token: token,
        openid: openid,
        nickname: nickname,
        avatar: avatar,
        telephone: telephone
      })

      this.getStudyProgress()
      this.getInviteProgress()
    }


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    if (this.data.uid) {
      var uid = this.data.uid
    } else {
      var uid = ''
    }
    return {
      title: "AI音乐学院",
      path: app.globalData.globalInviteImg,
      imageUrl: this.data.fileurl,
      success: function (res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败")
      }
    }
  },

  loginIn() {
    wx.navigateTo({
      url: '../loginNew/loginNew'
    })
  },

  myClass() {
    wx.showLoading({
      title: '加载中',
    })
    util.$get(`${getApp().globalData.urlBase}/v3/wechat/my_class`, {
      openid: this.data.openid
    }).then(res => {
      wx.hideLoading();
      if (res.data.error == 0) {
        app.globalData.classList = res.data.data
        wx.navigateTo({
          url: `../user/class/class?bright=${this.data.bright}`,
        })
      } else {
        if (res.data.error == 1) {
          wx.navigateTo({
            url: `../user/guide/guide`,
          })
        }
      }
    }).catch(e => {
      this.setData({
        isLoading: true,
      })
      wx.stopPullDownRefresh()
      wx.showToast({
        title: `网络错误！`,
        duration: 1000,
        icon: "none"
      })
    })
  },

  getStudyProgress() {
    var cmd = `${getApp().globalData.urlBase}/v3/courses/study_schedule`
    var headers = {
      'token': this.data.uid,
      'uid': this.data.uid,
    }
    console.log(headers)
    wx.request({
      url: cmd,
      header: headers,
      success: (res) => {
        console.log(res)
        if (res.data.data) {
          var firstCourse = res.data.data[0]
          this.setData({
            firstCourse: firstCourse,
            firstCourseState: true
          })
        } else {
          this.setData({
            firstCourseState: false
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

  getInviteProgress() {
    var cmd = `${getApp().globalData.urlBase}/v3/invite/get_invite_info`
    var headers = {
      'token': this.data.uid,
      'uid': this.data.uid,
    }
    // console.log(headers)
    wx.request({
      url: cmd,
      header: headers,
      success: (res) => {
        console.log(res)
        var inviteCount = res.data.data.invite_count
        var sum, sumTotal   
        if (inviteCount < 3) {
          sum = inviteCount
          sumTotal = 3
        } else if (inviteCount < 8) {
          sum = inviteCount - 3
          sumTotal = 5
        } else if (inviteCount < 16) {
          sum = inviteCount - 8
          sumTotal = 8
        }
        this.setData({
          sum: sum,
          sumTotal: sumTotal
        })
      },
      fail: () => {
        wx.showToast({
          title: `网络错误！`,
          duration: 1000
        })
      }
    })
  },

  goCoupons() {
    wx.navigateTo({
      url: `../coupons/coupons`,
    })
  },

  goStudy() {
    wx.navigateTo({
      url: `../study/study`,
    })
  },

  goInvite() {
    wx.navigateTo({
      url: `../invite/invite`,
    })
  },
  formSubmit(e) {
    console.log('formId---' + e.detail.formId)
    util.postFormId(e.detail.formId)
  }

})