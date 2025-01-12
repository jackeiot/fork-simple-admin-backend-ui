import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: ProductOtaProfile info response
 */
export interface ProductOtaProfileInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  name?: string;
  type?: string;
  productId?: string;
  zoneType?: number;
  userId?: string;
  userName?: string;
  description?: string;
  content?: string;
}

/**
 *  @description: ProductOtaProfile list response
 */

export type ProductOtaProfileListResp = BaseListResp<ProductOtaProfileInfo>;
