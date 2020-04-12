// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    mode: '',
    realmType: '',
    accountId :'',
    disableCheck1: false,
    specializations: [
      { name: '冰霜', value: "0", checked: false },
      {name: '火焰', value: "1", checked: false },
      {name: '奥数', value: "2", checked: false }
    ],//专精
    allienceHorde: [

    ],
    jobs: [
      ['联盟', '部落'],
      ['战士', '萨满祭司', '猎人', '潜行者', '德鲁伊', '牧师', '术士', '法师']
    ],
    jobIndex: [0, 0],
    servers: [
      ['五区', '一区'],
      ['安娜丝塔丽', '阿什坎迪', '巴罗夫', '比格沃斯', '碧空之歌', '匕首岭', '比斯巨兽', '布鲁', '厄运之槌', '法尔班克斯']
    ],
    serverIndex: [0, 0],
  },
  onLoad(option) {
    if(option.mode == 'AddNew') {
      this.setData({
        mode : option.mode,
        realmType: option.realmType,
        accountId: option.accountId
      })
    } else if (option.mode == 'Modify') {
      this.setData({
        mode : option.mode,
        characterId: option.characterId
      })
    }
  },
  formSubmit(e) {
    let detailData = {
      characterId: '',
      characterName: e.detail.value.characterName,
      characterAccount: this.data.accountId,
      characterRealm: 1,
      characterRealmType: 1,
      characterClass: 1,
      allianceHorde: 9,
      characterSpecialization: 1,
      userId: wx.getStorageSync('id')
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
          delta: 2
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
    this.setData({
      multiIndex: e.detail.value
    })
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
            data.jobs[1] = ['战士', '萨满祭司', '猎人', '潜行者', '德鲁伊', '牧师', '术士', '法师'];
            break;
          case 1:
            data.jobs[1] = ['战士', '萨满祭司', '猎人', '潜行者', '德鲁伊', '牧师', '术士', '法师'];
            break;
        }
        data.jobIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  serversChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  serversColumnChange(e) {
    let data = {
      servers: this.data.servers,
      serverIndex: this.data.serverIndex
    };
    data.serverIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.serverIndex[0]) {
          case 0:
            data.servers[1] = ['安娜丝塔丽', '阿什坎迪', '巴罗夫', '比格沃斯', '碧空之歌', '匕首岭', '比斯巨兽', '布鲁', '厄运之槌', '法尔班克斯'];
            break;
          case 1:
            data.servers[1] = ['艾隆纳亚', '埃提耶什', '奥金斧', '奥罗', '碧玉矿洞', '德姆塞卡尔', '骨火', '哈霍兰', '寒脊山小径', '黑曜石之锋', '怀特迈恩', '灰烬使者', '毁灭之刃'];
            break;
        }
        data.serverIndex[1] = 0;
        break;
    }
    this.setData(data);
  },

  checkboxChange: function (e) {
    let templist = this.data.specializations;
    templist.forEach(r => {
      if (e.detail.value.indexOf(r.value) >= 0) {
        r.checked = true;
      } else {
        r.checked = false;
      }
    });

    this.setData({
      specializations: templist
    })
    
  }
})
