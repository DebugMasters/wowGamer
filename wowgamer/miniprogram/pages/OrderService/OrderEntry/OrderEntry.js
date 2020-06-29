"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("../../../utils/crypto");
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
        originMoney: 0,
        specializations: new Array(),
        note: '',
        orderStatus: 9,
        coupons: new Array(),
        couponIndex: 0,
        specializationsIndex: 0
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
                originMoney: data.money,
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
                        serverName: '怀旧服/' + res.data.data.realmZoneName + '/' + res.data.data.realmName
                    });
                }
                let data = {
                    specializations: new Array(),
                };
                res.data.data.characterSpecialization.split('#').forEach(x => {
                    let temp = x.split(':');
                    if (parseInt(temp[1]) > 0) {
                        data.specializations.push({ name: temp[0], value: parseInt(temp[1]) });
                    }
                });
                this.setData(data);
            });
            this.getAvailableCoupon();
        }
        if (this.data.mode == 'Detail') {
            app.requestFuncPromise('/order/orderDetail', { userId: this.data.userId, orderId: this.data.orderId }, 'GET')
                .then((res) => {
                this.setData({
                    characterId: res.data.data.characterId,
                    characterName: res.data.data.characterInfo,
                    serverName: res.data.data.characterRealm,
                    accountName: res.data.data.accountId,
                    accountPassword: crypto_1.default.decrypt(res.data.data.accountPassword),
                    orderCatalog: res.data.data.orderCatalog,
                    phoneNumber: res.data.data.phone,
                    money: res.data.data.orderMoney,
                    originMoney: res.data.data.orderMoney,
                    hasGuard: res.data.data.saveguard,
                    note: res.data.data.note,
                    orderStatus: res.data.data.orderStatus
                });
                let data = {
                    specializations: new Array(),
                };
                res.data.data.characterSpec.split('#').forEach(x => {
                    let temp = x.split(':');
                    data.specializations.push({ name: temp[0], value: parseInt(temp[1]) });
                });
                this.setData(data);
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
            if (res.data.success) {
                let data = {
                    coupons: new Array()
                };
                data.coupons.push({ id: 'null', status: 1, name: '不使用优惠券', discount: 0, expireTime: new Date() });
                res.data.couponList.forEach(x => {
                    if (x.status == 1) {
                        data.coupons.push({ id: x.couponId, status: x.couponStatus, name: x.couponName, discount: x.couponDiscount, expireTime: x.expireTime });
                    }
                });
                this.setData(data);
                this.calcMoney();
            }
        });
    },
    couponChange(e) {
        this.setData({
            couponIndex: e.detail.value
        });
        this.calcMoney();
    },
    calcMoney() {
        if (this.data.coupons[this.data.couponIndex].id != 'null') {
            let data = {
                money: this.data.money,
                originMoney: this.data.money
            };
            data.money = this.data.money * this.data.coupons[this.data.couponIndex].discount;
            this.setData(data);
        }
        else {
            let data = {
                money: this.data.originMoney,
                originMoney: this.data.originMoney
            };
            this.setData(data);
        }
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
            orderId: this.data.orderId != '' ? this.data.orderId : '',
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
            accountPassword: crypto_1.default.encrypt(e.detail.value.accountPassword),
            saveguard: this.data.hasGuard,
            phone: e.detail.value.phoneNumber,
            note: e.detail.value.note,
            remoteAddr: '',
            couponId: ''
        };
        if (this.data.orderStatus == 9) {
            detailData.couponId = this.data.coupons[this.data.couponIndex].id != 'null' ? this.data.coupons[this.data.couponIndex].id : '';
        }
        if (detailData.accountId == "") {
            wx.showToast({
                title: '请输入账号',
                icon: 'none',
                mask: true,
                duration: 1000
            });
            return;
        }
        if (e.detail.value.accountPassword == "") {
            wx.showToast({
                title: '请输入密码',
                icon: 'none',
                mask: true,
                duration: 1000
            });
            return;
        }
        if (detailData.phone == "") {
            wx.showToast({
                title: '请输入手机号码',
                icon: 'none',
                mask: true,
                duration: 1000
            });
            return;
        }
        wx.request({
            url: 'https://pv.sohu.com/cityjson?ie=utf-8',
            success: function (e) {
                console.log(e.data);
                const ipAddress = e.data.split(' ')[4].replace('"', '').replace('"', '').replace(',', '');
                detailData.remoteAddr = ipAddress;
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
            }
        });
    },
    cancelOrder() {
        const _this = this;
        let detailData = {
            orderId: this.data.orderId,
            userId: this.data.userId
        };
        app.requestFunc('/order/cancelOrder', detailData, 'POST', res => {
            console.log(res.data);
            if (res.data.success == true) {
                wx.showToast({
                    title: '取消订单成功',
                    icon: 'none',
                    duration: 1500
                });
                wx.navigateBack({
                    delta: 1
                });
                _this.onShow();
            }
        });
    },
    ChangeSpecializations: function (e) {
        this.setData({
            specializationsIndex: e.detail.value
        });
    },
    inputSpecLevel: function (e) {
        let data = this.data.specializations;
        data[this.data.specializationsIndex].value = e.detail.value;
        this.setData({
            specializations: data
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJFbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk9yZGVyRW50cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrREFBMkM7QUFHM0MsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQUU7UUFDUixNQUFNLEVBQUUsRUFBRTtRQUNWLE9BQU8sRUFBRSxFQUFFO1FBQ1gsYUFBYSxFQUFFLEVBQUU7UUFDakIsU0FBUyxFQUFFLENBQUM7UUFDWixXQUFXLEVBQUUsRUFBRTtRQUNmLFVBQVUsRUFBRSxFQUFFO1FBQ2QsWUFBWSxFQUFFLEtBQUs7UUFDbkIsV0FBVyxFQUFFLEVBQUU7UUFDZixlQUFlLEVBQUUsRUFBRTtRQUNuQixXQUFXLEVBQUUsRUFBRTtRQUNmLFFBQVEsRUFBRSxDQUFDO1FBQ1gsWUFBWSxFQUFFLEVBQUU7UUFDaEIsYUFBYSxFQUFFLEVBQUU7UUFDakIsYUFBYSxFQUFFLEVBQUU7UUFDakIsYUFBYSxFQUFFLEVBQUU7UUFDakIsS0FBSyxFQUFFLENBQUM7UUFDUixXQUFXLEVBQUUsQ0FBQztRQUNkLGVBQWUsRUFBRSxJQUFJLEtBQUssRUFBaUM7UUFDM0QsSUFBSSxFQUFFLEVBQUU7UUFDUixXQUFXLEVBQUUsQ0FBQztRQUNkLE9BQU8sRUFBRSxJQUFJLEtBQUssRUFBa0Y7UUFDcEcsV0FBVyxFQUFFLENBQUM7UUFDZCxvQkFBb0IsRUFBRSxDQUFDO0tBQ3hCO0lBQ0QsTUFBTSxDQUFDLE9BQU87UUFDWixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFTLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxJQUFHLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLE1BQU0sRUFB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SUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLGVBQWUsRUFBRSxJQUFJO1NBQ3RCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3J5cHRvIGZyb20gXCIuLi8uLi8uLi91dGlscy9jcnlwdG9cIjtcclxuXHJcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xyXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgbW9kZTogJycsXHJcbiAgICB1c2VySWQ6ICcnLFxyXG4gICAgb3JkZXJJZDogJycsXHJcbiAgICBjaGFyYWN0ZXJOYW1lOiAnJyxcclxuICAgIFJlYWxtVHlwZTogMSxcclxuICAgIGNoYXJhY3RlcklkOiAnJyxcclxuICAgIHNlcnZlck5hbWU6ICcnLFxyXG4gICAgc2hvd1Bhc3N3b3JkOiBmYWxzZSxcclxuICAgIGFjY291bnROYW1lOiAnJyxcclxuICAgIGFjY291bnRQYXNzd29yZDogJycsXHJcbiAgICBwaG9uZU51bWJlcjogJycsXHJcbiAgICBoYXNHdWFyZDogMSxcclxuICAgIG9yZGVyQ2F0YWxvZzogJycsXHJcbiAgICBvcmRlckNhdGFsb2cxOiAnJyxcclxuICAgIG9yZGVyQ2F0YWxvZzI6ICcnLFxyXG4gICAgb3JkZXJDYXRhbG9nMzogJycsXHJcbiAgICBtb25leTogMCxcclxuICAgIG9yaWdpbk1vbmV5OiAwLFxyXG4gICAgc3BlY2lhbGl6YXRpb25zOiBuZXcgQXJyYXk8e25hbWU6IHN0cmluZywgdmFsdWU6IG51bWJlcn0+KCksXHJcbiAgICBub3RlOiAnJyxcclxuICAgIG9yZGVyU3RhdHVzOiA5LFxyXG4gICAgY291cG9uczogbmV3IEFycmF5PHtpZDogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgbmFtZTogc3RyaW5nLCBkaXNjb3VudDogbnVtYmVyLCBleHBpcmVUaW1lOiBEYXRlfT4oKSxcclxuICAgIGNvdXBvbkluZGV4OiAwLFxyXG4gICAgc3BlY2lhbGl6YXRpb25zSW5kZXg6IDBcclxuICB9LFxyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZSg8c3RyaW5nPm9wdGlvbnMuZGF0YSk7XHJcbiAgICBpZihkYXRhLm1vZGUgPT0gJ0FkZE5ldycpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBtb2RlOiBkYXRhLm1vZGUsXHJcbiAgICAgICAgdXNlcklkOiB3eC5nZXRTdG9yYWdlU3luYygndXNlcklkJyksXHJcbiAgICAgICAgb3JkZXJDYXRhbG9nOiBkYXRhLm9yZGVyQ2F0YWxvZyxcclxuICAgICAgICBvcmRlckNhdGFsb2cxOiBkYXRhLm9yZGVyQ2F0YWxvZzEsXHJcbiAgICAgICAgb3JkZXJDYXRhbG9nMjogZGF0YS5vcmRlckNhdGFsb2cyLFxyXG4gICAgICAgIG9yZGVyQ2F0YWxvZzM6IGRhdGEub3JkZXJDYXRhbG9nMyxcclxuICAgICAgICBtb25leTogZGF0YS5tb25leSxcclxuICAgICAgICBvcmlnaW5Nb25leTogZGF0YS5tb25leSxcclxuICAgICAgICBjaGFyYWN0ZXJJZDogZGF0YS5jaGFyYWN0ZXJJZFxyXG4gICAgICB9KSBcclxuICAgIH1cclxuICAgIGlmKGRhdGEubW9kZSA9PSAnRGV0YWlsJykge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIG1vZGU6IGRhdGEubW9kZSxcclxuICAgICAgICB1c2VySWQ6IGRhdGEudXNlcklkLFxyXG4gICAgICAgIG9yZGVySWQ6IGRhdGEub3JkZXJJZFxyXG4gICAgICB9KSBcclxuICAgIH1cclxuICB9LFxyXG4gIG9uU2hvdygpIHtcclxuICAgIGlmKHRoaXMuZGF0YS5tb2RlID09ICdBZGROZXcnKSB7XHJcbiAgICAgIGFwcC5yZXF1ZXN0RnVuY1Byb21pc2UoJy91c2VyL2dldENoYXJhY3RlcicsIHtjaGFyYWN0ZXJJZDogdGhpcy5kYXRhLmNoYXJhY3RlcklkfSwgJ0dFVCcpXHJcbiAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYocGFyc2VJbnQocmVzLmRhdGEuZGF0YS5yZWFsbVR5cGUpID09IDEpIHtcclxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIFJlYWxtVHlwZTogcGFyc2VJbnQocmVzLmRhdGEuZGF0YS5yZWFsbVR5cGUpLFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lOiByZXMuZGF0YS5kYXRhLmNoYXJhY3Rlck5hbWUgKyAnLycgKyByZXMuZGF0YS5kYXRhLmFjY291bnROYW1lLFxyXG4gICAgICAgICAgICBzZXJ2ZXJOYW1lOiAn5q2j5byP5pyNLycgKyByZXMuZGF0YS5kYXRhLnJlYWxtWm9uZU5hbWUgKyAnLycgKyByZXMuZGF0YS5kYXRhLnJlYWxtTmFtZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGFyc2VJbnQocmVzLmRhdGEuZGF0YS5yZWFsbVR5cGUpID09IDIpIHtcclxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIFJlYWxtVHlwZTogcGFyc2VJbnQocmVzLmRhdGEuZGF0YS5yZWFsbVR5cGUpLFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lOiByZXMuZGF0YS5kYXRhLmNoYXJhY3Rlck5hbWUgKyAnLycgKyByZXMuZGF0YS5kYXRhLmFjY291bnROYW1lLFxyXG4gICAgICAgICAgICBzZXJ2ZXJOYW1lOiAn5oCA5pen5pyNLycgKyByZXMuZGF0YS5kYXRhLnJlYWxtWm9uZU5hbWUgKyAnLycgKyByZXMuZGF0YS5kYXRhLnJlYWxtTmFtZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICBzcGVjaWFsaXphdGlvbnMgOiBuZXcgQXJyYXk8e25hbWU6IHN0cmluZywgdmFsdWU6IG51bWJlcn0+KCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXMuZGF0YS5kYXRhLmNoYXJhY3RlclNwZWNpYWxpemF0aW9uLnNwbGl0KCcjJykuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgIGxldCB0ZW1wID0geC5zcGxpdCgnOicpO1xyXG4gICAgICAgICAgaWYocGFyc2VJbnQodGVtcFsxXSkgPiAwKSB7XHJcbiAgICAgICAgICAgIGRhdGEuc3BlY2lhbGl6YXRpb25zLnB1c2goe25hbWU6IHRlbXBbMF0sIHZhbHVlOiBwYXJzZUludCh0ZW1wWzFdKX0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcclxuICAgICAgfSlcclxuICAgICAgdGhpcy5nZXRBdmFpbGFibGVDb3Vwb24oKTtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuZGF0YS5tb2RlID09ICdEZXRhaWwnKSB7XHJcbiAgICAgIGFwcC5yZXF1ZXN0RnVuY1Byb21pc2UoJy9vcmRlci9vcmRlckRldGFpbCcsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWQsIG9yZGVySWQ6IHRoaXMuZGF0YS5vcmRlcklkfSwgJ0dFVCcpXHJcbiAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgY2hhcmFjdGVySWQ6IHJlcy5kYXRhLmRhdGEuY2hhcmFjdGVySWQsXHJcbiAgICAgICAgICBjaGFyYWN0ZXJOYW1lOiByZXMuZGF0YS5kYXRhLmNoYXJhY3RlckluZm8sXHJcbiAgICAgICAgICBzZXJ2ZXJOYW1lOiByZXMuZGF0YS5kYXRhLmNoYXJhY3RlclJlYWxtLFxyXG4gICAgICAgICAgYWNjb3VudE5hbWU6IHJlcy5kYXRhLmRhdGEuYWNjb3VudElkLFxyXG4gICAgICAgICAgYWNjb3VudFBhc3N3b3JkOiBjcnlwdG8uZGVjcnlwdChyZXMuZGF0YS5kYXRhLmFjY291bnRQYXNzd29yZCksXHJcbiAgICAgICAgICBvcmRlckNhdGFsb2c6IHJlcy5kYXRhLmRhdGEub3JkZXJDYXRhbG9nLFxyXG4gICAgICAgICAgcGhvbmVOdW1iZXI6IHJlcy5kYXRhLmRhdGEucGhvbmUsXHJcbiAgICAgICAgICBtb25leTogcmVzLmRhdGEuZGF0YS5vcmRlck1vbmV5LFxyXG4gICAgICAgICAgb3JpZ2luTW9uZXk6IHJlcy5kYXRhLmRhdGEub3JkZXJNb25leSxcclxuICAgICAgICAgIGhhc0d1YXJkOiByZXMuZGF0YS5kYXRhLnNhdmVndWFyZCxcclxuICAgICAgICAgIG5vdGU6IHJlcy5kYXRhLmRhdGEubm90ZSxcclxuICAgICAgICAgIG9yZGVyU3RhdHVzOiByZXMuZGF0YS5kYXRhLm9yZGVyU3RhdHVzXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICBzcGVjaWFsaXphdGlvbnMgOiBuZXcgQXJyYXk8e25hbWU6IHN0cmluZywgdmFsdWU6IG51bWJlcn0+KCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXMuZGF0YS5kYXRhLmNoYXJhY3RlclNwZWMuc3BsaXQoJyMnKS5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgbGV0IHRlbXAgPSB4LnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgICBkYXRhLnNwZWNpYWxpemF0aW9ucy5wdXNoKHtuYW1lOiB0ZW1wWzBdLCB2YWx1ZTogcGFyc2VJbnQodGVtcFsxXSl9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNldERhdGEoZGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgaW5wdXROb3RlKGU6IGFueSkge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgbm90ZTogZS5kZXRhaWwudmFsdWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBpbnB1dEFjY291bnROYW1lKGUpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGFjY291bnROYW1lOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIFNob3dQYXNzd29yZCgpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHNob3dQYXNzd29yZDogIXRoaXMuZGF0YS5zaG93UGFzc3dvcmRcclxuICAgIH0pXHJcbiAgfSxcclxuICBpbnB1dFBhc3N3b3JkKGUpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGFjY291bnRQYXNzd29yZDogZS5kZXRhaWwudmFsdWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBpbnB1dFBob25lTnVtYmVyKGUpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHBob25lTnVtYmVyOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGNoYW5nZUd1YXJkKGUpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGhhc0d1YXJkOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGdldEF2YWlsYWJsZUNvdXBvbigpIHtcclxuICAgIGFwcC5yZXF1ZXN0RnVuY1Byb21pc2UoJy9vcmRlci9hdmFpbGFibGVDb3Vwb24nLCB7dXNlcklkOiB0aGlzLmRhdGEudXNlcklkfSwgJ0dFVCcpXHJcbiAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgIGlmKHJlcy5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgIGNvdXBvbnM6IG5ldyBBcnJheTx7aWQ6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIG5hbWU6IHN0cmluZywgZGlzY291bnQ6IG51bWJlciwgZXhwaXJlVGltZTogRGF0ZX0+KClcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRhdGEuY291cG9ucy5wdXNoKHtpZDogJ251bGwnLCBzdGF0dXM6IDEsIG5hbWU6ICfkuI3kvb/nlKjkvJjmg6DliLgnLCBkaXNjb3VudDogMCwgZXhwaXJlVGltZTogbmV3IERhdGUoKX0pXHJcbiAgICAgICAgcmVzLmRhdGEuY291cG9uTGlzdC5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgaWYoeC5zdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICBkYXRhLmNvdXBvbnMucHVzaCh7aWQ6IHguY291cG9uSWQsIHN0YXR1czogeC5jb3Vwb25TdGF0dXMsIG5hbWU6IHguY291cG9uTmFtZSwgZGlzY291bnQ6IHguY291cG9uRGlzY291bnQsIGV4cGlyZVRpbWU6IHguZXhwaXJlVGltZX0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuY2FsY01vbmV5KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgY291cG9uQ2hhbmdlKGUpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGNvdXBvbkluZGV4OiBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICAgIHRoaXMuY2FsY01vbmV5KCk7XHJcbiAgfSxcclxuICBjYWxjTW9uZXkoKSB7XHJcbiAgICBpZih0aGlzLmRhdGEuY291cG9uc1t0aGlzLmRhdGEuY291cG9uSW5kZXhdLmlkICE9ICdudWxsJykge1xyXG4gICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICBtb25leTogdGhpcy5kYXRhLm1vbmV5LFxyXG4gICAgICAgIG9yaWdpbk1vbmV5OiB0aGlzLmRhdGEubW9uZXlcclxuICAgICAgfVxyXG4gICAgICBkYXRhLm1vbmV5ID0gdGhpcy5kYXRhLm1vbmV5ICogdGhpcy5kYXRhLmNvdXBvbnNbdGhpcy5kYXRhLmNvdXBvbkluZGV4XS5kaXNjb3VudFxyXG4gICAgICB0aGlzLnNldERhdGEoZGF0YSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgIG1vbmV5OiB0aGlzLmRhdGEub3JpZ2luTW9uZXksXHJcbiAgICAgICAgb3JpZ2luTW9uZXk6IHRoaXMuZGF0YS5vcmlnaW5Nb25leVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBmb3JtU3VibWl0KGUpIHtcclxuICAgIGNvbnN0IF90aGlzID0gdGhpcztcclxuICAgIGxldCBzcGVjU3RyaW5nID0gJyc7XHJcbiAgICBsZXQgY2hlY2tWYWxpZCA9IHRydWU7XHJcbiAgICB0aGlzLmRhdGEuc3BlY2lhbGl6YXRpb25zLmV2ZXJ5KHggPT4ge1xyXG4gICAgICBpZiAoKCFpc05hTih4LnZhbHVlKSAmJiB4LnZhbHVlID4gMCkpIHtcclxuICAgICAgICBzcGVjU3RyaW5nICs9IHgubmFtZSArICc6JyArIHgudmFsdWUudG9TdHJpbmcoKSArICcjJ1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghaXNOYU4oeC52YWx1ZSkgJiYgeC52YWx1ZSA8PSAwKSB7XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+S4k+eyvuetiee6p+W/hemhu+Wkp+S6jjAnLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNoZWNrVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXkuJPnsr7nrYnnuqcnLFxyXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2hlY2tWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZighY2hlY2tWYWxpZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzcGVjU3RyaW5nID0gc3BlY1N0cmluZy5zdWJzdHJpbmcoMCwgc3BlY1N0cmluZy5sZW5ndGggLSAxKTtcclxuXHJcbiAgICBsZXQgZGV0YWlsRGF0YSA9IHtcclxuICAgICAgb3JkZXJJZDogdGhpcy5kYXRhLm9yZGVySWQgIT0gJycgPyB0aGlzLmRhdGEub3JkZXJJZDogJycsXHJcbiAgICAgIHVzZXJJZDogdGhpcy5kYXRhLnVzZXJJZCxcclxuICAgICAgb3JkZXJUeXBlOiAxLFxyXG4gICAgICBvcmRlclNlcnZlcjogdGhpcy5kYXRhLlJlYWxtVHlwZSxcclxuICAgICAgb3JkZXJDYXRhbG9nOiB0aGlzLmRhdGEub3JkZXJDYXRhbG9nLFxyXG4gICAgICBvcmRlckNhdGFsb2cxOiB0aGlzLmRhdGEub3JkZXJDYXRhbG9nMSxcclxuICAgICAgb3JkZXJDYXRhbG9nMjogdGhpcy5kYXRhLm9yZGVyQ2F0YWxvZzIsXHJcbiAgICAgIG9yZGVyQ2F0YWxvZzM6IHRoaXMuZGF0YS5vcmRlckNhdGFsb2czLFxyXG4gICAgICBvcmRlck1vbmV5OiB0aGlzLmRhdGEubW9uZXksXHJcbiAgICAgIGNoYXJhY3RlcklkOiB0aGlzLmRhdGEuY2hhcmFjdGVySWQsXHJcbiAgICAgIGNoYXJhY3RlckluZm86IHRoaXMuZGF0YS5jaGFyYWN0ZXJOYW1lLFxyXG4gICAgICBjaGFyYWN0ZXJSZWFsbTogdGhpcy5kYXRhLnNlcnZlck5hbWUsXHJcbiAgICAgIGNoYXJhY3RlclNwZWM6IHNwZWNTdHJpbmcsXHJcbiAgICAgIGFjY291bnRJZDogZS5kZXRhaWwudmFsdWUuYWNjb3VudE5hbWUsXHJcbiAgICAgIGFjY291bnRQYXNzd29yZDogY3J5cHRvLmVuY3J5cHQoZS5kZXRhaWwudmFsdWUuYWNjb3VudFBhc3N3b3JkKSxcclxuICAgICAgc2F2ZWd1YXJkOiB0aGlzLmRhdGEuaGFzR3VhcmQsXHJcbiAgICAgIHBob25lOiBlLmRldGFpbC52YWx1ZS5waG9uZU51bWJlcixcclxuICAgICAgbm90ZTogZS5kZXRhaWwudmFsdWUubm90ZSxcclxuICAgICAgcmVtb3RlQWRkcjogJycsXHJcbiAgICAgIGNvdXBvbklkOiAnJ1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIGlmICh0aGlzLmRhdGEub3JkZXJTdGF0dXMgPT0gOSkge1xyXG4gICAgICBkZXRhaWxEYXRhLmNvdXBvbklkID0gdGhpcy5kYXRhLmNvdXBvbnNbdGhpcy5kYXRhLmNvdXBvbkluZGV4XS5pZCAhPSAnbnVsbCcgPyB0aGlzLmRhdGEuY291cG9uc1t0aGlzLmRhdGEuY291cG9uSW5kZXhdLmlkIDogJydcclxuICAgIH1cclxuICAgIGlmIChkZXRhaWxEYXRhLmFjY291bnRJZCA9PSBcIlwiKSB7XHJcbiAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6ICfor7fovpPlhaXotKblj7cnLFxyXG4gICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICBtYXNrOiB0cnVlLFxyXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZS5kZXRhaWwudmFsdWUuYWNjb3VudFBhc3N3b3JkID09IFwiXCIpIHtcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeWvhueggScsXHJcbiAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgIG1hc2s6IHRydWUsXHJcbiAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChkZXRhaWxEYXRhLnBob25lID09IFwiXCIpIHtcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeaJi+acuuWPt+eggScsXHJcbiAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgIG1hc2s6IHRydWUsXHJcbiAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiAnaHR0cHM6Ly9wdi5zb2h1LmNvbS9jaXR5anNvbj9pZT11dGYtOCcsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZS5kYXRhKTtcclxuICAgICAgICBjb25zdCBpcEFkZHJlc3MgPSBlLmRhdGEuc3BsaXQoJyAnKVs0XS5yZXBsYWNlKCdcIicsJycpLnJlcGxhY2UoJ1wiJywgJycpLnJlcGxhY2UoJywnLCAnJylcclxuICAgICAgICBkZXRhaWxEYXRhLnJlbW90ZUFkZHIgPSBpcEFkZHJlc3NcclxuXHJcbiAgICAgICAgYXBwLnJlcXVlc3RGdW5jKCcvb3JkZXIvc2F2ZU9yZGVyJywgZGV0YWlsRGF0YSwgJ1BPU1QnLCByZXMgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZihyZXMuZGF0YS5wYXlJbmZvKSB7XHJcbiAgICAgICAgICAgICAgd3gucmVxdWVzdFBheW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHJlcy5kYXRhLnBheUluZm8udGltZVN0YW1wLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiByZXMuZGF0YS5wYXlJbmZvLm5vbmNlU3RyLFxyXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiByZXMuZGF0YS5wYXlJbmZvLnBhY2thZ2UsXHJcbiAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiByZXMuZGF0YS5wYXlJbmZvLnNpZ25UeXBlLFxyXG4gICAgICAgICAgICAgICAgJ3BheVNpZ24nOiByZXMuZGF0YS5wYXlJbmZvLnNpZ24sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmlK/ku5jmiJDlip8nLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTUwMFxyXG4gICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOWksei0pScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICBfdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlOiAnRGV0YWlsJ1xyXG4gICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICBfdGhpcy5vblNob3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhLm1zZyxcclxuICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEubXNnLFxyXG4gICAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgY2FuY2VsT3JkZXIoKSB7XHJcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICBsZXQgZGV0YWlsRGF0YSA9IHtcclxuICAgICAgb3JkZXJJZDogdGhpcy5kYXRhLm9yZGVySWQsXHJcbiAgICAgIHVzZXJJZDogdGhpcy5kYXRhLnVzZXJJZFxyXG4gICAgfVxyXG4gICAgYXBwLnJlcXVlc3RGdW5jKCcvb3JkZXIvY2FuY2VsT3JkZXInLCBkZXRhaWxEYXRhLCAnUE9TVCcsIHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+WPlua2iOiuouWNleaIkOWKnycsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTUwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgX3RoaXMub25TaG93KCk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBDaGFuZ2VTcGVjaWFsaXphdGlvbnM6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBzcGVjaWFsaXphdGlvbnNJbmRleDogZS5kZXRhaWwudmFsdWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBpbnB1dFNwZWNMZXZlbDogZnVuY3Rpb24gKGUpIHtcclxuICAgIGxldCBkYXRhID0gdGhpcy5kYXRhLnNwZWNpYWxpemF0aW9ucztcclxuICAgIGRhdGFbdGhpcy5kYXRhLnNwZWNpYWxpemF0aW9uc0luZGV4XS52YWx1ZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgc3BlY2lhbGl6YXRpb25zOiBkYXRhXHJcbiAgICB9KTtcclxuICB9XHJcbn0pXHJcbiJdfQ==