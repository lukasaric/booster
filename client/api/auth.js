import { extractData } from '@/api/helpers';
import path from 'path';
import request from './request';

const urls = {
  root: '/users',
  login: () => path.join(urls.root, 'login'),
  register: () => path.join(urls.root, 'register'),
  logout: () => path.join(urls.root, 'logout')
};

function fetch(params = {}) {
  return request.get(urls.root, params)
    .then(extractData);
}

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

function forgotPassword(email) {
  return request.post(urls.forgotPassword(), { email });
}

function resetPassword(body) {
  return request.post(urls.resetPassword(), body);
}

export default {
  fetch,
  login,
  register,
  logout,
  forgotPassword,
  resetPassword
};
