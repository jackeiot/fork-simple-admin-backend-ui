import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { DeviceTaskInfo, DeviceTaskListResp, DeviceTaskPushReq } from './model/deviceTaskModel';

enum Api {
  CreateDeviceTask = '/dms-api/device_task/create',
  UpdateDeviceTask = '/dms-api/device_task/update',
  GetDeviceTaskList = '/dms-api/device_task/list',
  DeleteDeviceTask = '/dms-api/device_task/delete',
  GetDeviceTaskById = '/dms-api/device_task',
  PushTaskAsync = '/dms-api/device_task/push/async',
  PushTaskSync = '/dms-api/device_task/push/sync',

}

/**
 * @description: Get device task list
 */

export const getDeviceTaskList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceTaskListResp>>(
    { url: Api.GetDeviceTaskList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new device task
 */
export const createDeviceTask = (params: DeviceTaskPushReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateDeviceTask, params: params },
    {
      errorMessageMode: mode,
      // successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the device task
 */
export const updateDeviceTask = (params: DeviceTaskInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateDeviceTask, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete device tasks
 */
export const deleteDeviceTask = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteDeviceTask, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get device task By ID
 */
export const getDeviceTaskById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DeviceTaskInfo>>(
    { url: Api.GetDeviceTaskById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: Get device task By ID
 */
export const pushTaskAsync = (params: DeviceTaskPushReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<string>>(
    { url: Api.PushTaskAsync, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: Get device task By ID
 */
export const pushTaskSync = (params: DeviceTaskPushReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<string>>(
    { url: Api.PushTaskSync, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
