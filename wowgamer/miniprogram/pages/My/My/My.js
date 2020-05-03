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
        newAccountName: ''
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
                            userImage: res.data.userInfo.image
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
        navToMyInformation() {
            wx.navigateTo({
                url: '../My/MyInformation/MyInformation?id=' + this.data.userId,
                success: function (res) { },
                fail: function () { },
                complete: function () { }
            });
        },
        navToMyAccount(e) {
            wx.navigateTo({
                url: '../My/MyAccount/MyAccount?id=' + this.data.userId + '&accountId=' + e.currentTarget.dataset.accountid,
                success: function (res) { },
                fail: function () { },
                complete: function () { }
            });
        },
        navToAbout() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsU0FBUyxDQUFDO0lBQ1IsT0FBTyxFQUFFO1FBQ1AsY0FBYyxFQUFFLElBQUk7S0FDckI7SUFDRCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsRUFBRTtRQUNWLFFBQVEsRUFBRSxFQUFFO1FBQ1osU0FBUyxFQUFFLEVBQUU7UUFDYixjQUFjLEVBQUUsS0FBSztRQUNyQixtQkFBbUIsRUFBRSxLQUFLO1FBQzFCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsV0FBVyxFQUFFLEVBQUU7UUFDZixjQUFjLEVBQUMsRUFBRTtLQUNsQjtJQUVELFNBQVMsRUFBRSxFQUFFO0lBR2IsU0FBUyxFQUFFO1FBQ1QsUUFBUTtRQUNSLENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLFFBQVE7WUFDTixJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLE1BQU0sRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQzthQUNwQyxDQUFDLENBQUE7WUFDRixJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDOUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRTtvQkFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO3dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNYLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFB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LEVBQUUsR0FBRyxDQUFDLEVBQUU7b0NBQ2hGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29DQUN0QixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTt3Q0FDNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQzs0Q0FDWixXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXO3lDQUNsQyxDQUFDLENBQUE7cUNBQ0g7Z0NBQ0gsQ0FBQyxDQUFDLENBQUE7NkJBQ0g7d0JBQ0gsQ0FBQyxDQUFDLENBQUE7cUJBQ0g7eUJBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO3dCQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO3FCQUN0QjtnQkFDSCxDQUFDO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcblxuQ29tcG9uZW50KHtcbiAgb3B0aW9uczoge1xuICAgIGFkZEdsb2JhbENsYXNzOiB0cnVlLFxuICB9LFxuICBkYXRhOiB7XG4gICAgdXNlcklkOiAnJyxcbiAgICB1c2VyTmFtZTogJycsXG4gICAgdXNlckltYWdlOiAnJyxcbiAgICBkaXNwbGF5QWRkVXNlcjogZmFsc2UsXG4gICAgZGlzcGxheUFkZFVzZXJJbnB1dDogZmFsc2UsXG4gICAgaXNMb2dpbjogdHJ1ZSxcbiAgICBhY2NvdW50TGlzdDogW10sXG4gICAgbmV3QWNjb3VudE5hbWU6JydcbiAgfSxcblxuICBiZWhhdmlvcnM6IFtdLFxuXG5cbiAgbGlmZXRpbWVzOiB7XG4gICAgYXR0YWNoZWQoKSB7XG4gICAgfVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBpbml0RGF0YSgpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHVzZXJJZDogd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpXG4gICAgICB9KVxuICAgICAgaWYoIXRoaXMuZGF0YS51c2VyTmFtZSB8fCAhdGhpcy5kYXRhLnVzZXJJbWFnZSkge1xuICAgICAgICBhcHAucmVxdWVzdEZ1bmMoJy91c2VyL2dldFVzZXJJbmZvJywge3VzZXJJZDogdGhpcy5kYXRhLnVzZXJJZH0sICdHRVQnLCByZXMgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICB1c2VyTmFtZTogcmVzLmRhdGEudXNlckluZm8udXNlck5hbWUsXG4gICAgICAgICAgICAgIHVzZXJJbWFnZTogcmVzLmRhdGEudXNlckluZm8uaW1hZ2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheUFkZFVzZXJGbigpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7IFxuICAgICAgICBkaXNwbGF5QWRkVXNlciA6ICF0aGlzLmRhdGEuZGlzcGxheUFkZFVzZXJcbiAgICAgICB9KVxuICAgICAgIGFwcC5yZXF1ZXN0RnVuYygnL3VzZXIvZ2V0QWNjb3VudExpc3QnLCB7dXNlcklkOiB0aGlzLmRhdGEudXNlcklkfSwgJ0dFVCcsIHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBhY2NvdW50TGlzdDogcmVzLmRhdGEuYWNjb3VudExpc3RcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgYmluZElucHV0TmV3QWNjb3VudE5hbWUoZSkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgbmV3QWNjb3VudE5hbWU6IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9KVxuICAgIH0sXG4gICAgc2F2ZU5ld0FjY291bnQoKSB7XG4gICAgICBhcHAucmVxdWVzdEZ1bmMoJy91c2VyL3NhdmVBY2NvdW50Jywge3VzZXJJZDogdGhpcy5kYXRhLnVzZXJJZCwgYWNjb3VudE5hbWU6IHRoaXMuZGF0YS5uZXdBY2NvdW50TmFtZX0sICdQT1NUJywgcmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEubXNnKTtcbiAgXG4gICAgICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRBY2NvdW50TGlzdCcsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWR9LCAnR0VUJywgcmVzID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09IHRydWUpIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBhY2NvdW50TGlzdDogcmVzLmRhdGEuYWNjb3VudExpc3RcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgZGlzcGxheUFkZFVzZXJJbnB1dEZuKCkge1xuICAgICAgdGhpcy5zZXREYXRhKHsgXG4gICAgICAgIGRpc3BsYXlBZGRVc2VySW5wdXQgOiAhdGhpcy5kYXRhLmRpc3BsYXlBZGRVc2VySW5wdXRcbiAgICAgICB9KVxuICAgIH0sXG4gICAgbmF2VG9NeUluZm9ybWF0aW9uKCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4uL015L015SW5mb3JtYXRpb24vTXlJbmZvcm1hdGlvbj9pZD0nICsgdGhpcy5kYXRhLnVzZXJJZCxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXsgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oKSB7IH0sXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHsgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIG5hdlRvTXlBY2NvdW50KGUpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuLi9NeS9NeUFjY291bnQvTXlBY2NvdW50P2lkPScgKyB0aGlzLmRhdGEudXNlcklkICsgJyZhY2NvdW50SWQ9JyArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmFjY291bnRpZCxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXsgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oKSB7IH0sXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHsgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIG5hdlRvQWJvdXQoKSB7XG4gICAgfSxcbiAgICBkZWxldGVDdXJyZW50QWNvdW50KGUpIHtcbiAgICAgIGNvbnN0IF90aGlzID0gdGhpc1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICBjb250ZW50OiAn5Yig6Zmk5a2Q6LSm5Y+35ZCOLOWtkOi0puWPt+S4i+mdoueahOinkuiJsumDveWwhuiiq+iHquWKqOWIoOmZpH4nLFxuICAgICAgICBzdWNjZXNzIChyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIGFwcC5yZXF1ZXN0RnVuYygnL3VzZXIvZGVsZXRlQWNjb3VudCcsIHt1c2VySWQ6IF90aGlzLmRhdGEudXNlcklkLCBhY2NvdW50SWQ6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmFjY291bnRpZH0sICdQT1NUJywgcmVzID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEubXNnKTtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhLm1zZyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgXG4gICAgICAgICAgICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRBY2NvdW50TGlzdCcsIHt1c2VySWQ6IF90aGlzLmRhdGEudXNlcklkfSwgJ0dFVCcsIHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgIGFjY291bnRMaXN0OiByZXMuZGF0YS5hY2NvdW50TGlzdFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59KSJdfQ==