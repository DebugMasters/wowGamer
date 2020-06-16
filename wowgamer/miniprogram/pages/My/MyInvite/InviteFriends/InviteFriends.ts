// 获取应用实例
let app = getApp<IAppOption>()

Page({
  data: {
    userId: '',
  },
  onLoad: function (options) {
    this.setData({
      userId: options.id,
    })
  },

  onShow: function () {
  },
  getPoster: function (e) {
    wx.navigateTo({
      url: '../InvitePoster/InvitePoster?id=' + this.data.userId,
      success: function(res){ },
      fail: function() { },
      complete: function() { }
    })
  },
})
