// pages/invite/invite.js

const app = getApp();
const util = require('../../utils/util.js');
Page({
  data: {
    navHeight: app.globalData.navHeight,
    moreStageModalShow: false,
    currentStage: 1,
    stage1: {
      upGradeNeedNum: 3, //升到下一级所需要邀请的人数
      curentStageInvitedNum: 0, //当前阶段有多少人
      stageText: '第一阶段',
      haveGetGift: false
    },
    stage2: {
      upGradeNeedNum: 5,
      curentStageInvitedNum: 0,
      stageText: '第二阶段',
      haveGetGift: false
    },
    stage3: {
      upGradeNeedNum: 8,
      curentStageInvitedNum: 0,
      stageText: '第三阶段',
      haveGetGift: false
    },
    currentStageData: {},
    giftArr: [],
    gift: {},
    previewGiftMask: false,
    previewGiftModalText: {
      giftstatus1: {
        status: 1,
        title: '邀请好友加入即可获得此奖励',
        content1: '离获得奖励还差几步哦！',
        content2: '快去召集更多好友一起学习吧！',
        btnText: '分享获得礼品'
      },
      giftstatus2: {
        status: 2,
        title: '成功获得奖励',
        content1: '太棒啦！恭喜你获得优惠券一张！',
        content2: '这是你应得的，快收下吧~',
        btnText: '立即使用'
      },
      giftstatus3: {
        status: 3,
        title: '已获得此奖励',
        content1: '您已经领取过优惠券了哦',
        content2: '快去使用吧～',
        btnText: '前往优惠券'
      }
    },
    currentClickedGiftStatus: {},
    currentClickedGift: {}
  },
  onLoad: function(options) {
    var uid = wx.getStorageSync('uid')
    var token = wx.getStorageSync('token')
    if (uid) {
      this.setData({
        uid: uid,
        token: token,
      })
      this.getInviteProgress()
    } else {
      wx.redirectTo({
        url: '../activity/activity'
      })
    };
  },
  getInviteProgress(pullDown) {
    //if(!pullDown){
    wx.showLoading({
      title: '加载中',
    })
    //}
    wx.request({
      url: `${getApp().globalData.urlBase}/v3/invite/get_invite_info`,
      header: {
        'token': this.data.uid,
        'uid': this.data.uid,
      },
      success: (res) => {
        if (pullDown == 'pullDown') {
          setTimeout(() => {
            wx.hideLoading();
            wx.stopPullDownRefresh()
          }, 500)
        } else {
          wx.hideLoading();
          wx.stopPullDownRefresh()
        }


        var res = res.data.data;
        var tempArr = [];
        Array.prototype.push.apply(tempArr, [res.gift, res.gift2, res.gift3])
        this.setData({
          giftArr: tempArr
        })
        var inviteCount = res.invite_count;
        if (inviteCount < this.data.stage1.upGradeNeedNum) {
          this.setData({
            //currentStage: 1,
            'stage1.curentStageInvitedNum': inviteCount
          })
        } else if (inviteCount < this.data.stage1.upGradeNeedNum + this.data.stage2.upGradeNeedNum) {
          this.setData({
            //currentStage: 2,
            'stage1.curentStageInvitedNum': res.avatar_list1.length,
            'stage2.curentStageInvitedNum': inviteCount - this.data.stage1.upGradeNeedNum
          })
        } else if (inviteCount < this.data.stage1.upGradeNeedNum + this.data.stage2.upGradeNeedNum + this.data.stage3.upGradeNeedNum) {
          this.setData({
            //currentStage: 3,
            'stage1.curentStageInvitedNum': res.avatar_list1.length,
            'stage2.curentStageInvitedNum': res.avatar_list2.length,
            'stage3.curentStageInvitedNum': inviteCount - this.data.stage1.upGradeNeedNum - this.data.stage2.upGradeNeedNum
          })
        }
        //是否领取礼物
        this.setData({
          'stage1.haveGetGift': res.has_gift == 0 ? false : true,
          'stage2.haveGetGift': res.has_gift2 == 0 ? false : true,
          'stage3.haveGetGift': res.has_gift3 == 0 ? false : true,
          'stage1.avatar_list': res.avatar_list1,
          'stage2.avatar_list': res.avatar_list2,
          'stage3.avatar_list': res.avatar_list3,
          'stage1.gift': res.gift,
          'stage2.gift': res.gift2,
          'stage3.gift': res.gift3,
        })
        var temp = 'stage' + this.data.currentStage;
        this.setData({
          currentStageData: JSON.parse(JSON.stringify(this.data[temp]))
        })

        console.log(this.data);
      },
      fail: () => {
        wx.showToast({
          title: `网络错误！`,
          duration: 1000,
        })
      }
    })
  },

  upperStage() {
    if (this.data.currentStage == 1) {
      wx.showToast({
        icon: 'none',
        title: '没有了～',
        duration: 800
      })
      return;
    }
    this.setData({
      currentStage: this.data.currentStage - 1
    })
    var temp = 'stage' + this.data.currentStage;
    this.setData({
      currentStageData: JSON.parse(JSON.stringify(this.data[temp]))
    })
    console.log(this.data.currentStageData)
  },

  nextStage() {
    if (this.data.currentStage == 3) {
      wx.showToast({
        icon: 'none',
        title: '没有了～',
        duration: 800
      })
      return
    }
    this.setData({
      currentStage: this.data.currentStage + 1
    })
    var temp = 'stage' + this.data.currentStage;
    this.setData({
      currentStageData: JSON.parse(JSON.stringify(this.data[temp]))
    })
  },

  showMoreStageModal() {
    this.setData({
      moreStageModalShow: true
    })
  },

  hideModal() {
    this.setData({
      moreStageModalShow: false
    })
  },

  goReceivePrize(event) {
    console.log(event.currentTarget.dataset.couponId)
    var couponId = event.currentTarget.dataset.couponId
    wx.navigateTo({
      url: '../receivePrize/receivePrize?couponId=' + couponId
    })
  },
  shareCount() {
    util.$get(getApp().globalData.urlBase + '/v3/invite/invite_count').then(res => {
      console.log('shareCount 调用成功')
    })
  },
  onShareAppMessage: function(res) {
    this.shareCount();
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    if (this.data.uid) {
      var uid = this.data.uid
    } else {
      var uid = ''
    }
    return {
      title: "学琴还有红包领，快来和我一起吧~",
      path: '/pages/home/home?inviteId=' + uid,
      imageUrl: 'https://s.immusician.com/invite-share.jpeg'
    }
  },
  onPullDownRefresh() {
    this.getInviteProgress('pullDown')
  },
  handleClickGift(e) {
    if (e.currentTarget.dataset.stage) {
      this.setData({
        currentClickedGift: this.data[e.currentTarget.dataset.stage].gift,
      });
    } else {
      this.setData({
        currentClickedGift: this.data['stage' + this.data.currentStage].gift,
      });
    }
    console.log(e.currentTarget.dataset.giftstatus);
    if (e.currentTarget.dataset.giftstatus == 'giftstatus2') {
      this.getPrize(this.data.currentClickedGift._id).then(()=>{
        this.setData({
          previewGiftMask: true
        });
        this.getInviteProgress();
      })
    }else{
        this.setData({
          previewGiftMask: true
        });
    }
    
    this.setData({
      currentClickedGiftStatus: this.data.previewGiftModalText[e.currentTarget.dataset.giftstatus],
    });
    console.log(this.data.currentClickedGift)
    //console.log(this.data.currentClickedGiftStatus)
  },
  closeGiftPreview() {
    this.setData({
      previewGiftMask: false
    })
  },
  getPrize(couponid) {
    return new Promise((resolve,reject)=>{
      var headers = {
        'uid': this.data.uid,
        'token': this.data.token,
        'platform': 1,
        'version': '2.3.8',
      }
      wx.showLoading({
        title: '正在领取优惠券...',
        mask: true
      })
      wx.request({
        url: `${getApp().globalData.urlBase}/v3/invite/invite_coupon`,
        data: {
          'coupon_id': couponid
        },
        header: headers,
        success: (res) => {
          wx.hideLoading();
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
    
  },
  toUse() {
    wx.navigateTo({
      url: '../coupons/coupons',
    })
  },
  toHome() {
    wx.switchTab({
      url: '../home/home',
    })
  },
  formSubmit(e) {
    console.log('formId---' + e.detail.formId)
    util.postFormId(e.detail.formId)
  },

})