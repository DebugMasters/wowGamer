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
        showAuthMessage: false,
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
            if (this.data.userId) {
                app.requestFunc('/user/getUserInfo', { userId: this.data.userId }, 'GET', res => {
                    console.log(res.data);
                    if (res.data.success == true) {
                        this.setData({
                            userName: res.data.userInfo.userName,
                            userImage: res.data.userInfo.image,
                            orderCount: res.data.order,
                            couponCount: res.data.coupon,
                            isLogin: true
                        });
                    }
                });
            }
            else {
                this.setData({
                    isLogin: false
                });
            }
        },
        displayAddUserFn() {
            if (!this.data.isLogin) {
                this.setData({
                    showAuthMessage: true
                });
                return;
            }
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
            if (!this.data.newAccountName.accountId) {
                wx.showToast({
                    title: '请输入子账号名称',
                    icon: 'none',
                    mask: true,
                    duration: 1000
                });
                return;
            }
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
            if (!this.data.isLogin) {
                this.setData({
                    showAuthMessage: true
                });
                return;
            }
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
            if (!this.data.isLogin) {
                this.setData({
                    showAuthMessage: true
                });
                return;
            }
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
            if (!this.data.isLogin) {
                this.setData({
                    showAuthMessage: true
                });
                return;
            }
            wx.navigateTo({
                url: '../My/MyCoupons/MyCoupons?id=' + this.data.userId,
                success: function (res) { },
                fail: function () { },
                complete: function () { }
            });
        },
        NavToInviteFriends() {
            if (!this.data.isLogin) {
                this.setData({
                    showAuthMessage: true
                });
                return;
            }
            wx.navigateTo({
                url: '../My/MyInvite/InviteFriends/InviteFriends?id=' + this.data.userId,
                success: function (res) { },
                fail: function () { },
                complete: function () { }
            });
        },
        getUserInfo: function (e) {
            const _this = this;
            wx.setStorageSync('userInfo', e.detail.userInfo);
            if (!e.detail.userInfo)
                return;
            wx.login({
                success: res => {
                    console.log(res);
                    wx.request({
                        url: app.globalData.URL + '/user/login',
                        data: {
                            code: res.code,
                            image: e.detail.userInfo.avatarUrl,
                            userName: e.detail.userInfo.nickName,
                        },
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: 'POST',
                        success: function (result) {
                            console.log(result.data);
                            wx.setStorageSync('userId', result.data.userId);
                            _this.setData({
                                userId: result.data.userId,
                                isLogin: true
                            });
                            _this.initData();
                            if (app.globalData.isShared) {
                                _this.sendShared(true, app.globalData.sharedUserId);
                            }
                            _this.NavToMyInformation();
                        }
                    });
                }
            });
        },
        sendShared: function (isShared, inviteUserId) {
            if (isShared) {
                const userId = wx.getStorageSync('userId');
                app.requestFuncPromise('/user/completeInvite', { inviteUserId: inviteUserId, invitedUserId: userId }, 'POST')
                    .then(res => {
                    wx.showToast({
                        title: res.data.msg,
                        duration: 2000
                    });
                    console.log(res);
                });
            }
            app.globalData.isShared = false;
        },
        hideAuthMessage: function () {
            this.setData({
                showAuthMessage: false
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsU0FBUyxDQUFDO0lBQ1IsT0FBTyxFQUFFO1FBQ1AsY0FBYyxFQUFFLElBQUk7S0FDckI7SUFDRCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsRUFBRTtRQUNWLFFBQVEsRUFBRSxFQUFFO1FBQ1osU0FBUyxFQUFFLEVBQUU7UUFDYixjQUFjLEVBQUUsS0FBSztRQUNyQixtQkFBbUIsRUFBRSxLQUFLO1FBQzFCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsZUFBZSxFQUFFLEtBQUs7UUFDdEIsV0FBVyxFQUFFLEVBQUU7UUFDZixjQUFjLEVBQUMsRUFBRTtRQUNqQixVQUFVLEVBQUUsQ0FBQztRQUNiLFdBQVcsRUFBRSxDQUFDO0tBQ2Y7SUFFRCxTQUFTLEVBQUUsRUFBRTtJQUdiLFNBQVMsRUFBRTtRQUNULFFBQVE7UUFDUixDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxRQUFRO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxNQUFNLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7YUFDcEMsQ0FBQyxDQUFBO1lBQ0YsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDbkIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRTtvQkFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO3dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNYLFFBQVEsRUFBRSxH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QUFlLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLGVBQWUsRUFBRSxLQUFLO2FBQ3ZCLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXHJcblxyXG5Db21wb25lbnQoe1xyXG4gIG9wdGlvbnM6IHtcclxuICAgIGFkZEdsb2JhbENsYXNzOiB0cnVlLFxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgdXNlcklkOiAnJyxcclxuICAgIHVzZXJOYW1lOiAnJyxcclxuICAgIHVzZXJJbWFnZTogJycsXHJcbiAgICBkaXNwbGF5QWRkVXNlcjogZmFsc2UsXHJcbiAgICBkaXNwbGF5QWRkVXNlcklucHV0OiBmYWxzZSxcclxuICAgIGlzTG9naW46IHRydWUsXHJcbiAgICBzaG93QXV0aE1lc3NhZ2U6IGZhbHNlLFxyXG4gICAgYWNjb3VudExpc3Q6IFtdLFxyXG4gICAgbmV3QWNjb3VudE5hbWU6JycsXHJcbiAgICBvcmRlckNvdW50OiAwLFxyXG4gICAgY291cG9uQ291bnQ6IDBcclxuICB9LFxyXG5cclxuICBiZWhhdmlvcnM6IFtdLFxyXG5cclxuXHJcbiAgbGlmZXRpbWVzOiB7XHJcbiAgICBhdHRhY2hlZCgpIHtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBtZXRob2RzOiB7XHJcbiAgICBpbml0RGF0YSgpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICB1c2VySWQ6IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKVxyXG4gICAgICB9KVxyXG4gICAgICBpZih0aGlzLmRhdGEudXNlcklkKSB7XHJcbiAgICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRVc2VySW5mbycsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWR9LCAnR0VUJywgcmVzID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICB1c2VyTmFtZTogcmVzLmRhdGEudXNlckluZm8udXNlck5hbWUsXHJcbiAgICAgICAgICAgICAgdXNlckltYWdlOiByZXMuZGF0YS51c2VySW5mby5pbWFnZSxcclxuICAgICAgICAgICAgICBvcmRlckNvdW50OiByZXMuZGF0YS5vcmRlcixcclxuICAgICAgICAgICAgICBjb3Vwb25Db3VudDogcmVzLmRhdGEuY291cG9uLFxyXG4gICAgICAgICAgICAgIGlzTG9naW46IHRydWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBpc0xvZ2luOiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9LFxyXG4gICAgZGlzcGxheUFkZFVzZXJGbigpIHtcclxuICAgICAgaWYoIXRoaXMuZGF0YS5pc0xvZ2luKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIHNob3dBdXRoTWVzc2FnZTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7IFxyXG4gICAgICAgIGRpc3BsYXlBZGRVc2VyIDogIXRoaXMuZGF0YS5kaXNwbGF5QWRkVXNlclxyXG4gICAgICAgfSlcclxuICAgICAgIGFwcC5yZXF1ZXN0RnVuYygnL3VzZXIvZ2V0QWNjb3VudExpc3QnLCB7dXNlcklkOiB0aGlzLmRhdGEudXNlcklkfSwgJ0dFVCcsIHJlcyA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09IHRydWUpIHtcclxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGFjY291bnRMaXN0OiByZXMuZGF0YS5hY2NvdW50TGlzdFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYmluZElucHV0TmV3QWNjb3VudE5hbWUoZSkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIG5ld0FjY291bnROYW1lOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIHNhdmVOZXdBY2NvdW50KCkge1xyXG4gICAgICBpZiAoIXRoaXMuZGF0YS5uZXdBY2NvdW50TmFtZS5hY2NvdW50SWQpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXlrZDotKblj7flkI3np7AnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgbWFzazogdHJ1ZSxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGFwcC5yZXF1ZXN0RnVuYygnL3VzZXIvc2F2ZUFjY291bnQnLCB7dXNlcklkOiB0aGlzLmRhdGEudXNlcklkLCBhY2NvdW50TmFtZTogdGhpcy5kYXRhLm5ld0FjY291bnROYW1lfSwgJ1BPU1QnLCByZXMgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5tc2cpO1xyXG4gIFxyXG4gICAgICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRBY2NvdW50TGlzdCcsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWR9LCAnR0VUJywgcmVzID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGFjY291bnRMaXN0OiByZXMuZGF0YS5hY2NvdW50TGlzdFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRpc3BsYXlBZGRVc2VySW5wdXRGbigpIHtcclxuICAgICAgaWYoIXRoaXMuZGF0YS5pc0xvZ2luKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIHNob3dBdXRoTWVzc2FnZTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7IFxyXG4gICAgICAgIGRpc3BsYXlBZGRVc2VySW5wdXQgOiAhdGhpcy5kYXRhLmRpc3BsYXlBZGRVc2VySW5wdXRcclxuICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgTmF2VG9NeUluZm9ybWF0aW9uKCkge1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcuLi9NeS9NeUluZm9ybWF0aW9uL015SW5mb3JtYXRpb24/aWQ9JyArIHRoaXMuZGF0YS51c2VySWQsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXsgfSxcclxuICAgICAgICBmYWlsOiBmdW5jdGlvbigpIHsgfSxcclxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7IH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBOYXZUb015QWNjb3VudChlKSB7XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogJy4uL015L015QWNjb3VudC9NeUFjY291bnQ/aWQ9JyArIHRoaXMuZGF0YS51c2VySWQgKyAnJmFjY291bnRJZD0nICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuYWNjb3VudGlkLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7IH0sXHJcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oKSB7IH0sXHJcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkgeyB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgTmF2VG9BYm91dCgpIHtcclxuICAgIH0sXHJcbiAgICBOYXZUb09yZGVyTGlzdCgpIHtcclxuICAgICAgaWYoIXRoaXMuZGF0YS5pc0xvZ2luKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIHNob3dBdXRoTWVzc2FnZTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogJy4uL09yZGVyU2VydmljZS9PcmRlckxpc3QvT3JkZXJMaXN0P2lkPScgKyB0aGlzLmRhdGEudXNlcklkLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7IH0sXHJcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oKSB7IH0sXHJcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkgeyB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlQ3VycmVudEFjb3VudChlKSB7XHJcbiAgICAgIGNvbnN0IF90aGlzID0gdGhpc1xyXG4gICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICBjb250ZW50OiAn5Yig6Zmk5a2Q6LSm5Y+35ZCOLOWtkOi0puWPt+S4i+mdoueahOinkuiJsumDveWwhuiiq+iHquWKqOWIoOmZpH4nLFxyXG4gICAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgIGFwcC5yZXF1ZXN0RnVuYygnL3VzZXIvZGVsZXRlQWNjb3VudCcsIHt1c2VySWQ6IF90aGlzLmRhdGEudXNlcklkLCBhY2NvdW50SWQ6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmFjY291bnRpZH0sICdQT1NUJywgcmVzID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEubXNnKTtcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YS5tc2csXHJcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgXHJcbiAgICAgICAgICAgICAgICBhcHAucmVxdWVzdEZ1bmMoJy91c2VyL2dldEFjY291bnRMaXN0Jywge3VzZXJJZDogX3RoaXMuZGF0YS51c2VySWR9LCAnR0VUJywgcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50TGlzdDogcmVzLmRhdGEuYWNjb3VudExpc3RcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgTmF2VG9NeUNvdXBvbnMoKSB7XHJcbiAgICAgIGlmKCF0aGlzLmRhdGEuaXNMb2dpbikge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBzaG93QXV0aE1lc3NhZ2U6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcuLi9NeS9NeUNvdXBvbnMvTXlDb3Vwb25zP2lkPScgKyB0aGlzLmRhdGEudXNlcklkLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7IH0sXHJcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oKSB7IH0sXHJcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkgeyB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgTmF2VG9JbnZpdGVGcmllbmRzKCkge1xyXG4gICAgICBpZighdGhpcy5kYXRhLmlzTG9naW4pIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgc2hvd0F1dGhNZXNzYWdlOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnLi4vTXkvTXlJbnZpdGUvSW52aXRlRnJpZW5kcy9JbnZpdGVGcmllbmRzP2lkPScgKyB0aGlzLmRhdGEudXNlcklkLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7IH0sXHJcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oKSB7IH0sXHJcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkgeyB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZ2V0VXNlckluZm86IGZ1bmN0aW9uIChlOiBhbnkpIHtcclxuICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCBlLmRldGFpbC51c2VySW5mbyk7XHJcbiAgICAgIGlmKCFlLmRldGFpbC51c2VySW5mbykgcmV0dXJuO1xyXG4gIFxyXG4gICAgICB3eC5sb2dpbih7XHJcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgXHJcbiAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5VUkwgKycvdXNlci9sb2dpbicsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBjb2RlOiByZXMuY29kZSxcclxuICAgICAgICAgICAgICBpbWFnZTogZS5kZXRhaWwudXNlckluZm8uYXZhdGFyVXJsLCBcclxuICAgICAgICAgICAgICB1c2VyTmFtZTogZS5kZXRhaWwudXNlckluZm8ubmlja05hbWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlcklkJywgcmVzdWx0LmRhdGEudXNlcklkKTsgLy/nlKjmiLfllK/kuIDmoIfor4ZcclxuICAgICAgICAgICAgICBfdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogcmVzdWx0LmRhdGEudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgaXNMb2dpbjogdHJ1ZVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIF90aGlzLmluaXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgaWYoYXBwLmdsb2JhbERhdGEuaXNTaGFyZWQpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNlbmRTaGFyZWQodHJ1ZSwgYXBwLmdsb2JhbERhdGEuc2hhcmVkVXNlcklkKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgX3RoaXMuTmF2VG9NeUluZm9ybWF0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBzZW5kU2hhcmVkOiBmdW5jdGlvbiAoaXNTaGFyZWQ6IGJvb2xlYW4sIGludml0ZVVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgIGlmKGlzU2hhcmVkKSB7XHJcbiAgICAgICAgY29uc3QgdXNlcklkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpO1xyXG4gICAgICAgIGFwcC5yZXF1ZXN0RnVuY1Byb21pc2UoJy91c2VyL2NvbXBsZXRlSW52aXRlJywge2ludml0ZVVzZXJJZDogaW52aXRlVXNlcklkLCBpbnZpdGVkVXNlcklkOiAgdXNlcklkfSwgJ1BPU1QnKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEubXNnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgICBhcHAuZ2xvYmFsRGF0YS5pc1NoYXJlZCA9IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgaGlkZUF1dGhNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgc2hvd0F1dGhNZXNzYWdlOiBmYWxzZVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufSkiXX0=