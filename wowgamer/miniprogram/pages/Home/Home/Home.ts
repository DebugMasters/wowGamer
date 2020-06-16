const app = getApp<IAppOption>()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    loading: true,
    loadProgress: 0,
    articleList: [],
    carouselList: [],
    notificationList: ['AAA']
  },

  behaviors: [],


  lifetimes: {
    ready() {
    }
  },

  methods: {
    initData() {
      this.setData({
        loading: true,
        loadProgress: 0
      })
      this.loadProgress();
      this.getIndexInfo();
    },
    loadProgress(){
      this.setData({
        loadProgress: this.data.loadProgress + 3
      })
      if (this.data.loadProgress < 98){
        setTimeout(() => {
          this.loadProgress();
        }, 300)
      } else {
        if(!this.data.loading) {
          return
        }
      }
    },
    getIndexInfo() {
      app.requestFunc('/system/getIndexInfo', {}, 'GET', res => {
        console.log(res.data);
        if (res.data.success == true) {
          this.setData({
            carouselList: res.data.carouselList,
            articleList: res.data.articleList,
            // notificationList: res.data.notificationList
            loading: false
          })
        }
      })
    },
    navToMy: function () {
      this.triggerEvent('switchTab', {tabIndex: '5'});
    },
  }
})