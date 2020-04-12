// miniprogram/pages/OrderService/Order/Order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    OrderTypes: ['团队副本', '大秘境', '等级'],
    SelectedContent: ['H尼奥罗萨全通个人拾取', 'H尼奥罗萨后二', 'H尼奥罗萨10件不同部位'],
    PickMode: ['坦克、近战、奶骑、猎人', '远程'],
    SelectP: ['zjz/联盟/法师', 'qqq/部落/恶魔猎手']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  NavToCreateOrder() {
    wx.navigateTo({
      url: '../../OrderService/OrderEntry/OrderEntry',
      success: function(res){ },
      fail: function() { },
      complete: function() { }
    })
  },
})