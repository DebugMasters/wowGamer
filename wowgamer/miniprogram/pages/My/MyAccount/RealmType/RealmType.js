"use strict";
var app = getApp();
Page({
    data: {
        mode: '',
        accountId: ''
    },
    onLoad: function (option) {
        this.setData({
            mode: option.mode,
            accountId: option.accountId
        });
    },
    navToCharacterEntry: function (e) {
        wx.navigateTo({
            url: '../CharacterEntry/CharacterEntry?mode=' + this.data.mode + '&realmType=' + e.currentTarget.dataset.realmtype + '&accountId=' + this.data.accountId,
            success: function (res) { },
            fail: function () { },
            complete: function () { }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhbG1UeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUmVhbG1UeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQTtBQUVoQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxFQUFFO0tBQ2Q7SUFDRCxNQUFNLFlBQUMsTUFBTTtRQUNYLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxJQUFJLEVBQUcsTUFBTSxDQUFDLElBQUk7WUFDbEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO1NBQzVCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxtQkFBbUIsWUFBQyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsd0NBQXdDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ3hKLE9BQU8sRUFBRSxVQUFTLEdBQUcsSUFBRyxDQUFDO1lBQ3pCLElBQUksRUFBRSxjQUFhLENBQUM7WUFDcEIsUUFBUSxFQUFFLGNBQWEsQ0FBQztTQUN6QixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcbi8vIOiOt+WPluW6lOeUqOWunuS+i1xuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICBtb2RlOiAnJyxcbiAgICBhY2NvdW50SWQ6ICcnXG4gIH0sXG4gIG9uTG9hZChvcHRpb24pIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbW9kZSA6IG9wdGlvbi5tb2RlLFxuICAgICAgYWNjb3VudElkOiBvcHRpb24uYWNjb3VudElkXG4gICAgfSlcbiAgfSxcbiAgbmF2VG9DaGFyYWN0ZXJFbnRyeShlKSB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcuLi9DaGFyYWN0ZXJFbnRyeS9DaGFyYWN0ZXJFbnRyeT9tb2RlPScgKyB0aGlzLmRhdGEubW9kZSArICcmcmVhbG1UeXBlPScgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5yZWFsbXR5cGUgKyAnJmFjY291bnRJZD0nICsgdGhpcy5kYXRhLmFjY291bnRJZCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7IH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbigpIHsgfSxcbiAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHsgfVxuICAgIH0pXG4gIH1cbn0pXG4iXX0=