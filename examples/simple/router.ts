import express from 'express';
import {
  AORouter,
  AOHandlerParams,
  AOHandlerOptions,
  OARawResponseFn,
} from '../../index';

const app = express();

interface IndexHandlerPayload extends AOHandlerParams {
  query: {
    x: number,
  },
};

function indexHandler({
  payload: { query },
  httpOk,
  internalError,
}: AOHandlerOptions<IndexHandlerPayload>) {
  httpOk(query.x + 10);
  internalError('');
}

const router = AORouter({
  responseFns: {
    asianPorn: (res, data) => {
      res.json({
        withPixes: true,
        data,
      });
    }
  },
  openApi: {
    paths: {
      '/index': {
        get: {
          operationId: 'indexHandler',
          parameters: [
            {
              name: 'my_param',
              in: 'query',
              required: false,
            },
            {
              name: 'my_param2',
              in: 'query',
              required: false,
            },
          ],
        }
      }
    }
  },
  handlers: {
    'indexHandler': indexHandler,
  },
});

app.use(router);

app.listen(9909, () => {
  console.log('Server started on 9909');
})
