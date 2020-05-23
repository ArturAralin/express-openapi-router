import express from 'express';
import {
  mergeRouterOptions,
  replacePathVariables,
} from './utils';
// import * as defaultResponseFns from './response-fns';
import {
  // OAReplyFnOptions,
  // OAReplyFn,
  // OAResponseFns,
  OARouterOptions, AOHandlerOptions,
  // OARouterOptionalOptions,
} from './types/types';
import wrapHandler from './handler';
import { createValidation } from './validation';

import {
  PathObject,
} from './types/openapi/paths';

const DEFAULT_ROUTER_OPTS: OARouterOptions = {
  prefix: '',
  responseFns: {},
  openApi: {
    openapi: '',
    info: {},
    paths: {}
  },
  handlers: {},
  strictMode: 'none',
};

// TODO: add all available methods
type Methods = 'get' | 'post' | 'head';
const METHODS: Methods[] = ['get', 'post', 'head'];

function createUnimplementedHandler(
  method: string,
  path: string
) {
  return ({ res }: AOHandlerOptions) => {
    res.status(500).send(`Unimplemented ${method.toUpperCase()} ${path}`);
  };
}

function registerRouter(
  routerOptions: OARouterOptions,
  expressRouter: express.Router,
  pathObject: PathObject,
  prefix: string,
) {
  Object
    .keys(pathObject)
    .forEach((routePath) => {
      const pathObjectItem = pathObject[routePath];

      METHODS.forEach((methodName) => {
        const operationObject = pathObjectItem[methodName];

        if (operationObject) {
          const handler = routerOptions.handlers[operationObject.operationId]
            ? routerOptions.handlers[operationObject.operationId]
            : createUnimplementedHandler(methodName, routePath);

          expressRouter[methodName](
            `${prefix}${replacePathVariables(routePath)}`,
            createValidation(operationObject),
            wrapHandler(routerOptions, handler),
          );
        }
      });
    });
}

export function AORouter(options: OARouterOptions): express.Router {
  const opts = mergeRouterOptions(DEFAULT_ROUTER_OPTS, options);
  const prefix = opts.prefix || '';
  const expressRouter = express.Router();

  registerRouter(opts, expressRouter, opts.openApi.paths, prefix);

  return expressRouter;
}
