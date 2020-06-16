"use strict";
const app = getApp();
Page({
    data: {
        isAuthorized: true,
        currentTab: '1',
        isShared: false
    },
    onLoad: function (options) {
        const userInfo = wx.getStorageSync('userInfo');
        const userId = wx.getStorageSync('userId');
        const _this = this;
        if (options.userId && options.page && options.width) {
            this.setData({
                isShared: true
            });
        }
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
                                                if (_this.data.isShared) {
                                                    _this.sendShared(true, options.userId);
                                                }
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
            _this.sendShared(true, options.userId);
            _this.selectComponent("#home-page").initData();
        }
    },
    sendShared: function (isShared, inviteUserId) {
        if (isShared) {
            const userId = wx.getStorageSync('userId');
            app.requestFuncPromise('/user/completeInvite', { inviteUserId: inviteUserId, invitedUserId: userId }, 'POST')
                .then(res => {
                console.log(res);
            });
        }
        this.setData({
            isShared: false
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJJbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osWUFBWSxFQUFFLElBQUk7UUFDbEIsVUFBVSxFQUFFLEdBQUc7UUFDZixRQUFRLEVBQUUsS0FBSztLQUNoQjtJQUNELE1BQU0sRUFBRSxVQUFVLE9BQU87UUFDdkIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2xELElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUE7U0FDSDtRQUVELElBQUcsTUFBTSxJQUFJLEVBQUUsSUFBSSxRQUFRLElBQUksRUFBRSxFQUFFO1lBQ2pDLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ1osT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNiLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO3dCQUNyQyxFQUFFLENBQUMsV0FBVyxDQUFDOzRCQUNiLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtnQ0FDYixFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQzVDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUE7Z0NBQ3RDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0NBQ1AsT0FB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Q0FBQTthQUNIO1NBQ0Y7UUFDRCxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3JCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsVUFBVSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUTtpQkFDOUIsQ0FBQyxDQUFBO2FBQ0g7U0FDRjtRQUNELElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksR0FBRyxFQUFFO1lBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7U0FDOUM7UUFDRCxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTtZQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1NBQ2hEO1FBQ0QsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtTQUMvQztRQUNELElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksR0FBRyxFQUFFO1lBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7U0FDL0M7UUFDRCxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTtZQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1NBQzVDO0lBRUgsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXHJcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xyXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgaXNBdXRob3JpemVkOiB0cnVlLFxyXG4gICAgY3VycmVudFRhYjogJzEnLFxyXG4gICAgaXNTaGFyZWQ6IGZhbHNlXHJcbiAgfSxcclxuICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICBjb25zdCB1c2VySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycpO1xyXG4gICAgY29uc3QgdXNlcklkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpO1xyXG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xyXG4gICAgaWYob3B0aW9ucy51c2VySWQgJiYgb3B0aW9ucy5wYWdlICYmIG9wdGlvbnMud2lkdGgpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBpc1NoYXJlZDogdHJ1ZVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy/lpoLmnpzmnKrmjojmnYPmiJbmlbDmja7nvJPlrZjooqvmuIXpmaRcclxuICAgIGlmKHVzZXJJZCA9PSAnJyAmJiB1c2VySW5mbyA9PSAnJykge1xyXG4gICAgICB3eC5nZXRTZXR0aW5nKHtcclxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xyXG4gICAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycsIHJlcy51c2VySW5mbyk7XHJcbiAgICAgICAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgICAgICAgICAgd3gubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5VUkwgKycvdXNlci9sb2dpbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IHJlcy5jb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogYXBwLmdsb2JhbERhdGEudXNlckluZm8uYXZhdGFyVXJsLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlck5hbWU6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLm5pY2tOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlcklkJywgcmVzdWx0LmRhdGEudXNlcklkKTsgLy/nlKjmiLfllK/kuIDmoIfor4ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3RoaXMuZGF0YS5pc1NoYXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbmRTaGFyZWQodHJ1ZSwgb3B0aW9ucy51c2VySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdENvbXBvbmVudChcIiNob21lLXBhZ2VcIikuaW5pdERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgIGlzQXV0aG9yaXplZCA6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIF90aGlzLnNlbmRTaGFyZWQodHJ1ZSwgb3B0aW9ucy51c2VySWQpO1xyXG4gICAgICBfdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjaG9tZS1wYWdlXCIpLmluaXREYXRhKClcclxuICAgIH1cclxuICB9LFxyXG4gIHNlbmRTaGFyZWQ6IGZ1bmN0aW9uIChpc1NoYXJlZDogYm9vbGVhbiwgaW52aXRlVXNlcklkOiBzdHJpbmcpIHtcclxuICAgIGlmKGlzU2hhcmVkKSB7XHJcbiAgICAgIGNvbnN0IHVzZXJJZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKTtcclxuICAgICAgYXBwLnJlcXVlc3RGdW5jUHJvbWlzZSgnL3VzZXIvY29tcGxldGVJbnZpdGUnLCB7aW52aXRlVXNlcklkOiBpbnZpdGVVc2VySWQsIGludml0ZWRVc2VySWQ6ICB1c2VySWR9LCAnUE9TVCcpXHJcbiAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGlzU2hhcmVkOiBmYWxzZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNlbGVjdENvbXBvbmVudChcIiNob21lLXBhZ2VcIikuaW5pdERhdGEoKTtcclxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcclxuICB9LFxyXG4gIGdldFVzZXJJbmZvOiBmdW5jdGlvbiAoZTogYW55KSB7XHJcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCBlLmRldGFpbC51c2VySW5mbyk7XHJcblxyXG4gICAgd3gubG9naW4oe1xyXG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcblxyXG4gICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5VUkwgKycvdXNlci9sb2dpbicsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGNvZGU6IHJlcy5jb2RlLFxyXG4gICAgICAgICAgICBpbWFnZTogZS5kZXRhaWwudXNlckluZm8uYXZhdGFyVXJsLCBcclxuICAgICAgICAgICAgdXNlck5hbWU6IGUuZGV0YWlsLnVzZXJJbmZvLm5pY2tOYW1lLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlcklkJywgcmVzdWx0LmRhdGEudXNlcklkKTsgLy/nlKjmiLfllK/kuIDmoIfor4ZcclxuICAgICAgICAgICAgY29uc29sZS5sb2cod3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpKTtcclxuICAgICAgICAgICAgX3RoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgaXNBdXRob3JpemVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBzd2ljaE5hdjogZnVuY3Rpb24gKGU6IGFueSkge1xyXG4gICAgaWYgKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnR0YWIpIHtcclxuICAgICAgaWYgKHRoaXMuZGF0YS5jdXJyZW50VGFiICE9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnR0YWIpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgY3VycmVudFRhYjogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudHRhYlxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChlLmRldGFpbC50YWJJbmRleCkge1xyXG4gICAgICBpZiAodGhpcy5kYXRhLmN1cnJlbnRUYWIgIT0gZS5kZXRhaWwudGFiSW5kZXgpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgY3VycmVudFRhYjogZS5kZXRhaWwudGFiSW5kZXhcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmRhdGEuY3VycmVudFRhYiA9PSAnMScpIHtcclxuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjaG9tZS1wYWdlXCIpLmluaXREYXRhKClcclxuICAgIH1cclxuICAgIGlmKHRoaXMuZGF0YS5jdXJyZW50VGFiID09ICcyJykge1xyXG4gICAgICB0aGlzLnNlbGVjdENvbXBvbmVudChcIiNtYXN0ZXItcGFnZVwiKS5pbml0RGF0YSgpXHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmRhdGEuY3VycmVudFRhYiA9PSAnMycpIHtcclxuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjZ3JvdXAtcGFnZVwiKS5pbml0RGF0YSgpXHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmRhdGEuY3VycmVudFRhYiA9PSAnNCcpIHtcclxuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjb3JkZXItcGFnZVwiKS5pbml0RGF0YSgpXHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmRhdGEuY3VycmVudFRhYiA9PSAnNScpIHtcclxuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjbXktcGFnZVwiKS5pbml0RGF0YSgpXHJcbiAgICB9XHJcbiAgICBcclxuICB9LFxyXG59KVxyXG4iXX0=