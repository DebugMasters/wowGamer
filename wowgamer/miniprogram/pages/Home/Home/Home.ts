// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showAuthorizedWindow: true,
    articleList: [],
    carouselList: [],
    notificationList: ['AAA']
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        if(this.data.hasUserInfo && this.data.canIUse){
          this.setData({
            showAuthorizedWindow: false
          })
          this.getIndexInfo();
        }
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        },
      })
    }
    if(this.data.hasUserInfo && this.data.canIUse){
      this.setData({
        showAuthorizedWindow: false
      })
    }
  },
  
  getIndexInfo() {
    app.requestFunc('/system/getIndexInfo', {}, 'GET', res => {
      console.log(res.data);
      if (res.data.success == true) {
        this.setData({
          carouselList: res.data.carouselList,
          articleList: res.data.articleList,
          // notificationList: res.data.notificationList
        })
      }
    })
  },

  navToMy: function () {
    wx.switchTab({
      url: '../../My/My/My'
    })
  },
  getUserInfo(e: any) {
    const _this = this;
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })

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
            wx.setStorageSync('id', result.data.userId); //用户唯一标识
            console.log(wx.getStorageSync('id'));
            _this.setData({
              showAuthorizedWindow: false
            })
            _this.getIndexInfo();
          }
        });
      }
    })
  },
  hideAuthorizedWindow: function () {
    this.setData({
      showAuthorizedWindow: false
    })
  }
})
