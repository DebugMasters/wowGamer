"use strict";
const app = getApp();
Page({
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
    onLoad: function () {
        this.setData({
            userId: wx.getStorageSync('id')
        });
    },
    onShow: function () {
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
            url: '../MyInformation/MyInformation?id=' + this.data.userId,
            success: function (res) { },
            fail: function () { },
            complete: function () { }
        });
    },
    navToMyAccount(e) {
        wx.navigateTo({
            url: '../MyAccount/MyAccount?id=' + this.data.userId + '&accountId=' + e.currentTarget.dataset.accountid,
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLEVBQUU7UUFDVixRQUFRLEVBQUUsRUFBRTtRQUNaLFNBQVMsRUFBRSxFQUFFO1FBQ2IsY0FBYyxFQUFFLEtBQUs7UUFDckIsbUJBQW1CLEVBQUUsS0FBSztRQUMxQixPQUFPLEVBQUUsSUFBSTtRQUNiLFdBQVcsRUFBRSxFQUFFO1FBQ2YsY0FBYyxFQUFDLEVBQUU7S0FDbEI7SUFLRCxNQUFNLEVBQUU7UUFDTixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsTUFBTSxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1NBQ2hDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM5QyxHQUFHLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7d0JBQ3BDLFNBQVMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO3FCQUNuQyxDQUFDLENBQUE7aUJBQ0g7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LElBQUksSUFBSSxFQUFFO29DQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDO3dDQUNaLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVc7cUNBQ2xDLENBQUMsQ0FBQTtpQ0FDSDs0QkFDSCxDQUFDLENBQUMsQ0FBQTt5QkFDSDtvQkFDSCxDQUFDLENBQUMsQ0FBQTtpQkFDSDtxQkFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7aUJBQ3RCO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuLy8g6I635Y+W5bqU55So5a6e5L6LXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIHVzZXJJZDogJycsXG4gICAgdXNlck5hbWU6ICcnLFxuICAgIHVzZXJJbWFnZTogJycsXG4gICAgZGlzcGxheUFkZFVzZXI6IGZhbHNlLFxuICAgIGRpc3BsYXlBZGRVc2VySW5wdXQ6IGZhbHNlLFxuICAgIGlzTG9naW46IHRydWUsXG4gICAgYWNjb3VudExpc3Q6IFtdLFxuICAgIG5ld0FjY291bnROYW1lOicnXG4gIH0sXG4gIFxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB1c2VySWQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdpZCcpXG4gICAgfSlcbiAgfSxcbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYoIXRoaXMuZGF0YS51c2VyTmFtZSB8fCAhdGhpcy5kYXRhLnVzZXJJbWFnZSkge1xuICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRVc2VySW5mbycsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWR9LCAnR0VUJywgcmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHVzZXJOYW1lOiByZXMuZGF0YS51c2VySW5mby51c2VyTmFtZSxcbiAgICAgICAgICAgIHVzZXJJbWFnZTogcmVzLmRhdGEudXNlckluZm8uaW1hZ2VcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgZGlzcGxheUFkZFVzZXJGbigpIHtcbiAgICB0aGlzLnNldERhdGEoeyBcbiAgICAgIGRpc3BsYXlBZGRVc2VyIDogIXRoaXMuZGF0YS5kaXNwbGF5QWRkVXNlclxuICAgICB9KVxuICAgICBhcHAucmVxdWVzdEZ1bmMoJy91c2VyL2dldEFjY291bnRMaXN0Jywge3VzZXJJZDogdGhpcy5kYXRhLnVzZXJJZH0sICdHRVQnLCByZXMgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGFjY291bnRMaXN0OiByZXMuZGF0YS5hY2NvdW50TGlzdFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGJpbmRJbnB1dE5ld0FjY291bnROYW1lKGUpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbmV3QWNjb3VudE5hbWU6IGUuZGV0YWlsLnZhbHVlXG4gICAgfSlcbiAgfSxcbiAgc2F2ZU5ld0FjY291bnQoKSB7XG4gICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9zYXZlQWNjb3VudCcsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWQsIGFjY291bnROYW1lOiB0aGlzLmRhdGEubmV3QWNjb3VudE5hbWV9LCAnUE9TVCcsIHJlcyA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLm1zZyk7XG5cbiAgICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRBY2NvdW50TGlzdCcsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWR9LCAnR0VUJywgcmVzID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgYWNjb3VudExpc3Q6IHJlcy5kYXRhLmFjY291bnRMaXN0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBkaXNwbGF5QWRkVXNlcklucHV0Rm4oKSB7XG4gICAgdGhpcy5zZXREYXRhKHsgXG4gICAgICBkaXNwbGF5QWRkVXNlcklucHV0IDogIXRoaXMuZGF0YS5kaXNwbGF5QWRkVXNlcklucHV0XG4gICAgIH0pXG4gIH0sXG4gIG5hdlRvTXlJbmZvcm1hdGlvbigpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uL015SW5mb3JtYXRpb24vTXlJbmZvcm1hdGlvbj9pZD0nICsgdGhpcy5kYXRhLnVzZXJJZCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7IH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbigpIHsgfSxcbiAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHsgfVxuICAgIH0pXG4gIH0sXG4gIG5hdlRvTXlBY2NvdW50KGUpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uL015QWNjb3VudC9NeUFjY291bnQ/aWQ9JyArIHRoaXMuZGF0YS51c2VySWQgKyAnJmFjY291bnRJZD0nICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuYWNjb3VudGlkLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXsgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uKCkgeyB9LFxuICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkgeyB9XG4gICAgfSlcbiAgfSxcbiAgbmF2VG9BYm91dCgpIHtcbiAgfSxcbiAgZGVsZXRlQ3VycmVudEFjb3VudChlKSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzXG4gICAgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIGNvbnRlbnQ6ICfliKDpmaTlrZDotKblj7flkI4s5a2Q6LSm5Y+35LiL6Z2i55qE6KeS6Imy6YO95bCG6KKr6Ieq5Yqo5Yig6ZmkficsXG4gICAgICBzdWNjZXNzIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9kZWxldGVBY2NvdW50Jywge3VzZXJJZDogX3RoaXMuZGF0YS51c2VySWQsIGFjY291bnRJZDogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuYWNjb3VudGlkfSwgJ1BPU1QnLCByZXMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5tc2cpO1xuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YS5tc2csXG4gICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRBY2NvdW50TGlzdCcsIHt1c2VySWQ6IF90aGlzLmRhdGEudXNlcklkfSwgJ0dFVCcsIHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgIF90aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICBhY2NvdW50TGlzdDogcmVzLmRhdGEuYWNjb3VudExpc3RcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxufSlcbiJdfQ==