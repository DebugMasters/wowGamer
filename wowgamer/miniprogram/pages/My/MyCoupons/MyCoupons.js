"use strict";
const app = getApp();
Page({
    data: {
        userId: '',
        coupons: new Array(),
    },
    onLoad: function (options) {
        this.setData({
            userId: options.id,
        });
    },
    onShow: function () {
        this.getAvailableCoupon();
    },
    getAvailableCoupon() {
        app.requestFuncPromise('/order/availableCoupon', { userId: this.data.userId }, 'GET')
            .then((res) => {
            if (res.data.success) {
                let data = {
                    coupons: new Array()
                };
                res.data.couponList.forEach(x => {
                    if (x.couponStatus == 1) {
                        data.coupons.push({ id: x.couponId, status: x.couponStatus, name: x.couponName, discount: x.couponDiscount, expireTime: x.expireTime });
                    }
                });
                this.setData(data);
            }
        });
    },
    NavToOrder() {
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlDb3Vwb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTXlDb3Vwb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQTtBQUVoQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsRUFBRTtRQUNWLE9BQU8sRUFBRSxJQUFJLEtBQUssRUFBa0Y7S0FDckc7SUFDRCxNQUFNLEVBQUUsVUFBVSxPQUFPO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUU7U0FDbkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELE1BQU0sRUFBRTtRQUNOLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsR0FBRyxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLEVBQUUsS0FBSyxDQUFDO2FBQ2xGLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1osSUFBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDbkIsSUFBSSxJQUFJLEdBQUc7b0JBQ1QsT0FBTyxFQUFFLElBQUksS0FBSyxFQUFrRjtpQkFDckcsQ0FBQztnQkFDRixHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzlCLElBQUcsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLEVBQUU7d0JBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFBO3FCQUN0STtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BCO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsVUFBVTtJQUNWLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuLy8g6I635Y+W5bqU55So5a6e5L6LXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIHVzZXJJZDogJycsXG4gICAgY291cG9uczogbmV3IEFycmF5PHtpZDogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgbmFtZTogc3RyaW5nLCBkaXNjb3VudDogbnVtYmVyLCBleHBpcmVUaW1lOiBEYXRlfT4oKSxcbiAgfSxcbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB1c2VySWQ6IG9wdGlvbnMuaWQsXG4gICAgfSlcbiAgfSxcblxuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmdldEF2YWlsYWJsZUNvdXBvbigpO1xuICB9LFxuXG4gIGdldEF2YWlsYWJsZUNvdXBvbigpIHtcbiAgICBhcHAucmVxdWVzdEZ1bmNQcm9taXNlKCcvb3JkZXIvYXZhaWxhYmxlQ291cG9uJywge3VzZXJJZDogdGhpcy5kYXRhLnVzZXJJZH0sICdHRVQnKVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgY291cG9uczogbmV3IEFycmF5PHtpZDogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgbmFtZTogc3RyaW5nLCBkaXNjb3VudDogbnVtYmVyLCBleHBpcmVUaW1lOiBEYXRlfT4oKVxuICAgICAgICB9O1xuICAgICAgICByZXMuZGF0YS5jb3Vwb25MaXN0LmZvckVhY2goeCA9PiB7XG4gICAgICAgICAgaWYoeC5jb3Vwb25TdGF0dXMgPT0gMSkge1xuICAgICAgICAgICAgZGF0YS5jb3Vwb25zLnB1c2goe2lkOiB4LmNvdXBvbklkLCBzdGF0dXM6IHguY291cG9uU3RhdHVzLCBuYW1lOiB4LmNvdXBvbk5hbWUsIGRpc2NvdW50OiB4LmNvdXBvbkRpc2NvdW50LCBleHBpcmVUaW1lOiB4LmV4cGlyZVRpbWV9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBOYXZUb09yZGVyKCkge1xuICB9XG59KVxuIl19