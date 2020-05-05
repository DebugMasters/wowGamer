// 获取应用实例
const app = getApp<IAppOption>()

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
    specializations: new Array<{name: string, value: number}>(),
    note: '',
    orderStatus: 9,
    coupons: new Array(),
    couponIndex: -1
  },
  onLoad(options) {
    const data = JSON.parse(<string>options.data);
    if(data.mode == 'AddNew') {
      this.setData({
        mode: data.mode,
        userId: wx.getStorageSync('userId'),
        orderCatalog: data.orderCatalog,
        orderCatalog1: data.orderCatalog1,
        orderCatalog2: data.orderCatalog2,
        orderCatalog3: data.orderCatalog3,
        money: data.money,
        characterId: data.characterId
      }) 
    }
    if(data.mode == 'Detail') {
      this.setData({
        mode: data.mode,
        userId: data.userId,
        orderId: data.orderId
      }) 
    }
  },
  onShow() {
    const _this = this
    if(this.data.mode == 'AddNew') {
      app.requestFuncPromise('/user/getCharacter', {characterId: this.data.characterId}, 'GET')
      .then(res => {
        if(parseInt(res.data.data.realmType) == 1) {
          this.setData({
            RealmType: parseInt(res.data.data.realmType),
            characterName: res.data.data.characterName + '/' + res.data.data.accountName,
            serverName: '正式服/' + res.data.data.realmZoneName + '/' + res.data.data.realmName
          })
        }
        if(parseInt(res.data.data.realmType) == 2) {
          this.setData({
            RealmType: parseInt(res.data.data.realmType),
            characterName: res.data.data.characterName + '/' + res.data.data.accountName,
            serverName: '怀旧服' + res.data.data.realmZoneName + '/' + res.data.data.realmName
          })
        }
        res.data.data.characterSpecialization.split('#').forEach(x => {
          let temp = x.split(':');
          let data = {
            specializations : new Array<{name: string, value: number}>(),
          };
          if(parseInt(temp[1]) > 0) {
            data.specializations.push({name: temp[0], value: parseInt(temp[1])});
          }
          this.setData(data);
        });
      })
      .catch(res => {
        console.log(res);
      })
      this.getAvailableCoupon();
    }
    if(this.data.mode == 'Detail') {
      app.requestFuncPromise('/order/orderDetail', {userId: this.data.userId, orderId: this.data.orderId}, 'GET')
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
            specializations : new Array<{name: string, value: number}>(),
          };
          data.specializations.push({name: temp[0], value: parseInt(temp[1])});
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
  inputNote(e: any) {
    this.setData({
      note: e.detail.value
    })
  },
  inputAccountName(e) {
    this.setData({
      accountName: e.detail.value
    })
  },
  ShowPassword() {
    this.setData({
      showPassword: !this.data.showPassword
    })
  },
  inputPassword(e) {
    this.setData({
      accountPassword: e.detail.value
    })
  },
  inputPhoneNumber(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  changeGuard(e) {
    this.setData({
      hasGuard: e.detail.value
    })
  },
  getAvailableCoupon() {
    app.requestFuncPromise('/order/availableCoupon', {userId: this.data.userId}, 'GET')
    .then((res) => {
      this.setData({
        coupons: res.data.couponList
      })
    });
  },

  formSubmit(e) {
    const _this = this;
    let specString = '';
    let checkValid = true;
    this.data.specializations.every(x => {
      if ((!isNaN(x.value) && x.value > 0)) {
        specString += x.name + ':' + x.value.toString() + '#'
        return true;
      } else {
        if (!isNaN(x.value) && x.value <= 0) {
          wx.showToast({
            title: '专精等级必须大于0',
            icon: 'none',
            duration: 1000
          });
          checkValid = false;
          return false;
        } else {
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
    if(!checkValid) {
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
    
    app.requestFunc('/order/saveOrder', detailData, 'POST', res => {
      console.log(res.data);
      if (res.data.success == true) {
        if(res.data.payInfo) {
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
              })
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
              })
              _this.onShow();
            }
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
})
