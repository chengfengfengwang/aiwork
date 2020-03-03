// pages/classDetail/classDetail.js
const util = require("../../utils/util.js");
const baseUrl = getApp().globalData.baseUrl;
const app = getApp();

let classId = "";
let courseId = "";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userList: [],
    className: "",
    liveList: [],
    slideButtons: [{
      type: 'warn',
      text: '删除',
      extClass: 'test',
      src: '/page/weui/cell/icon_del.svg', // icon的路径
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    classId = options.classId;
    this.getClassDetail();
  },
  slideButtonTap(e) {
    this.removeLivePlan(e.currentTarget.dataset.planid)
  },
  removeLivePlan(planId){
      wx.showLoading({
        title: "加载中"
      });
      util
        .$post(`${baseUrl}/live_info/del_plan`, {
          plan_id: planId
        })
        .then(res => {
          this.getClassDetail()
        });
  },
  getClassDetail(index, instrument_type) {
    wx.showLoading({
      title: "加载中"
    });
    util
      .$get(`${baseUrl}/live_info/group_detail`, {
        group_id: classId
      })
      .then(res => {
        this.setData({
          className: res.data.name,
          userList: res.data.students_info,
          liveList: res.data.plan_list
        });
        courseId = res.data.course_id;
        wx.hideLoading();
      });
  },
  editClass() {
    wx.setStorageSync("classId", classId);
    wx.setStorageSync("createOrEditClass", 2);
    wx.setStorageSync("selCourseId", courseId);
    wx.setStorageSync("selStudents", JSON.stringify(this.data.userList));
    wx.setStorageSync("selName", this.data.className);
    wx.navigateTo({
      url: `/pages/classOperate/selCourse/selCourse`
    });
  },
  editLive(e) {
    let dataset = e.currentTarget.dataset;
    wx.setStorageSync("createOrEditLive", 2);
    wx.setStorageSync("Live_id", dataset.liveid);
    wx.setStorageSync("Live_lesson_id", dataset.lesson_id);
    wx.setStorageSync("Live_start_time", dataset.start_time);
   
    wx.navigateTo({
      url: `/pages/liveOperate/add/add?classId=${classId}&courseId=${courseId}&liveId=`
    });
  },
  createLive() {
    wx.setStorageSync("createOrEditLive", 1);
    wx.navigateTo({
      url: `/pages/liveOperate/add/add?classId=${classId}&courseId=${courseId}`
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
