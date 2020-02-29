// pages/classOperate/add/add.js
let courseId='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Allcourses:[],
    items: [
    ]
  },
  onLoad: function (options) {
    this.setData({
      Allcourses:  JSON.parse(wx.getStorageSync('myInstruments'))
    });
    if(wx.getStorageSync("createOrEdit")==2){
      courseId = wx.getStorageSync("selCourseId")
      this.checkCourse(courseId)
    }
    
  },
  radioChange: function (e) {
    courseId = e.detail.value;
  },
  checkCourse(id){
    let Allcourses = this.data.Allcourses;
    if(!id){
      return
    }
    for(var i=0;i<Allcourses.length;i++){
      for(var k=0;k<Allcourses[i].courses.length;k++){
        if(id==Allcourses[i].courses[k].id){
          Allcourses[i].courses[k].checked=true
        }
      }
    }
    this.setData({
      Allcourses
    })
  },
  nextStep(){
    wx.setStorageSync("selCourseId",courseId);
    wx.navigateTo({
      url: `/pages/classOperate/selStudents/selStudents`
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