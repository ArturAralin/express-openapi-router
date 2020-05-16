import express from 'express';
import {
  OARawResponseFn,
} from './types/types';

function sendStatusOrData(
  res: express.Response,
  status: number,
  data: any,
) {
  if (data) {
    res.status(status);
    res.json(data);

    return;
  }

  res.sendStatus(status);
}

export const httpOk: OARawResponseFn = (res, data) => {
  sendStatusOrData(res, 200, data);
};

export const badRequest: OARawResponseFn = (res, data) => {
  sendStatusOrData(res, 400, data);
};

export const notFound: OARawResponseFn = (res, data) => {
  sendStatusOrData(res, 404, data);
};

export const internalError: OARawResponseFn = (res, data) => {
  sendStatusOrData(res, 500, data);
};
