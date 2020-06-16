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
        },
        NavToInviteFriends() {
            wx.navigateTo({
                url: '../My/MyInvite/InviteFriends/InviteFriends?id=' + this.data.userId,
                success: function (res) { },
                fail: function () { },
                complete: function () { }
            });
        },
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsU0FBUyxDQUFDO0lBQ1IsT0FBTyxFQUFFO1FBQ1AsY0FBYyxFQUFFLElBQUk7S0FDckI7SUFDRCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsRUFBRTtRQUNWLFFBQVEsRUFBRSxFQUFFO1FBQ1osU0FBUyxFQUFFLEVBQUU7UUFDYixjQUFjLEVBQUUsS0FBSztRQUNyQixtQkFBbUIsRUFBRSxLQUFLO1FBQzFCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsV0FBVyxFQUFFLEVBQUU7UUFDZixjQUFjLEVBQUMsRUFBRTtRQUNqQixVQUFVLEVBQUUsQ0FBQztRQUNiLFdBQVcsRUFBRSxDQUFDO0tBQ2Y7SUFFRCxTQUFTLEVBQUUsRUFBRTtJQUdiLFNBQVMsRUFBRTtRQUNULFFBQVE7UUFDUixDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxRQUFRO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxNQUFNLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7YUFDcEMsQ0FBQyxDQUFBO1lBQ0YsSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQzlDLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN0QixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTt3QkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQzs0QkFDWCxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUTs0QkFDcEMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7NEJBQ2xDLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7NEJBQzFCLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU07eUJBQzdCLENBQUMsQ0FBQTtxQkFDSDtnQkFDSCxDQUFDLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQztRQUNELGdCQUFnQjtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsY0FBYyxFQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjO2FBQzFDLENBQUMsQ0FBQTtZQUNGLEdBQUcsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtvQkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDWCxXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXO3FCQUNsQyxDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsY0FBYyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSzthQUMvQixDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsY0FBYztZQUNaLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNwSCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7b0JBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFMUIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRTt3QkFDL0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3RCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFOzRCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNYLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVc7NkJBQ2xDLENBQUMsQ0FBQTt5QkFDSDtvQkFDSCxDQUFDLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELHFCQUFxQjtZQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLG1CQUFtQixFQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUI7YUFDcEQsQ0FBQyxDQUFBO1FBQ0wsQ0FBQztRQUNELGtCQUFrQjtZQUNoQixFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNaLEdBQUcsRUFBRSx1Q0FBdUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07Z0JBQy9ELE9BQU8sRUFBRSxVQUFTLEdBQUcsSUFBRyxDQUFDO2dCQUN6QixJQUFJLEVBQUUsY0FBYSxDQUFDO2dCQUNwQixRQUFRLEVBQUUsY0FBYSxDQUFDO2FBQ3pCLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxjQUFjLENBQUMsQ0FBQztZQUNkLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ1osR0FBRyxFQUFFLCtCQUErQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTO2dCQUMzRyxPQUFPLEVBQUUsVUFBUyxHQUFHLElBQUcsQ0FBQztnQkFDekIsSUFBSSxFQUFFLGNBQWEsQ0FBQztnQkFDcEIsUUFBUSxFQUFFLGNBQWEsQ0FBQzthQUN6QixDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsVUFBVTtRQUNWLENBQUM7UUFDRCxjQUFjO1lBQ1osRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDWixHQUFHLEVBQUUseUNBQXlDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUNqRSxPQUFPLEVBQUUsVUFBUyxHQUFHLElBQUcsQ0FBQztnQkFDekIsSUFBSSxFQUFFLGNBQWEsQ0FBQztnQkFDcEIsUUFBUSxFQUFFLGNBQWEsQ0FBQzthQUN6QixDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsbUJBQW1CLENBQUMsQ0FBQztZQUNuQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUE7WUFDbEIsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxPQUFPLEVBQUUseUJBQXlCO2dCQUNsQyxPQUFPLENBQUUsR0FBRztvQkFDVixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7d0JBQ2YsR0FBRyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFOzRCQUM5SCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDdEIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0NBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDMUIsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQ0FDWCxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO29DQUNuQixJQUFJLEVBQUUsU0FBUztvQ0FDZixRQUFRLEVBQUUsSUFBSTtpQ0FDZixDQUFDLENBQUE7Z0NBRUYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRTtvQ0FDaEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ3RCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO3dDQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDOzRDQUNaLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVc7eUNBQ2xDLENBQUMsQ0FBQTtxQ0FDSDtnQ0FDSCxDQUFDLENBQUMsQ0FBQTs2QkFDSDt3QkFDSCxDQUFDLENBQUMsQ0FBQTtxQkFDSDt5QkFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7d0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7cUJBQ3RCO2dCQUNILENBQUM7YUFDRixDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsY0FBYztZQUNaLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ1osR0FBRyxFQUFFLCtCQUErQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtnQkFDdkQsT0FBTyxFQUFFLFVBQVMsR0FBRyxJQUFHLENBQUM7Z0JBQ3pCLElBQUksRUFBRSxjQUFhLENBQUM7Z0JBQ3BCLFFBQVEsRUFBRSxjQUFhLENBQUM7YUFDekIsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELGtCQUFrQjtZQUNoQixFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUNaLEdBQUcsRUFBRSxnREFBZ0QsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07Z0JBQ3hFLE9BQU8sRUFBRSxVQUFTLEdBQUcsSUFBRyxDQUFDO2dCQUN6QixJQUFJLEVBQUUsY0FBYSxDQUFDO2dCQUNwQixRQUFRLEVBQUUsY0FBYSxDQUFDO2FBQ3pCLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXHJcblxyXG5Db21wb25lbnQoe1xyXG4gIG9wdGlvbnM6IHtcclxuICAgIGFkZEdsb2JhbENsYXNzOiB0cnVlLFxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgdXNlcklkOiAnJyxcclxuICAgIHVzZXJOYW1lOiAnJyxcclxuICAgIHVzZXJJbWFnZTogJycsXHJcbiAgICBkaXNwbGF5QWRkVXNlcjogZmFsc2UsXHJcbiAgICBkaXNwbGF5QWRkVXNlcklucHV0OiBmYWxzZSxcclxuICAgIGlzTG9naW46IHRydWUsXHJcbiAgICBhY2NvdW50TGlzdDogW10sXHJcbiAgICBuZXdBY2NvdW50TmFtZTonJyxcclxuICAgIG9yZGVyQ291bnQ6IDAsXHJcbiAgICBjb3Vwb25Db3VudDogMFxyXG4gIH0sXHJcblxyXG4gIGJlaGF2aW9yczogW10sXHJcblxyXG5cclxuICBsaWZldGltZXM6IHtcclxuICAgIGF0dGFjaGVkKCkge1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGluaXREYXRhKCkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIHVzZXJJZDogd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmKCF0aGlzLmRhdGEudXNlck5hbWUgfHwgIXRoaXMuZGF0YS51c2VySW1hZ2UpIHtcclxuICAgICAgICBhcHAucmVxdWVzdEZ1bmMoJy91c2VyL2dldFVzZXJJbmZvJywge3VzZXJJZDogdGhpcy5kYXRhLnVzZXJJZH0sICdHRVQnLCByZXMgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgIHVzZXJOYW1lOiByZXMuZGF0YS51c2VySW5mby51c2VyTmFtZSxcclxuICAgICAgICAgICAgICB1c2VySW1hZ2U6IHJlcy5kYXRhLnVzZXJJbmZvLmltYWdlLFxyXG4gICAgICAgICAgICAgIG9yZGVyQ291bnQ6IHJlcy5kYXRhLm9yZGVyLFxyXG4gICAgICAgICAgICAgIGNvdXBvbkNvdW50OiByZXMuZGF0YS5jb3Vwb25cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGlzcGxheUFkZFVzZXJGbigpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHsgXHJcbiAgICAgICAgZGlzcGxheUFkZFVzZXIgOiAhdGhpcy5kYXRhLmRpc3BsYXlBZGRVc2VyXHJcbiAgICAgICB9KVxyXG4gICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRBY2NvdW50TGlzdCcsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWR9LCAnR0VUJywgcmVzID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgYWNjb3VudExpc3Q6IHJlcy5kYXRhLmFjY291bnRMaXN0XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBiaW5kSW5wdXROZXdBY2NvdW50TmFtZShlKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgbmV3QWNjb3VudE5hbWU6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgc2F2ZU5ld0FjY291bnQoKSB7XHJcbiAgICAgIGFwcC5yZXF1ZXN0RnVuYygnL3VzZXIvc2F2ZUFjY291bnQnLCB7dXNlcklkOiB0aGlzLmRhdGEudXNlcklkLCBhY2NvdW50TmFtZTogdGhpcy5kYXRhLm5ld0FjY291bnROYW1lfSwgJ1BPU1QnLCByZXMgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5tc2cpO1xyXG4gIFxyXG4gICAgICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRBY2NvdW50TGlzdCcsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWR9LCAnR0VUJywgcmVzID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGFjY291bnRMaXN0OiByZXMuZGF0YS5hY2NvdW50TGlzdFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRpc3BsYXlBZGRVc2VySW5wdXRGbigpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHsgXHJcbiAgICAgICAgZGlzcGxheUFkZFVzZXJJbnB1dCA6ICF0aGlzLmRhdGEuZGlzcGxheUFkZFVzZXJJbnB1dFxyXG4gICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBOYXZUb015SW5mb3JtYXRpb24oKSB7XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogJy4uL015L015SW5mb3JtYXRpb24vTXlJbmZvcm1hdGlvbj9pZD0nICsgdGhpcy5kYXRhLnVzZXJJZCxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpeyB9LFxyXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKCkgeyB9LFxyXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHsgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIE5hdlRvTXlBY2NvdW50KGUpIHtcclxuICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgdXJsOiAnLi4vTXkvTXlBY2NvdW50L015QWNjb3VudD9pZD0nICsgdGhpcy5kYXRhLnVzZXJJZCArICcmYWNjb3VudElkPScgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5hY2NvdW50aWQsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXsgfSxcclxuICAgICAgICBmYWlsOiBmdW5jdGlvbigpIHsgfSxcclxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7IH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBOYXZUb0Fib3V0KCkge1xyXG4gICAgfSxcclxuICAgIE5hdlRvT3JkZXJMaXN0KCkge1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcuLi9PcmRlclNlcnZpY2UvT3JkZXJMaXN0L09yZGVyTGlzdD9pZD0nICsgdGhpcy5kYXRhLnVzZXJJZCxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpeyB9LFxyXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKCkgeyB9LFxyXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHsgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZUN1cnJlbnRBY291bnQoZSkge1xyXG4gICAgICBjb25zdCBfdGhpcyA9IHRoaXNcclxuICAgICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgY29udGVudDogJ+WIoOmZpOWtkOi0puWPt+WQjizlrZDotKblj7fkuIvpnaLnmoTop5LoibLpg73lsIbooqvoh6rliqjliKDpmaR+JyxcclxuICAgICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICBhcHAucmVxdWVzdEZ1bmMoJy91c2VyL2RlbGV0ZUFjY291bnQnLCB7dXNlcklkOiBfdGhpcy5kYXRhLnVzZXJJZCwgYWNjb3VudElkOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5hY2NvdW50aWR9LCAnUE9TVCcsIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLm1zZyk7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEubXNnLFxyXG4gICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gIFxyXG4gICAgICAgICAgICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRBY2NvdW50TGlzdCcsIHt1c2VySWQ6IF90aGlzLmRhdGEudXNlcklkfSwgJ0dFVCcsIHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgYWNjb3VudExpc3Q6IHJlcy5kYXRhLmFjY291bnRMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIE5hdlRvTXlDb3Vwb25zKCkge1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcuLi9NeS9NeUNvdXBvbnMvTXlDb3Vwb25zP2lkPScgKyB0aGlzLmRhdGEudXNlcklkLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7IH0sXHJcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oKSB7IH0sXHJcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkgeyB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgTmF2VG9JbnZpdGVGcmllbmRzKCkge1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcuLi9NeS9NeUludml0ZS9JbnZpdGVGcmllbmRzL0ludml0ZUZyaWVuZHM/aWQ9JyArIHRoaXMuZGF0YS51c2VySWQsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXsgfSxcclxuICAgICAgICBmYWlsOiBmdW5jdGlvbigpIHsgfSxcclxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7IH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgfVxyXG59KSJdfQ==