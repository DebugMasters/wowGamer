const app = getApp<IAppOption>()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    articleList: [],
    carouselList: [],
    notificationList: ['AAA']
  },

  behaviors: [],


  lifetimes: {
    ready() {
      this.getIndexInfo();
    }
  },

  methods: {
    getIndexInfo() {
      app.requestFunc('/system/getIndexInfo', {}, 'GET', res => {
        console.log(res.data);
        if (res.data.success == true) {
          this.setData({
            carouselList: res.data.carouselList,
            articleList: res.data.articleList,
            // notificationList: res.data.notificationList
          })
        }
      })
    },
    navToMy: function () {
      wx.switchTab({
        url: '../../My/My/My'
      })
    },
  }
})