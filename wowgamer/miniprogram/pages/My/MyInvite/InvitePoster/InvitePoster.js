"use strict";
let app = getApp();
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
        });
    },
    onShow: function () {
        const _this = this;
        app.requestFuncPromise('/system/getPoster', { userId: this.data.userId, page: "pages/Index/Index", width: 50 }, 'POST')
            .then(res => {
            if (res.data.success == true) {
                return app.globalData.RootURL + res.data.poster;
            }
        })
            .then(qrPath => {
            console.log(qrPath);
            _this.drawCanvas(qrPath);
        });
    },
    drawCanvas: function (qrPath) {
        const _this = this;
        const query = wx.createSelectorQuery();
        query.select('#myCanvas')
            .fields({ node: true, size: true })
            .exec((res) => {
            const canvas = res[0].node;
            const ctx = canvas.getContext('2d');
            const dpr = wx.getSystemInfoSync().pixelRatio;
            canvas.width = res[0].width * dpr;
            canvas.height = res[0].height * dpr;
            ctx.scale(dpr, dpr);
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
                            });
                        }
                    });
                };
            };
        });
    },
    savePoster: function (e) {
        wx.saveImageToPhotosAlbum({
            filePath: this.data.imgSrc,
            success(result) {
                wx.showToast({
                    title: '图片保存成功',
                    icon: 'success',
                    duration: 2000
                });
            }
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlUG9zdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSW52aXRlUG9zdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxJQUFJLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQTtBQUU5QixJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsRUFBRTtRQUNWLFlBQVksRUFBRSxFQUFFO1FBQ2hCLFVBQVUsRUFBRSxFQUFFO0tBQ2Y7SUFDRCxNQUFNLEVBQUUsVUFBVSxPQUFPO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUU7WUFDbEIsWUFBWSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLCtCQUErQjtTQUN2RSxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsTUFBTSxFQUFFO1FBQ04sTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRW5CLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQyxFQUFFLE1BQU0sQ0FBQzthQUNwSCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDVixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtnQkFDNUIsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTthQUNoRDtRQUNILENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQTtJQUNKLENB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cHRpb24+KClcclxuXHJcblBhZ2Uoe1xyXG4gIGRhdGE6IHtcclxuICAgIHVzZXJJZDogJycsXHJcbiAgICBjb3ZlclNyY1BhdGg6ICcnLFxyXG4gICAgaW1nU3JjUGF0aDogJydcclxuICB9LFxyXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHVzZXJJZDogb3B0aW9ucy5pZCxcclxuICAgICAgY292ZXJTcmNQYXRoOiBhcHAuZ2xvYmFsRGF0YS5Sb290VVJMICsgJ3dhcmNyYWZ0L3N0YXRpYy9pbWcvc2hhcmUuanBnJ1xyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICBhcHAucmVxdWVzdEZ1bmNQcm9taXNlKCcvc3lzdGVtL2dldFBvc3RlcicsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWQsIHBhZ2U6IFwicGFnZXMvSW5kZXgvSW5kZXhcIiwgd2lkdGg6IDUwfSwgJ1BPU1QnKVxyXG4gICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiBhcHAuZ2xvYmFsRGF0YS5Sb290VVJMICsgcmVzLmRhdGEucG9zdGVyXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAudGhlbihxclBhdGggPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhxclBhdGgpO1xyXG4gICAgICBfdGhpcy5kcmF3Q2FudmFzKHFyUGF0aCk7XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZHJhd0NhbnZhczogZnVuY3Rpb24gKHFyUGF0aDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICBjb25zdCBxdWVyeSA9IHd4LmNyZWF0ZVNlbGVjdG9yUXVlcnkoKVxyXG4gICAgcXVlcnkuc2VsZWN0KCcjbXlDYW52YXMnKVxyXG4gICAgICAuZmllbGRzKHsgbm9kZTogdHJ1ZSwgc2l6ZTogdHJ1ZSB9KVxyXG4gICAgICAuZXhlYygocmVzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY2FudmFzID0gcmVzWzBdLm5vZGVcclxuICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxyXG5cclxuICAgICAgICBjb25zdCBkcHIgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLnBpeGVsUmF0aW9cclxuICAgICAgICBjYW52YXMud2lkdGggPSByZXNbMF0ud2lkdGggKiBkcHJcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gcmVzWzBdLmhlaWdodCAqIGRwclxyXG4gICAgICAgIGN0eC5zY2FsZShkcHIsIGRwcilcclxuICAgICAgICAvLyBjdHguZmlsbFJlY3QoMCwgMCwgMzAwLCAzMDApXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvdmVyID0gY2FudmFzLmNyZWF0ZUltYWdlKCk7XHJcbiAgICAgICAgY292ZXIuc3JjID0gX3RoaXMuZGF0YS5jb3ZlclNyY1BhdGg7XHJcbiAgICAgICAgY292ZXIub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgY3R4LmRyYXdJbWFnZShjb3ZlciwgMCwgMCk7XHJcbiAgICAgICAgICBsZXQgcXIgPSBjYW52YXMuY3JlYXRlSW1hZ2UoKTtcclxuICAgICAgICAgIHFyLnNyYyA9IHFyUGF0aDtcclxuICAgICAgICAgIHFyLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShxciwgMCwgMzUwLCAxNTAsIDE1MCk7XHJcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgn6YKA6K+35aW95Y+L5YWN6LS56YCB5LyY5oOg5Yi477yBJywgMTYwLCA0MDApO1xyXG4gICAgICAgICAgICB3eC5jYW52YXNUb1RlbXBGaWxlUGF0aCh7XHJcbiAgICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICAgIGRlc3RIZWlnaHQ6IGNhbnZhcy5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgZGVzdFdpZHRoOiBjYW52YXMud2lkdGgsXHJcbiAgICAgICAgICAgICAgY2FudmFzLFxyXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMudGVtcEZpbGVQYXRoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICBpbWdTcmM6IHJlcy50ZW1wRmlsZVBhdGhcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICB9LFxyXG4gIHNhdmVQb3N0ZXI6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB3eC5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcclxuICAgICAgZmlsZVBhdGg6IHRoaXMuZGF0YS5pbWdTcmMsXHJcbiAgICAgIHN1Y2Nlc3MocmVzdWx0KSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn5Zu+54mH5L+d5a2Y5oiQ5YqfJyxcclxuICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG59KVxyXG4iXX0=