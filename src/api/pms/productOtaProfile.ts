import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq,BaseStrIDReq } from '@/api/model/baseModel';
import { ProductOtaProfileInfo, ProductOtaProfileListResp } from './model/productOtaProfileModel';

enum Api {
  CreateProductOtaProfile = '/dms-api/product_ota_profile/create',
  UpdateProductOtaProfile = '/dms-api/product_ota_profile/update',
  GetProductOtaProfileList = '/dms-api/product_ota_profile/list',
  DeleteProductOtaProfile = '/dms-api/product_ota_profile/delete',
  GetProductOtaProfileById = '/dms-api/product_ota_profile',
  GetProductOtaProfileByDeviceSn = '/dms-api/product_ota_profile/sn',
}

/**
 * @description: Get product ota profile list
 */

export const getProductOtaProfileList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductOtaProfileListResp>>(
    { url: Api.GetProductOtaProfileList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new product ota profile
 */
export const createProductOtaProfile = (params: ProductOtaProfileInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateProductOtaProfile, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the product ota profile
 */
export const updateProductOtaProfile = (params: ProductOtaProfileInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateProductOtaProfile, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete product ota profiles
 */
export const deleteProductOtaProfile = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteProductOtaProfile, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get product ota profile By ID
 */
export const getProductOtaProfileById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductOtaProfileInfo>>(
    { url: Api.GetProductOtaProfileById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: Get product ota profile By ID
 */
export const getProductOtaProfileByDeviceId = (params: BaseStrIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductOtaProfileInfo>>(
    { url: Api.GetProductOtaProfileByDeviceSn, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
