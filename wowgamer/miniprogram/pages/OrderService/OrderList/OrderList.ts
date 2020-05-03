// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    userId: '',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    orderList: new Array()
  },
  onLoad: function (options) {
    this.setData({
      userId: options.id,
    })
  },
  onShow: function () {
    app.requestFuncPromise('/order/orderList', {userId: this.data.userId}, 'GET')
    .then(res => {
      this.setData({
        orderList: res.data.orderList
      })
    })
  },
  NavToOrderEntry: function (e: any) {
    let transdata = {
      mode: 'Detail',
      userId: this.data.userId,
      orderId: e.currentTarget.dataset.orderid
    }
    const comData = JSON.stringify(transdata);
    wx.navigateTo({
      url: '../OrderEntry/OrderEntry' + '?data=' + comData,
      success: function(res){ },
      fail: function() { },
      complete: function() { }
    })
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  
})
