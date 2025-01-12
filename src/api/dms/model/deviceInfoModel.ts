import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: DeviceInfo info response
 */
export interface DeviceInfoInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  tenantCode?: string;
  name?: string;
  deviceSn?: string;
  deviceMac?: string;
  loginName?: string;
  loginPasswd?: string;
  cert?: string;
  secret?: string;
  type?: number;
  description?: string;
  productId?: string;
  groupId?: number;
  userId?: string;
  firstLogin?: number;
  lastLogin?: number;
  version?: string;
  position?: number[];
  modemInfo?: string;
  modemImei?: string;
  iccid?: string;
  address?: string;
  adcode?: string;
  tags?: string;
  isOnline?: number;
  isEnable?: number;
  expTime?: number;
}


/**
 *  @description: DeviceInfo info Create
 */
export interface DeviceInfoCreate {
  tenantCode: string;
  name: string;
  deviceMac: string;
  type: number;
  description?: string;
  productId: string;
  groupId: number;
  userId: string;
  position?: number[];
  iccid?: string;
  address?: string;
  adcode?: string;
  tags?: string;
  expTime?: number;
}


/**
 *  @description: DeviceInfo list response
 */

export type DeviceInfoListResp = BaseListResp<DeviceInfoInfo>;


export interface multiCreateDeviceInfo {
  userId?: string;
  groupId: string;
  file: File
}
