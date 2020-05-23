import * as express from 'express';
import {
  OperationObject,
  ParameterObject,
} from './types/openapi/paths';
import { SchemaObject } from './types/openapi/schema-object';
import { ReferenceObject } from './types/openapi/reference-object';

interface OAErrorParams {
  parameter?: string;
  reason: string;
}

function createError({
  parameter,
  reason,
}: OAErrorParams) {
  return {
    isOARError: true,
    parameter,
    reason,
  }
}

function getTarget(
  req: express.Request,
  propName: string
) {
  const {
    body,
    params,
    query,
  } = req;

  switch (propName) {
    case 'body':
      return body;
    case 'params':
      return params;
    case 'query':
      return query;
    default:
      return createError({
        reason: `Unknown in for parameter ${propName}`,
      });
  }

}

function resolveRef(schema: SchemaObject | ReferenceObject): SchemaObject {
  if ((schema as ReferenceObject).$ref) {
    throw new Error('$ref unsupported');
  }

  return schema as SchemaObject;
}

function checkParam(
  req: express.Request,
  parameter: ParameterObject
) {
  const target = getTarget(req, parameter.in);

  if (target.isOARError) {
    return target;
  }

  if (parameter.required && target[parameter.name] === undefined) {
    return createError({
      parameter: parameter.name,
      reason: `Parameter "${parameter.name}" is required`,
    });
  }

  if (parameter.schema) {
    const schema = resolveRef(parameter.schema);
    const type = schema.type.toLowerCase();
    const value = target[parameter.name];

    if (type === 'string') {
      if (typeof value !== 'string') {
        return createError({
          parameter: parameter.name,
          reason: `Type of ${parameter.name} must be a string`,
        });
      }

      return null;
    }

    // if (type === 'object' && schema.properties) {
    //   Object
    //     .keys(schema.properties)
    //     .forEach((v) => {
    //       console.log(v);
    //     });
    //   // return validateObject(schema, target);
    // }

    return createError({
      reason: `Unknown property type "${type}"`,
    });
  }

  return null;
}

export function createValidation(route: OperationObject) {
  return function validator(
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction,
  ) {
    if (route.parameters && (route.parameters as ReferenceObject).$ref) {
      next('$ref unimplemented');

      return;
    }

    if (Array.isArray(route.parameters)) {
      const result = route.parameters
        .map((p) => checkParam(req, p))
        .filter(v => v !== null);

      console.log(result);

      next();
    }
  }
}