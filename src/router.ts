import express from 'express';
import {
  mergeRouterOptions,
} from './utils';
import * as defaultResponseFns from './response-fns';
import {
  OAReplyFnOptions,
  OAReplyFn,
  OAResponseFns,
  OARouterOptions,
  OARouterOptionalOptions,
} from './types/types';
import wrapHandler from './handler';

import {
  PathObject,
  Methods,
  PathSchema,
} from './types/open-api';

function reply<B>(
  res: express.Response<B>,
  data: B,
  opts: OAReplyFnOptions = {}
) {
  res.status(opts.httpCode || 200);
  res.json(data);
}

const DEFAULT_ROUTER_OPTS: OARouterOptions = {
  prefix: '',
  responseFns: {},
  openApi: {
    paths: {}
  },
  handlers: {},
};

const ROUTE_DEFAULT_OPTS = {
  middlewares: [],
};

const METHODS = new Set(['get', 'post', 'head']);

function registerRouter(
  routerOptions: OARouterOptions,
  expressRouter: express.Router,
  pathObject: PathObject,
  path: string,
) {
  Object
    .keys(pathObject)
    .forEach((route) => {
      if (METHODS.has(route)) {
        const method = route as Methods;

        // @ts-ignore ha ha... I love TS
        const opts: PathSchema = pathObject[method];
        const handler = routerOptions.handlers[opts.operationId];

        if (!handler) {
          throw new Error(`Handler for operationId="${opts.operationId}" not found`);
        }

        expressRouter[method](path, wrapHandler(routerOptions, handler));

        return;
      }

      registerRouter(
        routerOptions,
        expressRouter,
        pathObject[route] as PathObject,
        `${path}${route}`,
      );
    });
}

export function AORouter(options: OARouterOptions): express.Router {
  const opts = mergeRouterOptions(DEFAULT_ROUTER_OPTS, options);
  const prefix = opts.prefix || '';
  const expressRouter = express.Router();

  registerRouter(opts, expressRouter, opts.openApi.paths, prefix);

  return expressRouter;
}

export function routerFactory(factoryOpts: OARouterOptions) {
  return (opts: OARouterOptions) => {
    const options = mergeRouterOptions(factoryOpts, opts);

    return AORouter(options);
  };
}

