import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseUUIDsReq, BaseUUIDReq } from '@/api/model/baseModel';
import { FileInfo, FileListResp } from './model/fileModel';

enum Api {
  CreateFile = '/dms-api/file/create',
  UpdateFile = '/dms-api/file/update',
  GetFileList = '/dms-api/file/list',
  DeleteFile = '/dms-api/file/delete',
  GetFileById = '/dms-api/file',
  UploadFile = '/dms-api/file/upload',
}

export const UploadFileUrl:string = Api.UploadFile
/**
 *  @description: Update the file
 */
export const uploadFile = (params: FileInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UploadFile, params: params, headers: { 'Content-Type': 'multipart/form-data'} },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 * @description: Get file list
 */

export const getFileList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<FileListResp>>(
    { url: Api.GetFileList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new file
 */
export const createFile = (params: FileInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateFile, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the file
 */
export const updateFile = (params: FileInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateFile, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete files
 */
export const deleteFile = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteFile, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get file By ID
 */
export const getFileById = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<FileInfo>>(
    { url: Api.GetFileById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
