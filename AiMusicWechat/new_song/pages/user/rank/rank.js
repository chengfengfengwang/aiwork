// pages/user/rank/rank.js
const app = getApp()
const util = require('../../../utils/util.js')
let auth = require('../../../templates/index');
Page(Object.assign({}, auth.authUserInfo,{
  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    dankList:'',
    navTitle: '我的班级',
    className: 'aa',
    levelNum: [4,5],
    text1: '',
    text2: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.q) {
      var parameter = decodeURIComponent(options.q)
      var paramArr = parameter.split("=")
      if (paramArr) {
        this.setData({
          bright: parseInt(paramArr[1])
        })
      }
    } 
    this.data.openid = options.openid
    this.setData({
      openid: wx.getStorageSync('openid'),
      showShare: options.showShare || false
    })

    if (this.data.bright) {
      this.setData({
        class_id: this.data.bright
      })
      util.$get(`${getApp().globalData.urlBase}/v3/wechat/is_bright`, { openid: this.data.openid, class_id: this.data.bright }).then(res => {
        wx.hideLoading()
      }).catch(e => {
        wx.stopPullDownRefresh()
        wx.showToast({ title: `网络错误！`, duration: 1000, icon: "none" })
      })
    }else{
      this.setData({
        class_id: options.class_id
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.showNavigationBarLoading()
    this.getDank()
  },
  getDank (){
    this.setData({
      isLoading: true,
    })
    util.$get(`${getApp().globalData.urlBase}/v3/wechat/dank`, {openid: this.data.openid,class_id:this.data.class_id, type: this.data.type}).then(res => {
      this.setData({
        dankList:res.data.data,
        text1: res.data.text,
        text2: res.data.text2,
        className: res.data.class_name,
        navTitle: res.data.class_name,
        isLoading: false
      })
      console.log(this.data.dankList)
      wx.hideLoading()
    }).catch(e => {
      wx.stopPullDownRefresh()
      wx.showToast({ title: `网络错误！`, duration: 1000, icon: "none" })
      })
  },

  onClick(e){
    if (this.data.isLoading){
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.showNavigationBarLoading()
    // this.data.type = e.target.dataset.type
    this.setData({
      type : e.target.dataset.type,
      isLoading: true,
    })

    util.$get(`${getApp().globalData.urlBase}/v3/wechat/dank`, { openid: this.data.openid, class_id: this.data.class_id, type: this.data.type }).then(res => {
      this.setData({
        dankList: res.data.data,
        text1: res.data.text,
        text2: res.data.text2
      })
      this.setData({
        isLoading: false,
      })
      wx.hideLoading()
    }).catch(e => {
      wx.stopPullDownRefresh()
      wx.showToast({ title: `网络错误！`, duration: 1000, icon: "none" })
    })
  },

  backLast() {
    wx.navigateBack({
      delta: 1
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
      path:"/pages/user/rank/rank?openid="+this.data.openid+"&class_id="+this.data.class_id+"&showShare=true"
    }
  },
  backIndex() {
    wx.switchTab({
      url: '../../../pages/song/song',
    })
  },

  share(){

  }
}))