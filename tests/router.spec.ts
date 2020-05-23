import {
  AORouter,
} from '../index';
import express from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

import { createApp } from './tools';

chai.use(chaiHttp);

describe('Router', () => {
  it('should be instance of Express.Router', () => {
    const router = AORouter({
      openApi: {
        openapi: '3.0.3',
        info: {},
        paths: {}
      },
      handlers: {},
    });

    chai.expect(Object.getPrototypeOf(router) === express.Router).to.equals(true);
  });

  it.skip('should redefine reply functions', () => {
    AORouter({
      responseFns: {
        httpOk: (res, data) => {
          res.json({
            status: 'ok',
            data,
          });
        }
      },
      openApi: {
        openapi: '3.0.3',
        info: {},
        paths: {}
      },
      handlers: {},
    });
  });

  it('should response unimplemented handler with HTTP 500', () => {
    const app = createApp(AORouter({
      responseFns: {
        httpOk: (res, data) => {
          res.json({
            status: 'ok',
            data,
          });
        }
      },
      openApi: {
        openapi: '3.0.3',
        info: {},
        paths: {
          '/nonexists': {
            get: {
              operationId: 'non_exists_handler',
            }
          }
        }
      },
      handlers: {},
    }));

    chai
      .request(app)
      .get('/nonexists')
      .end((_, res) => {
        chai.expect(res.status).to.equals(500);
        chai.expect(res.text).to.equals('Unimplemented GET /nonexists');
      });
  });
});