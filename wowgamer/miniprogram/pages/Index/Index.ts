// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    isAuthorized: true,
    currentTab: '1'
  },
  onLoad: function () {
    const userInfo = wx.getStorageSync('userInfo');
    const userId = wx.getStorageSync('userId');
    const _this = this;
    //如果未授权或数据缓存被清除
    if(userId == '' && userInfo == '') {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                wx.setStorageSync('userInfo', res.userInfo);
                app.globalData.userInfo = res.userInfo
                wx.login({
                  success: res => {
                    console.log(res);
            
                    wx.request({
                      url: app.globalData.URL +'/user/login',
                      data: {
                        code: res.code,
                        image: app.globalData.userInfo.avatarUrl, 
                        userName: app.globalData.userInfo.nickName,
                      },
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      method: 'POST',
                      success: function(result) {
                        console.log(result.data);
                        wx.setStorageSync('userId', result.data.userId); //用户唯一标识
                        console.log(wx.getStorageSync('userId'));
                        _this.selectComponent("#home-page").initData()
                      }
                    });
                  }
                })
              },
            })
          } else {
            this.setData({
              isAuthorized : false
            })
          }
        },
      })
    } else {
      _this.selectComponent("#home-page").initData()
    }
  },
  onPullDownRefresh: function () {
    this.selectComponent("#home-page").initData();
    wx.stopPullDownRefresh();
  },
  getUserInfo: function (e: any) {
    const _this = this;
    wx.setStorageSync('userInfo', e.detail.userInfo);

    wx.login({
      success: res => {
        console.log(res);

        wx.request({
          url: app.globalData.URL +'/user/login',
          data: {
            code: res.code,
            image: e.detail.userInfo.avatarUrl, 
            userName: e.detail.userInfo.nickName,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          success: function(result) {
            console.log(result.data);
            wx.setStorageSync('userId', result.data.userId); //用户唯一标识
            console.log(wx.getStorageSync('userId'));
            _this.setData({
              isAuthorized: true
            })
          }
        });
      }
    })
  },
  swichNav: function (e: any) {
    if (e.currentTarget.dataset.currenttab) {
      if (this.data.currentTab != e.currentTarget.dataset.currenttab) {
        this.setData({
          currentTab: e.currentTarget.dataset.currenttab
        })
      }
    }
    if (e.detail.tabIndex) {
      if (this.data.currentTab != e.detail.tabIndex) {
        this.setData({
          currentTab: e.detail.tabIndex
        })
      }
    }
    if(this.data.currentTab == '1') {
      this.selectComponent("#home-page").initData()
    }
    if(this.data.currentTab == '2') {
      this.selectComponent("#master-page").initData()
    }
    if(this.data.currentTab == '3') {
      this.selectComponent("#group-page").initData()
    }
    if(this.data.currentTab == '4') {
      this.selectComponent("#order-page").initData()
    }
    if(this.data.currentTab == '5') {
      this.selectComponent("#my-page").initData()
    }
    
  },
})
