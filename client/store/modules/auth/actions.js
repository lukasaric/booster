import auth from '@/api/auth';

export const login = async ({ commit }, credentials) => {
  const user = await auth.login(credentials);
  return commit('login', user) || user;
};

export const logout = () => auth.logout();

export const forgotPassword = (_ctx, { email }) => {
  return auth.forgotPassword(email);
};

export const resetPassword = (_ctx, payload) => {
  return auth.resetPassword(payload);
};
