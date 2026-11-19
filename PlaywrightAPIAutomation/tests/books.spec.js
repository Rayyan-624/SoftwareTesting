import { test, expect } from '@playwright/test';

test('Validate Book API Response', async ({ request }) => {
  const response = await request.get('https://demoqa.com/BookStore/v1/Books');
  const responseBody = await response.json();

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  expect(responseBody.books.length).toBeGreaterThan(0);
  expect(responseBody.books[0].title).toBe('Git Pocket Guide');
});

test('Create User API Test', async ({ request }) => {
  const userName = `rayyan${Date.now()}`;
  const response = await request.post('https://demoqa.com/Account/v1/User', {
    data: {
      userName: userName,
      password: 'Rayyan@0624'
    }
  });

  const responseBody = await response.json();
  console.log(responseBody);
  expect(response.status()).toBe(201);
  expect(responseBody.username).toBe(userName);
  expect(responseBody.userID).toBeTruthy();
});
