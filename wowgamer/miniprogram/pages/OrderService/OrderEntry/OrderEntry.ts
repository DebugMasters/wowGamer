// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    mode: '',
    userId: '',
    orderId: '',
    characterName: 'qqq/jzhoou',
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
  },
  onLoad(options) {
    const data = JSON.parse(<string>options.data);
    if(data.mode == 'AddNew') {
      this.setData({
        mode: data.mode,
        userId: wx.getStorageSync('userId'),
        characterName: data.characterName,
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
        if(res.data.data.characterRealmType == 1) {
          this.setData({
            RealmType: res.data.data.characterRealmType,
            serverName: '正式服'
          })
        }
        if(res.data.data.characterRealmType == 2) {
          this.setData({
            RealmType: res.data.data.characterRealmType,
            serverName: '怀旧服'
          })
        }
        res.data.data.characterSpecialization.split('#').forEach(x => {
          let temp = x.split(':');
          let data = {
            specializations : _this.data.specializations
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
    }
    if(this.data.mode == 'Detail') {
      app.requestFuncPromise('/order/orderDetail', {userId: this.data.userId, orderId: this.data.orderId}, 'GET')
      .then((res) => {
        this.setData({
          characterName: res.data.data.characterName + '/',
          accountName: res.data.data.accountId,
          orderCatalog: res.data.data.orderCatalog,
          phoneNumber: res.data.data.phone,
          money: res.data.data.orderMoney,
          hasGuard: res.data.data.saveguard,
          note: res.data.data.note
        }),
        res.data.data.characterSpec.split('#').forEach(x => {
          let temp = x.split(':');
          let data = {
            specializations : _this.data.specializations
          };
          data.specializations.push({name: temp[0], value: parseInt(temp[1])});
          this.setData(data);
        });
      })
      .catch((err) => {
        
      });
    }
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
      characterSpec: specString,
      accountId: e.detail.value.accountName,
      accountPassword: e.detail.value.accountPassword,
      saveguard: this.data.hasGuard,
      phone: e.detail.value.phoneNumber,
      note: e.detail.value.note,
      remoteAddr: '12345'
    }

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
        wx.showToast({
          title: '下单完成',
          icon: 'success',
          duration: 1000
        })
        wx.navigateBack({
          delta: 1
        })
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
