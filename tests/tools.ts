import {
  AORouter,
  AOHandlerOptions,
} from '../index';
import express from 'express';
import * as bodyParser from 'body-parser';
import sinon from 'sinon';
import { Parameters } from '../src/types/openapi/paths';

export function createApp(router: express.Router) {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(router);

  return app;
};

export function appWithParameters(parameters: Parameters) {
  const url = '/test';
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const handlers = {
    testHandler(opts: AOHandlerOptions) {
      opts.httpOk();
    },
  };

  sinon.spy(handlers, 'testHandler');

  app.use(AORouter({
    openApi: {
      openapi: '3.0.3',
      info: {},
      paths: {
        [url]: {
          post: {
            operationId: 'testHandler',
            parameters,
          }
        },
      },
    },
    handlers,
  }));

  return {
    app,
    handlerSpy: handlers.testHandler as sinon.SinonSpy<AOHandlerOptions[]>,
    url,
  };
}
