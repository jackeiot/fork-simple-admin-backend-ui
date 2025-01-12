import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: ProductSchema info response
 */
export interface ProductSchemaInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  name?: string;
  productId?: string;
  description?: string;
  content?: string;
}

/**
 *  @description: ProductSchema list response
 */

export type ProductSchemaListResp = BaseListResp<ProductSchemaInfo>;
