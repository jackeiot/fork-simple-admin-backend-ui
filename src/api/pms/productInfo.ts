import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq,BaseStrIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { ProductInfoInfo, ProductInfoListResp } from './model/productInfoModel';

enum Api {
  CreateProductInfo = '/dms-api/product_info/create',
  UpdateProductInfo = '/dms-api/product_info/update',
  GetProductInfoList = '/dms-api/product_info/list',
  DeleteProductInfo = '/dms-api/product_info/delete',
  GetProductInfoById = '/dms-api/product_info',
}

/**
 * @description: Get product info list
 */

export const getProductInfoList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductInfoListResp>>(
    { url: Api.GetProductInfoList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new product info
 */
export const createProductInfo = (params: ProductInfoInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateProductInfo, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the product info
 */
export const updateProductInfo = (params: ProductInfoInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateProductInfo, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete product infos
 */
export const deleteProductInfo = (params: BaseStrIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteProductInfo, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get product info By ID
 */
export const getProductInfoById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductInfoInfo>>(
    { url: Api.GetProductInfoById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
