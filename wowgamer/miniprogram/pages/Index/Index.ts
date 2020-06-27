// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    isAuthorized: false,
    showAuthorizeWindow: false,
    currentTab: '1',
    nextTab: '-1'
  },
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo');
    const userId = wx.getStorageSync('userId');
    const _this = this;
    if(options.scene) {
      app.globalData.isShared = true;
      app.globalData.sharedUserId = options.scene;
    }
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
                        if(app.globalData.isShared) {
                          _this.sendShared(true, app.globalData.sharedUserId);
                        }
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
              showAuthorizeWindow: true,
              isAuthorized : false,
              nextTab: '1'
            })
          }
        },
      })
    } else {
      if(app.globalData.isShared) {
        _this.sendShared(true, app.globalData.sharedUserId);
      }
      _this.selectComponent("#home-page").initData()
    }
  },
  sendShared: function (isShared: boolean, inviteUserId: string) {
    if(isShared) {
      const userId = wx.getStorageSync('userId');
      app.requestFuncPromise('/user/completeInvite', {inviteUserId: inviteUserId, invitedUserId:  userId}, 'POST')
      .then(res => {
        wx.showToast({
          title: res.data.msg,
          duration: 2000
        })
        console.log(res);
      })
    }
    app.globalData.isShared = false
  },
  onPullDownRefresh: function () {
    this.selectComponent("#home-page").initData();
    wx.stopPullDownRefresh();
  },
  getUserInfo: function (e: any) {
    const _this = this;
    wx.setStorageSync('userInfo', e.detail.userInfo);
    if(!e.detail.userInfo) return;

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
              isAuthorized: true,
              showAuthorizeWindow: false
            });
            if(app.globalData.isShared) {
              _this.sendShared(true, app.globalData.sharedUserId);
            }
            if(_this.data.nextTab != '-1') {
              _this.setData({
                currentTab: _this.data.nextTab
              })
              if(_this.data.nextTab == '1') {
                _this.selectComponent("#home-page").initData()
              }
              if(_this.data.nextTab == '2') {
                _this.selectComponent("#master-page").initData()
              }
              if(_this.data.nextTab == '3') {
                _this.selectComponent("#group-page").initData()
              }
              if(_this.data.nextTab == '4') {
                _this.selectComponent("#order-page").initData()
              }
              if(_this.data.nextTab == '5') {
                _this.selectComponent("#my-page").initData()
              }
              _this.setData({
                nextTab:'-1'
              })
            }
          }
        });
      }
    })
  },
  cancelAuthorize: function () {
    this.setData({
      showAuthorizeWindow: false
    });
    if(this.data.nextTab == '1') {
      this.selectComponent("#home-page").initData()
    }
  },
  swichNav: function (e: any) {
    const userInfo = wx.getStorageSync('userInfo');
    const userId = wx.getStorageSync('userId');
    if(userId == '' && userInfo == '') {
      if(e.currentTarget.dataset.currenttab == '2' ||e.currentTarget.dataset.currenttab == '3') {
        this.setData({
          showAuthorizeWindow: true,
          nextTab: e.currentTarget.dataset.currenttab
        });
        return;
      }
    }

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
  }
})
