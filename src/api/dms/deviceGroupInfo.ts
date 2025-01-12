import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { DeviceGroupInfoInfo, DeviceGroupInfoListResp } from './model/deviceGroupInfoModel';

enum Api {
  CreateDeviceGroupInfo = '/dms-api/device_group_info/create',
  UpdateDeviceGroupInfo = '/dms-api/device_group_info/update',
  GetDeviceGroupInfoList = '/dms-api/device_group_info/list',
  DeleteDeviceGroupInfo = '/dms-api/device_group_info/delete',
  GetDeviceGroupInfoById = '/dms-api/device_group_info',
}

/**
 * @description: Get device group info list
 */

export const getDeviceGroupInfoList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceGroupInfoListResp>>(
    { url: Api.GetDeviceGroupInfoList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new device group info
 */
export const createDeviceGroupInfo = (params: DeviceGroupInfoInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateDeviceGroupInfo, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the device group info
 */
export const updateDeviceGroupInfo = (params: DeviceGroupInfoInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateDeviceGroupInfo, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete device group infos
 */
export const deleteDeviceGroupInfo = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteDeviceGroupInfo, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get device group info By ID
 */
export const getDeviceGroupInfoById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceGroupInfoInfo>>(
    { url: Api.GetDeviceGroupInfoById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
