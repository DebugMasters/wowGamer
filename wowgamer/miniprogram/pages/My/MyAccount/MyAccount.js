"use strict";
const app = getApp();
Page({
    data: {
        userId: '',
        accountId: '',
        CharactorList: new Array()
    },
    onLoad(option) {
        this.setData({
            userId: option.id,
            accountId: option.accountId
        });
    },
    onShow() {
        this.queryList();
    },
    queryList() {
        app.requestFunc('/user/getCharacterList', { userId: this.data.userId, accountId: this.data.accountId }, 'GET', res => {
            console.log(res.data);
            if (res.data.success == true) {
                let tempList = res.data.list;
                tempList.forEach(x => {
                    x.imgUrl = app.globalData.RootURL + 'warcraft/static/img/' + app.getResourcePath(x.characterClass.toString(), 'character');
                });
                this.setData({
                    CharactorList: tempList
                });
            }
        });
    },
    createNewCharacter() {
        wx.navigateTo({
            url: './RealmType/RealmType?mode=AddNew&accountId=' + this.data.accountId,
            success: function (res) { },
            fail: function () { },
            complete: function () { }
        });
    },
    navToCaracterEntry(e) {
        wx.navigateTo({
            url: '../MyAccount/CharacterEntry/CharacterEntry?mode=Modify' + '&accountId=' + this.data.accountId + '&characterId=' + e.currentTarget.dataset.characterid,
            success: function (res) { },
            fail: function () { },
            complete: function () { }
        });
    },
    deleteCharacter(e) {
        const _this = this;
        wx.showModal({
            title: '提示',
            content: '是否删除该角色',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                    app.requestFunc('/user/deleteCharacter', { userId: wx.getStorageSync('userId'), characterId: e.currentTarget.dataset.characterid }, 'POST', res => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlBY2NvdW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTXlBY2NvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQTtBQUVoQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsRUFBRTtRQUNWLFNBQVMsRUFBRSxFQUFFO1FBQ2IsYUFBYSxFQUFFLElBQUksS0FBSyxFQUFFO0tBQzNCO0lBQ0QsTUFBTSxDQUFDLE1BQU07UUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ2pCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztTQUM1QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsTUFBTTtRQUNKLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBQ0QsU0FBUztRQUNQLEdBQUcsQ0FBQyxXQUFXLENBQUMsd0JBQXdCLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ2pILE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO2dCQUM1QixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQTtnQkFDNUIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDbkIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUE7Z0JBQzVILENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsYUFBYSxFQUFFLFFBQVE7aUJBQ3hCLENBQUMsQ0FBQTthQUNIO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0Qsa0JBQWtCO1FBQ2hCLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsOENBQThDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ3pFLE9BQU8sRUFBRSxVQUFTLEdBQUcsSUFBRyxDQUFDO1lBQ3pCLElBQUksRUFBRSxjQUFhLENBQUM7WUFDcEIsUUFBUSxFQUFFLGNBQWEsQ0FBQztTQUN6QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0Qsa0JBQWtCLENBQUMsQ0FBQztRQUNsQixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLHdEQUF3RCxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVztZQUMzSixPQUFPLEVBQUUsVUFBUyxHQUFHLElBQUcsQ0FBQztZQUN6QixJQUFJLEVBQUUsY0FBYSxDQUFDO1lBQ3BCLFFBQVEsRUFBRSxjQUFhLENBQUM7U0FDekIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELGVBQWUsQ0FBQyxDQUFDO1FBQ2YsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFBO1FBQ2xCLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDWCxLQUFLLEVBQUUsSUFBSTtZQUNYLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLE9BQU8sQ0FBRSxHQUFHO2dCQUNWLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtvQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO29CQUNyQixHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLEVBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTt3QkFDOUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3RCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFOzRCQUM1QixFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUc7Z0NBQ25CLElBQUksRUFBRSxTQUFTO2dDQUNmLFFBQVEsRUFBRSxJQUFJOzZCQUNmLENBQUMsQ0FBQTs0QkFDRixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7eUJBQ25COzZCQUFNOzRCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1gsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRztnQ0FDbkIsSUFBSSxFQUFFLE1BQU07Z0NBQ1osUUFBUSxFQUFFLElBQUk7NkJBQ2YsQ0FBQyxDQUFBO3lCQUNIO29CQUNILENBQUMsQ0FBQyxDQUFBO2lCQUNIO3FCQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtpQkFDdEI7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXHJcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xyXG5jb25zdCBhcHAgPSBnZXRBcHA8SUFwcE9wdGlvbj4oKVxyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgdXNlcklkOiAnJyxcclxuICAgIGFjY291bnRJZDogJycsXHJcbiAgICBDaGFyYWN0b3JMaXN0OiBuZXcgQXJyYXkoKVxyXG4gIH0sXHJcbiAgb25Mb2FkKG9wdGlvbikge1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgdXNlcklkOiBvcHRpb24uaWQsXHJcbiAgICAgIGFjY291bnRJZDogb3B0aW9uLmFjY291bnRJZFxyXG4gICAgfSkgICAgXHJcbiAgfSxcclxuICBvblNob3coKSB7XHJcbiAgICB0aGlzLnF1ZXJ5TGlzdCgpO1xyXG4gIH0sXHJcbiAgcXVlcnlMaXN0KCkge1xyXG4gICAgYXBwLnJlcXVlc3RGdW5jKCcvdXNlci9nZXRDaGFyYWN0ZXJMaXN0Jywge3VzZXJJZDogdGhpcy5kYXRhLnVzZXJJZCwgYWNjb3VudElkOiB0aGlzLmRhdGEuYWNjb3VudElkfSwgJ0dFVCcsIHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICBpZiAocmVzLmRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICBsZXQgdGVtcExpc3QgPSByZXMuZGF0YS5saXN0XHJcbiAgICAgICAgICB0ZW1wTGlzdC5mb3JFYWNoKHggPT4ge1xyXG4gICAgICAgICAgICB4LmltZ1VybCA9IGFwcC5nbG9iYWxEYXRhLlJvb3RVUkwgKyAnd2FyY3JhZnQvc3RhdGljL2ltZy8nICsgYXBwLmdldFJlc291cmNlUGF0aCh4LmNoYXJhY3RlckNsYXNzLnRvU3RyaW5nKCksICdjaGFyYWN0ZXInKVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBDaGFyYWN0b3JMaXN0OiB0ZW1wTGlzdFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgY3JlYXRlTmV3Q2hhcmFjdGVyKCkge1xyXG4gICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgIHVybDogJy4vUmVhbG1UeXBlL1JlYWxtVHlwZT9tb2RlPUFkZE5ldyZhY2NvdW50SWQ9JyArIHRoaXMuZGF0YS5hY2NvdW50SWQsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7IH0sXHJcbiAgICAgIGZhaWw6IGZ1bmN0aW9uKCkgeyB9LFxyXG4gICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7IH1cclxuICAgIH0pXHJcbiAgfSxcclxuICBuYXZUb0NhcmFjdGVyRW50cnkoZSkge1xyXG4gICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgIHVybDogJy4uL015QWNjb3VudC9DaGFyYWN0ZXJFbnRyeS9DaGFyYWN0ZXJFbnRyeT9tb2RlPU1vZGlmeScgKyAnJmFjY291bnRJZD0nICsgdGhpcy5kYXRhLmFjY291bnRJZCArICcmY2hhcmFjdGVySWQ9JyArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmNoYXJhY3RlcmlkLFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpeyB9LFxyXG4gICAgICBmYWlsOiBmdW5jdGlvbigpIHsgfSxcclxuICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkgeyB9XHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgZGVsZXRlQ2hhcmFjdGVyKGUpIHtcclxuICAgIGNvbnN0IF90aGlzID0gdGhpc1xyXG4gICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgdGl0bGU6ICfmj5DnpLonLFxyXG4gICAgICBjb250ZW50OiAn5piv5ZCm5Yig6Zmk6K+l6KeS6ImyJyxcclxuICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJylcclxuICAgICAgICAgIGFwcC5yZXF1ZXN0RnVuYygnL3VzZXIvZGVsZXRlQ2hhcmFjdGVyJywge3VzZXJJZDogd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpLCBjaGFyYWN0ZXJJZDogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY2hhcmFjdGVyaWR9LCAnUE9TVCcsIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEubXNnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIF90aGlzLnF1ZXJ5TGlzdCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEubXNnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufSlcclxuIl19