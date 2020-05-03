// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    userId: '',
    userName: '',
    userImage: ''
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
          userImage: res.data.userInfo.image
        })
      }
    })
  }
})
