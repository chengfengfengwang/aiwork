//app.js
App({
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
        const code = res.code
        if (res.code) {
          wx.request({
            url: 'https://youpai.iguitar.immusician.com/v3/wechat/decodeUserInfo',
            method: 'POST',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            data: {
              code: code
            },
            success: data => {
              wx.setStorageSync('openid', data.data.data.openid);
            },
            fail: function (res) { }
          })
        }
      }
    });
    var statusHeight = wx.getSystemInfoSync().statusBarHeight;
    this.globalData.navHeight = statusHeight * 4 + 40;
    if (wx.getSystemInfoSync().platform.toLowerCase() == 'android') {
      this.globalData.plat = 'Android';
      this.globalData.isIOS = false;
      this.globalData.navLineHeight = statusHeight * 4 + 96
    } else {
      this.globalData.plat = 'IOS';
      this.globalData.isIOS = true;
      this.globalData.navLineHeight = statusHeight * 4 + 88
    }

    console.log('onLaunch')
    var checkUrl = 'https://wechat.immusician.com'
    // wx.request({
    //   url: `${checkUrl}/v3/wechat/v3/wechat/course_detail?course_id=42`, 
    //   success(res) {
    //     console.log(res)
    //     console.log('请求成功')
    //   },
    //   fail(err){
    //     console.log(err)
    //     console.log('请求失败')
    //   }
    // })
  },

  globalData: {
    userInfo: {},
    urlTest: "http://192.168.1.193:22222",
    urlBase: "https://youpai.iguitar.immusician.com",
    classList: [],
    navHeight: '',
    globalInviteImg: 'https://s.immusician.com/miniwechat/aimusicWechatIMG40.jpeg',
    zoneData: [
      {
        name: '中国大陆',
        value: 86
      },
      {
        name: '中国香港',
        value: 852
      },
      {
        name: '中国澳门',
        value: 853
      },
      {
        name: '中国台湾',
        value: 886
      },
      {
        name: '美国',
        value: 1
      },
      {
        name: '加拿大',
        value: 1
      },
      {
        name: '英国',
        value: 44
      },
      {
        name: '德国',
        value: 49
      },
      {
        name: '法国',
        value: 33
      },
      {
        name: '泰国',
        value: 66
      },
      {
        name: '日本',
        value: 81
      },
      {
        name: '韩国',
        value: 82
      },
      {
        name: '瑞典',
        value: 46
      },
      {
        name: '俄罗斯',
        value: 7
      },
      {
        name: '新加坡',
        value: 65
      },
      {
        name: '马来西亚',
        value: 60
      },
      {
        name: '澳大利亚',
        value: 61
      },
      {
        name: '菲律宾',
        value: 63
      },
      {
        name: '新西兰',
        value: 64
      },
      {
        name: '西班牙',
        value: 34
      },
      {
        name: '意大利',
        value: 39
      },
      {
        name: '爱尔兰',
        value: 353
      },
      {
        name: '阿拉伯联合酋长',
        value: 971
      }
    ]
  }

})