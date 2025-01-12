import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp,  BaseResp, BaseStrIDReq,   } from '@/api/model/baseModel';
import { DeviceRecordListRequest,DeviceRecordListResp, DeviceConfigInfoRequest, 
  DeviceDebugInfoRequest, DeviceMessageInfoRequest, DeviceDetailMessageInfo, 
  DeviceMessageInfoBaseRequest, DeviceMessageHeartInfo,DeviceOnlineStatusInfo} from './model/deviceMessageModel';

enum Api {
  DeviceMessageDetail = '/dms-api/device_message/detail',
  DeviceMessageReport = '/dms-api/device_message/report',
  DeviceMessageConfig = '/dms-api/device_message/config',
  DeviceMessageRecord = '/dms-api/device_message/record',
  DeviceMessageRemoteDebug = '/dms-api/device_message/remote_debug',
  DeviceOnlineStutas = '/dms-api/device_message/online_status',
}

/**
 * @description: Get device message list
 */

export const getDeviceMessageReport = (params: DeviceMessageInfoRequest, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceMessageHeartInfo>>(
    { url: Api.DeviceMessageReport, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new device message
 */
// export const getDeviceConfig = (params: DeviceConfigInfoRequest, mode: ErrorMessageMode = 'notice') => {
//   return defHttp.post<BaseDataResp<string>>(
//     { url: Api.DeviceMessageConfig, params: params },
//     {
//       errorMessageMode: mode,
//       successMessageMode: mode,
//     },
//   );
// };

export const renewDeviceConfig = (params: DeviceConfigInfoRequest, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeviceMessageConfig, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the device message
 */
export const getDeviceMessageRecord = (params: DeviceRecordListRequest, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceRecordListResp>>(
    { url: Api.DeviceMessageRecord, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete device messages
 */
export const actionDeviceMessageRemoteDebug = (params: DeviceDebugInfoRequest, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeviceMessageRemoteDebug, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get device message By ID
 */
export const getDeviceOnline = (params: BaseStrIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceOnlineStatusInfo>>(
    { url: Api.DeviceOnlineStutas, params: params },
    {
      // errorMessageMode: mode,
      // successMessageMode: mode,
    },
  );
};


/**
 *  @description: Get device message By ID
 */
export const getDeviceMessageDetail = (params: DeviceMessageInfoBaseRequest, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceDetailMessageInfo>>(
    { url: Api.DeviceMessageDetail, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};
