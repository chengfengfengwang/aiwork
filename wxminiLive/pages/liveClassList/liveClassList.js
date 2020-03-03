const util = require("../../utils/util.js");
const baseUrl = getApp().globalData.baseUrl;
const v9 = getApp().globalData.v9;
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    acIndex: 0,
    acInstrument:'',
    liveClassList: [

    ]
  },
  tabClick(e) {
    this.setData({
      acIndex: e.currentTarget.dataset.num,
      acInstrument:e.currentTarget.dataset.item.value
    });
    this.getliveClass(this.data.acIndex, this.data.acInstrument)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      slideButtons: [{
        type: 'warn',
        text: '删除',
        extClass: 'test',
        src: '/page/weui/cell/icon_del.svg', // icon的路径
      }],
    });
    wx.showLoading({
      title: '加载中',
    });
    this.getInstruments()
  },
  slideButtonTap(e) {
    console.log('slide button tap', e)
    this.removeLive(e.currentTarget.dataset.id)
  },
  removeLive(id){
    wx.showLoading({
      title: '加载中',
    });
    util
      .$post(`${v9}/live_info/del_group`, {
        group_id: id
      })
      .then(res => {
        this.getliveClass(this.data.acIndex, this.data.acInstrument)
      });
    
  },
  goClassDetail(e) {
    wx.setStorageSync("createOrEditClass", 1);
    wx.navigateTo({
      url: `/pages/classDetail/classDetail?classId=${e.currentTarget.dataset.id}`
    });
  },
  getInstruments() {
    util
      .$get(`${v9}/live_info/course`, {
        institutions_id: wx.getStorageSync("institutions_id")
      })
      .then(res => {
        let instruments = Object.keys(res.data);
        var res = res.data;
        instruments = instruments.map((e) => {
          return {
            name: app.globalData.instruments[e],
            value: e,
            courses: res[e]
          }
        });
        wx.setStorageSync('myInstruments', JSON.stringify(instruments));
        instruments.forEach((e) => {
          e.list = []
        });
        this.setData({
          liveClassList: instruments
        })
        this.getliveClass(0, instruments[0].value);
      });
  },
  getliveClass(index, instrument_type) {
    wx.showLoading({
      title: '加载中',
    });
    util
      .$get(`${v9}/live_info/group_list`, {
        instrument_type: instrument_type,
        page: 0,
        size: 999
      })
      .then(res => {
        this.data.liveClassList[index].list = res.data.group_list;
        this.setData({
          liveClassList: this.data.liveClassList
        });
        wx.hideLoading();
      });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
});
