// pages/playVideo/playVideo.js
const app = getApp()
Page({

  data: {
    navHeight: app.globalData.navHeight,
    videoSrc:'',
    videoPoster:''
  },

  onLoad: function (options) {
    console.log(options);
    this.setData({
      videoPoster: options.videoPoster,
      videoSrc: options.videoSrc
    })
  },


  onReady: function () {

  },


  onShow: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})