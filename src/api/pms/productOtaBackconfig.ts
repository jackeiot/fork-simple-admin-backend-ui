import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { ProductOtaBackconfigInfo, ProductOtaBackconfigListResp,ProductOtaBackconfigListReq } from './model/productOtaBackconfigModel';

enum Api {
  CreateProductOtaBackconfig = '/dms-api/product_ota_backconfig/create',
  UpdateProductOtaBackconfig = '/dms-api/product_ota_backconfig/update',
  GetProductOtaBackconfigList = '/dms-api/product_ota_backconfig/list',
  DeleteProductOtaBackconfig = '/dms-api/product_ota_backconfig/delete',
  GetProductOtaBackconfigById = '/dms-api/product_ota_backconfig',
}

/**
 * @description: Get product ota backconfig list
 */

export const getProductOtaBackconfigList = (params: ProductOtaBackconfigListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductOtaBackconfigListResp>>(
    { url: Api.GetProductOtaBackconfigList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new product ota backconfig
 */
export const createProductOtaBackconfig = (params: ProductOtaBackconfigInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateProductOtaBackconfig, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the product ota backconfig
 */
export const updateProductOtaBackconfig = (params: ProductOtaBackconfigInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateProductOtaBackconfig, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete product ota backconfigs
 */
export const deleteProductOtaBackconfig = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteProductOtaBackconfig, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get product ota backconfig By ID
 */
export const getProductOtaBackconfigById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductOtaBackconfigInfo>>(
    { url: Api.GetProductOtaBackconfigById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
