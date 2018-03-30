import { Dimensions, Platform } from 'react-native';
import * as DeviceInfo from 'react-native-device-info';
import urlParse from 'url-parse';

let deviceInfo = null;
const DESIGN_IMAGE_WIDTH = 750; // 设计稿宽度
const screen = Dimensions.get('screen');
const DEVICE_WIDTH = Math.min(screen.width, screen.height);
const DEVICE_HEIGHT = Math.max(screen.width, screen.height);

export const util = {
  /**
   * 设备宽度
   */
  get deviceWidth(): number {
    return DEVICE_WIDTH;
  },
  /**
   * 设备高度
   */
  get deviceHeight(): number {
    return DEVICE_HEIGHT;
  },
  /**
   * 是否是iOS设备
   */
  get isIOS(): boolean {
    return Platform.OS === 'ios';
  },
  /**
   * 是否是Android设备
   */
  get isAndroid(): boolean {
    return Platform.OS === 'android';
  },
  /**
   * 是否是平板设备
   */
  get isTablet(): boolean {
    return DeviceInfo.isTablet();
  },
  /**
   * 是否是模拟器
   */
  get isEmulator(): boolean {
    return DeviceInfo.isEmulator();
  },
  /**
   * 解析URL字符串为URL对象
   * @param <string> url 要解析的字符串URL
   */
  parseUrl(url: string): object {
    return urlParse(url);
  },
  /**
   * 获取设备信息
   */
  getDeviceInfo() {
    if (!deviceInfo) {
      deviceInfo = {
        brand: DeviceInfo.getBrand(), // 设备品牌
        manufacturer: DeviceInfo.getManufacturer(), // 设备厂商
        systemVersion: DeviceInfo.getSystemVersion(), // 操作系统版本
        apiLevel: DeviceInfo.getAPILevel(), // 设备API级别，针对Android
        deviceId: DeviceInfo.getDeviceId(), // 设备ID
        uniqueId: DeviceInfo.getUniqueID(), // 设备唯一ID
        version: DeviceInfo.getVersion(), // 应用程序版本号
        buildNumber: DeviceInfo.getBuildNumber(), // 构建版本号
        readableVersion: DeviceInfo.getReadableVersion(), // 可读版本号
        deviceLocale: DeviceInfo.getDeviceLocale(), // 设备本地化
        timezone: DeviceInfo.getTimezone(), // 设备所处时区
        storageSize: DeviceInfo.getTotalDiskCapacity(), // 总的磁盘空间
        totalMemory: DeviceInfo.getTotalMemory(), // 总的内存数
        userAgent: DeviceInfo.getUserAgent()
      };
    }
    return deviceInfo;
  },
  /**
   * 获取设备IP地址（需要wifi状态权限）
   */
  async getIPAddress(): Promise<string> {
    return await DeviceInfo.getIPAddress();
  },
  /**
   * 将设计稿的宽高转换为设备宽高
   * @param size 设计稿上的宽/高
   * @param statndWidth 基准宽度（默认值750，意味着设计稿默认高度750）
   */
  px2dp(size: number, statndWidth: number = DESIGN_IMAGE_WIDTH) {
    return Math.floor(size / statndWidth * DEVICE_WIDTH);
  }
};
