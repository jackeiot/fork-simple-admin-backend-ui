import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { ProductSchemaInfo, ProductSchemaListResp } from './model/productSchemaModel';

enum Api {
  CreateProductSchema = '/dms-api/product_schema/create',
  UpdateProductSchema = '/dms-api/product_schema/update',
  GetProductSchemaList = '/dms-api/product_schema/list',
  DeleteProductSchema = '/dms-api/product_schema/delete',
  GetProductSchemaById = '/dms-api/product_schema',
}

/**
 * @description: Get product schema list
 */

export const getProductSchemaList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductSchemaListResp>>(
    { url: Api.GetProductSchemaList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new product schema
 */
export const createProductSchema = (params: ProductSchemaInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateProductSchema, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the product schema
 */
export const updateProductSchema = (params: ProductSchemaInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateProductSchema, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete product schemas
 */
export const deleteProductSchema = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteProductSchema, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get product schema By ID
 */
export const getProductSchemaById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductSchemaInfo>>(
    { url: Api.GetProductSchemaById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
