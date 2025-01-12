import { BaseDataResp, BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: DeviceTask info response
 */
export interface DeviceTaskInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  taskCode?: string;
  taskType?: string;
  userId?: string;
  userName?: string;
  deviceId?: string;
  description?: string;
  taskContent?: string;
  taskResult?: string;
}

export interface DeviceTaskListhReq {
  clientId?: string;
  deviceSn?: string;
  taskType?: string;
  taskCode?: string;
}

export interface DeviceTaskPushReq {
  clientId: string[];
  requestType: number;  // 请求类型, 1获取，2设置
  taskCode: number;  // 80001...
  taskType: string; // action|ota|config|log|debug|other
  taskContent?: string;
  app?: string;
  saveProfile: number; // 0 不保存， 1 保存
  syncResult: number; // 0 不同步，同步
  profileName?: string;
  profileDesc?: string;
}

/**
 *  @description: DeviceTask list response
 */

export type DeviceTaskListResp = BaseListResp<DeviceTaskInfo>;


/**
 *  @description: DeviceTask list response
 */

export type DeviceTaskPushResp = BaseDataResp<string>;
