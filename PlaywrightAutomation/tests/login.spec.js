import { test, expect } from '@playwright/test';
import loginData from '../testdata/loginData.json';

loginData.validUsers.forEach((data) => {
  test(`Login Test for ${data.username}`, async ({ page }) => {
    await page.goto('https://adactinhotelapp.com/', { waitUntil: 'domcontentloaded' });
    await page.fill('#username', data.username);
    await page.fill('#password', data.password);
    await page.click('#login');
    await expect(page.locator('.welcome_menu').first()).toContainText('Welcome to Adactin Group of Hotels');
  });
});
