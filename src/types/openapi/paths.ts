// http://spec.openapis.org/oas/v3.0.3#operation-object
interface OperationObject {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: any;
  operationId: string;
  parameters?: any;
  requestBody?: any;
  responses?: any;
  callbacks?: any;
  deprecated?: boolean;
  security?: any;
  servers?: any;
}

export interface PathObjectItem {
  $ref?: string;
  summary?: string;
  description?: string;
  get?: OperationObject;
  put?: OperationObject;
  post?: OperationObject;
  delete?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
  trace?: OperationObject;
  servers?: any;
  parameters?: any;
}

export type PathObject = {
  [key: string]: PathObjectItem;
};
