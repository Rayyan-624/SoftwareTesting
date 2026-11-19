import { test, expect } from '@playwright/test';
import loginData from '../testdata/loginData.json';

test('Login Test Case', async ({ page }) => {
  const username = loginData.validUsers[0].username;
  const password = loginData.validUsers[0].password;

  await page.goto('https://adactinhotelapp.com/');
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('#login');
  await expect(page.locator('.welcome_menu').first()).toContainText('Welcome to Adactin Group of Hotels');
});
