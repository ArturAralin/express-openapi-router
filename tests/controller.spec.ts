import {
  AORouter,
  AOHandlerOptions,
  OAHandlers,
} from '../index';
import express from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import 'mocha';

chai.use(chaiHttp);

describe('Controller', () => {
  let app: express.Express;
  let handlers: OAHandlers;

  beforeEach(() => {
    handlers = {
      testHandler(params: AOHandlerOptions) {
        params.res.sendStatus(200);
      },
    };

    sinon.spy(handlers, 'testHandler');

    const router = AORouter({
      openApi: {
        openapi: '3.0.3',
        info: {},
        paths: {
          '/test': {
            get: {
              operationId: 'testHandler',
            }
          }
        }
      },
      handlers,
    });

    app = express();
    app.use(router);
  });

  it('Params should contains all required fields', () => {
    chai
      .request(app)
      .get('/test')
      .end((_, res) => {
        const { args: [[params]] } = handlers.testHandler as sinon.SinonSpy<AOHandlerOptions[]>;
        chai.expect(params.httpOk).is.a('function');
        chai.expect(params.notFound).is.a('function');
        chai.expect(params.internalError).is.a('function');
        chai.expect(params.badRequest).is.a('function');
        chai.expect(params.payload).is.a('object');
        // TODO: set object by default?
        // chai.expect(params.payload.body).is.a('');
        chai.expect(params.payload.params).is.a('object');
        chai.expect(params.payload.query).is.a('object');
        chai.expect(params.headers).is.a('object');
        chai.expect(res.status).equal(200);
      });
  });
});