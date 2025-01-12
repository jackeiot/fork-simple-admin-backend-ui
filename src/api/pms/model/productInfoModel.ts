import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: ProductInfo info response
 */
export interface ProductInfoInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  status?: number;
  productId?: string;
  productName?: string;
  productImg?: string;
  productType?: number;
  authMethod?: number;
  deviceType?: number;
  netType?: number;
  autoRegister?: number;
  secret?: string;
  modelCode?: string;
  categoryId?: number;
  brandId?: number;
  description?: string;
  tags?: string;
}

/**
 *  @description: ProductInfo list response
 */

export type ProductInfoListResp = BaseListResp<ProductInfoInfo>;
