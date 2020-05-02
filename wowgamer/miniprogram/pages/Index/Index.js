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
        if (this.data.currentTab != e.currentTarget.dataset.currenttab) {
            this.setData({
                currentTab: e.currentTarget.dataset.currenttab
            });
            if (e.currentTarget.dataset.currenttab == '2') {
                this.selectComponent("#master-page").initData();
            }
            if (e.currentTarget.dataset.currenttab == '3') {
                this.selectComponent("#group-page").initData();
            }
            if (e.currentTarget.dataset.currenttab == '4') {
                this.selectComponent("#order-page").initData();
            }
            if (e.currentTarget.dataset.currenttab == '5') {
                this.selectComponent("#my-page").initData();
            }
        }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJJbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osWUFBWSxFQUFFLElBQUk7UUFDbEIsVUFBVSxFQUFFLEdBQUc7S0FDaEI7SUFDRCxNQUFNLEVBQUU7UUFDTixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0MsSUFBRyxNQUFNLElBQUksRUFBRSxJQUFJLFFBQVEsSUFBSSxFQUFFLEVBQUU7WUFDakMsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDWixPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQ2IsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7d0JBQ3JDLEVBQUUsQ0FBQyxXQUFXLENBQUM7NEJBQ2IsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dDQUNiLEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDNUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQTtnQ0FDdEMsRUFBRSxDQUFDLEtBQUssQ0FBQztvQ0FDUCxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7d0NBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3Q0FFakIsRUFBRSxDQUFDLE9BQU8sQ0FBQzs0Q0FDVCxHQUFHLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUUsYUFBYTs0Q0FDdEMsSUFBSSxFQUFFO2dEQUNKLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtnREFDZCxLQUFL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QyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7YUFDL0M7WUFDRCxJQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7YUFDL0M7WUFDRCxJQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7YUFDNUM7U0FDRjtJQUNILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuLy8g6I635Y+W5bqU55So5a6e5L6LXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIGlzQXV0aG9yaXplZDogdHJ1ZSxcbiAgICBjdXJyZW50VGFiOiAnMSdcbiAgfSxcbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdXNlckluZm8gPSB3eC5nZXRTdG9yYWdlU3luYygndXNlckluZm8nKTtcbiAgICBjb25zdCB1c2VySWQgPSB3eC5nZXRTdG9yYWdlU3luYygndXNlcklkJyk7XG4gICAgLy/lpoLmnpzmnKrmjojmnYPmiJbmlbDmja7nvJPlrZjooqvmuIXpmaRcbiAgICBpZih1c2VySWQgPT0gJycgJiYgdXNlckluZm8gPT0gJycpIHtcbiAgICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCByZXMudXNlckluZm8pO1xuICAgICAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgICAgICAgICAgd3gubG9naW4oe1xuICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLlVSTCArJy91c2VyL2xvZ2luJyxcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiByZXMuY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiBhcHAuZ2xvYmFsRGF0YS51c2VySW5mby5hdmF0YXJVcmwsIFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlck5hbWU6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLm5pY2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd1c2VySWQnLCByZXN1bHQuZGF0YS51c2VySWQpOyAvL+eUqOaIt+WUr+S4gOagh+ivhlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cod3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICBpc0F1dGhvcml6ZWQgOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgZ2V0VXNlckluZm86IGZ1bmN0aW9uIChlOiBhbnkpIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJywgZS5kZXRhaWwudXNlckluZm8pO1xuXG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcblxuICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLlVSTCArJy91c2VyL2xvZ2luJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjb2RlOiByZXMuY29kZSxcbiAgICAgICAgICAgIGltYWdlOiBlLmRldGFpbC51c2VySW5mby5hdmF0YXJVcmwsIFxuICAgICAgICAgICAgdXNlck5hbWU6IGUuZGV0YWlsLnVzZXJJbmZvLm5pY2tOYW1lLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd1c2VySWQnLCByZXN1bHQuZGF0YS51c2VySWQpOyAvL+eUqOaIt+WUr+S4gOagh+ivhlxuICAgICAgICAgICAgY29uc29sZS5sb2cod3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpKTtcbiAgICAgICAgICAgIF90aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICBpc0F1dGhvcml6ZWQ6IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBzd2ljaE5hdjogZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAodGhpcy5kYXRhLmN1cnJlbnRUYWIgIT0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudHRhYikge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgY3VycmVudFRhYjogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudHRhYlxuICAgICAgfSlcbiAgICAgIC8vIGlmKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnR0YWIgPT0gJzEnKSB7XG4gICAgICAvLyAgIHRoaXMuc2VsZWN0Q29tcG9uZW50KFwiI2hvbWUtcGFnZVwiKS5pbml0RGF0YSgpXG4gICAgICAvLyB9XG4gICAgICBpZihlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jdXJyZW50dGFiID09ICcyJykge1xuICAgICAgICB0aGlzLnNlbGVjdENvbXBvbmVudChcIiNtYXN0ZXItcGFnZVwiKS5pbml0RGF0YSgpXG4gICAgICB9XG4gICAgICBpZihlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jdXJyZW50dGFiID09ICczJykge1xuICAgICAgICB0aGlzLnNlbGVjdENvbXBvbmVudChcIiNncm91cC1wYWdlXCIpLmluaXREYXRhKClcbiAgICAgIH1cbiAgICAgIGlmKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnR0YWIgPT0gJzQnKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50KFwiI29yZGVyLXBhZ2VcIikuaW5pdERhdGEoKVxuICAgICAgfVxuICAgICAgaWYoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudHRhYiA9PSAnNScpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjbXktcGFnZVwiKS5pbml0RGF0YSgpXG4gICAgICB9XG4gICAgfVxuICB9LFxufSlcbiJdfQ==