// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    userId: '',
    accountId: '',
    CharactorList: new Array()
  },
  onLoad(option) {
    this.setData({
      userId: option.id,
      accountId: option.accountId
    })    
  },
  onShow() {
    this.queryList();
  },
  queryList() {
    app.requestFunc('/user/getCharacterList', {userId: this.data.userId, accountId: this.data.accountId}, 'GET', res => {
      console.log(res.data);
        if (res.data.success == true) {
          let tempList = res.data.list
          tempList.forEach(x => {
            x.imgUrl = app.globalData.RootURL + 'warcraft/static/img/' + app.getResourcePath(x.characterClass.toString(), 'character')
          });
          this.setData({
            CharactorList: tempList
          })
        }
    })
  },
  createNewCharacter() {
    wx.navigateTo({
      url: './RealmType/RealmType?mode=AddNew&accountId=' + this.data.accountId,
      success: function(res){ },
      fail: function() { },
      complete: function() { }
    })
  },
  navToCaracterEntry(e) {
    wx.navigateTo({
      url: '../MyAccount/CharacterEntry/CharacterEntry?mode=Modify' + '&accountId=' + this.data.accountId + '&characterId=' + e.currentTarget.dataset.characterid,
      success: function(res){ },
      fail: function() { },
      complete: function() { }
    })
  },
  deleteCharacter(e) {
    const _this = this
    wx.showModal({
      title: '提示',
      content: '是否删除该角色',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          app.requestFunc('/user/deleteCharacter', {userId: wx.getStorageSync('userId'), characterId: e.currentTarget.dataset.characterid}, 'POST', res => {
            console.log(res.data);
            if (res.data.success == true) {
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 1000
              })
              _this.queryList();
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1000
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
