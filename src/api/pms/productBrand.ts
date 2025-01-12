import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { ProductBrandInfo, ProductBrandListResp } from './model/productBrandModel';

enum Api {
  CreateProductBrand = '/dms-api/product_brand/create',
  UpdateProductBrand = '/dms-api/product_brand/update',
  GetProductBrandList = '/dms-api/product_brand/list',
  DeleteProductBrand = '/dms-api/product_brand/delete',
  GetProductBrandById = '/dms-api/product_brand',
}

/**
 * @description: Get product brand list
 */

export const getProductBrandList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductBrandListResp>>(
    { url: Api.GetProductBrandList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new product brand
 */
export const createProductBrand = (params: ProductBrandInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateProductBrand, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the product brand
 */
export const updateProductBrand = (params: ProductBrandInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateProductBrand, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete product brands
 */
export const deleteProductBrand = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteProductBrand, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get product brand By ID
 */
export const getProductBrandById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductBrandInfo>>(
    { url: Api.GetProductBrandById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
