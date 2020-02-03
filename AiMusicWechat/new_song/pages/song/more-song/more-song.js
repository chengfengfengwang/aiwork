// pages/song/more-song/more-song.js
const util = require('../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    hasMore: true,
    page: 0,
    songList: [],
    navTitle: 'AI音乐学院'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.instrumentType = options.instrument_type
    this.data.searchName = options.search_name || ''
    this.data.searchType = options.search_type
    this.getList('down')
  },
  backLast() {
    wx.navigateBack({
      delta: 1
    })
  },

  getList(type) {
    this.setData({
      isLoading: true,
      hasMore: true
    })
    type === 'down' ? this.setData({ page: 0 }) : null;
    let search = {}
    if (this.data.searchName == '') {
       search = { page: this.data.page, wechat_score_type: this.data.searchType, instrument_type: this.data.instrumentType }
    } else {
      search = { page: this.data.page, keyword: this.data.searchName, instrument_type: this.data.instrumentType}
    }
    wx.showLoading({
      title: '加载中',
    })
    util.$get(`${getApp().globalData.urlBase}/v3/wechats`, search).then(res => {
      wx.hideLoading();
      this.processData(type, res.data.data);
    }).catch(e => {
      this.setData({
        isLoading: true,
        hasMore: false
      })
      wx.stopPullDownRefresh()
      wx.showToast({ title: `网络错误！`, duration: 1000, icon: "none" })
    })
  },

  processData(type, list) {
    if (list.length) {
      console.log(list, 'AAAAA!!!!!!!')
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
        isLoading: false,
        hasMore: true
      })
    } else {
      if (type === 'down') {
        wx.showToast({
          title: '没有数据',
          duration: 1500, icon: "none"
        })
        this.setData({
          isLoading: false,
          hasMore: false
        })
      } else {
        this.setData({
          isLoading: false,
          hasMore: true
        })
      }
    }
  },

  openDetail(event) {
    let item = event.currentTarget.dataset.list
    wx.navigateTo({
      url: `../song-detail/song-detail?id=${item.id}`,
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
  onReachBottom: function () {
    if (this.data.isLoading) {  // 防止多次触发加载
      return
    }
    this.getList('up')
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