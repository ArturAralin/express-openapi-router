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
  OARouterOptions,
  // OARouterOptionalOptions,
} from './types/types';
import wrapHandler from './handler';

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
          const handler = routerOptions.handlers[operationObject.operationId];

          if (!handler) {
            throw new Error(`Handler for operationId="${operationObject.operationId}" not found`);
          }

          expressRouter[methodName](
            `${prefix}${replacePathVariables(routePath)}`,
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
