"use strict";
const app = getApp();
Page({
    data: {
        isAuthorized: true,
        currentTab: '1'
    },
    onLoad: function () {
        const userInfo = wx.getStorageSync('userInfo');
        const userId = wx.getStorageSync('userId');
        const _this = this;
        if (userId == '' && userInfo == '') {
            wx.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                            success: res => {
                                wx.setStorageSync('userInfo', res.userInfo);
                                app.globalData.userInfo = res.userInfo;
                                wx.login({
                                    success: res => {
                                        console.log(res);
                                        wx.request({
                                            url: app.globalData.URL + '/user/login',
                                            data: {
                                                code: res.code,
                                                image: app.globalData.userInfo.avatarUrl,
                                                userName: app.globalData.userInfo.nickName,
                                            },
                                            header: {
                                                "Content-Type": "application/x-www-form-urlencoded"
                                            },
                                            method: 'POST',
                                            success: function (result) {
                                                console.log(result.data);
                                                wx.setStorageSync('userId', result.data.userId);
                                                console.log(wx.getStorageSync('userId'));
                                                _this.selectComponent("#home-page").initData();
                                            }
                                        });
                                    }
                                });
                            },
                        });
                    }
                    else {
                        this.setData({
                            isAuthorized: false
                        });
                    }
                },
            });
        }
        else {
            _this.selectComponent("#home-page").initData();
        }
    },
    onPullDownRefresh: function () {
        this.selectComponent("#home-page").initData();
        wx.stopPullDownRefresh();
    },
    getUserInfo: function (e) {
        const _this = this;
        wx.setStorageSync('userInfo', e.detail.userInfo);
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
                        console.log(wx.getStorageSync('userId'));
                        _this.setData({
                            isAuthorized: true
                        });
                    }
                });
            }
        });
    },
    swichNav: function (e) {
        if (e.currentTarget.dataset.currenttab) {
            if (this.data.currentTab != e.currentTarget.dataset.currenttab) {
                this.setData({
                    currentTab: e.currentTarget.dataset.currenttab
                });
            }
        }
        if (e.detail.tabIndex) {
            if (this.data.currentTab != e.detail.tabIndex) {
                this.setData({
                    currentTab: e.detail.tabIndex
                });
            }
        }
        if (this.data.currentTab == '1') {
            this.selectComponent("#home-page").initData();
        }
        if (this.data.currentTab == '2') {
            this.selectComponent("#master-page").initData();
        }
        if (this.data.currentTab == '3') {
            this.selectComponent("#group-page").initData();
        }
        if (this.data.currentTab == '4') {
            this.selectComponent("#order-page").initData();
        }
        if (this.data.currentTab == '5') {
            this.selectComponent("#my-page").initData();
        }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJJbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osWUFBWSxFQUFFLElBQUk7UUFDbEIsVUFBVSxFQUFFLEdBQUc7S0FDaEI7SUFDRCxNQUFNLEVBQUU7UUFDTixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRW5CLElBQUcsTUFBTSxJQUFJLEVBQUUsSUFBSSxRQUFRLElBQUksRUFBRSxFQUFFO1lBQ2pDLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ1osT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNiLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO3dCQUNyQyxFQUFFLENBQUMsV0FBVyxDQUFDOzRCQUNiLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtnQ0FDYixFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQzVDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUE7Z0NBQ3RDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0NBQ1AsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO3dDQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0NBRWpCLEVBQUUsQ0FBQyxPQUFPLENBQUM7NENBQ1QsR0FBRyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFFLGFBQWE7NENBQ3RDLElBQUksRUFBRTtnREFDSixJQUFJ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OUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtTQUM1QztJQUVILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuLy8g6I635Y+W5bqU55So5a6e5L6LXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIGlzQXV0aG9yaXplZDogdHJ1ZSxcbiAgICBjdXJyZW50VGFiOiAnMSdcbiAgfSxcbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdXNlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygndXNlckluZm8nKTtcbiAgICBjb25zdCB1c2VySWQgPSB3eC5nZXRTdG9yYWdlU3luYygndXNlcklkJyk7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIC8v5aaC5p6c5pyq5o6I5p2D5oiW5pWw5o2u57yT5a2Y6KKr5riF6ZmkXG4gICAgaWYodXNlcklkID09ICcnICYmIHVzZXJJbmZvID09ICcnKSB7XG4gICAgICB3eC5nZXRTZXR0aW5nKHtcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJywgcmVzLnVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgICAgICAgIHd4LmxvZ2luKHtcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5VUkwgKycvdXNlci9sb2dpbicsXG4gICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogcmVzLmNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogYXBwLmdsb2JhbERhdGEudXNlckluZm8uYXZhdGFyVXJsLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiBhcHAuZ2xvYmFsRGF0YS51c2VySW5mby5uaWNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlcklkJywgcmVzdWx0LmRhdGEudXNlcklkKTsgLy/nlKjmiLfllK/kuIDmoIfor4ZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjaG9tZS1wYWdlXCIpLmluaXREYXRhKClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICBpc0F1dGhvcml6ZWQgOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBfdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjaG9tZS1wYWdlXCIpLmluaXREYXRhKClcbiAgICB9XG4gIH0sXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjaG9tZS1wYWdlXCIpLmluaXREYXRhKCk7XG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xuICB9LFxuICBnZXRVc2VySW5mbzogZnVuY3Rpb24gKGU6IGFueSkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCBlLmRldGFpbC51c2VySW5mbyk7XG5cbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuXG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuVVJMICsnL3VzZXIvbG9naW4nLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNvZGU6IHJlcy5jb2RlLFxuICAgICAgICAgICAgaW1hZ2U6IGUuZGV0YWlsLnVzZXJJbmZvLmF2YXRhclVybCwgXG4gICAgICAgICAgICB1c2VyTmFtZTogZS5kZXRhaWwudXNlckluZm8ubmlja05hbWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcsIHJlc3VsdC5kYXRhLnVzZXJJZCk7IC8v55So5oi35ZSv5LiA5qCH6K+GXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3eC5nZXRTdG9yYWdlU3luYygndXNlcklkJykpO1xuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIGlzQXV0aG9yaXplZDogdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIHN3aWNoTmF2OiBmdW5jdGlvbiAoZTogYW55KSB7XG4gICAgaWYgKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnR0YWIpIHtcbiAgICAgIGlmICh0aGlzLmRhdGEuY3VycmVudFRhYiAhPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jdXJyZW50dGFiKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgY3VycmVudFRhYjogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudHRhYlxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZS5kZXRhaWwudGFiSW5kZXgpIHtcbiAgICAgIGlmICh0aGlzLmRhdGEuY3VycmVudFRhYiAhPSBlLmRldGFpbC50YWJJbmRleCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGN1cnJlbnRUYWI6IGUuZGV0YWlsLnRhYkluZGV4XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGlmKHRoaXMuZGF0YS5jdXJyZW50VGFiID09ICcxJykge1xuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjaG9tZS1wYWdlXCIpLmluaXREYXRhKClcbiAgICB9XG4gICAgaWYodGhpcy5kYXRhLmN1cnJlbnRUYWIgPT0gJzInKSB7XG4gICAgICB0aGlzLnNlbGVjdENvbXBvbmVudChcIiNtYXN0ZXItcGFnZVwiKS5pbml0RGF0YSgpXG4gICAgfVxuICAgIGlmKHRoaXMuZGF0YS5jdXJyZW50VGFiID09ICczJykge1xuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjZ3JvdXAtcGFnZVwiKS5pbml0RGF0YSgpXG4gICAgfVxuICAgIGlmKHRoaXMuZGF0YS5jdXJyZW50VGFiID09ICc0Jykge1xuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjb3JkZXItcGFnZVwiKS5pbml0RGF0YSgpXG4gICAgfVxuICAgIGlmKHRoaXMuZGF0YS5jdXJyZW50VGFiID09ICc1Jykge1xuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjbXktcGFnZVwiKS5pbml0RGF0YSgpXG4gICAgfVxuICAgIFxuICB9LFxufSlcbiJdfQ==