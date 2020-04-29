// app.ts
App<IAppOption>({
  globalData: {
    // URL: 'http://localhost:8980/warcraft/a/api',
    URL: 'http://39.100.37.104:8980/warcraft/a/api',
    isAuthorized: false,
    userInfo: undefined
  },
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        wx.setStorageSync('logincode', res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
          })
        }
      },
    })
  },
  requestFuncPromise: function (api, data, method) {
    var promise = new Promise((resolve, reject) => {
      wx.request({
        url: this.globalData.URL +api,
        data: data,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: method,
        success: res => resolve(res),
        fail: err => reject(err)
      });

    })
    return promise;
  },
  requestFunc: function (api, data, method, successfn, failfn) {
    wx.request({
      url: this.globalData.URL +api,
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: method,
      success: successfn,
      fail: failfn
    });
  },
})