import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { DeviceGroupAuthInfo, DeviceGroupAuthListResp } from './model/deviceGroupAuthModel';

enum Api {
  CreateDeviceGroupAuth = '/dms-api/device_group_auth/create',
  UpdateDeviceGroupAuth = '/dms-api/device_group_auth/update',
  GetDeviceGroupAuthList = '/dms-api/device_group_auth/list',
  DeleteDeviceGroupAuth = '/dms-api/device_group_auth/delete',
  GetDeviceGroupAuthById = '/dms-api/device_group_auth',
}

/**
 * @description: Get device group auth list
 */

export const getDeviceGroupAuthList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceGroupAuthListResp>>(
    { url: Api.GetDeviceGroupAuthList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new device group auth
 */
export const createDeviceGroupAuth = (params: DeviceGroupAuthInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateDeviceGroupAuth, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the device group auth
 */
export const updateDeviceGroupAuth = (params: DeviceGroupAuthInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateDeviceGroupAuth, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete device group auths
 */
export const deleteDeviceGroupAuth = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteDeviceGroupAuth, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get device group auth By ID
 */
export const getDeviceGroupAuthById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceGroupAuthInfo>>(
    { url: Api.GetDeviceGroupAuthById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
