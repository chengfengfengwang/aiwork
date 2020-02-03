// pages/indent/indent.js

const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponsLabelText: "无可用优惠券",
    choicedCouponId: "",
    choicedCouponValue: 0,
    color: '#666',
    minutes: '15',
    seconds: '00',
    isShow: false,
    transform: 'rotate(0deg)',
    disabled: false,
    navHeight: app.globalData.navHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('---options----')
    console.log(options)
    console.log('---options----')
    var instrumentType, courseInsType, priceDifferences
    if (options.courseInstrumentType == "guitar") {
      instrumentType = 0
      courseInsType = "吉他"
    } else if (options.courseInstrumentType == "ukulele") {
      instrumentType = 1
      courseInsType = "尤克里里"
    } else if (options.courseInstrumentType == "kalimba") {
      instrumentType = 2
      courseInsType = "拇指琴"
    } else if (options.courseInstrumentType == "djembe") {
      instrumentType = 3
      courseInsType = "非洲鼓"
    }
    wx.setStorageSync('instrument', instrumentType)

    if (options.courseOldPrice) {
      var oldPrice = options.courseOldPrice.substr(1)
    } else {
      var oldPrice = options.coursePrice
    }

    priceDifferences = oldPrice - options.coursePrice

    this.setData({
      courseTitle: options.courseTitle,
      coursePrice: options.coursePrice,
      courseOldPrice: oldPrice,
      priceDifferences: priceDifferences,
      courseInsType: courseInsType,
      instrumentType: instrumentType,
      courseType: options.courseType,
      courseLevel: options.courseLevel,
      courseLevelType: options.courseLevelType,
      goodsId: options.goodsId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var uid = wx.getStorageSync('uid')
    var openid = wx.getStorageSync('openid')
    var token = wx.getStorageSync('token')

    this.setData({
      uid: uid,
      openid: openid,
      token: token,
      timerCount:''
    })

    this.getCoupons()

    //this.countdown()

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    if (this.data.uid) {
      var uid = this.data.uid
    } else {
      var uid = ''
    }
    return {
      title: "AI音乐学院",
      path: '/pages/home/home?inviteId=' + uid,
      imageUrl: this.data.fileurl,
      success: function(res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败")
      }
    }
  },

  getCoupons() {
    var cmd = `${getApp().globalData.urlBase}/v3/coupon`
    var headers = {
      'token': this.data.uid,
      'uid': this.data.uid,
    }
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: cmd,
      header: headers,
      success: (res) => {
        wx.hideLoading();
        var couponsValid = []

        if (res.data.data) {

          var coupons = res.data.data

          var couponsValid = []
          coupons.forEach(function(item, index, arr) {
            if (item.state == 0 || item.state == 1) {
              if (item.instrument_types instanceof Array && item.instrument_types.length!=0){
                if (item.instrument_types.indexOf(-1) != -1 || item.instrument_types.indexOf(Number(that.data.instrumentType)) != -1){
                  if ((that.data.courseType == "two" && item.label_one.indexOf(2) > -1) || (that.data.courseType == "one" && that.data.courseLevel == "advanced" && item.label_one.indexOf(1) > -1) || (that.data.courseType == "one" && that.data.courseLevel == "tutorial" && item.label_one.indexOf(0) > -1)) {

                    if (item.start_time * 1000 < new Date().getTime() && item.end_time * 1000 > new Date().getTime() && item.limit_money < that.data.coursePrice) {

                      couponsValid.push(item)

                    }
                  }
                }
              }else if (item.instrument_type == -1 || item.instrument_type == that.data.instrumentType) {
                if ((that.data.courseType == "two" && item.label_one.indexOf(2) > -1) || (that.data.courseType == "one" && that.data.courseLevel == "advanced" && item.label_one.indexOf(1) > -1) || (that.data.courseType == "one" && that.data.courseLevel == "tutorial" && item.label_one.indexOf(0) > -1)) {

                  if (item.start_time * 1000 < new Date().getTime() && item.end_time * 1000 > new Date().getTime() && item.limit_money < that.data.coursePrice) {

                    couponsValid.push(item)

                  }
                }
              }
            }
          })

          console.log('-----')
          console.log(couponsValid)
          console.log('-----')
          var couponsCount = couponsValid.length

          if (couponsCount > 0) {
            var couponsLabelText = couponsCount + '张可用，已勾选一张'

            function sortPrice(a, b) {
              return b.coupon_value - a.coupon_value
            }
            couponsValid.sort(sortPrice)

            var choicedCouponId = couponsValid[0]._id
            console.log('zzzzz')
            if (couponsValid[0].coupon_type==0){
              var choicedCouponValue = couponsValid[0].coupon_value;
            } else if (couponsValid[0].coupon_type == 1){
              console.log((100 - couponsValid[0].coupon_value) / 100)
              console.log((100 - couponsValid[0].coupon_value)/100 * this.data.coursePrice)
              var choicedCouponValue = Math.round((100 - couponsValid[0].coupon_value)/100 * this.data.coursePrice * 10) / 10 ;
            }
            console.log('zzzzz')
            

            this.setData({
              choicedCouponId: choicedCouponId,
              choicedCouponValue: choicedCouponValue,
              couponsLabelText: couponsLabelText,
              color: '#fd3838',
            })
          }

          this.setData({
            couponsValid: couponsValid,
          })

        }

      },
      fail: () => {
        wx.showToast({
          title: `网络错误！`,
          duration: 1000
        })
      }
    })
  },

  choicedCoupon(event) {
    var couponId = event.currentTarget.dataset.couponId
    var type = event.currentTarget.dataset.couponType;
    if(type==0){
      var couponValue = event.currentTarget.dataset.couponValue
    }else if(type==1){
      var couponValue = Math.round((100 - event.currentTarget.dataset.couponValue) / 100 * this.data.coursePrice * 10) / 10;
    }
    
    if (this.data.choicedCouponId) {
      if (this.data.choicedCouponId == couponId) {
        this.setData({
          choicedCouponId: "",
          choicedCouponValue: 0,
        })
      } else {
        this.setData({
          choicedCouponId: couponId,
          choicedCouponValue: couponValue,
        })
      }
    } else {
      this.setData({
        choicedCouponId: couponId,
        choicedCouponValue: couponValue,
      })
    }
  },

  couponsShow() {
    this.setData({
      isShow: !this.data.isShow,
    })
    if (this.data.isShow) {
      this.setData({
        transform: 'rotate(90deg)',
      })
    } else {
      this.setData({
        transform: 'rotate(0deg)',
      })
    }
  },

  pay() {
    var cmd = `${getApp().globalData.urlBase}/v3/wechat/payment`

    var newdata = {
      'goods_id': this.data.goodsId,
      'openid': this.data.openid
    }

    if (this.data.choicedCouponId) {
      newdata.coupon_id = this.data.choicedCouponId
    }

    var headers = {
      'content-type': 'application/x-www-form-urlencoded',
      'bundle-id': 'com.immusician.music',
      'uid': this.data.uid,
      'token': this.data.token,
    }
    var that = this
    wx.showLoading({
      title: '正在加载',
    })
    console.log('-----------')
    console.log(newdata)
    console.log('-----------')
    wx.request({
      url: cmd,
      data: newdata,
      header: headers,
      success: (res) => {
        wx.hideLoading();
        var timeStamp = res.data.data.timeStamp
        var nonceStr = res.data.data.nonceStr
        var signType = res.data.data.signType
        var paySign = res.data.data.paySign;
        wx.requestPayment({
          'timeStamp': timeStamp,
          'nonceStr': nonceStr,
          'package': res.data.data.package,
          'signType': signType,
          'paySign': paySign,
          'success': function(res) {
            var time = new Date().valueOf();



            wx.navigateTo({
              url: '../payComplete/payComplete?state=success&courseTitle=' + that.data.courseTitle + '&coursePrice=' + that.data.coursePrice + '&choicedCouponValue=' + that.data.choicedCouponValue + '&time=' + time
            })
          },
          'fail': function(res) {
            var time = new Date().valueOf();
            wx.navigateTo({
              url: '../payComplete/payComplete?state=fail&courseTitle=' + that.data.courseTitle + '&coursePrice=' + that.data.coursePrice + '&choicedCouponValue=' + that.data.choicedCouponValue + '&time=' + time
            })
          },
          'complete': function(res) {
            console.log(res)
          }
        })
      },
      fail: () => {
        wx.showToast({
          title: `网络错误！`,
          duration: 1000
        })
      }
    })
  },

  countdown() {

    var minute = 15
    var second = 0

    var that = this
    clearInterval(this.data.timerCount);
    var timer = setInterval(function() {

      if (second == 0 && minute == 0) {
        that.setData({
          minutes: minute,
          seconds: second,
          disabled: true,
        })
        clearInterval(timer)
        wx.showModal({
          title: '支付超时',
          content: '请重新下单',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateBack({
                delta: 1
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return
      }

      if (second == 0) {
        second = 59
        minute--
      } else {
        second--
      }

      minute = Number(minute)
      second = Number(second)

      if (minute < 10) {
        minute = "0" + minute
      }
      if (second < 10) {
        second = "0" + second
      }

      that.setData({
        minutes: minute,
        seconds: second,
      })

    }, 1000)
    this.setData({
      timerCount: timer
    })
  },
  // payCompleteBackClass(){
  //   util.$get(`${getApp().globalData.urlBase}/v3/courses/payment_back_class`)
  // }

})