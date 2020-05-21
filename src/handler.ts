import express from 'express';
// import http from 'http';
// import {
//   mergeRouterOptions,
// } from './utils';
import * as defaultResponseFns from './response-fns';
import {
  // OAReplyFnOptions,
  // OAReplyFn,
  // OAResponseFns,
  OARouterOptions,
  // OARouterOptionalOptions,
  AOHandler,
  AOHeaders,
} from './types/types';

// import {
//   PathObject,
// } from './types/openapi/paths';

// function prepareResponseFns(
//   responseFns: OAResponseFns,
//   res: express.Response,
//   replyFn: OAReplyFn,
// ) {
//   return Object
//     .keys(responseFns)
//     .reduce((acc, key) => ({
//       ...acc,
//       [key]: responseFns[key].bind(null, res, replyFn),
//     }), {});
// }

export function handler(
  _routerOpts: OARouterOptions,
  fn: AOHandler,
) {
  return async function controller(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      await fn({
        req,
        res,
        headers: req.headers as AOHeaders,
        payload: {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        httpOk: defaultResponseFns.httpOk.bind(null, res),
        badRequest: defaultResponseFns.badRequest.bind(null, res),
        notFound: defaultResponseFns.notFound.bind(null, res),
        internalError: defaultResponseFns.internalError.bind(null, res),
      });
    } catch (err) {
      next(err);
    }
  };
}

export default handler;
