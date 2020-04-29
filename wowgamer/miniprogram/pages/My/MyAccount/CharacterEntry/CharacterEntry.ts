// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    mode: '',
    realmType: 0,
    accountId :'',
    characterId: '',
    disableCheck1: false,
    specializations: new Array<{name: string, value: number, checked: boolean,}>(),
    jobs: [
      ['联盟', '部落'],
      ['圣骑士', '战士', '死亡骑士', '猎人', '萨满祭司', '潜行者', '德鲁伊', '恶魔猎手', '法师', '牧师', '术士']
    ],
    jobIndex: [0, 0],
    zones:new Array<{id: string, name: string }>(),
    serversList: new Array<Array<{ id: string; name: string; }>>(),
    serverIndex: [0, 0],
  },
  onLoad(option) {
    if(option.mode == 'AddNew') {
      const realmtype = option.realmType ? parseInt(option.realmType.toString()) : 1;
      this.getRealmList(realmtype);
      this.getCharacterSpec(1);
      this.setData({
        mode : option.mode,
        realmType: realmtype,
        accountId: option.accountId
      })
    } else if (option.mode == 'Modify') {
      this.setData({
        mode : option.mode,
        characterId: option.characterId,
        accountId: option.accountId
      })
    }
  },
  onShow() {
    const _this = this;
    if(this.data.mode == 'Modify') {
      app.requestFunc('/user/getCharacter', {characterId: this.data.characterId}, 'GET', res => {
        console.log(res.data);
        if (res.data.success == true) {
          let tempJobIndex = [res.data.data.allianceHorde - 1, res.data.data.characterClass - 1];
          let tempServerIndex = [0, 0];
          this.getRealmList(res.data.data.characterRealmType, parseInt(res.data.data.characterRealmZone), () => {
            this.data.serversList[0].forEach((x, index) => {
              if(x.id == res.data.data.characterRealmZone) {
                tempServerIndex[0] = index;
              }
            })
            this.data.serversList[1].forEach((x, index) => {
              if(x.id == res.data.data.characterRealm) {
                tempServerIndex[1] = index;
              }
            })
            this.setData({
              characterName: res.data.data.characterName,
              realmType: res.data.data.characterRealmType,
              jobIndex: tempJobIndex,
              serverIndex: tempServerIndex
            })
          });

          res.data.data.characterSpecialization.split('#').forEach(x => {
            let temp = x.split(':');
            let data = {
              specializations : _this.data.specializations
            };
            data.specializations.push({name: temp[0], value: parseInt(temp[1]) == 0 ? NaN : parseInt(temp[1]), checked: parseInt(temp[1]) > 0 ? true: false});
            this.setData(data);
          });
        }
      })
    }
  },
  getCharacterSpec(characterClass: number) {
    const _this = this;
    app.requestFunc('/system/getCharacterSpec', {characterClass: characterClass}, 'GET', res => {
      console.log('res.data :', res.data);
      if(res.data.success == true) {
        let data = {
          specializations : new Array<{name: string, value: number, checked: boolean}>(),
        };
        res.data.specList.forEach(x=> {
          data.specializations.push({name: x, value: NaN, checked: false});
        });
        this.setData(data);
      }
    })
  },
  getRealmList(realmType: number, realmZone?: number, callback?: Function) {
    if(realmType == 1) {
      this.setData({
        zones: [{id: '0', name: '推荐服务器'}, {id: '1', name: '一区'}, {id: '3', name: '三区'}, {id: '5', name: '五区'}, {id: '10', name: '十区'}]
      }) 
      realmZone = realmZone ? realmZone : 0;
    }
    if(realmType == 2) {
      this.setData({
        zones: [{id: '1', name: '一区'}, {id: '5', name: '五区'}]
      }) 
      realmZone = realmZone ? realmZone : 1;
    }
    const _this = this;
    app.requestFunc('/system/getRealmList', {realmType: realmType, realmZone: realmZone}, 'GET', res => {
      console.log(res.data);
      if (res.data.success == true) {
        let tempServers = new Array<{id: string; name: string; }>();
        res.data.realmList.forEach(x => {
          tempServers.push({id: x.realmId.toString(), name: x.realmName});
        });

      let tempserversList = new Array<Array<{ id: string; name: string; }>>();
      tempserversList.push(_this.data.zones);
      tempserversList.push(tempServers);
      this.setData({
        serversList: tempserversList
      })
      if(typeof(callback) == "function") {
        callback();
      }
    }
    })
  },

  formSubmit(e) {
    const _this = this;
    let specString = '';
    let checkValid = true;
    this.data.specializations.every(x => {
      if ((x.checked && !isNaN(x.value) && x.value > 0) || !x.checked) {
        specString += x.name + ':' + (x.checked ? x.value.toString() : '0') + '#'
        return true;
      } else {
        if (x.checked && !isNaN(x.value) && x.value <= 0) {
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
      characterId: '',
      characterName: e.detail.value.characterName,
      characterAccount: this.data.accountId,
      characterRealm: this.data.serversList[1][this.data.serverIndex[1]].id,
      characterRealmZone: this.data.serversList[0][this.data.serverIndex[0]].id,
      characterRealmType: this.data.realmType,
      characterClass: this.data.jobIndex[1] + 1,
      allianceHorde: this.data.jobIndex[0] + 1,
      characterSpecialization: specString,
      userId: wx.getStorageSync('id')
    }
    if(this.data.mode == 'Modify') {
      detailData.characterId = this.data.characterId
    }
    
    app.requestFunc('/user/saveCharacter', detailData, 'POST', res => {
      console.log(res.data);
      if (res.data.success == true) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 1000
        })
        wx.navigateBack({
          delta: _this.data.mode == 'AddNew'? 2: 1
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
  jobsChange(e) {
    this.getCharacterSpec(e.detail.value[1] + 1);
  },
  jobsColumnChange(e) {
    let data = {
      jobs: this.data.jobs,
      jobIndex: this.data.jobIndex
    };
    data.jobIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.jobIndex[0]) {
          case 0:
            data.jobs[1] = ['圣骑士', '战士', '死亡骑士', '猎人', '萨满祭司', '潜行者', '德鲁伊', '恶魔猎手', '法师', '牧师', '术士'];
            break;
          case 1:
            data.jobs[1] = ['圣骑士', '战士', '死亡骑士', '猎人', '萨满祭司', '潜行者', '德鲁伊', '恶魔猎手', '法师', '牧师', '术士'];
            break;
        }
        data.jobIndex[1] = 0;
        break;
      case 1:
    }
    this.setData(data);
  },
  serversColumnChange(e) {
    let data = {
      serverIndex: this.data.serverIndex
    };
    data.serverIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        this.getRealmList(this.data.realmType, parseInt(this.data.serversList[0][e.detail.value].id));
        data.serverIndex[1] = 0;
        break;
    }
    this.setData(data);
  },

  checkboxChange: function (e) {
    let templist = this.data.specializations;
    templist.forEach(r => {
      if (e.detail.value.indexOf(r.name) >= 0) {
        r.checked = true;
      } else {
        r.checked = false;
      }
    });
    this.setData({
      specializations: templist
    })
  },
  inputlevel: function (e) {
    let v = e.detail.value;
    let n = e.currentTarget.dataset.name;
    let templist = this.data.specializations;
    templist.forEach(r => {
      if (n.indexOf(r.name) >= 0) {
        r.value = parseInt(v);
      }
    });
    this.setData({
      specializations: templist
    })
  }
})
