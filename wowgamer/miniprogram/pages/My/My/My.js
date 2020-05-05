"use strict";
const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        userId: '',
        userName: '',
        userImage: '',
        displayAddUser: false,
        displayAddUserInput: false,
        isLogin: true,
        accountList: [],
        newAccountName: '',
        orderCount: 0,
        couponCount: 0
    },
    behaviors: [],
    lifetimes: {
        attached() {
        }
    },
    methods: {
        initData() {
            this.setData({
                userId: wx.getStorageSync('userId')
            });
            if (!this.data.userName || !this.data.userImage) {
                app.requestFunc('/user/getUserInfo', { userId: this.data.userId }, 'GET', res => {
                    console.log(res.data);
                    if (res.data.success == true) {
                        this.setData({
                            userName: res.data.userInfo.userName,
                            userImage: res.data.userInfo.image,
                            orderCount: res.data.order,
                            couponCount: res.data.coupon
                        });
                    }
                });
            }
        },
        displayAddUserFn() {
            this.setData({
                displayAddUser: !this.data.displayAddUser
            });
            app.requestFunc('/user/getAccountList', { userId: this.data.userId }, 'GET', res => {
                console.log(res.data);
                if (res.data.success == true) {
                    this.setData({
                        accountList: res.data.accountList
                    });
                }
            });
        },
        bindInputNewAccountName(e) {
            this.setData({
                newAccountName: e.detail.value
            });
        },
        saveNewAccount() {
            app.requestFunc('/user/saveAccount', { userId: this.data.userId, accountName: this.data.newAccountName }, 'POST', res => {
                console.log(res.data);
                if (res.data.success == true) {
                    console.log(res.data.msg);
                    app.requestFunc('/user/getAccountList', { userId: this.data.userId }, 'GET', res => {
                        console.log(res.data);
                        if (res.data.success == true) {
                            this.setData({
                                accountList: res.data.accountList
                            });
                        }
                    });
                }
            });
        },
        displayAddUserInputFn() {
            this.setData({
                displayAddUserInput: !this.data.displayAddUserInput
            });
        },
        NavToMyInformation() {
            wx.navigateTo({
                url: '../My/MyInformation/MyInformation?id=' + this.data.userId,
                success: function (res) { },
                fail: function () { },
                complete: function () { }
            });
        },
        NavToMyAccount(e) {
            wx.navigateTo({
                url: '../My/MyAccount/MyAccount?id=' + this.data.userId + '&accountId=' + e.currentTarget.dataset.accountid,
                success: function (res) { },
                fail: function () { },
                complete: function () { }
            });
        },
        NavToAbout() {
        },
        NavToOrderList() {
            wx.navigateTo({
                url: '../OrderService/OrderList/OrderList?id=' + this.data.userId,
                success: function (res) { },
                fail: function () { },
                complete: function () { }
            });
        },
        deleteCurrentAcount(e) {
            const _this = this;
            wx.showModal({
                title: '提示',
                content: '删除子账号后,子账号下面的角色都将被自动删除~',
                success(res) {
                    if (res.confirm) {
                        app.requestFunc('/user/deleteAccount', { userId: _this.data.userId, accountId: e.currentTarget.dataset.accountid }, 'POST', res => {
                            console.log(res.data);
                            if (res.data.success == true) {
                                console.log(res.data.msg);
                                wx.showToast({
                                    title: res.data.msg,
                                    icon: 'success',
                                    duration: 2000
                                });
                                app.requestFunc('/user/getAccountList', { userId: _this.data.userId }, 'GET', res => {
                                    console.log(res.data);
                                    if (res.data.success == true) {
                                        _this.setData({
                                            accountList: res.data.accountList
                                        });
                                    }
                                });
                            }
                        });
                    }
                    else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        },
        NavToMyCoupons() {
            wx.navigateTo({
                url: '../My/MyCoupons/MyCoupons?id=' + this.data.userId,
                success: function (res) { },
                fail: function () { },
                complete: function () { }
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsU0FBUyxDQUFDO0lBQ1IsT0FBTyxFQUFFO1FBQ1AsY0FBYyxFQUFFLElBQUk7S0FDckI7SUFDRCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsRUFBRTtRQUNWLFFBQVEsRUFBRSxFQUFFO1FBQ1osU0FBUyxFQUFFLEVBQUU7UUFDYixjQUFjLEVBQUUsS0FBSztRQUNyQixtQkFBbUIsRUFBRSxLQUFLO1FBQzFCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsV0FBVyxFQUFFLEVBQUU7UUFDZixjQUFjLEVBQUMsRUFBRTtRQUNqQixVQUFVLEVBQUUsQ0FBQztRQUNiLFdBQVcsRUFBRSxDQUFDO0tBQ2Y7SUFFRCxTQUFTLEVBQUUsRUFBRTtJQUdiLFNBQVMsRUFBRTtRQUNULFFBQVE7UUFDUixDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxRQUFRO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxNQUFNLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7YUFDcEMsQ0FBQyxDQUFBO1lBQ0YsSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQzlDLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0QixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTt3QkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FB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Q0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcblxuQ29tcG9uZW50KHtcbiAgb3B0aW9uczoge1xuICAgIGFkZEdsb2JhbENsYXNzOiB0cnVlLFxuICB9LFxuICBkYXRhOiB7XG4gICAgdXNlcklkOiAnJyxcbiAgICB1c2VyTmFtZTogJycsXG4gICAgdXNlckltYWdlOiAnJyxcbiAgICBkaXNwbGF5QWRkVXNlcjogZmFsc2UsXG4gICAgZGlzcGxheUFkZFVzZXJJbnB1dDogZmFsc2UsXG4gICAgaXNMb2dpbjogdHJ1ZSxcbiAgICBhY2NvdW50TGlzdDogW10sXG4gICAgbmV3QWNjb3VudE5hbWU6JycsXG4gICAgb3JkZXJDb3VudDogMCxcbiAgICBjb3Vwb25Db3VudDogMFxuICB9LFxuXG4gIGJlaGF2aW9yczogW10sXG5cblxuICBsaWZldGltZXM6IHtcbiAgICBhdHRhY2hlZCgpIHtcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGluaXREYXRhKCkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdXNlcklkOiB3eC5nZXRTdG9yYWdlU3luYygndXNlcklkJylcbiAgICAgIH0pXG4gICAgICBpZighdGhpcy5kYXRhLnVzZXJOYW1lIHx8ICF0aGlzLmRhdGEudXNlckltYWdlKSB7XG4gICAgICAgIGFwcC5yZXF1ZXN0RnVuYygnL3VzZXIvZ2V0VXNlckluZm8nLCB7dXNlcklkOiB0aGlzLmRhdGEudXNlcklkfSwgJ0dFVCcsIHJlcyA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIHVzZXJOYW1lOiByZXMuZGF0YS51c2VySW5mby51c2VyTmFtZSxcbiAgICAgICAgICAgICAgdXNlckltYWdlOiByZXMuZGF0YS51c2VySW5mby5pbWFnZSxcbiAgICAgICAgICAgICAgb3JkZXJDb3VudDogcmVzLmRhdGEub3JkZXIsXG4gICAgICAgICAgICAgIGNvdXBvbkNvdW50OiByZXMuZGF0YS5jb3Vwb25cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheUFkZFVzZXJGbigpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7IFxuICAgICAgICBkaXNwbGF5QWRkVXNlciA6ICF0aGlzLmRhdGEuZGlzcGxheUFkZFVzZXJcbiAgICAgICB9KVxuICAgICAgIGFwcC5yZXF1ZXN0RnVuYygnL3VzZXIvZ2V0QWNjb3VudExpc3QnLCB7dXNlcklkOiB0aGlzLmRhdGEudXNlcklkfSwgJ0dFVCcsIHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBhY2NvdW50TGlzdDogcmVzLmRhdGEuYWNjb3VudExpc3RcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgYmluZElucHV0TmV3QWNjb3VudE5hbWUoZSkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgbmV3QWNjb3VudE5hbWU6IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9KVxuICAgIH0sXG4gICAgc2F2ZU5ld0FjY291bnQoKSB7XG4gICAgICBhcHAucmVxdWVzdEZ1bmMoJy91c2VyL3NhdmVBY2NvdW50Jywge3VzZXJJZDogdGhpcy5kYXRhLnVzZXJJZCwgYWNjb3VudE5hbWU6IHRoaXMuZGF0YS5uZXdBY2NvdW50TmFtZX0sICdQT1NUJywgcmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEubXNnKTtcbiAgXG4gICAgICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRBY2NvdW50TGlzdCcsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWR9LCAnR0VUJywgcmVzID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09IHRydWUpIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBhY2NvdW50TGlzdDogcmVzLmRhdGEuYWNjb3VudExpc3RcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgZGlzcGxheUFkZFVzZXJJbnB1dEZuKCkge1xuICAgICAgdGhpcy5zZXREYXRhKHsgXG4gICAgICAgIGRpc3BsYXlBZGRVc2VySW5wdXQgOiAhdGhpcy5kYXRhLmRpc3BsYXlBZGRVc2VySW5wdXRcbiAgICAgICB9KVxuICAgIH0sXG4gICAgTmF2VG9NeUluZm9ybWF0aW9uKCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4uL015L015SW5mb3JtYXRpb24vTXlJbmZvcm1hdGlvbj9pZD0nICsgdGhpcy5kYXRhLnVzZXJJZCxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXsgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oKSB7IH0sXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHsgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIE5hdlRvTXlBY2NvdW50KGUpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuLi9NeS9NeUFjY291bnQvTXlBY2NvdW50P2lkPScgKyB0aGlzLmRhdGEudXNlcklkICsgJyZhY2NvdW50SWQ9JyArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmFjY291bnRpZCxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXsgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oKSB7IH0sXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHsgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIE5hdlRvQWJvdXQoKSB7XG4gICAgfSxcbiAgICBOYXZUb09yZGVyTGlzdCgpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuLi9PcmRlclNlcnZpY2UvT3JkZXJMaXN0L09yZGVyTGlzdD9pZD0nICsgdGhpcy5kYXRhLnVzZXJJZCxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXsgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oKSB7IH0sXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHsgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGRlbGV0ZUN1cnJlbnRBY291bnQoZSkge1xuICAgICAgY29uc3QgX3RoaXMgPSB0aGlzXG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgIGNvbnRlbnQ6ICfliKDpmaTlrZDotKblj7flkI4s5a2Q6LSm5Y+35LiL6Z2i55qE6KeS6Imy6YO95bCG6KKr6Ieq5Yqo5Yig6ZmkficsXG4gICAgICAgIHN1Y2Nlc3MgKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9kZWxldGVBY2NvdW50Jywge3VzZXJJZDogX3RoaXMuZGF0YS51c2VySWQsIGFjY291bnRJZDogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuYWNjb3VudGlkfSwgJ1BPU1QnLCByZXMgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5tc2cpO1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEubXNnLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICB9KVxuICBcbiAgICAgICAgICAgICAgICBhcHAucmVxdWVzdEZ1bmMoJy91c2VyL2dldEFjY291bnRMaXN0Jywge3VzZXJJZDogX3RoaXMuZGF0YS51c2VySWR9LCAnR0VUJywgcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgYWNjb3VudExpc3Q6IHJlcy5kYXRhLmFjY291bnRMaXN0XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIE5hdlRvTXlDb3Vwb25zKCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4uL015L015Q291cG9ucy9NeUNvdXBvbnM/aWQ9JyArIHRoaXMuZGF0YS51c2VySWQsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7IH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKCkgeyB9LFxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7IH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59KSJdfQ==