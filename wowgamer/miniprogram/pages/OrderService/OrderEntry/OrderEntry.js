"use strict";
const app = getApp();
Page({
    data: {
        mode: '',
        userId: '',
        orderId: '',
        characterName: '',
        RealmType: 1,
        characterId: '',
        serverName: '',
        showPassword: false,
        accountName: '',
        accountPassword: '',
        phoneNumber: '',
        hasGuard: 1,
        orderCatalog: '',
        orderCatalog1: '',
        orderCatalog2: '',
        orderCatalog3: '',
        money: 0,
        specializations: new Array(),
        note: '',
        orderStatus: 9,
        coupons: new Array(),
        couponIndex: -1
    },
    onLoad(options) {
        const data = JSON.parse(options.data);
        if (data.mode == 'AddNew') {
            this.setData({
                mode: data.mode,
                userId: wx.getStorageSync('userId'),
                orderCatalog: data.orderCatalog,
                orderCatalog1: data.orderCatalog1,
                orderCatalog2: data.orderCatalog2,
                orderCatalog3: data.orderCatalog3,
                money: data.money,
                characterId: data.characterId
            });
        }
        if (data.mode == 'Detail') {
            this.setData({
                mode: data.mode,
                userId: data.userId,
                orderId: data.orderId
            });
        }
    },
    onShow() {
        const _this = this;
        if (this.data.mode == 'AddNew') {
            app.requestFuncPromise('/user/getCharacter', { characterId: this.data.characterId }, 'GET')
                .then(res => {
                if (parseInt(res.data.data.realmType) == 1) {
                    this.setData({
                        RealmType: parseInt(res.data.data.realmType),
                        characterName: res.data.data.characterName + '/' + res.data.data.accountName,
                        serverName: '正式服/' + res.data.data.realmZoneName + '/' + res.data.data.realmName
                    });
                }
                if (parseInt(res.data.data.realmType) == 2) {
                    this.setData({
                        RealmType: parseInt(res.data.data.realmType),
                        characterName: res.data.data.characterName + '/' + res.data.data.accountName,
                        serverName: '怀旧服' + res.data.data.realmZoneName + '/' + res.data.data.realmName
                    });
                }
                res.data.data.characterSpecialization.split('#').forEach(x => {
                    let temp = x.split(':');
                    let data = {
                        specializations: _this.data.specializations
                    };
                    if (parseInt(temp[1]) > 0) {
                        data.specializations.push({ name: temp[0], value: parseInt(temp[1]) });
                    }
                    this.setData(data);
                });
            })
                .catch(res => {
                console.log(res);
            });
            this.getAvailableCoupon();
        }
        if (this.data.mode == 'Detail') {
            app.requestFuncPromise('/order/orderDetail', { userId: this.data.userId, orderId: this.data.orderId }, 'GET')
                .then((res) => {
                this.setData({
                    characterName: res.data.data.characterInfo,
                    serverName: res.data.data.characterRealm,
                    accountName: res.data.data.accountId,
                    orderCatalog: res.data.data.orderCatalog,
                    phoneNumber: res.data.data.phone,
                    money: res.data.data.orderMoney,
                    hasGuard: res.data.data.saveguard,
                    note: res.data.data.note,
                    orderStatus: res.data.data.orderStatus
                }),
                    res.data.data.characterSpec.split('#').forEach(x => {
                        let temp = x.split(':');
                        let data = {
                            specializations: _this.data.specializations
                        };
                        data.specializations.push({ name: temp[0], value: parseInt(temp[1]) });
                        this.setData(data);
                    });
                if (res.data.data.orderStatus == 0) {
                    this.getAvailableCoupon();
                }
            })
                .catch((err) => {
            });
        }
    },
    inputNote(e) {
        this.setData({
            note: e.detail.value
        });
    },
    inputAccountName(e) {
        this.setData({
            accountName: e.detail.value
        });
    },
    ShowPassword() {
        this.setData({
            showPassword: !this.data.showPassword
        });
    },
    inputPassword(e) {
        this.setData({
            accountPassword: e.detail.value
        });
    },
    inputPhoneNumber(e) {
        this.setData({
            phoneNumber: e.detail.value
        });
    },
    changeGuard(e) {
        this.setData({
            hasGuard: e.detail.value
        });
    },
    getAvailableCoupon() {
        app.requestFuncPromise('/order/availableCoupon', { userId: this.data.userId }, 'GET')
            .then((res) => {
            this.setData({
                coupons: res.data.couponList
            });
        });
    },
    formSubmit(e) {
        const _this = this;
        let specString = '';
        let checkValid = true;
        this.data.specializations.every(x => {
            if ((!isNaN(x.value) && x.value > 0)) {
                specString += x.name + ':' + x.value.toString() + '#';
                return true;
            }
            else {
                if (!isNaN(x.value) && x.value <= 0) {
                    wx.showToast({
                        title: '专精等级必须大于0',
                        icon: 'none',
                        duration: 1000
                    });
                    checkValid = false;
                    return false;
                }
                else {
                    wx.showToast({
                        title: '请输入专精等级',
                        icon: 'none',
                        duration: 1000
                    });
                }
                checkValid = false;
                return false;
            }
        });
        if (!checkValid) {
            return;
        }
        specString = specString.substring(0, specString.length - 1);
        let detailData = {
            userId: this.data.userId,
            orderType: 1,
            orderServer: this.data.RealmType,
            orderCatalog: this.data.orderCatalog,
            orderCatalog1: this.data.orderCatalog1,
            orderCatalog2: this.data.orderCatalog2,
            orderCatalog3: this.data.orderCatalog3,
            orderMoney: this.data.money,
            characterId: this.data.characterId,
            characterInfo: this.data.characterName,
            characterRealm: this.data.serverName,
            characterSpec: specString,
            accountId: e.detail.value.accountName,
            accountPassword: e.detail.value.accountPassword,
            saveguard: this.data.hasGuard,
            phone: e.detail.value.phoneNumber,
            note: e.detail.value.note,
            remoteAddr: '192.168.1.2'
        };
        if (detailData.accountId == "") {
            wx.showToast({
                title: '请输入账号',
                icon: 'none',
                duration: 1000
            });
            return;
        }
        if (detailData.accountPassword == "") {
            wx.showToast({
                title: '请输入密码',
                icon: 'none',
                duration: 1000
            });
            return;
        }
        if (detailData.phone == "") {
            wx.showToast({
                title: '请输入手机号码',
                icon: 'none',
                duration: 1000
            });
            return;
        }
        app.requestFunc('/order/saveOrder', detailData, 'POST', res => {
            console.log(res.data);
            if (res.data.success == true) {
                if (res.data.payInfo) {
                    wx.requestPayment({
                        'timeStamp': res.data.payInfo.timeStamp.toString(),
                        'nonceStr': res.data.payInfo.nonceStr,
                        'package': res.data.payInfo.package,
                        'signType': res.data.payInfo.signType,
                        'paySign': res.data.payInfo.sign,
                        success: function (res) {
                            console.log(res);
                            wx.showToast({
                                title: '支付成功',
                                icon: 'none',
                                duration: 1500
                            });
                            wx.navigateBack({
                                delta: 1
                            });
                        },
                        fail: function (res) {
                            console.log(res);
                            wx.showToast({
                                title: '支付失败',
                                icon: 'none',
                                duration: 1500
                            });
                            _this.setData({
                                mode: 'Detail'
                            });
                            _this.onShow();
                        }
                    });
                }
                else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1000
                    });
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJFbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk9yZGVyRW50cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBRWhDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxFQUFFO1FBQ1IsTUFBTSxFQUFFLEVBQUU7UUFDVixPQUFPLEVBQUUsRUFBRTtRQUNYLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLFNBQVMsRUFBRSxDQUFDO1FBQ1osV0FBVyxFQUFFLEVBQUU7UUFDZixVQUFVLEVBQUUsRUFBRTtRQUNkLFlBQVksRUFBRSxLQUFLO1FBQ25CLFdBQVcsRUFBRSxFQUFFO1FBQ2YsZUFBZSxFQUFFLEVBQUU7UUFDbkIsV0FBVyxFQUFFLEVBQUU7UUFDZixRQUFRLEVBQUUsQ0FBQztRQUNYLFlBQVksRUFBRSxFQUFFO1FBQ2hCLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLEtBQUssRUFBRSxDQUFDO1FBQ1IsZUFBZSxFQUFFLElBQUksS0FBSyxFQUFpQztRQUMzRCxJQUFJLEVBQUUsRUFBRTtRQUNSLFdBQVcsRUFBRSxDQUFDO1FBQ2QsT0FBTyxFQUFFLElBQUksS0FBSyxFQUFFO1FBQ3BCLFdBQVcsRUFBRSxDQUFDLENBQUM7S0FDaEI7SUFDRCxNQUFNLENBQUMsT0FBTztRQUNaLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQVMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsTUFBTSxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO2dCQUNuQyxZQUFZLEVBQUUsSUFB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QkFDSCxFQUFFLENBQUMsWUFBWSxDQUFDO2dDQUNkLEtBQUssRUFBRSxDQUFDOzZCQUNULENBQUMsQ0FBQTt3QkFDSixDQUFDO3dCQUNELElBQUksRUFBRSxVQUFVLEdBQUc7NEJBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2pCLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLE1BQU07Z0NBQ2IsSUFBSSxFQUFFLE1BQU07Z0NBQ1osUUFBUSxFQUFFLElBQUk7NkJBQ2YsQ0FBQyxDQUFDOzRCQUNILEtBQUssQ0FBQyxPQUFPLENBQUM7Z0NBQ1osSUFBSSxFQUFFLFFBQVE7NkJBQ2YsQ0FBQyxDQUFBOzRCQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDakIsQ0FBQztxQkFDRixDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQzt3QkFDWCxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO3dCQUNuQixJQUFJLEVBQUUsTUFBTTt3QkFDWixRQUFRLEVBQUUsSUFBSTtxQkFDZixDQUFDLENBQUE7aUJBQ0g7YUFDRjtpQkFBTTtnQkFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7b0JBQ25CLElBQUksRUFBRSxNQUFNO29CQUNaLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8g6I635Y+W5bqU55So5a6e5L6LXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIG1vZGU6ICcnLFxuICAgIHVzZXJJZDogJycsXG4gICAgb3JkZXJJZDogJycsXG4gICAgY2hhcmFjdGVyTmFtZTogJycsXG4gICAgUmVhbG1UeXBlOiAxLFxuICAgIGNoYXJhY3RlcklkOiAnJyxcbiAgICBzZXJ2ZXJOYW1lOiAnJyxcbiAgICBzaG93UGFzc3dvcmQ6IGZhbHNlLFxuICAgIGFjY291bnROYW1lOiAnJyxcbiAgICBhY2NvdW50UGFzc3dvcmQ6ICcnLFxuICAgIHBob25lTnVtYmVyOiAnJyxcbiAgICBoYXNHdWFyZDogMSxcbiAgICBvcmRlckNhdGFsb2c6ICcnLFxuICAgIG9yZGVyQ2F0YWxvZzE6ICcnLFxuICAgIG9yZGVyQ2F0YWxvZzI6ICcnLFxuICAgIG9yZGVyQ2F0YWxvZzM6ICcnLFxuICAgIG1vbmV5OiAwLFxuICAgIHNwZWNpYWxpemF0aW9uczogbmV3IEFycmF5PHtuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXJ9PigpLFxuICAgIG5vdGU6ICcnLFxuICAgIG9yZGVyU3RhdHVzOiA5LFxuICAgIGNvdXBvbnM6IG5ldyBBcnJheSgpLFxuICAgIGNvdXBvbkluZGV4OiAtMVxuICB9LFxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKDxzdHJpbmc+b3B0aW9ucy5kYXRhKTtcbiAgICBpZihkYXRhLm1vZGUgPT0gJ0FkZE5ldycpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIG1vZGU6IGRhdGEubW9kZSxcbiAgICAgICAgdXNlcklkOiB3eC5nZXRTdG9yYWdlU3luYygndXNlcklkJyksXG4gICAgICAgIG9yZGVyQ2F0YWxvZzogZGF0YS5vcmRlckNhdGFsb2csXG4gICAgICAgIG9yZGVyQ2F0YWxvZzE6IGRhdGEub3JkZXJDYXRhbG9nMSxcbiAgICAgICAgb3JkZXJDYXRhbG9nMjogZGF0YS5vcmRlckNhdGFsb2cyLFxuICAgICAgICBvcmRlckNhdGFsb2czOiBkYXRhLm9yZGVyQ2F0YWxvZzMsXG4gICAgICAgIG1vbmV5OiBkYXRhLm1vbmV5LFxuICAgICAgICBjaGFyYWN0ZXJJZDogZGF0YS5jaGFyYWN0ZXJJZFxuICAgICAgfSkgXG4gICAgfVxuICAgIGlmKGRhdGEubW9kZSA9PSAnRGV0YWlsJykge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgbW9kZTogZGF0YS5tb2RlLFxuICAgICAgICB1c2VySWQ6IGRhdGEudXNlcklkLFxuICAgICAgICBvcmRlcklkOiBkYXRhLm9yZGVySWRcbiAgICAgIH0pIFxuICAgIH1cbiAgfSxcbiAgb25TaG93KCkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpc1xuICAgIGlmKHRoaXMuZGF0YS5tb2RlID09ICdBZGROZXcnKSB7XG4gICAgICBhcHAucmVxdWVzdEZ1bmNQcm9taXNlKCcvdXNlci9nZXRDaGFyYWN0ZXInLCB7Y2hhcmFjdGVySWQ6IHRoaXMuZGF0YS5jaGFyYWN0ZXJJZH0sICdHRVQnKVxuICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYocGFyc2VJbnQocmVzLmRhdGEuZGF0YS5yZWFsbVR5cGUpID09IDEpIHtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgUmVhbG1UeXBlOiBwYXJzZUludChyZXMuZGF0YS5kYXRhLnJlYWxtVHlwZSksXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lOiByZXMuZGF0YS5kYXRhLmNoYXJhY3Rlck5hbWUgKyAnLycgKyByZXMuZGF0YS5kYXRhLmFjY291bnROYW1lLFxuICAgICAgICAgICAgc2VydmVyTmFtZTogJ+ato+W8j+acjS8nICsgcmVzLmRhdGEuZGF0YS5yZWFsbVpvbmVOYW1lICsgJy8nICsgcmVzLmRhdGEuZGF0YS5yZWFsbU5hbWVcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmKHBhcnNlSW50KHJlcy5kYXRhLmRhdGEucmVhbG1UeXBlKSA9PSAyKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIFJlYWxtVHlwZTogcGFyc2VJbnQocmVzLmRhdGEuZGF0YS5yZWFsbVR5cGUpLFxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZTogcmVzLmRhdGEuZGF0YS5jaGFyYWN0ZXJOYW1lICsgJy8nICsgcmVzLmRhdGEuZGF0YS5hY2NvdW50TmFtZSxcbiAgICAgICAgICAgIHNlcnZlck5hbWU6ICfmgIDml6fmnI0nICsgcmVzLmRhdGEuZGF0YS5yZWFsbVpvbmVOYW1lICsgJy8nICsgcmVzLmRhdGEuZGF0YS5yZWFsbU5hbWVcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJlcy5kYXRhLmRhdGEuY2hhcmFjdGVyU3BlY2lhbGl6YXRpb24uc3BsaXQoJyMnKS5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGxldCB0ZW1wID0geC5zcGxpdCgnOicpO1xuICAgICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgc3BlY2lhbGl6YXRpb25zIDogX3RoaXMuZGF0YS5zcGVjaWFsaXphdGlvbnNcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmKHBhcnNlSW50KHRlbXBbMV0pID4gMCkge1xuICAgICAgICAgICAgZGF0YS5zcGVjaWFsaXphdGlvbnMucHVzaCh7bmFtZTogdGVtcFswXSwgdmFsdWU6IHBhcnNlSW50KHRlbXBbMV0pfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICB9KVxuICAgICAgdGhpcy5nZXRBdmFpbGFibGVDb3Vwb24oKTtcbiAgICB9XG4gICAgaWYodGhpcy5kYXRhLm1vZGUgPT0gJ0RldGFpbCcpIHtcbiAgICAgIGFwcC5yZXF1ZXN0RnVuY1Byb21pc2UoJy9vcmRlci9vcmRlckRldGFpbCcsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWQsIG9yZGVySWQ6IHRoaXMuZGF0YS5vcmRlcklkfSwgJ0dFVCcpXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgY2hhcmFjdGVyTmFtZTogcmVzLmRhdGEuZGF0YS5jaGFyYWN0ZXJJbmZvLFxuICAgICAgICAgIHNlcnZlck5hbWU6IHJlcy5kYXRhLmRhdGEuY2hhcmFjdGVyUmVhbG0sXG4gICAgICAgICAgYWNjb3VudE5hbWU6IHJlcy5kYXRhLmRhdGEuYWNjb3VudElkLFxuICAgICAgICAgIG9yZGVyQ2F0YWxvZzogcmVzLmRhdGEuZGF0YS5vcmRlckNhdGFsb2csXG4gICAgICAgICAgcGhvbmVOdW1iZXI6IHJlcy5kYXRhLmRhdGEucGhvbmUsXG4gICAgICAgICAgbW9uZXk6IHJlcy5kYXRhLmRhdGEub3JkZXJNb25leSxcbiAgICAgICAgICBoYXNHdWFyZDogcmVzLmRhdGEuZGF0YS5zYXZlZ3VhcmQsXG4gICAgICAgICAgbm90ZTogcmVzLmRhdGEuZGF0YS5ub3RlLFxuICAgICAgICAgIG9yZGVyU3RhdHVzOiByZXMuZGF0YS5kYXRhLm9yZGVyU3RhdHVzXG4gICAgICAgIH0pLFxuICAgICAgICByZXMuZGF0YS5kYXRhLmNoYXJhY3RlclNwZWMuc3BsaXQoJyMnKS5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgIGxldCB0ZW1wID0geC5zcGxpdCgnOicpO1xuICAgICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgc3BlY2lhbGl6YXRpb25zIDogX3RoaXMuZGF0YS5zcGVjaWFsaXphdGlvbnNcbiAgICAgICAgICB9O1xuICAgICAgICAgIGRhdGEuc3BlY2lhbGl6YXRpb25zLnB1c2goe25hbWU6IHRlbXBbMF0sIHZhbHVlOiBwYXJzZUludCh0ZW1wWzFdKX0pO1xuICAgICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChyZXMuZGF0YS5kYXRhLm9yZGVyU3RhdHVzID09IDApIHtcbiAgICAgICAgICB0aGlzLmdldEF2YWlsYWJsZUNvdXBvbigpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIGlucHV0Tm90ZShlOiBhbnkpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbm90ZTogZS5kZXRhaWwudmFsdWVcbiAgICB9KVxuICB9LFxuICBpbnB1dEFjY291bnROYW1lKGUpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgYWNjb3VudE5hbWU6IGUuZGV0YWlsLnZhbHVlXG4gICAgfSlcbiAgfSxcbiAgU2hvd1Bhc3N3b3JkKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBzaG93UGFzc3dvcmQ6ICF0aGlzLmRhdGEuc2hvd1Bhc3N3b3JkXG4gICAgfSlcbiAgfSxcbiAgaW5wdXRQYXNzd29yZChlKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGFjY291bnRQYXNzd29yZDogZS5kZXRhaWwudmFsdWVcbiAgICB9KVxuICB9LFxuICBpbnB1dFBob25lTnVtYmVyKGUpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgcGhvbmVOdW1iZXI6IGUuZGV0YWlsLnZhbHVlXG4gICAgfSlcbiAgfSxcbiAgY2hhbmdlR3VhcmQoZSkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBoYXNHdWFyZDogZS5kZXRhaWwudmFsdWVcbiAgICB9KVxuICB9LFxuICBnZXRBdmFpbGFibGVDb3Vwb24oKSB7XG4gICAgYXBwLnJlcXVlc3RGdW5jUHJvbWlzZSgnL29yZGVyL2F2YWlsYWJsZUNvdXBvbicsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWR9LCAnR0VUJylcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBjb3Vwb25zOiByZXMuZGF0YS5jb3Vwb25MaXN0XG4gICAgICB9KVxuICAgIH0pO1xuICB9LFxuXG4gIGZvcm1TdWJtaXQoZSkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICBsZXQgc3BlY1N0cmluZyA9ICcnO1xuICAgIGxldCBjaGVja1ZhbGlkID0gdHJ1ZTtcbiAgICB0aGlzLmRhdGEuc3BlY2lhbGl6YXRpb25zLmV2ZXJ5KHggPT4ge1xuICAgICAgaWYgKCghaXNOYU4oeC52YWx1ZSkgJiYgeC52YWx1ZSA+IDApKSB7XG4gICAgICAgIHNwZWNTdHJpbmcgKz0geC5uYW1lICsgJzonICsgeC52YWx1ZS50b1N0cmluZygpICsgJyMnXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFpc05hTih4LnZhbHVlKSAmJiB4LnZhbHVlIDw9IDApIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfkuJPnsr7nrYnnuqflv4XpobvlpKfkuo4wJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY2hlY2tWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXkuJPnsr7nrYnnuqcnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjaGVja1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZighY2hlY2tWYWxpZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzcGVjU3RyaW5nID0gc3BlY1N0cmluZy5zdWJzdHJpbmcoMCwgc3BlY1N0cmluZy5sZW5ndGggLSAxKTtcblxuICAgIGxldCBkZXRhaWxEYXRhID0ge1xuICAgICAgdXNlcklkOiB0aGlzLmRhdGEudXNlcklkLFxuICAgICAgb3JkZXJUeXBlOiAxLFxuICAgICAgb3JkZXJTZXJ2ZXI6IHRoaXMuZGF0YS5SZWFsbVR5cGUsXG4gICAgICBvcmRlckNhdGFsb2c6IHRoaXMuZGF0YS5vcmRlckNhdGFsb2csXG4gICAgICBvcmRlckNhdGFsb2cxOiB0aGlzLmRhdGEub3JkZXJDYXRhbG9nMSxcbiAgICAgIG9yZGVyQ2F0YWxvZzI6IHRoaXMuZGF0YS5vcmRlckNhdGFsb2cyLFxuICAgICAgb3JkZXJDYXRhbG9nMzogdGhpcy5kYXRhLm9yZGVyQ2F0YWxvZzMsXG4gICAgICBvcmRlck1vbmV5OiB0aGlzLmRhdGEubW9uZXksXG4gICAgICBjaGFyYWN0ZXJJZDogdGhpcy5kYXRhLmNoYXJhY3RlcklkLFxuICAgICAgY2hhcmFjdGVySW5mbzogdGhpcy5kYXRhLmNoYXJhY3Rlck5hbWUsXG4gICAgICBjaGFyYWN0ZXJSZWFsbTogdGhpcy5kYXRhLnNlcnZlck5hbWUsXG4gICAgICBjaGFyYWN0ZXJTcGVjOiBzcGVjU3RyaW5nLFxuICAgICAgYWNjb3VudElkOiBlLmRldGFpbC52YWx1ZS5hY2NvdW50TmFtZSxcbiAgICAgIGFjY291bnRQYXNzd29yZDogZS5kZXRhaWwudmFsdWUuYWNjb3VudFBhc3N3b3JkLFxuICAgICAgc2F2ZWd1YXJkOiB0aGlzLmRhdGEuaGFzR3VhcmQsXG4gICAgICBwaG9uZTogZS5kZXRhaWwudmFsdWUucGhvbmVOdW1iZXIsXG4gICAgICBub3RlOiBlLmRldGFpbC52YWx1ZS5ub3RlLFxuICAgICAgcmVtb3RlQWRkcjogJzE5Mi4xNjguMS4yJ1xuICAgIH1cblxuICAgIGlmIChkZXRhaWxEYXRhLmFjY291bnRJZCA9PSBcIlwiKSB7XG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpei0puWPtycsXG4gICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGV0YWlsRGF0YS5hY2NvdW50UGFzc3dvcmQgPT0gXCJcIikge1xuICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6ICfor7fovpPlhaXlr4bnoIEnLFxuICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRldGFpbERhdGEucGhvbmUgPT0gXCJcIikge1xuICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6ICfor7fovpPlhaXmiYvmnLrlj7fnoIEnLFxuICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgYXBwLnJlcXVlc3RGdW5jKCcvb3JkZXIvc2F2ZU9yZGVyJywgZGV0YWlsRGF0YSwgJ1BPU1QnLCByZXMgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xuICAgICAgICBpZihyZXMuZGF0YS5wYXlJbmZvKSB7XG4gICAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xuICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHJlcy5kYXRhLnBheUluZm8udGltZVN0YW1wLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAnbm9uY2VTdHInOiByZXMuZGF0YS5wYXlJbmZvLm5vbmNlU3RyLFxuICAgICAgICAgICAgJ3BhY2thZ2UnOiByZXMuZGF0YS5wYXlJbmZvLnBhY2thZ2UsXG4gICAgICAgICAgICAnc2lnblR5cGUnOiByZXMuZGF0YS5wYXlJbmZvLnNpZ25UeXBlLFxuICAgICAgICAgICAgJ3BheVNpZ24nOiByZXMuZGF0YS5wYXlJbmZvLnNpZ24sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmlK/ku5jmiJDlip8nLFxuICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTUwMFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICBkZWx0YTogMVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOWksei0pScsXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBfdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBtb2RlOiAnRGV0YWlsJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBfdGhpcy5vblNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhLm1zZyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogcmVzLmRhdGEubXNnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG59KVxuIl19