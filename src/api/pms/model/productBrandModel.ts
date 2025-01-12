import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: ProductBrand info response
 */
export interface ProductBrandInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  name?: string;
  logoUrl?: string;
  website?: string;
  description?: string;
}

/**
 *  @description: ProductBrand list response
 */

export type ProductBrandListResp = BaseListResp<ProductBrandInfo>;
