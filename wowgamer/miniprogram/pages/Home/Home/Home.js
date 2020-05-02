"use strict";
const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        articleList: [],
        carouselList: [],
        notificationList: ['AAA']
    },
    behaviors: [],
    lifetimes: {
        ready() {
            this.getIndexInfo();
        }
    },
    methods: {
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
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBRWhDLFNBQVMsQ0FBQztJQUNSLE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRSxJQUFJO0tBQ3JCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osV0FBVyxFQUFFLEVBQUU7UUFDZixZQUFZLEVBQUUsRUFBRTtRQUNoQixnQkFBZ0IsRUFBRSxDQUFDLEtBQUssQ0FBQztLQUMxQjtJQUVELFNBQVMsRUFBRSxFQUFFO0lBR2IsU0FBUyxFQUFFO1FBQ1QsS0FBSztZQUNILElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxZQUFZO1lBQ1YsR0FBRyxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7b0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1gsWUFBWSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWTt3QkFDbkMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVztxQkFFbEMsQ0FBQyxDQUFBO2lCQUNIO1lBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxHQUFHLEVBQUUsZ0JBQWdCO2FBQ3RCLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXG5cbkNvbXBvbmVudCh7XG4gIG9wdGlvbnM6IHtcbiAgICBhZGRHbG9iYWxDbGFzczogdHJ1ZSxcbiAgfSxcbiAgZGF0YToge1xuICAgIGFydGljbGVMaXN0OiBbXSxcbiAgICBjYXJvdXNlbExpc3Q6IFtdLFxuICAgIG5vdGlmaWNhdGlvbkxpc3Q6IFsnQUFBJ11cbiAgfSxcblxuICBiZWhhdmlvcnM6IFtdLFxuXG5cbiAgbGlmZXRpbWVzOiB7XG4gICAgcmVhZHkoKSB7XG4gICAgICB0aGlzLmdldEluZGV4SW5mbygpO1xuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2V0SW5kZXhJbmZvKCkge1xuICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvc3lzdGVtL2dldEluZGV4SW5mbycsIHt9LCAnR0VUJywgcmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGNhcm91c2VsTGlzdDogcmVzLmRhdGEuY2Fyb3VzZWxMaXN0LFxuICAgICAgICAgICAgYXJ0aWNsZUxpc3Q6IHJlcy5kYXRhLmFydGljbGVMaXN0LFxuICAgICAgICAgICAgLy8gbm90aWZpY2F0aW9uTGlzdDogcmVzLmRhdGEubm90aWZpY2F0aW9uTGlzdFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBuYXZUb015OiBmdW5jdGlvbiAoKSB7XG4gICAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICB1cmw6ICcuLi8uLi9NeS9NeS9NeSdcbiAgICAgIH0pXG4gICAgfSxcbiAgfVxufSkiXX0=