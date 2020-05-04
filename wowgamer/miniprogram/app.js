"use strict";
App({
    globalData: {
        URL: 'http://192.168.9.37:8980/warcraft/a/api',
        isAuthorized: false,
        userInfo: undefined,
        StatusBar: 0,
        Custom: 0,
        CustomBar: 0,
        WindowHeight: 0,
        ScreenHeight: 0
    },
    onLaunch: function () {
        const userInfo = wx.getStorageSync('userInfo');
        if (userInfo != '') {
            this.globalData.userInfo = userInfo;
        }
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let custom = wx.getMenuButtonBoundingClientRect();
                this.globalData.Custom = custom;
                this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
                this.globalData.WindowHeight = e.windowHeight;
                this.globalData.ScreenHeight = e.screenHeight;
            }
        });
    },
    requestFuncPromise: function (api, data, method) {
        var promise = new Promise((resolve, reject) => {
            wx.request({
                url: this.globalData.URL + api,
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: method,
                success: res => resolve(res),
                fail: err => reject(err)
            });
        });
        return promise;
    },
    requestFunc: function (api, data, method, successfn, failfn) {
        wx.request({
            url: this.globalData.URL + api,
            data: data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: method,
            success: successfn,
            fail: failfn
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxHQUFHLENBQWE7SUFDZCxVQUFVLEVBQUU7UUFDVixHQUFHLEVBQUUseUNBQXlDO1FBRzlDLFlBQVksRUFBRSxLQUFLO1FBQ25CLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFNBQVMsRUFBRSxDQUFDO1FBQ1osTUFBTSxFQUFFLENBQUM7UUFDVCxTQUFTLEVBQUUsQ0FBQztRQUNaLFlBQVksRUFBRSxDQUFDO1FBQ2YsWUFBWSxFQUFFLENBQUM7S0FDaEI7SUFDRCxRQUFRLEVBQUU7UUFFUixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLElBQUcsUUFBUSxJQUFJLEVBQUUsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7U0FDcEM7UUFDRCxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQ2YsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUM7Z0JBQzlDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQywrQkFBK0IsRUFBRSxDQUFDO2dCQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDO2dCQUMzRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDO2dCQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDO1lBQ2hELENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0Qsa0JBQWtCLEVBQUUsVUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU07UUFDN0MsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDNUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUUsR0FBRztnQkFDN0IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsTUFBTSxFQUFFO29CQUNOLGNBQWMsRUFBRSxtQ0FBbUM7aUJBQ3BEO2dCQUNELE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQzVCLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDekIsQ0FBQyxDQUFDO1FBRUwsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBQ0QsV0FBVyxFQUFFLFVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU07UUFDekQsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNULEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRSxHQUFHO1lBQzdCLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFO2dCQUNOLGNBQWMsRUFBRSxtQ0FBbUM7YUFDcEQ7WUFDRCxNQUFNLEVBQUUsTUFBTTtZQUNkLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC50c1xuQXBwPElBcHBPcHRpb24+KHtcbiAgZ2xvYmFsRGF0YToge1xuICAgIFVSTDogJ2h0dHA6Ly8xOTIuMTY4LjkuMzc6ODk4MC93YXJjcmFmdC9hL2FwaScsXG4gICAgLy8gVVJMOiAnaHR0cDovL2xvY2FsaG9zdDo4OTgwL3dhcmNyYWZ0L2EvYXBpJyxcbiAgICAvLyBVUkw6ICdodHRwOi8vMzkuMTAwLjM3LjEwNDo4OTgwL3dhcmNyYWZ0L2EvYXBpJyxcbiAgICBpc0F1dGhvcml6ZWQ6IGZhbHNlLFxuICAgIHVzZXJJbmZvOiB1bmRlZmluZWQsXG4gICAgU3RhdHVzQmFyOiAwLFxuICAgIEN1c3RvbTogMCxcbiAgICBDdXN0b21CYXI6IDAsXG4gICAgV2luZG93SGVpZ2h0OiAwLFxuICAgIFNjcmVlbkhlaWdodDogMFxuICB9LFxuICBvbkxhdW5jaDogZnVuY3Rpb24gKCkge1xuICAgIC8vIOeZu+W9lVxuICAgIGNvbnN0IHVzZXJJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJyk7XG4gICAgaWYodXNlckluZm8gIT0gJycpIHtcbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHVzZXJJbmZvXG4gICAgfVxuICAgIHd4LmdldFN5c3RlbUluZm8oe1xuICAgICAgc3VjY2VzczogZSA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5TdGF0dXNCYXIgPSBlLnN0YXR1c0JhckhlaWdodDtcbiAgICAgICAgbGV0IGN1c3RvbSA9IHd4LmdldE1lbnVCdXR0b25Cb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLkN1c3RvbSA9IGN1c3RvbTsgIFxuICAgICAgICB0aGlzLmdsb2JhbERhdGEuQ3VzdG9tQmFyID0gY3VzdG9tLmJvdHRvbSArIGN1c3RvbS50b3AgLSBlLnN0YXR1c0JhckhlaWdodDtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLldpbmRvd0hlaWdodCA9IGUud2luZG93SGVpZ2h0O1xuICAgICAgICB0aGlzLmdsb2JhbERhdGEuU2NyZWVuSGVpZ2h0ID0gZS5zY3JlZW5IZWlnaHQ7XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgcmVxdWVzdEZ1bmNQcm9taXNlOiBmdW5jdGlvbiAoYXBpLCBkYXRhLCBtZXRob2QpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IHRoaXMuZ2xvYmFsRGF0YS5VUkwgK2FwaSxcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIlxuICAgICAgICB9LFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHJlc29sdmUocmVzKSxcbiAgICAgICAgZmFpbDogZXJyID0+IHJlamVjdChlcnIpXG4gICAgICB9KTtcblxuICAgIH0pXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH0sXG4gIHJlcXVlc3RGdW5jOiBmdW5jdGlvbiAoYXBpLCBkYXRhLCBtZXRob2QsIHN1Y2Nlc3NmbiwgZmFpbGZuKSB7XG4gICAgd3gucmVxdWVzdCh7XG4gICAgICB1cmw6IHRoaXMuZ2xvYmFsRGF0YS5VUkwgK2FwaSxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIlxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgc3VjY2Vzczogc3VjY2Vzc2ZuLFxuICAgICAgZmFpbDogZmFpbGZuXG4gICAgfSk7XG4gIH0sXG59KSJdfQ==