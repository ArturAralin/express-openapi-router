import { ReferenceObject } from './reference-object';

export interface CommonSchemaObject {
  title?: string;
  multipleOf?: string;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  enum?: any;
  // TODO: what this?
  additionalProperties?: boolean | SchemaObject | ReferenceObject;
  description?: string;
  format?: string;
  default?: string;
}

export interface StringSchemaObject {
  type: 'string';
  pattern?: string;
}

export interface NumberSchemaObject {
  type: 'number';
}

export interface ObjectSchemaObject {
  type: 'object';
  properties: {
    [key: string]: SchemaObject | ReferenceObject,
  };
}

export interface ArraySchemaObject {
  type: 'array';
  // TODO: clarify 4 below
  allOf?: SchemaObject | ReferenceObject;
  oneOf?: SchemaObject | ReferenceObject;
  anyOf?: SchemaObject | ReferenceObject;
  not?: SchemaObject | ReferenceObject;
  items: SchemaObject | ReferenceObject;
}

export type SchemaObject = CommonSchemaObject & StringSchemaObject
  | CommonSchemaObject & ObjectSchemaObject
  | CommonSchemaObject & ArraySchemaObject
  | CommonSchemaObject & NumberSchemaObject;
