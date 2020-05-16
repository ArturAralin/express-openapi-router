
// export interface PathObject {
  //   [key  HttpMethod]: {}
  // }
export interface PathSchema {
  description?: string;
  responses?: any;
  operationId: string;
}

export type Methods = 'get' | 'post' | 'options';

export type PathObject = {
  [key: string]: PathObject | PathSchema;
};

export interface OpenApi {
  paths: PathObject;
}