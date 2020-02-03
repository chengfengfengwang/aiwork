// pages/payComplete/payComplete.js
const util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topNavStatus:'',
    teachersInfo: [{
        teacherAccount: "AimusicGT6", //jt
        teacherName: "小孙老师",
        teacherQr: "https://s.immusician.com/static/wechat/images/AimusicGT6%20.jpeg",
        teacherPhoto: "https://s.immusician.com/static/wechat/images/xiaosun.jpeg"
      },
      {
        teacherAccount: "AImusic-Uk1", //uk
        teacherName: "书旺老师",
        teacherQr: "https://s.immusician.com/static/wechat/images/AImusic-Uk1.jpeg",
        teacherPhoto: "https://s.immusician.com/static/wechat/images/shuwang.jpeg"
      },
      {
        teacherAccount: "AImusic-UK5", //fm
        teacherName: "小宇老师",
        teacherQr: "https://s.immusician.com/static/wechat/images/AImusic-UK5.png",
        teacherPhoto: "https://s.immusician.com/static/wechat/images/xiaoyu.jpeg"
      }
    ],
    navHeight: app.globalData.navHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      state: options.state,
      courseTitle: options.courseTitle,
      coursePrice: options.coursePrice,
      time: util.formatTime(options.time),
      choicedCouponValue: options.choicedCouponValue,
      topNavStatus: options.state=='fail'?'支付失败':'支付成功'
    })

    var index = wx.getStorageSync('instrument')
    var teacherInfo
    if (index == 0) {
      teacherInfo = this.data.teachersInfo[0]
    } else if (index == 1) {
      teacherInfo = this.data.teachersInfo[1]
    } else if (index == 2 || 3) {
      teacherInfo = this.data.teachersInfo[2]
    }
    this.setData({
      teacherInfo: teacherInfo
    });
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
    
  },
  onShareAppMessage: function() {
    var localUid = wx.getStorageSync('uid')
    if (localUid) {
      var uid = localUid
    } else {
      var uid = ''
    }
    return {
      title: "AI音乐学院",
      path: '/pages/home/home?inviteId=' + uid,
      imageUrl: this.data.fileurl,
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

  saveTeacherQrImg() {
    util.saveImg(this.data.teacherInfo.teacherQr)
  },

  setClipboard() {
    wx.setClipboardData({
      data: this.data.teacherInfo.teacherAccount,
      success(res) {
        wx.showToast({
          title: '复制成功',
        })
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  payAgain() {
    wx.navigateBack({
      delta: 2
    })
  }

})