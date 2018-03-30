import { Platform } from 'react-native';
import * as DeviceInfo from 'react-native-device-info';
import urlParse from 'url-parse';

let deviceInfo = null;

export const util = {
  get isIOS() {
    return Platform.OS === 'ios';
  },
  get isAndroid() {
    return Platform.OS === 'android';
  },
  get isTablet() {
    return DeviceInfo.isTablet();
  },
  get isEmulator() {
    return DeviceInfo.isEmulator();
  },
  parseUrl(url) {
    return urlParse(url);
  },
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
  async getIPAddress() {
    return await DeviceInfo.getIPAddress();
  }
};
