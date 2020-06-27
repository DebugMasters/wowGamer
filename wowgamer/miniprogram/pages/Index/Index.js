"use strict";
const app = getApp();
Page({
    data: {
        isAuthorized: false,
        showAuthorizeWindow: false,
        currentTab: '1',
        nextTab: '-1'
    },
    onLoad: function (options) {
        const userInfo = wx.getStorageSync('userInfo');
        const userId = wx.getStorageSync('userId');
        const _this = this;
        if (options.scene) {
            app.globalData.isShared = true;
            app.globalData.sharedUserId = options.scene;
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
                                                if (app.globalData.isShared) {
                                                    _this.sendShared(true, app.globalData.sharedUserId);
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
                            showAuthorizeWindow: true,
                            isAuthorized: false,
                            nextTab: '1'
                        });
                    }
                },
            });
        }
        else {
            if (app.globalData.isShared) {
                _this.sendShared(true, app.globalData.sharedUserId);
            }
            _this.selectComponent("#home-page").initData();
        }
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
    onPullDownRefresh: function () {
        this.selectComponent("#home-page").initData();
        wx.stopPullDownRefresh();
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
                        console.log(wx.getStorageSync('userId'));
                        _this.setData({
                            isAuthorized: true,
                            showAuthorizeWindow: false
                        });
                        if (app.globalData.isShared) {
                            _this.sendShared(true, app.globalData.sharedUserId);
                        }
                        if (_this.data.nextTab != '-1') {
                            _this.setData({
                                currentTab: _this.data.nextTab
                            });
                            if (_this.data.nextTab == '1') {
                                _this.selectComponent("#home-page").initData();
                            }
                            if (_this.data.nextTab == '2') {
                                _this.selectComponent("#master-page").initData();
                            }
                            if (_this.data.nextTab == '3') {
                                _this.selectComponent("#group-page").initData();
                            }
                            if (_this.data.nextTab == '4') {
                                _this.selectComponent("#order-page").initData();
                            }
                            if (_this.data.nextTab == '5') {
                                _this.selectComponent("#my-page").initData();
                            }
                            _this.setData({
                                nextTab: '-1'
                            });
                        }
                    }
                });
            }
        });
    },
    cancelAuthorize: function () {
        this.setData({
            showAuthorizeWindow: false
        });
        if (this.data.nextTab == '1') {
            this.selectComponent("#home-page").initData();
        }
    },
    swichNav: function (e) {
        const userInfo = wx.getStorageSync('userInfo');
        const userId = wx.getStorageSync('userId');
        if (userId == '' && userInfo == '') {
            if (e.currentTarget.dataset.currenttab == '2' || e.currentTarget.dataset.currenttab == '3') {
                this.setData({
                    showAuthorizeWindow: true,
                    nextTab: e.currentTarget.dataset.currenttab
                });
                return;
            }
        }
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
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJJbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osWUFBWSxFQUFFLEtBQUs7UUFDbkIsbUJBQW1CLEVBQUUsS0FBSztRQUMxQixVQUFVLEVBQUUsR0FBRztRQUNmLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxNQUFNLEVBQUUsVUFBVSxPQUFPO1FBQ3ZCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBRyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2hCLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUMvQixHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQzdDO1FBRUQsSUFBRyxNQUFNLElBQUksRUFBRSxJQUFJLFFBQVEsSUFBSSxFQUFFLEVBQUU7WUFDakMsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDWixPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQ2IsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7d0JBQ3JDLEVBQUUsQ0FBQyxXQUFXLENBQUM7NEJBQ2IsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dDQUNiLEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDNUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQTtnQ0FDdEMsRUFBRSxD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O2lCQUMvQyxDQUFDLENBQUE7YUFDSDtTQUNGO1FBQ0QsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVE7aUJBQzlCLENBQUMsQ0FBQTthQUNIO1NBQ0Y7UUFDRCxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTtZQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1NBQzlDO1FBQ0QsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtTQUNoRDtRQUNELElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksR0FBRyxFQUFFO1lBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUE7U0FDL0M7UUFDRCxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTtZQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1NBQy9DO1FBQ0QsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtTQUM1QztJQUNILENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xyXG4vLyDojrflj5blupTnlKjlrp7kvotcclxuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcclxuXHJcblBhZ2Uoe1xyXG4gIGRhdGE6IHtcclxuICAgIGlzQXV0aG9yaXplZDogZmFsc2UsXHJcbiAgICBzaG93QXV0aG9yaXplV2luZG93OiBmYWxzZSxcclxuICAgIGN1cnJlbnRUYWI6ICcxJyxcclxuICAgIG5leHRUYWI6ICctMSdcclxuICB9LFxyXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHVzZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJyk7XHJcbiAgICBjb25zdCB1c2VySWQgPSB3eC5nZXRTdG9yYWdlU3luYygndXNlcklkJyk7XHJcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICBpZihvcHRpb25zLnNjZW5lKSB7XHJcbiAgICAgIGFwcC5nbG9iYWxEYXRhLmlzU2hhcmVkID0gdHJ1ZTtcclxuICAgICAgYXBwLmdsb2JhbERhdGEuc2hhcmVkVXNlcklkID0gb3B0aW9ucy5zY2VuZTtcclxuICAgIH1cclxuICAgIC8v5aaC5p6c5pyq5o6I5p2D5oiW5pWw5o2u57yT5a2Y6KKr5riF6ZmkXHJcbiAgICBpZih1c2VySWQgPT0gJycgJiYgdXNlckluZm8gPT0gJycpIHtcclxuICAgICAgd3guZ2V0U2V0dGluZyh7XHJcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcclxuICAgICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCByZXMudXNlckluZm8pO1xyXG4gICAgICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICAgICAgICAgIHd4LmxvZ2luKHtcclxuICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuVVJMICsnL3VzZXIvbG9naW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiByZXMuY29kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLmF2YXRhclVybCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiBhcHAuZ2xvYmFsRGF0YS51c2VySW5mby5uaWNrTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcsIHJlc3VsdC5kYXRhLnVzZXJJZCk7IC8v55So5oi35ZSv5LiA5qCH6K+GXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFwcC5nbG9iYWxEYXRhLmlzU2hhcmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2VuZFNoYXJlZCh0cnVlLCBhcHAuZ2xvYmFsRGF0YS5zaGFyZWRVc2VySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdENvbXBvbmVudChcIiNob21lLXBhZ2VcIikuaW5pdERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgIHNob3dBdXRob3JpemVXaW5kb3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgaXNBdXRob3JpemVkIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgbmV4dFRhYjogJzEnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmKGFwcC5nbG9iYWxEYXRhLmlzU2hhcmVkKSB7XHJcbiAgICAgICAgX3RoaXMuc2VuZFNoYXJlZCh0cnVlLCBhcHAuZ2xvYmFsRGF0YS5zaGFyZWRVc2VySWQpO1xyXG4gICAgICB9XHJcbiAgICAgIF90aGlzLnNlbGVjdENvbXBvbmVudChcIiNob21lLXBhZ2VcIikuaW5pdERhdGEoKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VuZFNoYXJlZDogZnVuY3Rpb24gKGlzU2hhcmVkOiBib29sZWFuLCBpbnZpdGVVc2VySWQ6IHN0cmluZykge1xyXG4gICAgaWYoaXNTaGFyZWQpIHtcclxuICAgICAgY29uc3QgdXNlcklkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpO1xyXG4gICAgICBhcHAucmVxdWVzdEZ1bmNQcm9taXNlKCcvdXNlci9jb21wbGV0ZUludml0ZScsIHtpbnZpdGVVc2VySWQ6IGludml0ZVVzZXJJZCwgaW52aXRlZFVzZXJJZDogIHVzZXJJZH0sICdQT1NUJylcclxuICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6IHJlcy5kYXRhLm1zZyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgYXBwLmdsb2JhbERhdGEuaXNTaGFyZWQgPSBmYWxzZVxyXG4gIH0sXHJcbiAgb25QdWxsRG93blJlZnJlc2g6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50KFwiI2hvbWUtcGFnZVwiKS5pbml0RGF0YSgpO1xyXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xyXG4gIH0sXHJcbiAgZ2V0VXNlckluZm86IGZ1bmN0aW9uIChlOiBhbnkpIHtcclxuICAgIGNvbnN0IF90aGlzID0gdGhpcztcclxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycsIGUuZGV0YWlsLnVzZXJJbmZvKTtcclxuICAgIGlmKCFlLmRldGFpbC51c2VySW5mbykgcmV0dXJuO1xyXG5cclxuICAgIHd4LmxvZ2luKHtcclxuICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG5cclxuICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuVVJMICsnL3VzZXIvbG9naW4nLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBjb2RlOiByZXMuY29kZSxcclxuICAgICAgICAgICAgaW1hZ2U6IGUuZGV0YWlsLnVzZXJJbmZvLmF2YXRhclVybCwgXHJcbiAgICAgICAgICAgIHVzZXJOYW1lOiBlLmRldGFpbC51c2VySW5mby5uaWNrTmFtZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcsIHJlc3VsdC5kYXRhLnVzZXJJZCk7IC8v55So5oi35ZSv5LiA5qCH6K+GXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKSk7XHJcbiAgICAgICAgICAgIF90aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgIGlzQXV0aG9yaXplZDogdHJ1ZSxcclxuICAgICAgICAgICAgICBzaG93QXV0aG9yaXplV2luZG93OiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYoYXBwLmdsb2JhbERhdGEuaXNTaGFyZWQpIHtcclxuICAgICAgICAgICAgICBfdGhpcy5zZW5kU2hhcmVkKHRydWUsIGFwcC5nbG9iYWxEYXRhLnNoYXJlZFVzZXJJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoX3RoaXMuZGF0YS5uZXh0VGFiICE9ICctMScpIHtcclxuICAgICAgICAgICAgICBfdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYWI6IF90aGlzLmRhdGEubmV4dFRhYlxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgaWYoX3RoaXMuZGF0YS5uZXh0VGFiID09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0Q29tcG9uZW50KFwiI2hvbWUtcGFnZVwiKS5pbml0RGF0YSgpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmKF90aGlzLmRhdGEubmV4dFRhYiA9PSAnMicpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdENvbXBvbmVudChcIiNtYXN0ZXItcGFnZVwiKS5pbml0RGF0YSgpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmKF90aGlzLmRhdGEubmV4dFRhYiA9PSAnMycpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNlbGVjdENvbXBvbmVudChcIiNncm91cC1wYWdlXCIpLmluaXREYXRhKClcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYoX3RoaXMuZGF0YS5uZXh0VGFiID09ICc0Jykge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2VsZWN0Q29tcG9uZW50KFwiI29yZGVyLXBhZ2VcIikuaW5pdERhdGEoKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZihfdGhpcy5kYXRhLm5leHRUYWIgPT0gJzUnKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjbXktcGFnZVwiKS5pbml0RGF0YSgpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIF90aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgbmV4dFRhYjonLTEnXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgY2FuY2VsQXV0aG9yaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBzaG93QXV0aG9yaXplV2luZG93OiBmYWxzZVxyXG4gICAgfSk7XHJcbiAgICBpZih0aGlzLmRhdGEubmV4dFRhYiA9PSAnMScpIHtcclxuICAgICAgdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjaG9tZS1wYWdlXCIpLmluaXREYXRhKClcclxuICAgIH1cclxuICB9LFxyXG4gIHN3aWNoTmF2OiBmdW5jdGlvbiAoZTogYW55KSB7XHJcbiAgICBjb25zdCB1c2VySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycpO1xyXG4gICAgY29uc3QgdXNlcklkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpO1xyXG4gICAgaWYodXNlcklkID09ICcnICYmIHVzZXJJbmZvID09ICcnKSB7XHJcbiAgICAgIGlmKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnR0YWIgPT0gJzInIHx8ZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudHRhYiA9PSAnMycpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgc2hvd0F1dGhvcml6ZVdpbmRvdzogdHJ1ZSxcclxuICAgICAgICAgIG5leHRUYWI6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnR0YWJcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudHRhYikge1xyXG4gICAgICBpZiAodGhpcy5kYXRhLmN1cnJlbnRUYWIgIT0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudHRhYikge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBjdXJyZW50VGFiOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jdXJyZW50dGFiXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGUuZGV0YWlsLnRhYkluZGV4KSB7XHJcbiAgICAgIGlmICh0aGlzLmRhdGEuY3VycmVudFRhYiAhPSBlLmRldGFpbC50YWJJbmRleCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBjdXJyZW50VGFiOiBlLmRldGFpbC50YWJJbmRleFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKHRoaXMuZGF0YS5jdXJyZW50VGFiID09ICcxJykge1xyXG4gICAgICB0aGlzLnNlbGVjdENvbXBvbmVudChcIiNob21lLXBhZ2VcIikuaW5pdERhdGEoKVxyXG4gICAgfVxyXG4gICAgaWYodGhpcy5kYXRhLmN1cnJlbnRUYWIgPT0gJzInKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50KFwiI21hc3Rlci1wYWdlXCIpLmluaXREYXRhKClcclxuICAgIH1cclxuICAgIGlmKHRoaXMuZGF0YS5jdXJyZW50VGFiID09ICczJykge1xyXG4gICAgICB0aGlzLnNlbGVjdENvbXBvbmVudChcIiNncm91cC1wYWdlXCIpLmluaXREYXRhKClcclxuICAgIH1cclxuICAgIGlmKHRoaXMuZGF0YS5jdXJyZW50VGFiID09ICc0Jykge1xyXG4gICAgICB0aGlzLnNlbGVjdENvbXBvbmVudChcIiNvcmRlci1wYWdlXCIpLmluaXREYXRhKClcclxuICAgIH1cclxuICAgIGlmKHRoaXMuZGF0YS5jdXJyZW50VGFiID09ICc1Jykge1xyXG4gICAgICB0aGlzLnNlbGVjdENvbXBvbmVudChcIiNteS1wYWdlXCIpLmluaXREYXRhKClcclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdfQ==