"use strict";
const app = getApp();
Component({
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
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
        showAvatar: {
            type: [Boolean, String],
            default: false
        },
        avatarImageUrl: {
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
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom
    },
    methods: {
        BackPage() {
            wx.navigateBack({
                delta: 1
            });
        },
        toHome() {
            wx.reLaunch({
                url: '/pages/index/index',
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF2aWdhdGlvbkJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk5hdmlnYXRpb25CYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFBO0FBRXBCLFNBQVMsQ0FBQztJQUNSLE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRSxJQUFJO1FBQ3BCLGFBQWEsRUFBRSxJQUFJO0tBQ3BCO0lBSUQsVUFBVSxFQUFFO1FBQ1YsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsRUFBRTtTQUNaO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztZQUN2QixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztZQUN2QixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztZQUN2QixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztZQUN2QixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsVUFBVSxFQUFDO1lBQ1QsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztZQUN2QixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsY0FBYyxFQUFDO1lBQ2IsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsRUFBRTtTQUNaO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsRUFBRTtTQUNaO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsRUFBRTtTQUNaO0tBQ0Y7SUFLRCxJQUFJLEVBQUU7UUFDSixTQUFTLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTO1FBQ25DLFNBQVMsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVM7UUFDbkMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTTtLQUM5QjtJQUtELE9BQU8sRUFBRTtRQUNQLFFBQVE7WUFDTixFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUNkLEtBQUssRUFBRSxDQUFDO2FBQ1QsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU07WUFDSixFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNWLEdBQUcsRUFBRSxvQkFBb0I7YUFDMUIsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gZ2V0QXBwKClcclxuXHJcbkNvbXBvbmVudCh7XHJcbiAgb3B0aW9uczoge1xyXG4gICAgYWRkR2xvYmFsQ2xhc3M6IHRydWUsXHJcbiAgICBtdWx0aXBsZVNsb3RzOiB0cnVlXHJcbiAgfSxcclxuICAvKipcclxuICAgKiDnu4Tku7bnmoTlsZ7mgKfliJfooahcclxuICAgKi9cclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBiZ0NvbG9yOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZGVmYXVsdDogJydcclxuICAgIH0sIFxyXG4gICAgaXNHb0hvbWU6IHtcclxuICAgICAgdHlwZTogW0Jvb2xlYW4sIFN0cmluZ10sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgaXNCYWNrOiB7XHJcbiAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxyXG4gICAgICBkZWZhdWx0OiBmYWxzZVxyXG4gICAgfSxcclxuICAgIGlzVGl0bGU6IHtcclxuICAgICAgdHlwZTogW0Jvb2xlYW4sIFN0cmluZ10sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgaGFzQ29udGVudDoge1xyXG4gICAgICB0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcclxuICAgICAgZGVmYXVsdDogZmFsc2VcclxuICAgIH0sXHJcbiAgICBzaG93QXZhdGFyOntcclxuICAgICAgdHlwZTogW0Jvb2xlYW4sIFN0cmluZ10sXHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgYXZhdGFySW1hZ2VVcmw6e1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGRlZmF1bHQ6ICcnXHJcbiAgICB9LFxyXG4gICAgYmdJbWFnZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGRlZmF1bHQ6ICcnXHJcbiAgICB9LFxyXG4gICAgc2VhcmNoVGV4dDoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGRlZmF1bHQ6ICcnXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog57uE5Lu255qE5Yid5aeL5pWw5o2uXHJcbiAgICovXHJcbiAgZGF0YToge1xyXG4gICAgU3RhdHVzQmFyOiBhcHAuZ2xvYmFsRGF0YS5TdGF0dXNCYXIsXHJcbiAgICBDdXN0b21CYXI6IGFwcC5nbG9iYWxEYXRhLkN1c3RvbUJhcixcclxuICAgIEN1c3RvbTogYXBwLmdsb2JhbERhdGEuQ3VzdG9tXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog57uE5Lu255qE5pa55rOV5YiX6KGoXHJcbiAgICovXHJcbiAgbWV0aG9kczoge1xyXG4gICAgQmFja1BhZ2UoKSB7XHJcbiAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgZGVsdGE6IDFcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgdG9Ib21lKCl7XHJcbiAgICAgIHd4LnJlTGF1bmNoKHtcclxuICAgICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnLFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl19