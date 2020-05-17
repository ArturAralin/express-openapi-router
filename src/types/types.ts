import {
  Response,
  Request,
} from 'express';
import {
  ParamsDictionary,
} from "express-serve-static-core";
import { OpenApi } from './openapi/index';

export interface OAReplyFnOptions {
  httpCode?: number;
}

export type OAReplyFn = <B>(
  data: B,
  opts: OAReplyFnOptions
) => void;

export type OARawResponseFn = <B>(
  res: Response<B>,
  data?: B,
) => Promise<void> | void;

export type OAResponseFn = <B = any>(data?: B) => Promise<void> | void;

export interface OAResponseFns {
  [key: string]: OARawResponseFn,
}

export interface OAHandlers {
  [key: string]: AOHandler;
}

export interface OARouterRequiredOptions {
  openApi: OpenApi;
  handlers: OAHandlers;
}

export interface OARouterOptionalOptions {
  prefix?: string | null;
  responseFns?: OAResponseFns;
  strictMode: 'none' | 'full';
}

export type OARouterOptions = OARouterRequiredOptions & Partial<OARouterOptionalOptions>;

export interface AOHandlerParams {
  params: ParamsDictionary;
  body: any;
  query: any;
}

export interface AOHeaders {
  [key: string]: string | string[];
}

export interface AOHandlerOptions<P extends AOHandlerParams = AOHandlerParams, O = any> {
  req: Request,
  res: Response<O>,
  payload: P,
  headers: AOHeaders
  httpOk: OAResponseFn,
  badRequest: OAResponseFn,
  notFound: OAResponseFn,
  internalError: OAResponseFn,
}

export type AOHandler = <
  Opts extends AOHandlerOptions<P, O>,
  P extends AOHandlerParams,
  O = any,
>(opts: Opts) => Promise<void> | void;

