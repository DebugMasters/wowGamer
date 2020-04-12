"use strict";
var app = getApp();
Page({
    data: {
        userId: '',
        accountId: '',
        CharactorList: []
    },
    onLoad: function (option) {
        this.setData({
            userId: option.id,
            accountId: option.accountId
        });
    },
    onShow: function () {
        this.queryList();
    },
    queryList: function () {
        var _this_1 = this;
        app.requestFunc('/user/getCharacterList', { userId: this.data.userId, accountId: this.data.accountId }, 'GET', function (res) {
            console.log(res.data);
            if (res.data.success == true) {
                _this_1.setData({
                    CharactorList: res.data.list
                });
            }
        });
    },
    createNewCharacter: function () {
        wx.navigateTo({
            url: './RealmType/RealmType?mode=AddNew&accountId=' + this.data.accountId,
            success: function (res) { },
            fail: function () { },
            complete: function () { }
        });
    },
    navToCaracterEntry: function (e) {
        wx.navigateTo({
            url: '../CharacterEntry/CharacterEntry?mode=Modify' + '&characterId=' + e.currentTarget.dataset.characterid,
            success: function (res) { },
            fail: function () { },
            complete: function () { }
        });
    },
    deleteCharacter: function (e) {
        var _this = this;
        wx.showModal({
            title: '提示',
            content: '是否删除该角色',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                    app.requestFunc('/user/deleteCharacter', { userId: wx.getStorageSync('id'), characterId: e.currentTarget.dataset.characterid }, 'POST', function (res) {
                        console.log(res.data);
                        if (res.data.success == true) {
                            wx.showToast({
                                title: res.data.msg,
                                icon: 'success',
                                duration: 1000
                            });
                            _this.queryList();
                        }
                        else {
                            wx.showToast({
                                title: res.data.msg,
                                icon: 'none',
                                duration: 1000
                            });
                        }
                    });
                }
                else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlBY2NvdW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTXlBY2NvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQTtBQUVoQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxFQUFFO1FBQ2IsYUFBYSxFQUFFLEVBQUU7S0FDbEI7SUFDRCxNQUFNLFlBQUMsTUFBTTtRQUNYLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDakIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO1NBQzVCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDRCxTQUFTO1FBQVQsbUJBU0M7UUFSQyxHQUFHLENBQUMsV0FBVyxDQUFDLHdCQUF3QixFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxFQUFFLEtBQUssRUFBRSxVQUFBLEdBQUc7WUFDOUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQzVCLE9BQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsYUFBYSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtpQkFDN0IsQ0FBQyxDQUFBO2FBQ0g7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxrQkFBa0I7UUFDaEIsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSw4Q0FBOEMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDekUsT0FBTyxFQUFFLFVBQVMsR0FBRyxJQUFHLENBQUM7WUFDekIsSUFBSSxFQUFFLGNBQWEsQ0FBQztZQUNwQixRQUFRLEVBQUUsY0FBYSxDQUFDO1NBQ3pCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxrQkFBa0IsWUFBQyxDQUFDO1FBQ2xCLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsOENBQThDLEdBQUcsZUFBZSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDM0csT0FBTyxFQUFFLFVBQVMsR0FBRyxJQUFHLENBQUM7WUFDekIsSUFBSSxFQUFFLGNBQWEsQ0FBQztZQUNwQixRQUFRLEVBQUUsY0FBYSxDQUFDO1NBQ3pCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxlQUFlLFlBQUMsQ0FBQztRQUNmLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNsQixFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsU0FBUztZQUNsQixPQUFPLFlBQUUsR0FBRztnQkFDVixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7b0JBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtvQkFDckIsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUMsRUFBRSxNQUFNLEVBQUUsVUFBQSxHQUFHO3dCQUN2SSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7NEJBQzVCLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRztnQ0FDbkIsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsUUFBUSxFQUFFLElBQUk7NkJBQ2YsQ0FBQyxDQUFBOzRCQUNGLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQzt5QkFDbkI7NkJBQU07NEJBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHO2dDQUNuQixJQUFJLEVBQUUsTUFBTTtnQ0FDWixRQUFRLEVBQUUsSUFBSTs2QkFDZixDQUFDLENBQUE7eUJBQ0g7b0JBQ0gsQ0FBQyxDQUFDLENBQUE7aUJBQ0g7cUJBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2lCQUN0QjtZQUNILENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICB1c2VySWQ6ICcnLFxuICAgIGFjY291bnRJZDogJycsXG4gICAgQ2hhcmFjdG9yTGlzdDogW11cbiAgfSxcbiAgb25Mb2FkKG9wdGlvbikge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB1c2VySWQ6IG9wdGlvbi5pZCxcbiAgICAgIGFjY291bnRJZDogb3B0aW9uLmFjY291bnRJZFxuICAgIH0pICAgIFxuICB9LFxuICBvblNob3coKSB7XG4gICAgdGhpcy5xdWVyeUxpc3QoKTtcbiAgfSxcbiAgcXVlcnlMaXN0KCkge1xuICAgIGFwcC5yZXF1ZXN0RnVuYygnL3VzZXIvZ2V0Q2hhcmFjdGVyTGlzdCcsIHt1c2VySWQ6IHRoaXMuZGF0YS51c2VySWQsIGFjY291bnRJZDogdGhpcy5kYXRhLmFjY291bnRJZH0sICdHRVQnLCByZXMgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIENoYXJhY3Rvckxpc3Q6IHJlcy5kYXRhLmxpc3RcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSlcbiAgfSxcbiAgY3JlYXRlTmV3Q2hhcmFjdGVyKCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi9SZWFsbVR5cGUvUmVhbG1UeXBlP21vZGU9QWRkTmV3JmFjY291bnRJZD0nICsgdGhpcy5kYXRhLmFjY291bnRJZCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7IH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbigpIHsgfSxcbiAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHsgfVxuICAgIH0pXG4gIH0sXG4gIG5hdlRvQ2FyYWN0ZXJFbnRyeShlKSB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcuLi9DaGFyYWN0ZXJFbnRyeS9DaGFyYWN0ZXJFbnRyeT9tb2RlPU1vZGlmeScgKyAnJmNoYXJhY3RlcklkPScgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jaGFyYWN0ZXJpZCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7IH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbigpIHsgfSxcbiAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHsgfVxuICAgIH0pXG4gIH0sXG4gIGRlbGV0ZUNoYXJhY3RlcihlKSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzXG4gICAgd3guc2hvd01vZGFsKHtcbiAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIGNvbnRlbnQ6ICfmmK/lkKbliKDpmaTor6Xop5LoibInLFxuICAgICAgc3VjY2VzcyAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKVxuICAgICAgICAgIGFwcC5yZXF1ZXN0RnVuYygnL3VzZXIvZGVsZXRlQ2hhcmFjdGVyJywge3VzZXJJZDogd3guZ2V0U3RvcmFnZVN5bmMoJ2lkJyksIGNoYXJhY3RlcklkOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jaGFyYWN0ZXJpZH0sICdQT1NUJywgcmVzID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5zdWNjZXNzID09IHRydWUpIHtcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEubXNnLFxuICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBfdGhpcy5xdWVyeUxpc3QoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhLm1zZyxcbiAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn0pXG4iXX0=