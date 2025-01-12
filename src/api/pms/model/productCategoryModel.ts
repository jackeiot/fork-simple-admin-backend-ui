import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: ProductCategory info response
 */
export interface ProductCategoryInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  parentId?: number;
  name?: string;
  description?: string;
}

/**
 *  @description: ProductCategory list response
 */

export type ProductCategoryListResp = BaseListResp<ProductCategoryInfo>;
