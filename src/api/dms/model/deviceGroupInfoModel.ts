import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: DeviceGroupInfo info response
 */
export interface DeviceGroupInfoInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  groupId?: string;
  parentId?: string;
  userId?: string;
  name?: string;
  code?: string;
  description?: string;
  tags?: string;
}

/**
 *  @description: DeviceGroupInfo list response
 */

export type DeviceGroupInfoListResp = BaseListResp<DeviceGroupInfoInfo>;
