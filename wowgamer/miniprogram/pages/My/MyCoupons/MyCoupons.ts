// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    userId: '',
    coupons: new Array<{id: string, status: number, name: string, discount: number, expireTime: Date}>(),
  },
  onLoad: function (options) {
    this.setData({
      userId: options.id,
    })
  },

  onShow: function () {
    this.getAvailableCoupon();
  },

  getAvailableCoupon() {
    app.requestFuncPromise('/order/availableCoupon', {userId: this.data.userId}, 'GET')
    .then((res) => {
      if(res.data.success) {
        let data = {
          coupons: new Array<{id: string, status: number, name: string, discount: number, expireTime: Date}>()
        };
        res.data.couponList.forEach(x => {
          if(x.couponStatus == 1) {
            data.coupons.push({id: x.couponId, status: x.couponStatus, name: x.couponName, discount: x.couponDiscount, expireTime: x.expireTime})
          }
        });
        this.setData(data);
      }
    })
  },
  NavToOrder() {
  }
})
