
const util = require('../../utils/util.js')
const songUrl = getApp().globalData.urlBase;
var app = getApp()
Page({
  data: {
    isLoading: false,
    hasMore:true,
    page: 0,
    songList:[],
    hot: "hot,-1",
    instrumentType:'ukulele'
  },
  onLoad: function (options) {
    this.getList('down')
  },
  backLast() {
    wx.navigateBack({
      delta: 1
    })
  },
  click_uku(){
  this.setData({
  instrumentType:'ukulele'
  })
  this.getList('down')
  },
  click_guitar(){
  this.setData({
    instrumentType:'guitar'
  })
  this.getList('down')
  },
  getList(type){
    wx.showLoading({
      title: '加载中',
    })
    wx.showNavigationBarLoading()
    this.setData({
      isLoading:true,
      hasMore: true
    })
    type === 'down' ? this.setData({ page: 0}): null;
    util.$get(`${getApp().globalData.urlBase}/v3/wechats/`, { page: this.data.page, sort: this.data.hot, instrument_type: this.data.instrumentType}).then(res => {
      this.processData(type, res.data.data)
    }).catch(e => {
      this.setData({
        isLoading:true,
        hasMore: false
      })
      wx.stopPullDownRefresh()
      wx.showToast({title:`网络错误！`, duration:1000, icon:"none"})
    })
  },
  processData(type, list) {
    if (list.length) {
      let lists = list.map((v) => {
        return {
          stars: util.convertToStarsArray(v.diff),
          title: v.title,
          song_url: v.song_url,
          cover_url: v.cover_url,
          id: v.id,
          hot: v.hot,
          type: v.type
        }
      })
      if (type === 'up') {
        this.setData({
          songList: this.data.songList.concat(lists)
        })
      } else {
        this.setData({
          songList: lists
        })
        wx.stopPullDownRefresh()
      }
      this.setData({
        page: this.data.page + 1,
        isLoading:false,
        hasMore: true
      })
    }else{
      if (type === 'down') {
        wx.showToast({
          title: '没有数据',
          duration:1500,icon:"none"
        })
        this.setData({
          isLoading: false,
          hasMore: false,
          songList: [],
        })
      }else{
        this.setData({
          isLoading:false,
          hasMore:true
        })
      }
    }
    wx.hideLoading()
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
    if (this.data.isLoading){  // 防止多次触发加载
      return
    }
    this.getList('up')
  },
  openDetail(event) {
    let item = event.currentTarget.dataset.list
    wx.navigateTo({
      url: `song-detail/song-detail?id=${item.id}`,
    })
  },
  openSearch(event) {
    let item = event.currentTarget.search_name
    wx.navigateTo({
      url: `search/search?instrument_type=${this.data.instrumentType}`,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var localUid = wx.getStorageSync('uid')
    if (localUid) {
      var uid = localUid
    } else {
      var uid = ''
    }
    return {
      title: "AI音乐学院",
      path: '/pages/home/home?inviteId=' + uid,
      imageUrl: this.data.fileurl,
      success: function (res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败")
      }
    }
  },
})