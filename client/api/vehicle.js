import { extractData, processParams } from '@/api/helpers';
import path from 'path';
import request from '@/api/request';

const urls = {
  root: '/vehicles',
  resource: id => path.join(urls.root, String(id))
};

function fetch(params = {}) {
  return request.get(urls.root, { params: processParams(params) })
    .then(extractData);
}

function create(item) {
  return request.post(urls.root, item)
    .then(extractData);
}

function remove(item) {
  return request.delete(urls.resource(item.id));
}

export default {
  fetch,
  create,
  remove
};
