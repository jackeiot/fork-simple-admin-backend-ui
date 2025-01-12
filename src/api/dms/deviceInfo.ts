import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq, BaseStrIDReq,BaseStrIDsReq } from '@/api/model/baseModel';
import {DeviceInfoCreate, DeviceInfoInfo, DeviceInfoListResp,multiCreateDeviceInfo} from './model/deviceInfoModel';

enum Api {
  CreateDeviceInfo = '/dms-api/device_info/create',
  MultiCreateDeviceInfo = '/dms-api/device_info/batch_create',
  MultiCreateDeviceTempalte = '/dms-api/device_info/batch_create_template',
  UpdateDeviceInfo = '/dms-api/device_info/update',
  GetDeviceInfoList = '/dms-api/device_info/list',
  ExportDeviceInfoList = '/dms-api/device_info/export',
  DeleteDeviceInfo = '/dms-api/device_info/delete',
  GetDeviceInfoById = '/dms-api/device_info',
  RemoveOnline = '/dms-api/device_info/remove_mqtt_status',
}

/**
 * @description: Get device info list
 */

export const exportDeviceInfoList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp>(
    { url: Api.ExportDeviceInfoList, params },
    { errorMessageMode: mode },
  );
};

/**
 * @description: Get device info list
 */

export const getDeviceInfoList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceInfoListResp>>(
    { url: Api.GetDeviceInfoList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new device info
 */
export const createDeviceInfo = (params: DeviceInfoCreate, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateDeviceInfo, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the device info
 */
export const updateDeviceInfo = (params: DeviceInfoInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateDeviceInfo, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete device infos
 */
export const deleteDeviceInfo = (params: BaseStrIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteDeviceInfo, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get device info By ID
 */
export const getDeviceInfoById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceInfoInfo>>(
    { url: Api.GetDeviceInfoById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

// 获取设备详情
export const getDeviceDetail = (params: BaseStrIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceInfoInfo>>(
    { url: Api.GetDeviceInfoById, params: params },
    {
      errorMessageMode: mode,
    },
  );
}

// 获取设备状态记录
export const getDeviceStatusLogs = (params: BaseStrIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceInfoInfo>>(
    { url: Api.GetDeviceInfoById, params: params },
    {
      errorMessageMode: mode,
    },
  );
}

// 获取设备上下线记录
export const getDeviceConnectionLogs = (params: BaseStrIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceInfoInfo>>(
    { url: Api.GetDeviceInfoById, params: params },
    {
      errorMessageMode: mode,
    },
  );
}

// 获取设备心跳记录
export const getDeviceHeartbeatLogs = (params: BaseStrIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceInfoInfo>>(
    { url: Api.GetDeviceInfoById, params: params },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 *  @description: Delete device infos
 */
export const removeOnline = (params: {clientIds: string[]}, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.RemoveOnline, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the file
 */
export const importDevices = (params: multiCreateDeviceInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.MultiCreateDeviceInfo, params: params, headers: { 'Content-Type': 'multipart/form-data'} },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the file
 */
export const getImportDevicesTemplate = ( mode: ErrorMessageMode = 'notice') => {
  return defHttp.get<any>(
    { url: Api.MultiCreateDeviceTempalte},
    {
      errorMessageMode: mode,
    },
  );
};