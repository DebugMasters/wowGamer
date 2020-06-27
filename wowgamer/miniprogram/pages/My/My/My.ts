const app = getApp<IAppOption>()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    userId: '',
    userName: '',
    userImage: '',
    displayAddUser: false,
    displayAddUserInput: false,
    isLogin: true,
    showAuthMessage: false,
    accountList: [],
    newAccountName:'',
    orderCount: 0,
    couponCount: 0
  },

  behaviors: [],


  lifetimes: {
    attached() {
    }
  },

  methods: {
    initData() {
      this.setData({
        userId: wx.getStorageSync('userId')
      })
      if(this.data.userId) {
        app.requestFunc('/user/getUserInfo', {userId: this.data.userId}, 'GET', res => {
          console.log(res.data);
          if (res.data.success == true) {
            this.setData({
              userName: res.data.userInfo.userName,
              userImage: res.data.userInfo.image,
              orderCount: res.data.order,
              couponCount: res.data.coupon,
              isLogin: true
            })
          }
        })
      } else {
        this.setData({
          isLogin: false
        })
      }
      
    },
    displayAddUserFn() {
      if(!this.data.isLogin) {
        this.setData({
          showAuthMessage: true
        })
        return;
      }
      this.setData({ 
        displayAddUser : !this.data.displayAddUser
       })
       app.requestFunc('/user/getAccountList', {userId: this.data.userId}, 'GET', res => {
        console.log(res.data);
        if (res.data.success == true) {
          this.setData({
            accountList: res.data.accountList
          })
        }
      })
    },
    bindInputNewAccountName(e) {
      this.setData({
        newAccountName: e.detail.value
      })
    },
    saveNewAccount() {
      if (!this.data.newAccountName.accountId) {
        wx.showToast({
          title: '请输入子账号名称',
          icon: 'none',
          mask: true,
          duration: 1000
        });
        return;
      }
      app.requestFunc('/user/saveAccount', {userId: this.data.userId, accountName: this.data.newAccountName}, 'POST', res => {
        console.log(res.data);
        if (res.data.success == true) {
          console.log(res.data.msg);
  
          app.requestFunc('/user/getAccountList', {userId: this.data.userId}, 'GET', res => {
            console.log(res.data);
            if (res.data.success == true) {
              this.setData({
                accountList: res.data.accountList
              })
            }
          })
        }
      })
    },
    displayAddUserInputFn() {
      if(!this.data.isLogin) {
        this.setData({
          showAuthMessage: true
        })
        return;
      }
      this.setData({ 
        displayAddUserInput : !this.data.displayAddUserInput
       })
    },
    NavToMyInformation() {
      wx.navigateTo({
        url: '../My/MyInformation/MyInformation?id=' + this.data.userId,
        success: function(res){ },
        fail: function() { },
        complete: function() { }
      })
    },
    NavToMyAccount(e) {
      wx.navigateTo({
        url: '../My/MyAccount/MyAccount?id=' + this.data.userId + '&accountId=' + e.currentTarget.dataset.accountid,
        success: function(res){ },
        fail: function() { },
        complete: function() { }
      })
    },
    NavToAbout() {
    },
    NavToOrderList() {
      if(!this.data.isLogin) {
        this.setData({
          showAuthMessage: true
        })
        return;
      }
      wx.navigateTo({
        url: '../OrderService/OrderList/OrderList?id=' + this.data.userId,
        success: function(res){ },
        fail: function() { },
        complete: function() { }
      })
    },
    deleteCurrentAcount(e) {
      const _this = this
      wx.showModal({
        title: '提示',
        content: '删除子账号后,子账号下面的角色都将被自动删除~',
        success (res) {
          if (res.confirm) {
            app.requestFunc('/user/deleteAccount', {userId: _this.data.userId, accountId: e.currentTarget.dataset.accountid}, 'POST', res => {
              console.log(res.data);
              if (res.data.success == true) {
                console.log(res.data.msg);
                wx.showToast({
                  title: res.data.msg,
                  icon: 'success',
                  duration: 2000
                })
  
                app.requestFunc('/user/getAccountList', {userId: _this.data.userId}, 'GET', res => {
                  console.log(res.data);
                  if (res.data.success == true) {
                    _this.setData({
                      accountList: res.data.accountList
                    })
                  }
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    NavToMyCoupons() {
      if(!this.data.isLogin) {
        this.setData({
          showAuthMessage: true
        })
        return;
      }
      wx.navigateTo({
        url: '../My/MyCoupons/MyCoupons?id=' + this.data.userId,
        success: function(res){ },
        fail: function() { },
        complete: function() { }
      })
    },
    NavToInviteFriends() {
      if(!this.data.isLogin) {
        this.setData({
          showAuthMessage: true
        })
        return;
      }
      wx.navigateTo({
        url: '../My/MyInvite/InviteFriends/InviteFriends?id=' + this.data.userId,
        success: function(res){ },
        fail: function() { },
        complete: function() { }
      })
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
              _this.setData({
                userId: result.data.userId,
                isLogin: true
              });
              _this.initData();
              if(app.globalData.isShared) {
                _this.sendShared(true, app.globalData.sharedUserId);
              }
              _this.NavToMyInformation();
            }
          });
        }
      })
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
    hideAuthMessage: function () {
      this.setData({
        showAuthMessage: false
      })
    }
  }
})