import auth from './modules/auth';
import { auth as authPlugin } from './plugins';
import request from '@/api/request';
import Vue from 'vue';
import Vuex from 'vuex';

const isProduction = process.env.NODE_ENV === 'production';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { auth },
  plugins: [authPlugin({ storageKey: 'BOOSTER_USER' })],
  strict: !isProduction
});

request.auth.storageKey = 'BOOSTER_TOKEN';
request.auth.on('error', () => store.dispatch('auth/logout'));

export default store;
