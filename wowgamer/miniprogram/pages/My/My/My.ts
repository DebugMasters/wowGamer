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
      if(!this.data.userName || !this.data.userImage) {
        app.requestFunc('/user/getUserInfo', {userId: this.data.userId}, 'GET', res => {
          console.log(res.data);
          if (res.data.success == true) {
            this.setData({
              userName: res.data.userInfo.userName,
              userImage: res.data.userInfo.image,
              orderCount: res.data.order,
              couponCount: res.data.coupon
            })
          }
        })
      }
    },
    displayAddUserFn() {
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
    }
  }
})