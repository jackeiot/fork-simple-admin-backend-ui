import { BaseListResp } from '@/api/model/baseModel';


export interface DeviceDetailMessageInfo {
  id: number;
  createdAt: number;
  updatedAt: number;
  name: string;
  deviceSn: string;
  deviceMac: string;
  clientId: string;
  loginName: string;
  loginPasswd: string;
  cert: string;
  secret: string;
  type: number;
  description: string;
  productCode: null | string;
  product: string;
  groupId: null | number;
  group: string;
  userId: string;
  user: string;
  tenantCode: string;
  tenantName: string;
  firstLogin: number;
  lastLogin: number;
  version: string;
  position: null | any;
  modemInfo: string;
  modemImei: string;
  iccid: string;
  address: string;
  adcode: string;
  tags: null | any;
  isOnline: number;
  isEnable: number;
  expTime: number;
  sub_topics: any;
  push_topics: any;
}

export interface DeviceRecordInfo {
  timestamp: null |number;
  description: null |string;

  device_sn: string;
  device_mac: string;
  product_id: string;
//OnlineRecord，上下线记录
  device_name: null | string;
  status: null | number;
  // LogRecord，日志记录
  log_level: null | string;
  log_content: null | string;
//eventRecord，事件、告警记录
  event_type: null | string;
  event_level: null | number;
  event_content: null | string;
//networkRecord，网络信号记录
  network_type: null | string;
  network_csq: null | string;
  network_rssi: null | string;
  network_snr: null | string;
  network_rsrq: null | string;
  network_rsrp: null | string;
//taskRecord，任务记录
  account: null | string;
  account_id: null | string;
  task_name: null | string;
  task_type: null | string;
  task_data_id: null | string;
  task_data: null | string;
  task_status: null | number;
  task_result: null | string;
  //flowRecord，事件、告警记录
  flow_up: null | number;
  flow_up_rate: null | number;
  flow_down: null | number;
  flow_down_rate: null | number;
  flow_total: null | number;
  flow_ether: null | number;
}

export interface DeviceDetailMessageInfo {
  id: number;
  createdAt: number;
  updatedAt: number;
  name: string;
  deviceSn: string;
  deviceMac: string;
  clientId: string;
  loginName: string;
  loginPasswd: string;
  cert: string;
  secret: string;
  type: number;
  description: string;
  productCode: null | string;
  product: string;
  groupId: null | number;
  group: string;
  userId: string;
  user: string;
  tenantCode: string;
  tenantName: string;
  firstLogin: number;
  lastLogin: number;
  version: string;
  position: null | any;
  modemInfo: string;
  modemImei: string;
  iccid: string;
  address: string;
  adcode: string;
  tags: null | any;
  isOnline: number;
  isEnable: number;
  expTime: number;
  sub_topics: any;
  push_topics: any;
}

export interface DeviceOnlineStatusInfo {
  name: string;
  deviceSn: string;
  deviceMac: string;
  clientId: string;
  protocolType: string;
  lastLogin: number;
  isOnline: number;
}


/**
 *  @description: DeviceMessage info response
 */
export interface DeviceMessageInfo {
  device_mac?: string;
  device_client_id?: string;
  payload?: any;
}


/**
 *  @description: DeviceMessage info response
 */
export interface DeviceMessageInfoBaseRequest {
  device_sn?: string;
  device_mac?: string;
  device_client_id?: string;
}

/**
 *  @description: DeviceMessage info response
 */
export interface DeviceConfigInfoRequest {
  device_client_id: string;
  config_code: number;
  config_type?: string;
}

/**
 *  @description: DeviceMessage info response
 */
export interface DeviceMessageInfoRequest {
  device_sn?: string;
  device_mac?: string;
  device_client_id?: string;
  type_code?: string;
}


/**
 *  @description: DeviceMessage info response
 */
export interface DeviceRecordListRequest {
  device_sn?: string;
  device_mac?: string;
  device_client_id?: string;
  type_code?: string;
  date_time?: string[];
}


/**
 *  @description: DeviceMessage info response
 */
// export interface DeviceConfigInfoRequest {
//   device_mac?: string;
//   client_id?: string;
//   config_type?: string;
//   payload?: string;
// }


/**
 *  @description: DeviceMessage info response
 */
export interface DeviceDebugInfoRequest {
  device_mac?: string;
  client_id?: string;
  protocol?: string;
  payload?: string;
}

/**
 *  @description: DeviceMessage info response
 */
export interface DeviceMessageHeartInfo {
  code?: number;
  msg?: string;
  data?: string;
}


/**
 *  @description: DeviceMessage list response
 */

export type DeviceMessageListResp = BaseListResp<DeviceMessageInfo>;

/**
 *  @description: DeviceRecordInfo list response
 */

export type DeviceRecordListResp = BaseListResp<DeviceRecordInfo>;