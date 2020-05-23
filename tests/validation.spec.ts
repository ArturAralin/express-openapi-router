// import {
//   AORouter,
//   AOHandlerOptions,
// } from '../index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

import { appWithParameters } from './tools';

chai.use(chaiHttp);


describe('Validation', () => {
  it.only('should check test_param existing into body', () => {
    const { app, url } = appWithParameters([
      {
        name: 'test_param',
        in: 'body',
        required: true,
      }
    ]);

    chai
      .request(app)
      .post(url)
      .send({
        test_param: '',
      })
      .end((_err, res) => {
        chai.expect(res.status).to.equals(200);
      });
  });
});