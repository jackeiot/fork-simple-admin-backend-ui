export interface BaseListReq {
  page: number;
  pageSize: number;
}

export interface BaseListResp<T> {
  data: T[];
  total: number;
}

export interface BaseDataResp<T> {
  code: number;
  msg: string;
  total?: number;
  data: T;
}

export interface BaseResp {
  code?: number;
  msg: string;
}

export interface BaseIDReq {
  id?: number;
}

export interface BaseStrIDReq {
  id?: string;
}

export interface BaseIDsReq {
  ids: number[];
}

export interface BaseStrIDsReq {
  ids: string[];
}


export interface BaseUUIDReq {
  id: string;
}

export interface BaseUUIDsReq {
  ids: string[];
}
