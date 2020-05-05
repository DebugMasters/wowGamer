// app.ts
App<IAppOption>({
  globalData: {
    // URL: 'http://192.168.9.37:8980/warcraft/a/api',
    // URL: 'http://localhost:8980/warcraft/a/api',
    URL: 'http://39.100.37.104:8980/warcraft/a/api',
    isAuthorized: false,
    userInfo: undefined,
    StatusBar: 0,
    Custom: 0,
    CustomBar: 0,
    WindowHeight: 0,
    ScreenHeight: 0
  },
  onLaunch: function () {
    // 登录
    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo != '') {
      this.globalData.userInfo = userInfo
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        this.globalData.WindowHeight = e.windowHeight;
        this.globalData.ScreenHeight = e.screenHeight;
      }
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