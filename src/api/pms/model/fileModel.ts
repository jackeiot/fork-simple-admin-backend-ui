import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: File info response
 */
export interface FileInfo {
  id?: string;
  createdAt?: number;
  updatedAt?: number;
  userUUID?: string;
  name?: string;
  fileType?: number;
  size?: number;
  path?: string;
  status?: number;
  publicPath?: string;
  tagIds?: number[];
}

/**
 *  @description: File list response
 */

export type FileListResp = BaseListResp<FileInfo>;
