// index.ts

import crypto from "../../../utils/crypto";

// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    userId: '',
    userName: '',
    userImage: '',
    account: '',
    password: '',
    mobile: '',
    showPassword: false,
    accountPassword: '',
  },
  onLoad: function (options) {
    this.setData({
      userId: options.id,
    })
  },

  onShow: function () {
    app.requestFunc('/user/getUserInfo', {userId: this.data.userId}, 'GET', res => {
      console.log(res.data);
      if (res.data.success == true) {
        this.setData({
          userName: res.data.userInfo.userName,
          userImage: res.data.userInfo.image,
          account: res.data.userInfo.gameAccount,
          password: crypto.decrypt(res.data.userInfo.gamePassword),
          mobile: res.data.userInfo.mobile,
        })
      }
    })
  },

  ShowPassword() {
    this.setData({
      showPassword: !this.data.showPassword
    })
  },
  inputPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },

  formSubmit: function(e: any) {
    let detailData = {
      userId: this.data.userId,
      account: e.detail.value.account,
      password: crypto.encrypt(e.detail.value.password),
      mobile: e.detail.value.mobile
    }
    
    app.requestFunc('/user/saveUserInfo', detailData, 'POST', res => {
      console.log(res.data);
      if (res.data.success == true) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 1000
        })
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
})
