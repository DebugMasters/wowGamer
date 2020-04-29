"use strict";
App({
    globalData: {
        URL: 'http://39.100.37.104:8980/warcraft/a/api',
        isAuthorized: false,
        userInfo: undefined
    },
    onLaunch() {
        wx.login({
            success: res => {
                console.log(res.code);
                wx.setStorageSync('logincode', res.code);
            },
        });
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            this.globalData.userInfo = res.userInfo;
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res);
                            }
                        },
                    });
                }
            },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxHQUFHLENBQWE7SUFDZCxVQUFVLEVBQUU7UUFFVixHQUFHLEVBQUUsMENBQTBDO1FBQy9DLFlBQVksRUFBRSxLQUFLO1FBQ25CLFFBQVEsRUFBRSxTQUFTO0tBQ3BCO0lBQ0QsUUFBUTtRQUVOLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDUCxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3JCLEVBQUUsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUUxQyxDQUFDO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDYixJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtvQkFFckMsRUFBRSxDQUFDLFdBQVcsQ0FBQzt3QkFDYixPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7NEJBRWIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQTs0QkFJdkMsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7Z0NBQzlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQTs2QkFDaEM7d0JBQ0gsQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELGtCQUFrQixFQUFFLFVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNO1FBQzdDLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzVDLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFFLEdBQUc7Z0JBQzdCLElBQUksRUFBRSxJQUFJO2dCQUNWLE1BQU0sRUFBRTtvQkFDTixjQUFjLEVBQUUsbUNBQW1DO2lCQUNwRDtnQkFDRCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUM1QixJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ3pCLENBQUMsQ0FBQztRQUVMLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUNELFdBQVcsRUFBRSxVQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNO1FBQ3pELEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDVCxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUUsR0FBRztZQUM3QixJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRTtnQkFDTixjQUFjLEVBQUUsbUNBQW1DO2FBQ3BEO1lBQ0QsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUUsU0FBUztZQUNsQixJQUFJLEVBQUUsTUFBTTtTQUNiLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAudHNcbkFwcDxJQXBwT3B0aW9uPih7XG4gIGdsb2JhbERhdGE6IHtcbiAgICAvLyBVUkw6ICdodHRwOi8vbG9jYWxob3N0Ojg5ODAvd2FyY3JhZnQvYS9hcGknLFxuICAgIFVSTDogJ2h0dHA6Ly8zOS4xMDAuMzcuMTA0Ojg5ODAvd2FyY3JhZnQvYS9hcGknLFxuICAgIGlzQXV0aG9yaXplZDogZmFsc2UsXG4gICAgdXNlckluZm86IHVuZGVmaW5lZFxuICB9LFxuICBvbkxhdW5jaCgpIHtcbiAgICAvLyDnmbvlvZVcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMuY29kZSlcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2xvZ2luY29kZScsIHJlcy5jb2RlKVxuICAgICAgICAvLyDlj5HpgIEgcmVzLmNvZGUg5Yiw5ZCO5Y+w5o2i5Y+WIG9wZW5JZCwgc2Vzc2lvbktleSwgdW5pb25JZFxuICAgICAgfSxcbiAgICB9KVxuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOWPr+S7peebtOaOpeiwg+eUqCBnZXRVc2VySW5mbyDojrflj5blpLTlg4/mmLXnp7DvvIzkuI3kvJrlvLnmoYZcbiAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAvLyDlj6/ku6XlsIYgcmVzIOWPkemAgee7meWQjuWPsOino+eggeWHuiB1bmlvbklkXG4gICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuXG4gICAgICAgICAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXG4gICAgICAgICAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcbiAgICAgICAgICAgICAgaWYgKHRoaXMudXNlckluZm9SZWFkeUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2socmVzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSlcbiAgfSxcbiAgcmVxdWVzdEZ1bmNQcm9taXNlOiBmdW5jdGlvbiAoYXBpLCBkYXRhLCBtZXRob2QpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IHRoaXMuZ2xvYmFsRGF0YS5VUkwgK2FwaSxcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIlxuICAgICAgICB9LFxuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHJlc29sdmUocmVzKSxcbiAgICAgICAgZmFpbDogZXJyID0+IHJlamVjdChlcnIpXG4gICAgICB9KTtcblxuICAgIH0pXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH0sXG4gIHJlcXVlc3RGdW5jOiBmdW5jdGlvbiAoYXBpLCBkYXRhLCBtZXRob2QsIHN1Y2Nlc3NmbiwgZmFpbGZuKSB7XG4gICAgd3gucmVxdWVzdCh7XG4gICAgICB1cmw6IHRoaXMuZ2xvYmFsRGF0YS5VUkwgK2FwaSxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIlxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgc3VjY2Vzczogc3VjY2Vzc2ZuLFxuICAgICAgZmFpbDogZmFpbGZuXG4gICAgfSk7XG4gIH0sXG59KSJdfQ==