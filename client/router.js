
import Auth from '@/components/auth';
import ForgotPassword from '@/components/auth/ForgotPassword';
import get from 'lodash/get';
import Home from '@/components';
import Login from '@/components/auth/Login';
import NotFound from '@/components/common/NotFound';
import Register from '@/components/auth/Register';
import ResetPassword from '@/components/auth/ResetPassword';
import Router from 'vue-router';
import store from './store';
import Vue from 'vue';

Vue.use(Router);

// Handle 404
const fallbackRoute = { path: '*', component: NotFound };

const router = new Router({
  routes: [{
    path: '/auth',
    name: 'auth',
    component: Auth,
    children: [{
      path: 'login',
      name: 'login',
      component: Login
    }, {
      path: 'register',
      name: 'register',
      component: Register
    }, {
      path: 'forgot-password',
      name: 'forgot-password',
      component: ForgotPassword
    }, {
      path: 'reset-password/:token',
      name: 'reset-password',
      component: ResetPassword
    }]
  }, {
    path: '/',
    component: Home,
    meta: { auth: true }
  }, fallbackRoute]
});

const requiresAuth = route => route.matched.some(it => it.meta.auth);

router.beforeEach((to, _from, next) => {
  const user = get(store.state, 'auth.user');
  if (requiresAuth(to) && !user) return next({ name: 'login' });
  return next();
});

export default router;
