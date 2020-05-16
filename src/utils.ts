import {
  OARouterOptions,
} from './types/types';

// export const pickAll = (fields, obj) => fields.reduce((acc, field) => ({
//   ...acc,
//   [field]: obj[field],
// }), {});

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
