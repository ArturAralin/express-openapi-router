// http://spec.openapis.org/oas/v3.0.3#reference-object
export interface ReferenceObject {
  $ref: string;
}


export interface SchemaObject {
  title?: string;
  multipleOf?: string;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  enum?: any;
  type: string;
  // TODO: clarify 4 below
  allOf?: SchemaObject | ReferenceObject;
  oneOf?: SchemaObject | ReferenceObject;
  anyOf?: SchemaObject | ReferenceObject;
  not?: SchemaObject | ReferenceObject;
  items?: SchemaObject | ReferenceObject;
  properties?: {
    [key: string]: SchemaObject | ReferenceObject,
  };
  // TODO: what this?
  additionalProperties?: boolean | SchemaObject | ReferenceObject;
  description?: string;
  format?: string;
  default?: string;
}

// http://spec.openapis.org/oas/v3.0.3#parameter-object
export interface ParameterObject {
  name: string;
  // TODO clarify it!
  in: string;
  description?: string;
  required: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: SchemaObject | ReferenceObject;
  example?: string;
  examples?: any;
}

export type Parameters = ParameterObject[] | ReferenceObject;

// http://spec.openapis.org/oas/v3.0.3#operation-object
export interface OperationObject {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: any;
  operationId: string;
  parameters?: Parameters;
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
