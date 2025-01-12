import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { ProductCategoryInfo, ProductCategoryListResp } from './model/productCategoryModel';

enum Api {
  CreateProductCategory = '/dms-api/product_category/create',
  UpdateProductCategory = '/dms-api/product_category/update',
  GetProductCategoryList = '/dms-api/product_category/list',
  DeleteProductCategory = '/dms-api/product_category/delete',
  GetProductCategoryById = '/dms-api/product_category',
}

/**
 * @description: Get product category list
 */

export const getProductCategoryList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductCategoryListResp>>(
    { url: Api.GetProductCategoryList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new product category
 */
export const createProductCategory = (params: ProductCategoryInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateProductCategory, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the product category
 */
export const updateProductCategory = (params: ProductCategoryInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateProductCategory, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete product categorys
 */
export const deleteProductCategory = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteProductCategory, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get product category By ID
 */
export const getProductCategoryById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductCategoryInfo>>(
    { url: Api.GetProductCategoryById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
