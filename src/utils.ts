import {
  OARouterOptions,
} from './types/types';

export function replacePathVariables(path: string): string {
  return path.replace(/{\w+}/gi, (sub) => {
    return `:${sub.slice(1, -1)}`;
  });
}

export function mergeRouterOptions(
  defaultOpts: OARouterOptions,
  opts: Partial<OARouterOptions>
): OARouterOptions {
  const responseFns = {
    ...defaultOpts.responseFns,
    ...(opts.responseFns || {}),
  };

  return {
    ...defaultOpts,
    ...opts,
    responseFns,
  };
}
