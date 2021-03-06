"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("../../../utils/crypto");
const app = getApp();
Page({
    data: {
        userId: '',
        userName: '',
        userImage: '',
        account: '',
        password: '',
        mobile: '',
        showPassword: false,
        accountPassword: '',
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
                    userName: res.data.userInfo.userName,
                    userImage: res.data.userInfo.image,
                    account: res.data.userInfo.gameAccount,
                    password: crypto_1.default.decrypt(res.data.userInfo.gamePassword),
                    mobile: res.data.userInfo.mobile,
                });
            }
        });
    },
    ShowPassword() {
        this.setData({
            showPassword: !this.data.showPassword
        });
    },
    inputPassword(e) {
        this.setData({
            password: e.detail.value
        });
    },
    formSubmit: function (e) {
        let detailData = {
            userId: this.data.userId,
            account: e.detail.value.account,
            password: crypto_1.default.encrypt(e.detail.value.password),
            mobile: e.detail.value.mobile
        };
        app.requestFunc('/user/saveUserInfo', detailData, 'POST', res => {
            console.log(res.data);
            if (res.data.success == true) {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 1000
                });
                wx.navigateBack({
                    delta: 1
                });
            }
            else {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 1000
                });
            }
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlJbmZvcm1hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk15SW5mb3JtYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrREFBMkM7QUFHM0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLEVBQUU7UUFDVixRQUFRLEVBQUUsRUFBRTtRQUNaLFNBQVMsRUFBRSxFQUFFO1FBQ2IsT0FBTyxFQUFFLEVBQUU7UUFDWCxRQUFRLEVBQUUsRUFBRTtRQUNaLE1BQU0sRUFBRSxFQUFFO1FBQ1YsWUFBWSxFQUFFLEtBQUs7UUFDbkIsZUFBZSxFQUFFLEVBQUU7S0FDcEI7SUFDRCxNQUFNLEVBQUUsVUFBVSxPQUFPO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUU7U0FDbkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELE1BQU0sRUFBRTtRQUNOLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7b0JBQ3BDLFNBQVMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO29CQUNsQyxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVztvQkFDdEMsUUFBUSxFQUFFLGdCQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztvQkFDeEQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07aUJBQ2pDLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7U0FDdEMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELGFBQWEsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7U0FDekIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFVBQVUsRUFBRSxVQUFTLENBQU07UUFDekIsSUFBSSxVQUFVLEdBQUc7WUFDZixNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQ3hCLE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQy9CLFFBQVEsRUFBRSxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDakQsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU07U0FDOUIsQ0FBQTtRQUVELEdBQUcsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtnQkFDNUIsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDWCxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO29CQUNuQixJQUFJLEVBQUUsU0FBUztvQkFDZixRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUE7Z0JBQ0YsRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDZCxLQUFLLEVBQUUsQ0FBQztpQkFDVCxDQUFDLENBQUE7YUFDSDtpQkFBTTtnQkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7b0JBQ25CLElBQUksRUFBRSxNQUFNO29CQUNaLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcclxuXHJcbmltcG9ydCBjcnlwdG8gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NyeXB0b1wiO1xyXG5cclxuLy8g6I635Y+W5bqU55So5a6e5L6LXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXHJcblxyXG5QYWdlKHtcclxuICBkYXRhOiB7XHJcbiAgICB1c2VySWQ6ICcnLFxyXG4gICAgdXNlck5hbWU6ICcnLFxyXG4gICAgdXNlckltYWdlOiAnJyxcclxuICAgIGFjY291bnQ6ICcnLFxyXG4gICAgcGFzc3dvcmQ6ICcnLFxyXG4gICAgbW9iaWxlOiAnJyxcclxuICAgIHNob3dQYXNzd29yZDogZmFsc2UsXHJcbiAgICBhY2NvdW50UGFzc3dvcmQ6ICcnLFxyXG4gIH0sXHJcbiAgb25Mb2FkOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgdXNlcklkOiBvcHRpb25zLmlkLFxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcclxuICAgIGFwcC5yZXF1ZXN0RnVuYygnL3VzZXIvZ2V0VXNlckluZm8nLCB7dXNlcklkOiB0aGlzLmRhdGEudXNlcklkfSwgJ0dFVCcsIHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICB1c2VyTmFtZTogcmVzLmRhdGEudXNlckluZm8udXNlck5hbWUsXHJcbiAgICAgICAgICB1c2VySW1hZ2U6IHJlcy5kYXRhLnVzZXJJbmZvLmltYWdlLFxyXG4gICAgICAgICAgYWNjb3VudDogcmVzLmRhdGEudXNlckluZm8uZ2FtZUFjY291bnQsXHJcbiAgICAgICAgICBwYXNzd29yZDogY3J5cHRvLmRlY3J5cHQocmVzLmRhdGEudXNlckluZm8uZ2FtZVBhc3N3b3JkKSxcclxuICAgICAgICAgIG1vYmlsZTogcmVzLmRhdGEudXNlckluZm8ubW9iaWxlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgU2hvd1Bhc3N3b3JkKCkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgc2hvd1Bhc3N3b3JkOiAhdGhpcy5kYXRhLnNob3dQYXNzd29yZFxyXG4gICAgfSlcclxuICB9LFxyXG4gIGlucHV0UGFzc3dvcmQoZSkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgcGFzc3dvcmQ6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGU6IGFueSkge1xyXG4gICAgbGV0IGRldGFpbERhdGEgPSB7XHJcbiAgICAgIHVzZXJJZDogdGhpcy5kYXRhLnVzZXJJZCxcclxuICAgICAgYWNjb3VudDogZS5kZXRhaWwudmFsdWUuYWNjb3VudCxcclxuICAgICAgcGFzc3dvcmQ6IGNyeXB0by5lbmNyeXB0KGUuZGV0YWlsLnZhbHVlLnBhc3N3b3JkKSxcclxuICAgICAgbW9iaWxlOiBlLmRldGFpbC52YWx1ZS5tb2JpbGVcclxuICAgIH1cclxuICAgIFxyXG4gICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9zYXZlVXNlckluZm8nLCBkZXRhaWxEYXRhLCAnUE9TVCcsIHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogcmVzLmRhdGEubXNnLFxyXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICB9KVxyXG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiByZXMuZGF0YS5tc2csXHJcbiAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxufSlcclxuIl19