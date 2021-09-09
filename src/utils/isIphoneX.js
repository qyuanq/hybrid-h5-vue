/**
 * 判断当前设置是否为IphoneX
 * @return boolean true 表示当前设备为iphonex。false就表示不为Iphonex
 */
const isIphoneX = () => {
  // window对象存在执行逻辑
  if (typeof window !== 'undefined' && window) {
    // window.navigator.userAgent 如果他包含iPhone表示当前的设备在IOS中运行
    // iPhoneX及以上的设备，屏幕垂直像素数大于 812
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
  }
  return false
}
window.isIphoneX = isIphoneX()
