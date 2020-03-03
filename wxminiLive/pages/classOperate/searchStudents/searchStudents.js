// pages/classOperate/selStudents/selStudents.js
const util = require("../../../utils/util.js");
const baseUrl = getApp().globalData.baseUrl;
const v9 = getApp().globalData.v9;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selected:[],
    students: [
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(wx.getStorageSync('allStudents')){
      this.setData({
        students:JSON.parse( wx.getStorageSync('allStudents')),
      });
    }
    if(wx.getStorageSync('selStudents')){
      this.setData({
        selected:JSON.parse( wx.getStorageSync('selStudents')),
      });
    };
    this.getStudents()
  },
  searchInput(e) {
    this.getStudents(e.detail.value)
  },
  getStudents(phone) {
    if(!phone){
      phone=''
    }
    wx.showLoading({
      title: '加载中',
    });
    util
      .$get(`${v9}/live_info/users`, {
        institutions_id: wx.getStorageSync("institutions_id"),
        course_id: wx.getStorageSync("selCourseId"),
        page: 0,
        size: 999,
        phone_keyword:phone
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
    });
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
    //通过students更新selected
    this.setData({
      students: this.data.students
    });
    let selected =  this.data.students.filter((e)=>{
      return e.checked
    })
    this.setData({
      selected
    });
    //跳转
    if(this.data.students[index].checked){
      wx.setStorageSync("createOrEditClass",2);
      wx.setStorageSync('selStudents',JSON.stringify(this.data.selected));
      wx.redirectTo({
        url: '/pages/classOperate/selStudents/selStudents'
      })
    }
    
    
  },
  checkboxChange: function(e) {
    // console.log("checkbox发生change事件，携带value值为：", e.detail.value);

    // var checkboxItems = this.data.checkboxItems,
    //   values = e.detail.value;
    // for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
    //   checkboxItems[i].checked = false;

    //   for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
    //     if (checkboxItems[i].value == values[j]) {
    //       checkboxItems[i].checked = true;
    //       break;
    //     }
    //   }
    // }

    // this.setData({
    //   checkboxItems: checkboxItems,
    //   [`formData.checkbox`]: e.detail.value
    // });
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
