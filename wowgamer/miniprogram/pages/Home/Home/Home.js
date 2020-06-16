"use strict";
const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        loading: true,
        loadProgress: 0,
        articleList: [],
        carouselList: [],
        notificationList: ['AAA']
    },
    behaviors: [],
    lifetimes: {
        ready() {
        }
    },
    methods: {
        initData() {
            this.setData({
                loading: true,
                loadProgress: 0
            });
            this.loadProgress();
            this.getIndexInfo();
        },
        loadProgress() {
            this.setData({
                loadProgress: this.data.loadProgress + 3
            });
            if (this.data.loadProgress < 98) {
                setTimeout(() => {
                    this.loadProgress();
                }, 300);
            }
            else {
                if (!this.data.loading) {
                    return;
                }
            }
        },
        getIndexInfo() {
            app.requestFunc('/system/getIndexInfo', {}, 'GET', res => {
                console.log(res.data);
                if (res.data.success == true) {
                    this.setData({
                        carouselList: res.data.carouselList,
                        articleList: res.data.articleList,
                        loading: false
                    });
                }
            });
        },
        navToMy: function () {
            this.triggerEvent('switchTab', { tabIndex: '5' });
        },
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBRWhDLFNBQVMsQ0FBQztJQUNSLE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRSxJQUFJO0tBQ3JCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFLElBQUk7UUFDYixZQUFZLEVBQUUsQ0FBQztRQUNmLFdBQVcsRUFBRSxFQUFFO1FBQ2YsWUFBWSxFQUFFLEVBQUU7UUFDaEIsZ0JBQWdCLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDMUI7SUFFRCxTQUFTLEVBQUUsRUFBRTtJQUdiLFNBQVMsRUFBRTtRQUNULEtBQUs7UUFDTCxDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxRQUFRO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxPQUFPLEVBQUUsSUFBSTtnQkFDYixZQUFZLEVBQUUsQ0FBQzthQUNoQixDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFDRCxZQUFZO1lBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQzthQUN6QyxDQUFDLENBQUE7WUFDRixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsRUFBQztnQkFDOUIsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3RCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTthQUNSO2lCQUFNO2dCQUNMLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDckIsT0FBTTtpQkFDUDthQUNGO1FBQ0gsQ0FBQztRQUNELFlBQVk7WUFDVixHQUFHLENBQUMsV0FBVyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtvQkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDWCxZQUFZLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZO3dCQUNuQyxXQUFXLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXO3dCQUVqQyxPQUFPLEVBQUUsS0FBSztxQkFDZixDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXHJcblxyXG5Db21wb25lbnQoe1xyXG4gIG9wdGlvbnM6IHtcclxuICAgIGFkZEdsb2JhbENsYXNzOiB0cnVlLFxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgbG9hZGluZzogdHJ1ZSxcclxuICAgIGxvYWRQcm9ncmVzczogMCxcclxuICAgIGFydGljbGVMaXN0OiBbXSxcclxuICAgIGNhcm91c2VsTGlzdDogW10sXHJcbiAgICBub3RpZmljYXRpb25MaXN0OiBbJ0FBQSddXHJcbiAgfSxcclxuXHJcbiAgYmVoYXZpb3JzOiBbXSxcclxuXHJcblxyXG4gIGxpZmV0aW1lczoge1xyXG4gICAgcmVhZHkoKSB7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbWV0aG9kczoge1xyXG4gICAgaW5pdERhdGEoKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgbG9hZGluZzogdHJ1ZSxcclxuICAgICAgICBsb2FkUHJvZ3Jlc3M6IDBcclxuICAgICAgfSlcclxuICAgICAgdGhpcy5sb2FkUHJvZ3Jlc3MoKTtcclxuICAgICAgdGhpcy5nZXRJbmRleEluZm8oKTtcclxuICAgIH0sXHJcbiAgICBsb2FkUHJvZ3Jlc3MoKXtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBsb2FkUHJvZ3Jlc3M6IHRoaXMuZGF0YS5sb2FkUHJvZ3Jlc3MgKyAzXHJcbiAgICAgIH0pXHJcbiAgICAgIGlmICh0aGlzLmRhdGEubG9hZFByb2dyZXNzIDwgOTgpe1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2FkUHJvZ3Jlc3MoKTtcclxuICAgICAgICB9LCAzMDApXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YS5sb2FkaW5nKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRJbmRleEluZm8oKSB7XHJcbiAgICAgIGFwcC5yZXF1ZXN0RnVuYygnL3N5c3RlbS9nZXRJbmRleEluZm8nLCB7fSwgJ0dFVCcsIHJlcyA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09IHRydWUpIHtcclxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGNhcm91c2VsTGlzdDogcmVzLmRhdGEuY2Fyb3VzZWxMaXN0LFxyXG4gICAgICAgICAgICBhcnRpY2xlTGlzdDogcmVzLmRhdGEuYXJ0aWNsZUxpc3QsXHJcbiAgICAgICAgICAgIC8vIG5vdGlmaWNhdGlvbkxpc3Q6IHJlcy5kYXRhLm5vdGlmaWNhdGlvbkxpc3RcclxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIG5hdlRvTXk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ3N3aXRjaFRhYicsIHt0YWJJbmRleDogJzUnfSk7XHJcbiAgICB9LFxyXG4gIH1cclxufSkiXX0=