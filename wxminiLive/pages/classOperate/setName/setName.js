// pages/classOperate/setName/setName.js
const util = require("../../../utils/util.js");
const baseUrl = getApp().globalData.baseUrl;
const v9 = getApp().globalData.v9;

let instrumentType='';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: ""
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    instrumentType = util.findInstrumentType(wx.getStorageSync("selCourseId"));
    //this.createLiveClass()
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  createLiveClass() {
    let selStudents =  JSON.parse( wx.getStorageSync("selStudents"));
    let studentIds = selStudents.map(e=>e.uid);
    util
      .$post(`${v9}/live_info/add_group`, {
        name:this.data.inputValue,
        students: studentIds,
        course_id:wx.getStorageSync("selCourseId"), 
        teacher_id: wx.getStorageSync("uid"),
        instrument_type: instrumentType
      })
      .then(res => {
        console.log(res);
        this.setData({
          students: res.data
        });
      });
  },
  nextStep() {
    this.createLiveClass();
    wx.navigateTo({
      url: `/pages/classDetail/classDetail`
    });
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
