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
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsU0FBUyxDQUFDO0lBQ1IsT0FBTyxFQUFFO1FBQ1AsY0FBYyxFQUFFLElBQUk7S0FDckI7SUFDRCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsRUFBRTtRQUNWLFFBQVEsRUFBRSxFQUFFO1FBQ1osU0FBUyxFQUFFLEVBQUU7UUFDYixjQUFjLEVBQUUsS0FBSztRQUNyQixtQkFBbUIsRUFBRSxLQUFLO1FBQzFCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsV0FBVyxFQUFFLEVBQUU7UUFDZixjQUFjLEVBQUMsRUFBRTtRQUNqQixVQUFVLEVBQUUsQ0FBQztRQUNiLFdBQVcsRUFBRSxDQUFDO0tBQ2Y7SUFFRCxTQUFTLEVBQUUsRUFBRTtJQUdiLFNBQVMsRUFBRTtRQUNULFFBQVE7UUFDUixDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxRQUFRO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxNQUFNLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7YUFDcEMsQ0FBQyxDQUFBO1lBQ0YsSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQzlDLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0QixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTt3QkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FB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dEIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0NBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDMUIsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQ0FDWCxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO29DQUNuQixJQUFJLEVBQUUsU0FBUztvQ0FDZixRQUFRLEVBQUUsSUFBSTtpQ0FDZixDQUFDLENBQUE7Z0NBRUYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRTtvQ0FDaEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ3RCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO3dDQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDOzRDQUNaLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVc7eUNBQ2xDLENBQUMsQ0FBQTtxQ0FDSDtnQ0FDSCxDQUFDLENBQUMsQ0FBQTs2QkFDSDt3QkFDSCxDQUFDLENBQUMsQ0FBQTtxQkFDSDt5QkFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7d0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7cUJBQ3RCO2dCQUNILENBQUM7YUFDRixDQUFDLENBQUE7UUFDSixDQUFDO0tBQ0Y7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuXG5Db21wb25lbnQoe1xuICBvcHRpb25zOiB7XG4gICAgYWRkR2xvYmFsQ2xhc3M6IHRydWUsXG4gIH0sXG4gIGRhdGE6IHtcbiAgICB1c2VySWQ6ICcnLFxuICAgIHVzZXJOYW1lOiAnJyxcbiAgICB1c2VySW1hZ2U6ICcnLFxuICAgIGRpc3BsYXlBZGRVc2VyOiBmYWxzZSxcbiAgICBkaXNwbGF5QWRkVXNlcklucHV0OiBmYWxzZSxcbiAgICBpc0xvZ2luOiB0cnVlLFxuICAgIGFjY291bnRMaXN0OiBbXSxcbiAgICBuZXdBY2NvdW50TmFtZTonJyxcbiAgICBvcmRlckNvdW50OiAwLFxuICAgIGNvdXBvbkNvdW50OiAwXG4gIH0sXG5cbiAgYmVoYXZpb3JzOiBbXSxcblxuXG4gIGxpZmV0aW1lczoge1xuICAgIGF0dGFjaGVkKCkge1xuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgaW5pdERhdGEoKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB1c2VySWQ6IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKVxuICAgICAgfSlcbiAgICAgIGlmKCF0aGlzLmRhdGEudXNlck5hbWUgfHwgIXRoaXMuZGF0YS51c2VySW1hZ2UpIHtcbiAgICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRVc2VySW5mbycsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWR9LCAnR0VUJywgcmVzID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgdXNlck5hbWU6IHJlcy5kYXRhLnVzZXJJbmZvLnVzZXJOYW1lLFxuICAgICAgICAgICAgICB1c2VySW1hZ2U6IHJlcy5kYXRhLnVzZXJJbmZvLmltYWdlLFxuICAgICAgICAgICAgICBvcmRlckNvdW50OiByZXMuZGF0YS5vcmRlcixcbiAgICAgICAgICAgICAgY291cG9uQ291bnQ6IHJlcy5kYXRhLmNvdXBvblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5QWRkVXNlckZuKCkge1xuICAgICAgdGhpcy5zZXREYXRhKHsgXG4gICAgICAgIGRpc3BsYXlBZGRVc2VyIDogIXRoaXMuZGF0YS5kaXNwbGF5QWRkVXNlclxuICAgICAgIH0pXG4gICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRBY2NvdW50TGlzdCcsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWR9LCAnR0VUJywgcmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGFjY291bnRMaXN0OiByZXMuZGF0YS5hY2NvdW50TGlzdFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBiaW5kSW5wdXROZXdBY2NvdW50TmFtZShlKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBuZXdBY2NvdW50TmFtZTogZS5kZXRhaWwudmFsdWVcbiAgICAgIH0pXG4gICAgfSxcbiAgICBzYXZlTmV3QWNjb3VudCgpIHtcbiAgICAgIGFwcC5yZXF1ZXN0RnVuYygnL3VzZXIvc2F2ZUFjY291bnQnLCB7dXNlcklkOiB0aGlzLmRhdGEudXNlcklkLCBhY2NvdW50TmFtZTogdGhpcy5kYXRhLm5ld0FjY291bnROYW1lfSwgJ1BPU1QnLCByZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09IHRydWUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5tc2cpO1xuICBcbiAgICAgICAgICBhcHAucmVxdWVzdEZ1bmMoJy91c2VyL2dldEFjY291bnRMaXN0Jywge3VzZXJJZDogdGhpcy5kYXRhLnVzZXJJZH0sICdHRVQnLCByZXMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGFjY291bnRMaXN0OiByZXMuZGF0YS5hY2NvdW50TGlzdFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBkaXNwbGF5QWRkVXNlcklucHV0Rm4oKSB7XG4gICAgICB0aGlzLnNldERhdGEoeyBcbiAgICAgICAgZGlzcGxheUFkZFVzZXJJbnB1dCA6ICF0aGlzLmRhdGEuZGlzcGxheUFkZFVzZXJJbnB1dFxuICAgICAgIH0pXG4gICAgfSxcbiAgICBOYXZUb015SW5mb3JtYXRpb24oKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnLi4vTXkvTXlJbmZvcm1hdGlvbi9NeUluZm9ybWF0aW9uP2lkPScgKyB0aGlzLmRhdGEudXNlcklkLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpeyB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbigpIHsgfSxcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkgeyB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgTmF2VG9NeUFjY291bnQoZSkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4uL015L015QWNjb3VudC9NeUFjY291bnQ/aWQ9JyArIHRoaXMuZGF0YS51c2VySWQgKyAnJmFjY291bnRJZD0nICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuYWNjb3VudGlkLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpeyB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbigpIHsgfSxcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkgeyB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgTmF2VG9BYm91dCgpIHtcbiAgICB9LFxuICAgIE5hdlRvT3JkZXJMaXN0KCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4uL09yZGVyU2VydmljZS9PcmRlckxpc3QvT3JkZXJMaXN0P2lkPScgKyB0aGlzLmRhdGEudXNlcklkLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpeyB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbigpIHsgfSxcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkgeyB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgZGVsZXRlQ3VycmVudEFjb3VudChlKSB7XG4gICAgICBjb25zdCBfdGhpcyA9IHRoaXNcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgY29udGVudDogJ+WIoOmZpOWtkOi0puWPt+WQjizlrZDotKblj7fkuIvpnaLnmoTop5LoibLpg73lsIbooqvoh6rliqjliKDpmaR+JyxcbiAgICAgICAgc3VjY2VzcyAocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICBhcHAucmVxdWVzdEZ1bmMoJy91c2VyL2RlbGV0ZUFjY291bnQnLCB7dXNlcklkOiBfdGhpcy5kYXRhLnVzZXJJZCwgYWNjb3VudElkOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5hY2NvdW50aWR9LCAnUE9TVCcsIHJlcyA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLm1zZyk7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YS5tc2csXG4gICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICAgIH0pXG4gIFxuICAgICAgICAgICAgICAgIGFwcC5yZXF1ZXN0RnVuYygnL3VzZXIvZ2V0QWNjb3VudExpc3QnLCB7dXNlcklkOiBfdGhpcy5kYXRhLnVzZXJJZH0sICdHRVQnLCByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgICBhY2NvdW50TGlzdDogcmVzLmRhdGEuYWNjb3VudExpc3RcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufSkiXX0=