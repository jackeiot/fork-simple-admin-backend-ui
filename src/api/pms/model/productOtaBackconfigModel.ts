import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: ProductOtaBackconfig info response
 */
export interface ProductOtaBackconfigInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  name?: string;
  fileName?: string;
  fileUrl?: string;
  fileMd5?: string;
  fileSize?: number;
  productId?: string;
  zoneType?: number;
  saveType?: number;
  userId?: string;
  userName?: string;
  description?: string;
}


export interface ProductOtaBackconfigListReq {
  page: number;
  pageSize: number;
  name?: string;
  productId?: string;
  zoneType?: number;
  userId?: string;
  description?: string;
}


/**
 *  @description: ProductOtaBackconfig list response
 */

export type ProductOtaBackconfigListResp = BaseListResp<ProductOtaBackconfigInfo>;
