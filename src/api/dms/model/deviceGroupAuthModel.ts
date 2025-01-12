import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: DeviceGroupAuth info response
 */
export interface DeviceGroupAuthInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  status?: number;
  userId?: string;
  groupId?: string;
  groupAuth?: string;
}

/**
 *  @description: DeviceGroupAuth list response
 */

export type DeviceGroupAuthListResp = BaseListResp<DeviceGroupAuthInfo>;
