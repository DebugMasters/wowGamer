// app.ts
import { getResources } from "./utils/resources";

App<IAppOption>({
  globalData: {
    RootURL: 'https://www.5mlf.cn/',
    URL: 'https://www.5mlf.cn/warcraft/a/api',
    // URL: 'http://39.100.37.104:8980/warcraft/a/api',
    // URL: 'http://localhost:8980/warcraft/a/api',
    // RootURL: 'http://39.100.37.104:8980/',
    isAuthorized: false,
    isShared: false,
    sharedUserId: '',
    userInfo: {avatarUrl: '', city: '', country: '', gender: 0, language: 'zh_CN', nickName: '', province: ''},
    StatusBar: 0,
    Custom: {bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0},
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
  getResourcePath: function (name, type) {
    return getResources(name, type);
  }
})