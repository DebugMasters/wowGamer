/// <reference path="./types/index.d.ts" />
/// <reference path="./types/customEnum.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    URL: string, //jzhoou
    isAuthorized: boolean //jzhoou
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}