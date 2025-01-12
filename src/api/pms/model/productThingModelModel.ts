import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: ProductThingModel info response
 */
export interface ProductThingModelInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  name?: string;
  identifier?: string;
  properties?: map[string]string;
  events?: map[string]string;
  services?: map[string]string;
  description?: string;
  version?: number;
}

/**
 *  @description: ProductThingModel list response
 */

export type ProductThingModelListResp = BaseListResp<ProductThingModelInfo>;
