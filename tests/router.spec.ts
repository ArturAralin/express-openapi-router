import {
  AORouter,
} from '../index';
import express from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

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
});