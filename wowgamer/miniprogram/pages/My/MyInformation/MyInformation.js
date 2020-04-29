"use strict";
const app = getApp();
Page({
    data: {
        userId: '',
        userName: ''
    },
    onLoad: function (options) {
        this.setData({
            userId: options.id,
        });
    },
    onShow: function () {
        app.requestFunc('/user/getUserInfo', { userId: this.data.userId }, 'GET', res => {
            console.log(res.data);
            if (res.data.success == true) {
                this.setData({
                    userName: res.data.userInfo.userName
                });
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlJbmZvcm1hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk15SW5mb3JtYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBRWhDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLE1BQU0sRUFBRSxFQUFFO1FBQ1YsUUFBUSxFQUFFLEVBQUU7S0FDYjtJQUNELE1BQU0sRUFBRSxVQUFVLE9BQU87UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRTtTQUNuQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsTUFBTSxFQUFFO1FBQ04sR0FBRyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRTtZQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUTtpQkFDckMsQ0FBQyxDQUFBO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuLy8g6I635Y+W5bqU55So5a6e5L6LXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIHVzZXJJZDogJycsXG4gICAgdXNlck5hbWU6ICcnXG4gIH0sXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdXNlcklkOiBvcHRpb25zLmlkLFxuICAgIH0pXG4gIH0sXG5cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRVc2VySW5mbycsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWR9LCAnR0VUJywgcmVzID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09IHRydWUpIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICB1c2VyTmFtZTogcmVzLmRhdGEudXNlckluZm8udXNlck5hbWVcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG59KVxuIl19