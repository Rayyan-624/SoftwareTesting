import { test, expect } from '@playwright/test';
import apiData from '../testdata/apiData.json';
import { apiRegister, apiLogin } from '../utils/apiHelper';

const unique = Date.now();
const data = {
  ...apiData.user,
  username: `rayyan${unique}`,
  email: `rayyan${unique}@test.com`
};

test.describe.serial('User API', () => {
  test('Register user API Test', async ({ request }) => {
    const response = await apiRegister({ request }, data);
    console.log(await response.json());
    expect(response.status()).toBe(201);
  });

  test('Get user API Test', async ({ request }) => {
    const response = await apiLogin({ request }, data);
    console.log(await response.json());
    expect(response.status()).toBe(200);

    const tokenData = await response.json();
    const token = tokenData.data.accessToken;

    const GETResponse = await request.get(`${apiData.baseURL}/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(GETResponse.status());
    expect(GETResponse.status()).toBe(200);
  });
});
