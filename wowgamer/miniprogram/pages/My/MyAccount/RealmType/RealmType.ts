// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    mode: '',
    accountId: ''
  },
  onLoad(option) {
    this.setData({
      mode : option.mode,
      accountId: option.accountId
    })
  },
  navToCharacterEntry(e) {
    wx.navigateTo({
      url: '../CharacterEntry/CharacterEntry?mode=' + this.data.mode + '&realmType=' + e.currentTarget.dataset.realmtype + '&accountId=' + this.data.accountId,
      success: function(res){ },
      fail: function() { },
      complete: function() { }
    })
  }
})
