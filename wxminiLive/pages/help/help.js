// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAcount:'',
    section1:[
      '选择班级成员',
      '选择班级对应课程',
      '班级名称命名'
    ],
    section2:[
      '进入对应班级',
      '选择直播开始时间',
      '选择课程具体章节'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userAcount:wx.getStorageSync('userAcount')
    })
  },
logout(){
  wx.clearStorage()
  wx.navigateTo({
    url: "/pages/login/login" 
  });
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})