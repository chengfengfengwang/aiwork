// pages/classOperate/selStudents/selStudents.js
const util = require("../../../utils/util.js");
const baseUrl = getApp().globalData.baseUrl;
const v9 = getApp().globalData.v9;

let courseId = "";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    students: [],
    selected:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    courseId = wx.getStorageSync("selCourseId");
    if(wx.getStorageSync("createOrEdit")==2){
      let selected = JSON.parse(wx.getStorageSync("selStudents"));
      this.setData({
        selected
      })
    }
    this.getStudents();
  },
  getStudents() {
    util
      .$get(`${v9}/live_info/users`, {
        institutions_id: wx.getStorageSync("institutions_id"),
        course_id: courseId,
        page: 0,
        size: 999
      })
      .then(res => {
        this.setData({
          students: res.data
        });
        this.checkStudents();
      });
  },
  checkStudents(){
    let students = this.data.students;
    let selected = this.data.selected;
    for(var i=0;i<students.length;i++){
      for(var k=0;k<selected.length;k++){
        if(selected[k].uid==students[i].uid){
          students[i].checked = true
        }
      }
    };
    this.setData({
      students
    })
    console.log(this.data.students)
  },
  selectUser(e) {
    let index = e.currentTarget.dataset.index;
    this.data.students[index].checked = !this.data.students[index].checked;
    this.setData({
      students: this.data.students
    });
    let selected =  this.data.students.filter((e)=>{
      return e.checked
    })
    this.setData({
      selected
    });
  },
  removeUser(e){
    const index = e.currentTarget.dataset.index;
    let selected =  this.data.selected;
    let user = selected[index];
    selected.splice(index,1);
    this.setData({
      selected
    });
    this.data.students.forEach((e)=>{
      if(e.uid=== user.uid){
        e.checked = false;
      }
    });
    this.setData({
      students:this.data.students
    });
  },
  nextStep(){
    wx.setStorageSync('selStudents',JSON.stringify(this.data.selected));
    wx.navigateTo({
      url: `/pages/classOperate/setName/setName`
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
