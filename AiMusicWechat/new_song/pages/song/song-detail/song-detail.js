// pages/song/song-detail/song-detail.js
const util = require('../../../utils/util.js')
const songUrl = getApp().globalData.urlBase;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    songDetail: null,
    showShare:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      showShare: options.showShare || false,
      id:options.id
    })
   this.data.id = options.id
   this.songDetail()
  },
  backLast() {
    wx.navigateBack({
      delta: 1
    })
  },
  songDetail(){
    wx.showLoading({
      title: '加载中',
    })
    util.$get(`${getApp().globalData.urlBase}/v3/wechats/${this.data.id}`,).then(res => {
    this.processData(res.data.data)
      wx.hideLoading()
    }).catch(e => {
      this.setData({
        isLoading: true,
        hasMore: false
      })
      wx.stopPullDownRefresh()
      wx.showToast({ title: `网络错误！`, duration: 1000, icon: "none" })
    })
  },
  processData(data){
    this.setData({
      songDetail: data,
      navTitle: data.title
    })
  },
  clickFloata(){
    console.log('click study')
    if (this.data.songDetail.relevance_url != ''){
      wx.navigateTo({
        url: '../relevance_course/relevance_course?relevanceUrl='+this.data.songDetail.relevance_url+'',
      })
    }
  },

  previewImage(){
    wx.previewImage({
      current: this.data.songDetail.song_url, // 当前显示图片的http链接   
      urls: this.data.songDetail.song_url // 需要预览的图片http链接列表   
    }) 
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
    return{
      path:"/pages/song/song-detail/song-detail?id="+this.data.id+"&showShare="+this.data.showShare
    }
  },
  backIndex() {
    wx.switchTab({
      url: '../../../pages/song/song',
    })
  },
})