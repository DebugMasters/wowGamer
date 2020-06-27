// 获取应用实例
let app = getApp<IAppOption>()

Page({
  data: {
    userId: '',
    coverSrcPath: '',
    imgSrcPath: ''
  },
  onLoad: function (options) {
    this.setData({
      userId: options.id,
      coverSrcPath: app.globalData.RootURL + 'warcraft/static/img/share.jpg'
    })
  },

  onShow: function () {
    const _this = this;

    app.requestFuncPromise('/system/getPoster', {userId: this.data.userId, page: "pages/Index/Index", width: 50}, 'POST')
    .then(res => {
      if (res.data.success == true) {
        return app.globalData.RootURL + res.data.poster
      }
    })
    .then(qrPath => {
      console.log(qrPath);
      _this.drawCanvas(qrPath);
    })
  },
  drawCanvas: function (qrPath: string) {
    const _this = this;
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        // ctx.fillRect(0, 0, 300, 300)
        
        let cover = canvas.createImage();
        cover.src = _this.data.coverSrcPath;
        cover.onload = () => {
          ctx.drawImage(cover, 0, 0);
          let qr = canvas.createImage();
          qr.src = qrPath;
          qr.onload = () => {
            ctx.drawImage(qr, 0, 350, 150, 150);
            ctx.fillText('邀请好友免费送优惠券！', 160, 400);
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              destHeight: canvas.height,
              destWidth: canvas.width,
              canvas,
              success: res => {
                console.log(res.tempFilePath);
                _this.setData({
                  imgSrc: res.tempFilePath
                })
              }
            })
          }
        }
      })
  },
  savePoster: function (e) {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imgSrc,
      success(result) {
        wx.showToast({
          title: '图片保存成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
})
