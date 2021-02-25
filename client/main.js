import {
  setInteractionMode,
  ValidationObserver,
  ValidationProvider
} from 'vee-validate';
import App from './App.vue';
import router from './router';
import store from './store';
import Vue from 'vue';
import vuetify from '@/plugins/vuetify';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
setInteractionMode('eager');

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
