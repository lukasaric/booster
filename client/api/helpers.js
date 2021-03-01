import get from 'lodash/get';

export const extractData = res => res.data.data;

export function processParams(opts) {
  const page = get(opts, 'page', 1);
  const limit = get(opts, 'itemsPerPage', 100);
  const params = {
    sortBy: opts.sortBy || 'id',
    sortOrder: opts.sortDesc ? 'DESC' : 'ASC',
    offset: (page - 1) * limit,
    limit: limit === -1 ? null : limit
  };
  return Object.assign(params, opts.params);
}
