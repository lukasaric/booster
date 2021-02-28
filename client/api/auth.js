import { extractData } from '@/api/helpers';
import path from 'path';
import request from './request';

const urls = {
  root: '/users',
  login: () => path.join(urls.root, 'login')
};

function login(credentials) {
  return request.base.post(urls.login(), credentials)
    .then(extractData)
    .then(({ token, user }) => {
      request.auth.token = token;
      return user;
    });
}

async function logout() {
  await request.post(urls.logout());
  request.auth.token = null;
}

function register(payload) {
  return request.post(urls.register(), payload);
}

function count(params = {}) {
  return request.get(urls.root, params)
    .then(extractData);
}

export default {
  login,
  register,
  logout,
  count
};
