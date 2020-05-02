const app = getApp<IAppOption>()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    userId: '',
    catalogType: '1',
    displayType: 1,

    index: 0,
    level1Content: new Array<{id: string, name: string}>(),
    level1Index: 0,
    level1Money: 0,
    level2Content: new Array<{id: string, name: string}>(),
    level2DisplayName: '',
    level2Currentlevel: NaN,
    level2Targetlevel: NaN,
    level2Index: 0,
    level2Money: 0,
    level3Content: new Array<{id: string, name: string}>(),
    level3DisplayName: '',
    level3Index: 0,
    level3Money: 0,
    charactersContent: new Array<{id: string, name: string}>(),
    charactersIndex: 0,
    totalMoney: 0,
    allianceHordeMap: new Map(),
    characterClassMap: new Map(),

  },

  behaviors: [],


  lifetimes: {
    ready() {
      this.setData({
        userId: wx.getStorageSync('userId'),
        allianceHordeMap: new Map([[1, '联盟'], [2, '部落']]),
        characterClassMap: new Map([[1, '圣骑士'], [2, '战士'], [3, '死亡骑士'], [4, '猎人'], [5, '萨满祭司'], [6, '潜行者'], [7, '德鲁伊'], [8, '恶魔猎手'], [9, '法师'], [10, '牧师'], [11, '术士']])
      })
      this.getLevel1();
      this.getCharacters();
    }
  },

  methods: {
    
  getLevel1() {
    app.requestFuncPromise('/system/getCatalogList', {parentId: '0', catalogType: parseInt(this.data.catalogType)}, 'GET')
    .then(res => {
      console.log(res);
      let data = {
        level1Content: new Array<{id: string, name: string}>(),
        level1Money: res.data.catalogList[0].money
      }
      res.data.catalogList.forEach(x => {
        data.level1Content.push({id: x.id, name: x.catalogName})  
      });
      this.setData(data);
      this.getLevel2(res.data.catalogList[0].id);
    })
    .catch(res => {
      console.log(res);
    })
  },
  level1Change(e) {
    this.setData({
      level1Index: parseInt(e.detail.value)
    })
    this.getLevel2(this.data.level1Content[this.data.level1Index].id)
  },
  getLevel2(parentId: string) {
    app.requestFuncPromise('/system/getCatalogList', {parentId: parentId, catalogType: parseInt(this.data.catalogType)}, 'GET')
    .then(res => {
      console.log(res);
      this.setData({
        displayType: res.data.catalogList[0].catalogDisplayType,
        level2DisplayName: res.data.catalogList[0].catalogDisplayName,
        level2Money: res.data.catalogList[0].money
      }) 
      if(this.data.displayType == 1) {
        let data = {
          level2Content: new Array<{id: string, name: string}>(),
        }
        res.data.catalogList.forEach(x => {
          data.level2Content.push({id: x.id, name: x.catalogName})  
        });
        this.setData(data);
      }
      if(this.data.displayType == 2) {
        let temp = res.data.catalogList[0].catalogName.split('-');
        let data = {
          level2Currentlevel: parseInt(temp[0]),
          level2Targetlevel: parseInt(temp[1])
        }
        this.setData(data)
      }

      this.getLevel3(res.data.catalogList[0].id);
    })
    .catch(res => {
      console.log(res);
    })
  },
  level2Change(e) {
    this.setData({
      level2Index: parseInt(e.detail.value)
    })
    this.getLevel3(this.data.level2Content[this.data.level2Index].id)
  },
  getLevel3(parentId: string) {
    app.requestFuncPromise('/system/getCatalogList', {parentId: parentId, catalogType: parseInt(this.data.catalogType)}, 'GET')
    .then(res => {
      console.log(res);
      let data = {
        level3Content: new Array<{id: string, name: string}>(),
        level3DisplayName: res.data.catalogList[0].catalogDisplayName,
        level3Money: res.data.catalogList[0].money
      }
      res.data.catalogList.forEach(x => {
        data.level3Content.push({id: x.id, name: x.catalogName})  
      });
      this.setData(data);
      this.calcTotalMoney();
    })
    .catch(res => {
      console.log(res);
    })
  },
  level3Change(e) {
    this.setData({
      level3Index: parseInt(e.detail.value)
    })
  },

  level2CurrentLevelBlur() {
    this.calcTotalMoney();
  },
  level2TargetLevelBlur() {
    this.calcTotalMoney();
  },

  level2CurrentLevelInput(e) {
    this.setData({
      level2Currentlevel: parseInt(e.detail.value)
    })
  },
  level2TargetLevelInput(e) {
    this.setData({
      level2Targetlevel: parseInt(e.detail.value)
    })
  },

  calcTotalMoney() {
    if(this.data.displayType == 1) {
      this.setData({
        totalMoney: this.data.level1Money + this.data.level2Money + this.data.level3Money
      })
    }
    if(this.data.displayType == 2) {
      this.setData({
        totalMoney: this.data.level1Money +  (this.data.level2Targetlevel - this.data.level2Currentlevel) * this.data.level2Money + this.data.level3Money
      })
    }
  },

  getCharacters() {
    const _this = this;
    app.requestFunc('/user/getCharacterList', {userId: this.data.userId, realmType: this.data.catalogType}, 'GET', res => {
      console.log(res.data);
        if (res.data.success == true) {
          let data = {
            charactersContent: new Array<{id: string, name: string}>()
          }
          res.data.list.forEach(x => {
            data.charactersContent.push({id: x.characterId, name: x.characterName + '(' + x.accountName + ')' + '/' + _this.data.allianceHordeMap.get(x.allianceHorde) + '/' + _this.data.characterClassMap.get(x.characterClass)})  
          });
          this.setData(data)
        }
    })
  },
  charactersChange(e) {
    this.setData({
      charactersIndex: parseInt(e.detail.value)
    })
  },

  changeCatalogType(e) {
    this.setData({
      catalogType: e.currentTarget.dataset.type
    })
    this.getLevel1();
    this.getCharacters();
  },
  NavToCreateOrder() {
    let transdata = {
      characterName: this.data.charactersContent[this.data.charactersIndex].name,
      orderCatalog: '',
      orderCatalog1: this.data.level1Content[this.data.level1Index].id,
      orderCatalog2: this.data.level2Content[this.data.level2Index].id,
      orderCatalog3: this.data.level3Content[this.data.level3Index].id,
      money: this.data.totalMoney,
      characterId: this.data.charactersContent[this.data.charactersIndex].id
    }
    if(this.data.displayType == 1) {
      transdata.orderCatalog = this.data.level1Content[this.data.level1Index].name + '/' + this.data.level2Content[this.data.level2Index].name + '/' + this.data.level3Content[this.data.level3Index].name
    }
    if(this.data.displayType == 2) {
      transdata.orderCatalog = this.data.level1Content[this.data.level1Index].name + '/' + this.data.level2Currentlevel + '-' + this.data.level2Targetlevel + '/' + this.data.level3Content[this.data.level3Index].name
    }
    const comData = JSON.stringify(transdata)
    wx.navigateTo({
      url: '../../OrderService/OrderEntry/OrderEntry' + '?data=' + comData,
      success: function(res){ },
      fail: function() { },
      complete: function() { }
    })
  },
  }
})