const app = getApp()

Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    }, 
    isGoHome: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    isTitle: {
      type: [Boolean, String],
      default: false
    },
    hasContent: {
      type: [Boolean, String],
      default: false
    },
    showAvatar:{
      type: [Boolean, String],
      default: false
    },
    avatarImageUrl:{
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    },
    searchText: {
      type: String,
      default: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },

  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    toHome(){
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})
