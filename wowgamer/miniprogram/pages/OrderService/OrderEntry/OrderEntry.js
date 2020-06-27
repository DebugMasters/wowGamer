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
                    accountPassword: res.data.data.accountPassword,
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
            accountPassword: e.detail.value.accountPassword,
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
        if (detailData.accountPassword == "") {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJFbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk9yZGVyRW50cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBYyxDQUFBO0FBRWhDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxFQUFFO1FBQ1IsTUFBTSxFQUFFLEVBQUU7UUFDVixPQUFPLEVBQUUsRUFBRTtRQUNYLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLFNBQVMsRUFBRSxDQUFDO1FBQ1osV0FBVyxFQUFFLEVBQUU7UUFDZixVQUFVLEVBQUUsRUFBRTtRQUNkLFlBQVksRUFBRSxLQUFLO1FBQ25CLFdBQVcsRUFBRSxFQUFFO1FBQ2YsZUFBZSxFQUFFLEVBQUU7UUFDbkIsV0FBVyxFQUFFLEVBQUU7UUFDZixRQUFRLEVBQUUsQ0FBQztRQUNYLFlBQVksRUFBRSxFQUFFO1FBQ2hCLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLGFBQWEsRUFBRSxFQUFFO1FBQ2pCLEtBQUssRUFBRSxDQUFDO1FBQ1IsV0FBVyxFQUFFLENBQUM7UUFDZCxlQUFlLEVBQUUsSUFBSSxLQUFLLEVBQWlDO1FBQzNELElBQUksRUFBRSxFQUFFO1FBQ1IsV0FBVyxFQUFFLENBQUM7UUFDZCxPQUFPLEVBQUUsSUFBSSxLQUFLLEVBQWtGO1FBQ3BHLFdBQVcsRUFBRSxDQUFDO1FBQ2Qsb0JBQW9CLEVBQUUsQ0FBQztLQUN4QjtJQUNELE1BQU0sQ0FBQyxPQUFPO1FBQ1osTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBUyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixNQUFNLEVBQUUsRUFBRSxDQUFDLGNB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SyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzVELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8g6I635Y+W5bqU55So5a6e5L6LXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXHJcblxyXG5QYWdlKHtcclxuICBkYXRhOiB7XHJcbiAgICBtb2RlOiAnJyxcclxuICAgIHVzZXJJZDogJycsXHJcbiAgICBvcmRlcklkOiAnJyxcclxuICAgIGNoYXJhY3Rlck5hbWU6ICcnLFxyXG4gICAgUmVhbG1UeXBlOiAxLFxyXG4gICAgY2hhcmFjdGVySWQ6ICcnLFxyXG4gICAgc2VydmVyTmFtZTogJycsXHJcbiAgICBzaG93UGFzc3dvcmQ6IGZhbHNlLFxyXG4gICAgYWNjb3VudE5hbWU6ICcnLFxyXG4gICAgYWNjb3VudFBhc3N3b3JkOiAnJyxcclxuICAgIHBob25lTnVtYmVyOiAnJyxcclxuICAgIGhhc0d1YXJkOiAxLFxyXG4gICAgb3JkZXJDYXRhbG9nOiAnJyxcclxuICAgIG9yZGVyQ2F0YWxvZzE6ICcnLFxyXG4gICAgb3JkZXJDYXRhbG9nMjogJycsXHJcbiAgICBvcmRlckNhdGFsb2czOiAnJyxcclxuICAgIG1vbmV5OiAwLFxyXG4gICAgb3JpZ2luTW9uZXk6IDAsXHJcbiAgICBzcGVjaWFsaXphdGlvbnM6IG5ldyBBcnJheTx7bmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyfT4oKSxcclxuICAgIG5vdGU6ICcnLFxyXG4gICAgb3JkZXJTdGF0dXM6IDksXHJcbiAgICBjb3Vwb25zOiBuZXcgQXJyYXk8e2lkOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIGRpc2NvdW50OiBudW1iZXIsIGV4cGlyZVRpbWU6IERhdGV9PigpLFxyXG4gICAgY291cG9uSW5kZXg6IDAsXHJcbiAgICBzcGVjaWFsaXphdGlvbnNJbmRleDogMFxyXG4gIH0sXHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKDxzdHJpbmc+b3B0aW9ucy5kYXRhKTtcclxuICAgIGlmKGRhdGEubW9kZSA9PSAnQWRkTmV3Jykge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgIG1vZGU6IGRhdGEubW9kZSxcclxuICAgICAgICB1c2VySWQ6IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKSxcclxuICAgICAgICBvcmRlckNhdGFsb2c6IGRhdGEub3JkZXJDYXRhbG9nLFxyXG4gICAgICAgIG9yZGVyQ2F0YWxvZzE6IGRhdGEub3JkZXJDYXRhbG9nMSxcclxuICAgICAgICBvcmRlckNhdGFsb2cyOiBkYXRhLm9yZGVyQ2F0YWxvZzIsXHJcbiAgICAgICAgb3JkZXJDYXRhbG9nMzogZGF0YS5vcmRlckNhdGFsb2czLFxyXG4gICAgICAgIG1vbmV5OiBkYXRhLm1vbmV5LFxyXG4gICAgICAgIG9yaWdpbk1vbmV5OiBkYXRhLm1vbmV5LFxyXG4gICAgICAgIGNoYXJhY3RlcklkOiBkYXRhLmNoYXJhY3RlcklkXHJcbiAgICAgIH0pIFxyXG4gICAgfVxyXG4gICAgaWYoZGF0YS5tb2RlID09ICdEZXRhaWwnKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgbW9kZTogZGF0YS5tb2RlLFxyXG4gICAgICAgIHVzZXJJZDogZGF0YS51c2VySWQsXHJcbiAgICAgICAgb3JkZXJJZDogZGF0YS5vcmRlcklkXHJcbiAgICAgIH0pIFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25TaG93KCkge1xyXG4gICAgaWYodGhpcy5kYXRhLm1vZGUgPT0gJ0FkZE5ldycpIHtcclxuICAgICAgYXBwLnJlcXVlc3RGdW5jUHJvbWlzZSgnL3VzZXIvZ2V0Q2hhcmFjdGVyJywge2NoYXJhY3RlcklkOiB0aGlzLmRhdGEuY2hhcmFjdGVySWR9LCAnR0VUJylcclxuICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICBpZihwYXJzZUludChyZXMuZGF0YS5kYXRhLnJlYWxtVHlwZSkgPT0gMSkge1xyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgUmVhbG1UeXBlOiBwYXJzZUludChyZXMuZGF0YS5kYXRhLnJlYWxtVHlwZSksXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWU6IHJlcy5kYXRhLmRhdGEuY2hhcmFjdGVyTmFtZSArICcvJyArIHJlcy5kYXRhLmRhdGEuYWNjb3VudE5hbWUsXHJcbiAgICAgICAgICAgIHNlcnZlck5hbWU6ICfmraPlvI/mnI0vJyArIHJlcy5kYXRhLmRhdGEucmVhbG1ab25lTmFtZSArICcvJyArIHJlcy5kYXRhLmRhdGEucmVhbG1OYW1lXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwYXJzZUludChyZXMuZGF0YS5kYXRhLnJlYWxtVHlwZSkgPT0gMikge1xyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgUmVhbG1UeXBlOiBwYXJzZUludChyZXMuZGF0YS5kYXRhLnJlYWxtVHlwZSksXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWU6IHJlcy5kYXRhLmRhdGEuY2hhcmFjdGVyTmFtZSArICcvJyArIHJlcy5kYXRhLmRhdGEuYWNjb3VudE5hbWUsXHJcbiAgICAgICAgICAgIHNlcnZlck5hbWU6ICfmgIDml6fmnI0vJyArIHJlcy5kYXRhLmRhdGEucmVhbG1ab25lTmFtZSArICcvJyArIHJlcy5kYXRhLmRhdGEucmVhbG1OYW1lXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgIHNwZWNpYWxpemF0aW9ucyA6IG5ldyBBcnJheTx7bmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyfT4oKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlcy5kYXRhLmRhdGEuY2hhcmFjdGVyU3BlY2lhbGl6YXRpb24uc3BsaXQoJyMnKS5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgbGV0IHRlbXAgPSB4LnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgICBpZihwYXJzZUludCh0ZW1wWzFdKSA+IDApIHtcclxuICAgICAgICAgICAgZGF0YS5zcGVjaWFsaXphdGlvbnMucHVzaCh7bmFtZTogdGVtcFswXSwgdmFsdWU6IHBhcnNlSW50KHRlbXBbMV0pfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKGRhdGEpO1xyXG4gICAgICB9KVxyXG4gICAgICB0aGlzLmdldEF2YWlsYWJsZUNvdXBvbigpO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5kYXRhLm1vZGUgPT0gJ0RldGFpbCcpIHtcclxuICAgICAgYXBwLnJlcXVlc3RGdW5jUHJvbWlzZSgnL29yZGVyL29yZGVyRGV0YWlsJywge3VzZXJJZDogdGhpcy5kYXRhLnVzZXJJZCwgb3JkZXJJZDogdGhpcy5kYXRhLm9yZGVySWR9LCAnR0VUJylcclxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJJZDogcmVzLmRhdGEuZGF0YS5jaGFyYWN0ZXJJZCxcclxuICAgICAgICAgIGNoYXJhY3Rlck5hbWU6IHJlcy5kYXRhLmRhdGEuY2hhcmFjdGVySW5mbyxcclxuICAgICAgICAgIHNlcnZlck5hbWU6IHJlcy5kYXRhLmRhdGEuY2hhcmFjdGVyUmVhbG0sXHJcbiAgICAgICAgICBhY2NvdW50TmFtZTogcmVzLmRhdGEuZGF0YS5hY2NvdW50SWQsXHJcbiAgICAgICAgICBhY2NvdW50UGFzc3dvcmQ6IHJlcy5kYXRhLmRhdGEuYWNjb3VudFBhc3N3b3JkLFxyXG4gICAgICAgICAgb3JkZXJDYXRhbG9nOiByZXMuZGF0YS5kYXRhLm9yZGVyQ2F0YWxvZyxcclxuICAgICAgICAgIHBob25lTnVtYmVyOiByZXMuZGF0YS5kYXRhLnBob25lLFxyXG4gICAgICAgICAgbW9uZXk6IHJlcy5kYXRhLmRhdGEub3JkZXJNb25leSxcclxuICAgICAgICAgIG9yaWdpbk1vbmV5OiByZXMuZGF0YS5kYXRhLm9yZGVyTW9uZXksXHJcbiAgICAgICAgICBoYXNHdWFyZDogcmVzLmRhdGEuZGF0YS5zYXZlZ3VhcmQsXHJcbiAgICAgICAgICBub3RlOiByZXMuZGF0YS5kYXRhLm5vdGUsXHJcbiAgICAgICAgICBvcmRlclN0YXR1czogcmVzLmRhdGEuZGF0YS5vcmRlclN0YXR1c1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgc3BlY2lhbGl6YXRpb25zIDogbmV3IEFycmF5PHtuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXJ9PigpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVzLmRhdGEuZGF0YS5jaGFyYWN0ZXJTcGVjLnNwbGl0KCcjJykuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgIGxldCB0ZW1wID0geC5zcGxpdCgnOicpO1xyXG4gICAgICAgICAgZGF0YS5zcGVjaWFsaXphdGlvbnMucHVzaCh7bmFtZTogdGVtcFswXSwgdmFsdWU6IHBhcnNlSW50KHRlbXBbMV0pfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKGRhdGEpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIGlucHV0Tm90ZShlOiBhbnkpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIG5vdGU6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgaW5wdXRBY2NvdW50TmFtZShlKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBhY2NvdW50TmFtZTogZS5kZXRhaWwudmFsdWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBTaG93UGFzc3dvcmQoKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBzaG93UGFzc3dvcmQ6ICF0aGlzLmRhdGEuc2hvd1Bhc3N3b3JkXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgaW5wdXRQYXNzd29yZChlKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBhY2NvdW50UGFzc3dvcmQ6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgaW5wdXRQaG9uZU51bWJlcihlKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBwaG9uZU51bWJlcjogZS5kZXRhaWwudmFsdWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBjaGFuZ2VHdWFyZChlKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBoYXNHdWFyZDogZS5kZXRhaWwudmFsdWVcclxuICAgIH0pXHJcbiAgfSxcclxuICBnZXRBdmFpbGFibGVDb3Vwb24oKSB7XHJcbiAgICBhcHAucmVxdWVzdEZ1bmNQcm9taXNlKCcvb3JkZXIvYXZhaWxhYmxlQ291cG9uJywge3VzZXJJZDogdGhpcy5kYXRhLnVzZXJJZH0sICdHRVQnKVxyXG4gICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICBpZihyZXMuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgICBjb3Vwb25zOiBuZXcgQXJyYXk8e2lkOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIGRpc2NvdW50OiBudW1iZXIsIGV4cGlyZVRpbWU6IERhdGV9PigpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBkYXRhLmNvdXBvbnMucHVzaCh7aWQ6ICdudWxsJywgc3RhdHVzOiAxLCBuYW1lOiAn5LiN5L2/55So5LyY5oOg5Yi4JywgZGlzY291bnQ6IDAsIGV4cGlyZVRpbWU6IG5ldyBEYXRlKCl9KVxyXG4gICAgICAgIHJlcy5kYXRhLmNvdXBvbkxpc3QuZm9yRWFjaCh4ID0+IHtcclxuICAgICAgICAgIGlmKHguc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgZGF0YS5jb3Vwb25zLnB1c2goe2lkOiB4LmNvdXBvbklkLCBzdGF0dXM6IHguY291cG9uU3RhdHVzLCBuYW1lOiB4LmNvdXBvbk5hbWUsIGRpc2NvdW50OiB4LmNvdXBvbkRpc2NvdW50LCBleHBpcmVUaW1lOiB4LmV4cGlyZVRpbWV9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcclxuICAgICAgICB0aGlzLmNhbGNNb25leSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGNvdXBvbkNoYW5nZShlKSB7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBjb3Vwb25JbmRleDogZS5kZXRhaWwudmFsdWVcclxuICAgIH0pXHJcbiAgICB0aGlzLmNhbGNNb25leSgpO1xyXG4gIH0sXHJcbiAgY2FsY01vbmV5KCkge1xyXG4gICAgaWYodGhpcy5kYXRhLmNvdXBvbnNbdGhpcy5kYXRhLmNvdXBvbkluZGV4XS5pZCAhPSAnbnVsbCcpIHtcclxuICAgICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgbW9uZXk6IHRoaXMuZGF0YS5tb25leSxcclxuICAgICAgICBvcmlnaW5Nb25leTogdGhpcy5kYXRhLm1vbmV5XHJcbiAgICAgIH1cclxuICAgICAgZGF0YS5tb25leSA9IHRoaXMuZGF0YS5tb25leSAqIHRoaXMuZGF0YS5jb3Vwb25zW3RoaXMuZGF0YS5jb3Vwb25JbmRleF0uZGlzY291bnRcclxuICAgICAgdGhpcy5zZXREYXRhKGRhdGEpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICBtb25leTogdGhpcy5kYXRhLm9yaWdpbk1vbmV5LFxyXG4gICAgICAgIG9yaWdpbk1vbmV5OiB0aGlzLmRhdGEub3JpZ2luTW9uZXlcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNldERhdGEoZGF0YSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZm9ybVN1Ym1pdChlKSB7XHJcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICBsZXQgc3BlY1N0cmluZyA9ICcnO1xyXG4gICAgbGV0IGNoZWNrVmFsaWQgPSB0cnVlO1xyXG4gICAgdGhpcy5kYXRhLnNwZWNpYWxpemF0aW9ucy5ldmVyeSh4ID0+IHtcclxuICAgICAgaWYgKCghaXNOYU4oeC52YWx1ZSkgJiYgeC52YWx1ZSA+IDApKSB7XHJcbiAgICAgICAgc3BlY1N0cmluZyArPSB4Lm5hbWUgKyAnOicgKyB4LnZhbHVlLnRvU3RyaW5nKCkgKyAnIydcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIWlzTmFOKHgudmFsdWUpICYmIHgudmFsdWUgPD0gMCkge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfkuJPnsr7nrYnnuqflv4XpobvlpKfkuo4wJyxcclxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjaGVja1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5LiT57K+562J57qnJyxcclxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNoZWNrVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYoIWNoZWNrVmFsaWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgc3BlY1N0cmluZyA9IHNwZWNTdHJpbmcuc3Vic3RyaW5nKDAsIHNwZWNTdHJpbmcubGVuZ3RoIC0gMSk7XHJcblxyXG4gICAgbGV0IGRldGFpbERhdGEgPSB7XHJcbiAgICAgIG9yZGVySWQ6IHRoaXMuZGF0YS5vcmRlcklkICE9ICcnID8gdGhpcy5kYXRhLm9yZGVySWQ6ICcnLFxyXG4gICAgICB1c2VySWQ6IHRoaXMuZGF0YS51c2VySWQsXHJcbiAgICAgIG9yZGVyVHlwZTogMSxcclxuICAgICAgb3JkZXJTZXJ2ZXI6IHRoaXMuZGF0YS5SZWFsbVR5cGUsXHJcbiAgICAgIG9yZGVyQ2F0YWxvZzogdGhpcy5kYXRhLm9yZGVyQ2F0YWxvZyxcclxuICAgICAgb3JkZXJDYXRhbG9nMTogdGhpcy5kYXRhLm9yZGVyQ2F0YWxvZzEsXHJcbiAgICAgIG9yZGVyQ2F0YWxvZzI6IHRoaXMuZGF0YS5vcmRlckNhdGFsb2cyLFxyXG4gICAgICBvcmRlckNhdGFsb2czOiB0aGlzLmRhdGEub3JkZXJDYXRhbG9nMyxcclxuICAgICAgb3JkZXJNb25leTogdGhpcy5kYXRhLm1vbmV5LFxyXG4gICAgICBjaGFyYWN0ZXJJZDogdGhpcy5kYXRhLmNoYXJhY3RlcklkLFxyXG4gICAgICBjaGFyYWN0ZXJJbmZvOiB0aGlzLmRhdGEuY2hhcmFjdGVyTmFtZSxcclxuICAgICAgY2hhcmFjdGVyUmVhbG06IHRoaXMuZGF0YS5zZXJ2ZXJOYW1lLFxyXG4gICAgICBjaGFyYWN0ZXJTcGVjOiBzcGVjU3RyaW5nLFxyXG4gICAgICBhY2NvdW50SWQ6IGUuZGV0YWlsLnZhbHVlLmFjY291bnROYW1lLFxyXG4gICAgICBhY2NvdW50UGFzc3dvcmQ6IGUuZGV0YWlsLnZhbHVlLmFjY291bnRQYXNzd29yZCxcclxuICAgICAgc2F2ZWd1YXJkOiB0aGlzLmRhdGEuaGFzR3VhcmQsXHJcbiAgICAgIHBob25lOiBlLmRldGFpbC52YWx1ZS5waG9uZU51bWJlcixcclxuICAgICAgbm90ZTogZS5kZXRhaWwudmFsdWUubm90ZSxcclxuICAgICAgcmVtb3RlQWRkcjogJycsXHJcbiAgICAgIGNvdXBvbklkOiAnJ1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIGlmICh0aGlzLmRhdGEub3JkZXJTdGF0dXMgPT0gOSkge1xyXG4gICAgICBkZXRhaWxEYXRhLmNvdXBvbklkID0gdGhpcy5kYXRhLmNvdXBvbnNbdGhpcy5kYXRhLmNvdXBvbkluZGV4XS5pZCAhPSAnbnVsbCcgPyB0aGlzLmRhdGEuY291cG9uc1t0aGlzLmRhdGEuY291cG9uSW5kZXhdLmlkIDogJydcclxuICAgIH1cclxuICAgIGlmIChkZXRhaWxEYXRhLmFjY291bnRJZCA9PSBcIlwiKSB7XHJcbiAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6ICfor7fovpPlhaXotKblj7cnLFxyXG4gICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICBtYXNrOiB0cnVlLFxyXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZGV0YWlsRGF0YS5hY2NvdW50UGFzc3dvcmQgPT0gXCJcIikge1xyXG4gICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5a+G56CBJyxcclxuICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgbWFzazogdHJ1ZSxcclxuICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGRldGFpbERhdGEucGhvbmUgPT0gXCJcIikge1xyXG4gICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5omL5py65Y+356CBJyxcclxuICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgbWFzazogdHJ1ZSxcclxuICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICdodHRwczovL3B2LnNvaHUuY29tL2NpdHlqc29uP2llPXV0Zi04JyxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlLmRhdGEpO1xyXG4gICAgICAgIGNvbnN0IGlwQWRkcmVzcyA9IGUuZGF0YS5zcGxpdCgnICcpWzRdLnJlcGxhY2UoJ1wiJywnJykucmVwbGFjZSgnXCInLCAnJykucmVwbGFjZSgnLCcsICcnKVxyXG4gICAgICAgIGRldGFpbERhdGEucmVtb3RlQWRkciA9IGlwQWRkcmVzc1xyXG5cclxuICAgICAgICBhcHAucmVxdWVzdEZ1bmMoJy9vcmRlci9zYXZlT3JkZXInLCBkZXRhaWxEYXRhLCAnUE9TVCcsIHJlcyA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XHJcbiAgICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmKHJlcy5kYXRhLnBheUluZm8pIHtcclxuICAgICAgICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XHJcbiAgICAgICAgICAgICAgICAndGltZVN0YW1wJzogcmVzLmRhdGEucGF5SW5mby50aW1lU3RhbXAudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICdub25jZVN0cic6IHJlcy5kYXRhLnBheUluZm8ubm9uY2VTdHIsXHJcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHJlcy5kYXRhLnBheUluZm8ucGFja2FnZSxcclxuICAgICAgICAgICAgICAgICdzaWduVHlwZSc6IHJlcy5kYXRhLnBheUluZm8uc2lnblR5cGUsXHJcbiAgICAgICAgICAgICAgICAncGF5U2lnbic6IHJlcy5kYXRhLnBheUluZm8uc2lnbixcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOaIkOWKnycsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5aSx6LSlJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDE1MDBcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIF90aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGU6ICdEZXRhaWwnXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIF90aGlzLm9uU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEubXNnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YS5tc2csXHJcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBjYW5jZWxPcmRlcigpIHtcclxuICAgIGNvbnN0IF90aGlzID0gdGhpcztcclxuICAgIGxldCBkZXRhaWxEYXRhID0ge1xyXG4gICAgICBvcmRlcklkOiB0aGlzLmRhdGEub3JkZXJJZCxcclxuICAgICAgdXNlcklkOiB0aGlzLmRhdGEudXNlcklkXHJcbiAgICB9XHJcbiAgICBhcHAucmVxdWVzdEZ1bmMoJy9vcmRlci9jYW5jZWxPcmRlcicsIGRldGFpbERhdGEsICdQT1NUJywgcmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xyXG4gICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn5Y+W5raI6K6i5Y2V5oiQ5YqfJyxcclxuICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgfSlcclxuICAgICAgICBfdGhpcy5vblNob3coKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG4gIENoYW5nZVNwZWNpYWxpemF0aW9uczogZnVuY3Rpb24gKGUpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHNwZWNpYWxpemF0aW9uc0luZGV4OiBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGlucHV0U3BlY0xldmVsOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgbGV0IGRhdGEgPSB0aGlzLmRhdGEuc3BlY2lhbGl6YXRpb25zO1xyXG4gICAgZGF0YVt0aGlzLmRhdGEuc3BlY2lhbGl6YXRpb25zSW5kZXhdLnZhbHVlID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBzcGVjaWFsaXphdGlvbnM6IGRhdGFcclxuICAgIH0pO1xyXG4gIH1cclxufSlcclxuIl19