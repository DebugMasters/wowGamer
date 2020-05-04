"use strict";
const app = getApp();
Page({
    data: {
        userId: '',
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        orderList: new Array(),
        orderStatusContent: [
            { id: 9, name: '订单状态' },
            { id: 0, name: '已下单' },
            { id: 1, name: '代练中' },
            { id: 2, name: '已完成' },
            { id: -1, name: '已关闭' }
        ],
        orderStatusIndex: 0
    },
    onLoad: function (options) {
        this.setData({
            userId: options.id,
        });
    },
    onShow: function () {
        app.requestFuncPromise('/order/orderList', { userId: this.data.userId }, 'GET')
            .then(res => {
            this.setData({
                orderList: res.data.orderList
            });
        });
    },
    ChangeOrderChange: function (e) {
        this.setData({
            orderStatusIndex: e.detail.value
        });
        const orderstatusid = this.data.orderStatusContent[this.data.orderStatusIndex].id;
        let data = undefined;
        if (orderstatusid != 9) {
            data = {
                userId: this.data.userId,
                orderStatus: orderstatusid
            };
        }
        else {
            data = {
                userId: this.data.userId
            };
        }
        app.requestFuncPromise('/order/orderList', data, 'GET')
            .then(res => {
            this.setData({
                orderList: res.data.orderList
            });
        });
    },
    NavToOrderEntry: function (e) {
        let transdata = {
            mode: 'Detail',
            userId: this.data.userId,
            orderId: e.currentTarget.dataset.orderid
        };
        const comData = JSON.stringify(transdata);
        wx.navigateTo({
            url: '../OrderEntry/OrderEntry' + '?data=' + comData,
            success: function (res) { },
            fail: function () { },
            complete: function () { }
        });
    },
    ListTouchStart(e) {
        this.setData({
            ListTouchStart: e.touches[0].pageX
        });
    },
    ListTouchMove(e) {
        this.setData({
            ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
        });
    },
    ListTouchEnd(e) {
        if (this.data.ListTouchDirection == 'left') {
            this.setData({
                modalName: e.currentTarget.dataset.target
            });
        }
        else {
            this.setData({
                modalName: null
            });
        }
        this.setData({
            ListTouchDirection: null
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJMaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiT3JkZXJMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQTtBQUVoQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVM7UUFDbkMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUztRQUNuQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNO1FBQzdCLFNBQVMsRUFBRSxJQUFJLEtBQUssRUFBRTtRQUN0QixrQkFBa0IsRUFBRTtZQUNsQixFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQztZQUNyQixFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQztZQUNwQixFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQztZQUNwQixFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQztZQUNwQixFQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDO1NBQ3RCO1FBQ0QsZ0JBQWdCLEVBQUUsQ0FBQztLQUNwQjtJQUNELE1BQU0sRUFBRSxVQUFVLE9BQU87UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRTtTQUNuQixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsTUFBTSxFQUFFO1FBQ04sR0FBRyxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLEVBQUUsS0FBSyxDQUFDO2FBQzVFLElBQUksQ0FBQyxHQUFHLENBQUMs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QyxDQUFBO0lBQ0osQ0FBQztDQUVGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG4vLyDojrflj5blupTnlKjlrp7kvotcbmNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgdXNlcklkOiAnJyxcbiAgICBTdGF0dXNCYXI6IGFwcC5nbG9iYWxEYXRhLlN0YXR1c0JhcixcbiAgICBDdXN0b21CYXI6IGFwcC5nbG9iYWxEYXRhLkN1c3RvbUJhcixcbiAgICBDdXN0b206IGFwcC5nbG9iYWxEYXRhLkN1c3RvbSxcbiAgICBvcmRlckxpc3Q6IG5ldyBBcnJheSgpLFxuICAgIG9yZGVyU3RhdHVzQ29udGVudDogW1xuICAgICAge2lkOiA5LCBuYW1lOiAn6K6i5Y2V54q25oCBJ30sXG4gICAgICB7aWQ6IDAsIG5hbWU6ICflt7LkuIvljZUnfSxcbiAgICAgIHtpZDogMSwgbmFtZTogJ+S7o+e7g+S4rSd9LFxuICAgICAge2lkOiAyLCBuYW1lOiAn5bey5a6M5oiQJ30sXG4gICAgICB7aWQ6IC0xLCBuYW1lOiAn5bey5YWz6ZetJ31cbiAgICBdLFxuICAgIG9yZGVyU3RhdHVzSW5kZXg6IDBcbiAgfSxcbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB1c2VySWQ6IG9wdGlvbnMuaWQsXG4gICAgfSlcbiAgfSxcbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgYXBwLnJlcXVlc3RGdW5jUHJvbWlzZSgnL29yZGVyL29yZGVyTGlzdCcsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWR9LCAnR0VUJylcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgb3JkZXJMaXN0OiByZXMuZGF0YS5vcmRlckxpc3RcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgQ2hhbmdlT3JkZXJDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG9yZGVyU3RhdHVzSW5kZXg6IGUuZGV0YWlsLnZhbHVlXG4gICAgfSlcbiAgICBjb25zdCBvcmRlcnN0YXR1c2lkID0gdGhpcy5kYXRhLm9yZGVyU3RhdHVzQ29udGVudFt0aGlzLmRhdGEub3JkZXJTdGF0dXNJbmRleF0uaWQ7XG4gICAgbGV0IGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgaWYob3JkZXJzdGF0dXNpZCAhPSA5KSB7XG4gICAgICBkYXRhID0ge1xuICAgICAgICB1c2VySWQ6IHRoaXMuZGF0YS51c2VySWQsXG4gICAgICAgIG9yZGVyU3RhdHVzOiBvcmRlcnN0YXR1c2lkXG4gICAgICB9XG4gICAgfSBlbHNlIHtkYXRhID0ge1xuICAgICAgdXNlcklkOiB0aGlzLmRhdGEudXNlcklkXG4gICAgfVxuICAgIH1cbiAgICBhcHAucmVxdWVzdEZ1bmNQcm9taXNlKCcvb3JkZXIvb3JkZXJMaXN0JywgZGF0YSwgJ0dFVCcpXG4gICAgLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIG9yZGVyTGlzdDogcmVzLmRhdGEub3JkZXJMaXN0XG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG4gIE5hdlRvT3JkZXJFbnRyeTogZnVuY3Rpb24gKGU6IGFueSkge1xuICAgIGxldCB0cmFuc2RhdGEgPSB7XG4gICAgICBtb2RlOiAnRGV0YWlsJyxcbiAgICAgIHVzZXJJZDogdGhpcy5kYXRhLnVzZXJJZCxcbiAgICAgIG9yZGVySWQ6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm9yZGVyaWRcbiAgICB9XG4gICAgY29uc3QgY29tRGF0YSA9IEpTT04uc3RyaW5naWZ5KHRyYW5zZGF0YSk7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcuLi9PcmRlckVudHJ5L09yZGVyRW50cnknICsgJz9kYXRhPScgKyBjb21EYXRhLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXsgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uKCkgeyB9LFxuICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkgeyB9XG4gICAgfSlcbiAgfSxcblxuICAvLyBMaXN0VG91Y2jop6bmkbjlvIDlp4tcbiAgTGlzdFRvdWNoU3RhcnQoZSkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBMaXN0VG91Y2hTdGFydDogZS50b3VjaGVzWzBdLnBhZ2VYXG4gICAgfSlcbiAgfSxcblxuICAvLyBMaXN0VG91Y2jorqHnrpfmlrnlkJFcbiAgTGlzdFRvdWNoTW92ZShlKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIExpc3RUb3VjaERpcmVjdGlvbjogZS50b3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5kYXRhLkxpc3RUb3VjaFN0YXJ0ID4gMCA/ICdyaWdodCcgOiAnbGVmdCdcbiAgICB9KVxuICB9LFxuXG4gIC8vIExpc3RUb3VjaOiuoeeul+a7muWKqFxuICBMaXN0VG91Y2hFbmQoZSkge1xuICAgIGlmICh0aGlzLmRhdGEuTGlzdFRvdWNoRGlyZWN0aW9uID09J2xlZnQnKXtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIG1vZGFsTmFtZTogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGFyZ2V0XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBtb2RhbE5hbWU6IG51bGxcbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBMaXN0VG91Y2hEaXJlY3Rpb246IG51bGxcbiAgICB9KVxuICB9LFxuICBcbn0pXG4iXX0=