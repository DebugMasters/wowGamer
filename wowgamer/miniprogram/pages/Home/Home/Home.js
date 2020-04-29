"use strict";
const app = getApp();
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        showAuthorizedWindow: true,
        articleList: [],
        carouselList: [],
        notificationList: ['AAA']
    },
    onLoad: function (options) {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
            });
        }
        else if (this.data.canIUse) {
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                });
                if (this.data.hasUserInfo && this.data.canIUse) {
                    this.setData({
                        showAuthorizedWindow: false
                    });
                    this.getIndexInfo();
                }
            };
        }
        else {
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo;
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,
                    });
                },
            });
        }
        if (this.data.hasUserInfo && this.data.canIUse) {
            this.setData({
                showAuthorizedWindow: false
            });
        }
    },
    getIndexInfo() {
        app.requestFunc('/system/getIndexInfo', {}, 'GET', res => {
            console.log(res.data);
            if (res.data.success == true) {
                this.setData({
                    carouselList: res.data.carouselList,
                    articleList: res.data.articleList,
                });
            }
        });
    },
    navToMy: function () {
        wx.switchTab({
            url: '../../My/My/My'
        });
    },
    getUserInfo(e) {
        const _this = this;
        console.log(e);
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
        });
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
                        wx.setStorageSync('id', result.data.userId);
                        console.log(wx.getStorageSync('id'));
                        _this.setData({
                            showAuthorizedWindow: false
                        });
                        _this.getIndexInfo();
                    }
                });
            }
        });
    },
    hideAuthorizedWindow: function () {
        this.setData({
            showAuthorizedWindow: false
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBRWhDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFDbkQsb0JBQW9CLEVBQUUsSUFBSTtRQUMxQixXQUFXLEVBQUUsRUFBRTtRQUNmLFlBQVksRUFBRSxFQUFFO1FBQ2hCLGdCQUFnQixFQUFFLENBQUMsS0FBSyxDQUFDO0tBQzFCO0lBS0QsTUFBTSxFQUFFLFVBQVUsT0FBTztRQUN2QixJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUTtnQkFDakMsV0FBVyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFBO1NBQ0g7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBRzVCLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxHQUFHLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7b0JBQ3RCLFdBQVcsRUFBRSxJQUFJO2lCQUNsQixDQUFDLENBQUE7Z0JBQ0YsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQztvQkFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDWCxvQkFBb0IsRUFBRSxLQUFLO3FCQUM1QixDQUFDLENBQUE7b0JBQ0YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNyQjtZQUNILENBQUMsQ0FBQTtTQUNGO2FBQU07WUFFTCxFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUNiLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtvQkFDYixHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBO29CQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNYLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTt3QkFDdEIsV0FBVyxFQUFFLElBQUk7cUJBQ2xCLENBQUMsQ0FBQTtnQkFDSixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1NBQ0g7UUFDRCxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDO1lBQzVDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsb0JBQW9CLEVBQUUsS0FBSzthQUM1QixDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7SUFFRCxZQUFZO1FBQ1YsR0FBRyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO2dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLFlBQVksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVk7b0JBQ25DLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVc7aUJBRWxDLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsT0FBTyxFQUFFO1FBQ1AsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNYLEdBQUcsRUFBRSxnQkFBZ0I7U0FDdEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFdBQVcsQ0FBQyxDQUFNO1FBQ2hCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2QsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDM0IsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNQLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNULEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRSxhQUFhO29CQUN0QyxJQUFJLEVBQUU7d0JBQ0osSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO3dCQUNkLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTO3dCQUNsQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUTtxQkFDckM7b0JBQ0QsTUFBTSxFQUFFO3dCQUNOLGNBQWMsRUFBRSxtQ0FBbUM7cUJBQ3BEO29CQUNELE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8sRUFBRSxVQUFTLE1BQU07d0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN6QixFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDckMsS0FBSyxDQUFDLE9BQU8sQ0FBQzs0QkFDWixvQkFBb0IsRUFBRSxLQUFLO3lCQUM1QixDQUFDLENBQUE7d0JBQ0YsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN2QixDQUFDO2lCQUNGLENBQUMsQ0FBQztZQUNMLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0Qsb0JBQW9CLEVBQUU7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLG9CQUFvQixFQUFFLEtBQUs7U0FDNUIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG4vLyDojrflj5blupTnlKjlrp7kvotcbmNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgdXNlckluZm86IHt9LFxuICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcbiAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXG4gICAgc2hvd0F1dGhvcml6ZWRXaW5kb3c6IHRydWUsXG4gICAgYXJ0aWNsZUxpc3Q6IFtdLFxuICAgIGNhcm91c2VsTGlzdDogW10sXG4gICAgbm90aWZpY2F0aW9uTGlzdDogWydBQUEnXVxuICB9LFxuICBcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB1c2VySW5mbzogYXBwLmdsb2JhbERhdGEudXNlckluZm8sXG4gICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jYW5JVXNlKSB7XG4gICAgICAvLyDnlLHkuo4gZ2V0VXNlckluZm8g5piv572R57uc6K+35rGC77yM5Y+v6IO95Lya5ZyoIFBhZ2Uub25Mb2FkIOS5i+WQjuaJjei/lOWbnlxuICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxuICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IHJlcyA9PiB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcbiAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgICAgaWYodGhpcy5kYXRhLmhhc1VzZXJJbmZvICYmIHRoaXMuZGF0YS5jYW5JVXNlKXtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgc2hvd0F1dGhvcml6ZWRXaW5kb3c6IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmdldEluZGV4SW5mbygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOWcqOayoeaciSBvcGVuLXR5cGU9Z2V0VXNlckluZm8g54mI5pys55qE5YW85a655aSE55CGXG4gICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcbiAgICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH1cbiAgICBpZih0aGlzLmRhdGEuaGFzVXNlckluZm8gJiYgdGhpcy5kYXRhLmNhbklVc2Upe1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgc2hvd0F1dGhvcml6ZWRXaW5kb3c6IGZhbHNlXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgXG4gIGdldEluZGV4SW5mbygpIHtcbiAgICBhcHAucmVxdWVzdEZ1bmMoJy9zeXN0ZW0vZ2V0SW5kZXhJbmZvJywge30sICdHRVQnLCByZXMgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGNhcm91c2VsTGlzdDogcmVzLmRhdGEuY2Fyb3VzZWxMaXN0LFxuICAgICAgICAgIGFydGljbGVMaXN0OiByZXMuZGF0YS5hcnRpY2xlTGlzdCxcbiAgICAgICAgICAvLyBub3RpZmljYXRpb25MaXN0OiByZXMuZGF0YS5ub3RpZmljYXRpb25MaXN0XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICBuYXZUb015OiBmdW5jdGlvbiAoKSB7XG4gICAgd3guc3dpdGNoVGFiKHtcbiAgICAgIHVybDogJy4uLy4uL015L015L015J1xuICAgIH0pXG4gIH0sXG4gIGdldFVzZXJJbmZvKGU6IGFueSkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICBjb25zb2xlLmxvZyhlKVxuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxuICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgfSlcblxuICAgIHd4LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuVVJMICsnL3VzZXIvbG9naW4nLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGNvZGU6IHJlcy5jb2RlLFxuICAgICAgICAgICAgaW1hZ2U6IGUuZGV0YWlsLnVzZXJJbmZvLmF2YXRhclVybCwgXG4gICAgICAgICAgICB1c2VyTmFtZTogZS5kZXRhaWwudXNlckluZm8ubmlja05hbWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2lkJywgcmVzdWx0LmRhdGEudXNlcklkKTsgLy/nlKjmiLfllK/kuIDmoIfor4ZcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHd4LmdldFN0b3JhZ2VTeW5jKCdpZCcpKTtcbiAgICAgICAgICAgIF90aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICBzaG93QXV0aG9yaXplZFdpbmRvdzogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBfdGhpcy5nZXRJbmRleEluZm8oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGhpZGVBdXRob3JpemVkV2luZG93OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHNob3dBdXRob3JpemVkV2luZG93OiBmYWxzZVxuICAgIH0pXG4gIH1cbn0pXG4iXX0=