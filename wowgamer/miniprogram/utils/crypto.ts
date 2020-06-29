const CryptoJS = require("crypto-js")
const defaultKey = "23d$%Z#werz^cew@@$#@"; // 默认的key
const defaultIv = "olNGRWos02o01920xx#"; // 默认的key 偏移量

/**
 * 加密方法
 * @param: str 需要加密的字符
 * @param: key 密钥
 * @param: iv 密钥偏移量
 */
function encrypt(str: string, key?: string, iv?: string) {
  const keyStr = key ? encParse(key) : encParse(defaultKey);
  const ivStr = iv ? encParse(iv) : encParse(defaultIv);

  const encryptedStr = CryptoJS.AES.encrypt(str, keyStr, {
    iv: ivStr,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7
  });

  // 直接toString()是base64格式的字符串
  // ciphertext.toString() 是128位的字符串
  return encryptedStr.toString();
}
/**
 * 解密方法
 * @param: str 需要解密的字符
 * @param: key 密钥
 * @param: iv 密钥偏移量
 */
function decrypt(str: string, key?: string, iv?: string) {
  const keyStr = key ? encParse(key) : encParse(defaultKey);
  const ivStr = iv ? encParse(iv) : encParse(defaultIv);

  // 判断str是否为base64,如果不是就要转base64，是了就不能再转
  const flag = isBase64(str);
  if (!flag) {
    // 转为base64之前要先转16进制
    str = CryptoJS.enc.Hex.parse(str);
    // 只有base64格式的字符才能被解密
    str = CryptoJS.enc.Base64.stringify(str);
  }

  const encryptedStr = CryptoJS.AES.decrypt(str, keyStr, {
    iv: ivStr,
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encryptedStr.toString(CryptoJS.enc.Utf8);
}
/**
 * 处理密钥字符格式
 * @param: key 需要转格式的字符
 */
function encParse(key: string) {
  // key = CryptoJs.enc.Utf8.parse(key);
  return CryptoJS.enc.Latin1.parse(key);
}
/**
 * 使用MD5 hash字符串
 * @param: str 需要加密的字符串
 * @param: times 需要hash的次数
 */
function md5(str: string, times = 1) {
  for (let i = 0; i < times; i++) {
    str = CryptoJS.MD5(str).toString();
  }
  return str;
}
/**
 * 判断是否是Base64格式的字符串
 */
function isBase64(str: string) {
  let reg = /^(([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=))|(([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==))$/;
  return reg.test(str);
}

export default {
  decrypt,
  encrypt,
  md5
}
