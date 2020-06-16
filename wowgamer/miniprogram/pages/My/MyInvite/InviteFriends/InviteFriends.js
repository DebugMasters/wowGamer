"use strict";
let app = getApp();
Page({
    data: {
        userId: '',
    },
    onLoad: function (options) {
        this.setData({
            userId: options.id,
        });
    },
    onShow: function () {
    },
    getPoster: function (e) {
        wx.navigateTo({
            url: '../InvitePoster/InvitePoster?id=' + this.data.userId,
            success: function (res) { },
            fail: function () { },
            complete: function () { }
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlRnJpZW5kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkludml0ZUZyaWVuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLElBQUksR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBRTlCLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLE1BQU0sRUFBRSxFQUFFO0tBQ1g7SUFDRCxNQUFNLEVBQUUsVUFBVSxPQUFPO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUU7U0FDbkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELE1BQU0sRUFBRTtJQUNSLENBQUM7SUFDRCxTQUFTLEVBQUUsVUFBVSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsa0NBQWtDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQzFELE9BQU8sRUFBRSxVQUFTLEdBQUcsSUFBRyxDQUFDO1lBQ3pCLElBQUksRUFBRSxjQUFhLENBQUM7WUFDcEIsUUFBUSxFQUFFLGNBQWEsQ0FBQztTQUN6QixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8g6I635Y+W5bqU55So5a6e5L6LXHJcbmxldCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgdXNlcklkOiAnJyxcclxuICB9LFxyXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHVzZXJJZDogb3B0aW9ucy5pZCxcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XHJcbiAgfSxcclxuICBnZXRQb3N0ZXI6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgdXJsOiAnLi4vSW52aXRlUG9zdGVyL0ludml0ZVBvc3Rlcj9pZD0nICsgdGhpcy5kYXRhLnVzZXJJZCxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXsgfSxcclxuICAgICAgZmFpbDogZnVuY3Rpb24oKSB7IH0sXHJcbiAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHsgfVxyXG4gICAgfSlcclxuICB9LFxyXG59KVxyXG4iXX0=