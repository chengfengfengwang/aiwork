// pages/classOperate/setName/setName.js
const util = require("../../../utils/util.js");
const baseUrl = getApp().globalData.baseUrl;

let instrumentType = "";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    error: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    instrumentType = util.findInstrumentType(wx.getStorageSync("selCourseId"));
    if (wx.getStorageSync("createOrEditClass") == 2) {
      let selName = wx.getStorageSync("selName");
      this.setData({
        inputValue: selName
      });
    }
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  editLiveClass() {
    wx.showLoading();
    let selStudents = JSON.parse(wx.getStorageSync("selStudents"));
    let studentIds = selStudents.map(e => e.uid);
    let classId = wx.getStorageSync("classId")
    util
      .$post(`${baseUrl}/live_info/up_group`, {
        id: classId,
        name: this.data.inputValue,
        students: studentIds,
        course_id: wx.getStorageSync("selCourseId")
      })
      .then(res => {
        wx.hideLoading();
        wx.reLaunch({
          url: "/pages/liveClassList/liveClassList" 
        });
        // wx.navigateTo({
        //   url: `/pages/classDetail/classDetail?classId=${classId}`
        // });
      });
  },
  createLiveClass() {
    wx.showLoading();
    let selStudents = JSON.parse(wx.getStorageSync("selStudents"));
    let studentIds = selStudents.map(e => e.uid);
    util
      .$post(`${baseUrl}/live_info/add_group`, {
        name: this.data.inputValue,
        students: studentIds,
        course_id: wx.getStorageSync("selCourseId"),
        teacher_id: wx.getStorageSync("uid"),
        instrument_type: instrumentType
      })
      .then(res => {
        wx.hideLoading();
        wx.reLaunch({
          url: "/pages/liveClassList/liveClassList" 
        });
        // wx.navigateTo({
        //   url: `/pages/classDetail/classDetail?classId=${res.data}`
        // });
      });
  },
  nextStep() {
    if (!this.data.inputValue) {
      this.setData({
        error: "请将信息填写完整"
      });
      return;
    }
    if (wx.getStorageSync("createOrEditClass") == 1) {
      this.createLiveClass();
    } else {
      this.editLiveClass();
    }
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
