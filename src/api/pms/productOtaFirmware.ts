import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { ProductOtaFirmwareInfo, ProductOtaFirmwareListResp,ProductOtaFirmwareListReq } from './model/productOtaFirmwareModel';

enum Api {
  CreateProductOtaFirmware = '/dms-api/product_ota_firmware/create',
  UpdateProductOtaFirmware = '/dms-api/product_ota_firmware/update',
  GetProductOtaFirmwareList = '/dms-api/product_ota_firmware/list',
  DeleteProductOtaFirmware = '/dms-api/product_ota_firmware/delete',
  GetProductOtaFirmwareById = '/dms-api/product_ota_firmware',
}

/**
 * @description: Get product ota firmware list
 */

export const getProductOtaFirmwareList = (params: ProductOtaFirmwareListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductOtaFirmwareListResp>>(
    { url: Api.GetProductOtaFirmwareList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new product ota firmware
 */
export const createProductOtaFirmware = (params: ProductOtaFirmwareInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateProductOtaFirmware, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the product ota firmware
 */
export const updateProductOtaFirmware = (params: ProductOtaFirmwareInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateProductOtaFirmware, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete product ota firmwares
 */
export const deleteProductOtaFirmware = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteProductOtaFirmware, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get product ota firmware By ID
 */
export const getProductOtaFirmwareById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductOtaFirmwareInfo>>(
    { url: Api.GetProductOtaFirmwareById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
