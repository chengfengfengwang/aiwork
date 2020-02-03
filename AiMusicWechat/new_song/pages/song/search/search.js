// pages/song/search/search.js
const util = require('../../../utils/util.js')
Page({

  data: {
    isLoading: false,
    hotKeyword: null,
    instrumentType: 'ukulele',
    navTitle: 'AI音乐学院'
  },

  onLoad: function (options) {
    this.data.instrumentType = options.instrument_type
    this.getHotKeyword()
  },

  backLast(){
    wx.navigateBack({
      delta:1
    })
  },

  getHotKeyword(){ // 获取热词
    util.$get(getApp().globalData.urlBase+'/v3/wechats/hot_word/').then(res => {
      this.ProcessLabel(res.data.data)
    })
  },
  
  ProcessLabel(data){
    this.setData({
      hotKeyword: data
    })
    console.log(this.data.hotKeyword, 'hot')
  },

  searchA(e){
    this.search('name', e.detail.value)
  },
  searchB(e) {
    this.search('name', e.detail.value.keyword)
  },
  search(type,keyword){
    if (type == 'name'){
      if (keyword == ''){
        wx.showToast({ title: `请输入内容!`, duration: 1500, icon: "none" })
        return false
      }else{
        wx.navigateTo({
          url:`../more-song/more-song?instrument_type=${this.data.instrumentType}&search_name=${keyword}`
        })
      }
    }else{
      if (type == 'type'){
        wx.navigateTo({
          url: `../more-song/more-song?instrument_type=${this.data.instrumentType}&search_type=${keyword}`
        })
      }
    }
  },
  searchByKeyword(event){
    const item = event.currentTarget.dataset.item
    this.search('type', item.search_type)
    console.log(item)
  },
 getList(type , keyword) {
    this.setData({
      isLoading: true,
      hasMore: true
    })
    type === 'down' ? this.setData({ page: 0 }) : null;
    util.$get(`${getApp().globalData.urlBase}/v3/wechats`, { page: this.data.page,}).then(res => {
      if (res.data.res === 0) {
        console.log(res.data.data, 'sssss')
        this.processData(type, res.data.data)
      }
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
      if (type === 'up') {
        this.setData({
          songList: this.data.songList.concat(list)
        })
      } else {
        this.setData({
          songList: list
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
        console.log('没有数据')
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