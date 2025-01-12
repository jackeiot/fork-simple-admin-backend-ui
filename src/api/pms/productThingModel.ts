import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { ProductThingModelInfo, ProductThingModelListResp } from './model/productThingModelModel';

enum Api {
  CreateProductThingModel = '/dms-api/product_thing_model/create',
  UpdateProductThingModel = '/dms-api/product_thing_model/update',
  GetProductThingModelList = '/dms-api/product_thing_model/list',
  DeleteProductThingModel = '/dms-api/product_thing_model/delete',
  GetProductThingModelById = '/dms-api/product_thing_model',
}

/**
 * @description: Get product thing model list
 */

export const getProductThingModelList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductThingModelListResp>>(
    { url: Api.GetProductThingModelList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new product thing model
 */
export const createProductThingModel = (params: ProductThingModelInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateProductThingModel, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the product thing model
 */
export const updateProductThingModel = (params: ProductThingModelInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateProductThingModel, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete product thing models
 */
export const deleteProductThingModel = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteProductThingModel, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get product thing model By ID
 */
export const getProductThingModelById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ProductThingModelInfo>>(
    { url: Api.GetProductThingModelById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
