import {
  AORouter,
  AOHandlerOptions,
  OAHandlers,
} from '../index';
import express from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import * as fs from 'fs';
import * as path from 'path'
import 'mocha';

chai.use(chaiHttp);

const OPEN_API_EXAMPLE_PATH = path.resolve(__dirname, './resources/open-api.example.json');
const openApi = JSON.parse(fs.readFileSync(OPEN_API_EXAMPLE_PATH, 'utf-8'));

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
      .end((err, res) => {
        const { args: [[params]] } = handlers.testHandler as sinon.SinonSpy;
        chai.expect(params.httpOk).is.a('function');
        chai.expect(params.notFound).is.a('function');
        chai.expect(params.internalError).is.a('function');
        chai.expect(params.badRequest).is.a('function');
        chai.expect(params.payload).is.a('object');
        // ????
        // chai.expect(params.payload.body).is.a('');
        chai.expect(params.payload.params).is.a('object');
        chai.expect(params.payload.query).is.a('object');
        chai.expect(params.headers).is.a('object');
        chai.expect(res.status).equal(200);
      });
  });
});