import { test, expect } from '@playwright/test';
import loginData from '../testdata/loginData.json';
import LoginPage from '../pages/LoginPage';

test('Login Test Case using with Valid User', async ({ page }) => {
  const login = new LoginPage(page);
  const data = loginData.validUsers[0];

  await login.gotoURL();
  await login.login(data.username, data.password);
  await expect(login.message.first()).toHaveText(data.ExpectedMsg);
});
