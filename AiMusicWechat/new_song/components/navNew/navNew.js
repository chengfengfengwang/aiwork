// components/navNew.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal, changedPath) {
        
      }
    },
    backPage: {
      type: Number,
      value: 1,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: wx.getSystemInfoSync().statusBarHeight,
    lineHeight: app.globalData.navLineHeight,
    plat:app.globalData.plat,
    iconTop:8
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backPage(){
      wx.navigateBack({
        delta: this.data.backPage
      })
    }
  }
})
