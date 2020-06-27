/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo: WechatMiniprogram.UserInfo,
    URL: string, //jzhoou
    RootURL: string, //jzhoou
    isAuthorized: boolean //jzhoou,
    isShared: boolean,
    sharedUserId: string,
    StatusBar: number,
    Custom: WechatMiniprogram.Rect,
    CustomBar: number,
    WindowHeight: number,
    ScreenHeight: number
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}