// pages/home.js

const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    isLoading: false,
    hasMore: true,
    showModal: false,
    teacherContactBox: false,
    teacherAccount: "rainpleliu",
    teacherQrcodePath: '',
    indicatorDots:true,
    navHeight: app.globalData.navHeight,
    contentShow:false,
    lodddCount:0,
    isIOS: app.globalData.isIOS
  },
  onLoad: function (options) {
    this.getCheck();
    if (options.inviteId) {
      wx.setStorageSync('inviteId', options.inviteId)
    } else if (options.from){
      wx.setStorageSync('from', options.from)
      if (!wx.getStorageSync('fromPYQCount')){
        this.count()
      }
    }
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    // setTimeout(() => {
    //   console.log('修改urlBase')
    //   getApp().globalData.urlBase = 'https://qwe.com';
    // }, 1000)
    util.$get(`${getApp().globalData.urlBase}/v3/wechat/home`).then(res => {
      this.setData({
        slides: res.data.data.slide,
        recCourses: res.data.data.recommend_course,
        goodStudents: res.data.data.good_students,
        teacherMien: res.data.data.teacher_mien,
        count:++this.data.count
      })
      if (this.data.count == 2) {
        wx.hideLoading();
      }
    }).catch(e => {
      wx.showToast({
        title: `网络错误！`,
        duration: 1000,
        icon: "none"
      })
    })
  },
  onShow: function () {
    var telephone = wx.getStorageSync('telephone')
    var uid = wx.getStorageSync('uid')
    if (!telephone) {
      // this.setData({
      //   showModal: true
      // })
      wx.hideTabBar({
        success: () => {
          this.setData({
            showModal: true
          })
        }
      })
    } else {
      this.setData({
        showModal: false,
        telephone: telephone,
        uid: uid,
      })
      wx.showTabBar({})
    }

  },
  onShareAppMessage: function () {
    if (this.data.uid) {
      var uid = this.data.uid
    } else {
      var uid = ''
    }
    return {
      title: "AI音乐学院",
      path: '/pages/home/home?inviteId=' + uid,
      imageUrl: app.globalData.globalInviteImg,
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

  goCourses: function (event) {
    var instrumentType = event.currentTarget.dataset.instrumentType
    wx.navigateTo({
      url: '../courses/courses?instrument_type=' + instrumentType
    })
  },
  getCheck(){
    util.$get(`${getApp().globalData.urlBase}/v3/wechat/check?version=2019-06-20`).then(res => {
      wx.hideLoading();
       this.setData({
         contentShow: res.data.no_check,
         count: ++this.data.count
       })
      if (this.data.count == 2) {
        wx.hideLoading();
      }
    }).catch(e => {
      wx.showToast({
        title: `网络错误！`,
        duration: 1000,
        icon: "none"
      })
    })
  },
  goCoursesDetails(event) {
    var courseId = event.currentTarget.dataset.courseId
    wx.navigateTo({
      url: '../coursesDetails/coursesDetails?course_id=' + courseId
    })
  },

  know: function () {
    this.setData({
      showModal: false
    })
    wx.showTabBar({})
  },

  benefit: function () {
    wx.navigateTo({
      url: '../activity/activity'
    })
  },

  showTeacherContact() {
    this.setData({
      teacherContactBox: true,
    })
    // wx.hideTabBar({
    //   success: () => {
    //     this.setData({
    //       teacherContactBox: true,
    //     })
    //   }
    // })
  },

  close() {
    this.setData({
      teacherContactBox: false,
    })
    wx.showTabBar({})
  },
  saveTeacherQrImg() {
    util.saveImg('https://s.immusician.com/static/wechat/images/rainpleliu.jpeg')
  },
  copyWxNumber(){
    wx.setClipboardData({
      data: this.data.teacherAccount,
      success(res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 1500
        })
      }
    })
  },
  goInvite(){
    wx.navigateTo({
      url: `../invite/invite`,
    })
  }, 
  goPlay(e){
    wx.navigateTo({
      url: `../playVideo/playVideo?videoSrc=${e.target.dataset.video}&videoPoster=${e.target.dataset.poster}`,
    })
  },
  count(){
    util.$get(`${getApp().globalData.urlBase}/v3/invite/invite_count_qr`).then(res=>{
      console.log('调用扫码count 接口');
      wx.setStorageSync('fromPYQCount', 'counted');
    })
  },
  formSubmit(e){
    console.log('formId---' + e.detail.formId)
    util.postFormId(e.detail.formId)
  }
})