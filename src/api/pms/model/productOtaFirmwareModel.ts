import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: ProductOtaFirmware info response
 */
export interface ProductOtaFirmwareInfo {
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

/**
 *  @description: ProductOtaFirmware info response
 */
export interface ProductOtaFirmwareListReq {
  page: number;
  pageSize: number;
  name?: string;
  productId?: string;
  zoneType?: number;
  userId?: string;
  description?: string;
}


/**
 *  @description: ProductOtaFirmware list response
 */

export type ProductOtaFirmwareListResp = BaseListResp<ProductOtaFirmwareInfo>;
