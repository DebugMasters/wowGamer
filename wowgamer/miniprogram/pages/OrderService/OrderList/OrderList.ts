// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    userId: '',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    orderList: new Array(),
    orderStatusContent: [
      {id: 9, name: '订单状态'},
      {id: 0, name: '已下单'},
      {id: 1, name: '代练中'},
      {id: 2, name: '已完成'},
      {id: -1, name: '已关闭'}
    ],
    orderStatusIndex: 0
  },
  onLoad: function (options) {
    this.setData({
      userId: options.id,
    })
  },
  onShow: function () {
    app.requestFuncPromise('/order/orderList', {userId: this.data.userId}, 'GET')
    .then(res => {
      let tempList = res.data.orderList
      tempList.forEach(x => {
        x.imgUrl = app.globalData.RootURL + 'warcraft/static/img/' + app.getResourcePath(x.characterClass, 'order')
      });
      this.setData({
        orderList: tempList
      })
    })
  },
  ChangeOrderChange: function (e) {
    this.setData({
      orderStatusIndex: e.detail.value
    })
    const orderstatusid = this.data.orderStatusContent[this.data.orderStatusIndex].id;
    let data = undefined;
    if(orderstatusid != 9) {
      data = {
        userId: this.data.userId,
        orderStatus: orderstatusid
      }
    } else {data = {
      userId: this.data.userId
    }
    }
    app.requestFuncPromise('/order/orderList', data, 'GET')
    .then(res => {
      let tempList = res.data.orderList
      tempList.forEach(x => {
        x.imgUrl = app.globalData.RootURL + 'warcraft/static/img/' + app.getResourcePath(x.characterClass, 'order')
      });
      this.setData({
        orderList: tempList
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
