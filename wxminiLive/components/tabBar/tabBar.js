// pages/tabBar/tabBar.js
Component({
  /**
   * 页面的初始数据
   */
  data: {},
  properties: {
    activeIndex: {
      type: Number,
      value: 0
    }
  },
  methods: {
    addClass() {
      wx.setStorageSync("createOrEditClass", 1);
      wx.navigateTo({
        url: "/pages/classOperate/selCourse/selCourse"
      });
    },
    goClassList() {
      wx.navigateTo({
        url: "/pages/liveClassList/liveClassList"
      });
    },
    goHelp() {
      wx.navigateTo({
        url: "/pages/help/help"
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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
