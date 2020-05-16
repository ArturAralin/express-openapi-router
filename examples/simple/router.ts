import express from 'express';
import {
  AORouter,
  AOHandlerParams,
  AOHandlerOptions,
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
}: AOHandlerOptions<IndexHandlerPayload>) {
  httpOk(query.x + 10);
}

const router = AORouter({
  openApi: {
    paths: {
      '/': {
        get: {
          operationId: 'indexHandler'
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
