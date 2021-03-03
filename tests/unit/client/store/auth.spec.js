const { login } = require('@/store/modules/auth/actions');

jest.mock('@/api/auth', () => {
  const responseUser = { id: 1, email: 'user@gmail.com', password: 'password' };
  return { login: jest.fn().mockResolvedValue(responseUser) };
});

describe('Test for user login', () => {
  it('Should login successfully', async () => {
    const mockedUser = { email: 'user@gmail.com', password: 'password' };
    const commit = jest.fn();
    await login({ commit }, mockedUser);
    expect(commit).toHaveBeenCalledWith('login', { id: 1, ...mockedUser });
  });
});
