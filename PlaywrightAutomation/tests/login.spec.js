import { test, expect } from '@playwright/test';
import loginData from '../testdata/loginData.json';
import LoginPage from '../pages/LoginPage';

test.describe('Login', () => {
  test('Login Test Case with valid user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const data = loginData.validUsers[0];

    await test.step('Open login Page', async () => {
      await loginPage.gotoLoginPage();
    });

    await test.step('Enter credential and login', async () => {
      await loginPage.login(data.username, data.password);
    });

    await test.step('Verify Welcome Message on Landing page', async () => {
      await expect(loginPage.message.first()).toHaveText(data.ExpectedMsg);
      await loginPage.attachScreenshot('05 - Welcome Message Should be displayed');
    });
  });
});
