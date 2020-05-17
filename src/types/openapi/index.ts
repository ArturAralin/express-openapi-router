import { PathObject } from './paths';

export interface OpenApi {
  openapi: string;
  info: any;
  servers?: any,
  paths: PathObject;
  components?: any;
  security?: any;
  tags?: any;
  externalDocs?: any;
}
