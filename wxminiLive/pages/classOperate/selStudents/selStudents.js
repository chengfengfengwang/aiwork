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
    selected:[],
    error: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    courseId = wx.getStorageSync("selCourseId");
    if(wx.getStorageSync("createOrEditClass")==2){
      let selected = JSON.parse(wx.getStorageSync("selStudents"));
      if(wx.getStorageSync("editClassHasChangeCourse")==1){
        this.setData({
          selected:[]
        })
      }else{
        this.setData({
          selected
        })
      }
      
      
    }
    this.getStudents();
  },
  goSearch(){
    
    wx.setStorageSync('allStudents',JSON.stringify(this.data.students));
    wx.setStorageSync('selStudents',JSON.stringify(this.data.selected));
    
    wx.navigateTo({
      url: "/pages/classOperate/searchStudents/searchStudents" 
    });
  },
  getStudents() {
    wx.showLoading({
      title: '加载中',
    });
    util
      .$get(`${v9}/live_info/users`, {
        institutions_id: wx.getStorageSync("institutions_id"),
        course_id: courseId,
        page: 0,
        size: 999
      })
      .then(res => {
        wx.hideLoading();
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
    if(!this.data.students[index].checked && this.data.selected.length>=4){
      if(this.data.selected.length>=4){
        wx.showToast({
          title: '人数不能超过4个',
          icon: 'none',
          duration: 2000
        });
        return
      }
    }
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
    if (this.data.selected.length==0) {
      this.setData({
        error: "请将信息填写完整"
      });
      return
    }
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
