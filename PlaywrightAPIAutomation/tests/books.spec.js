import { test, expect } from '@playwright/test';

test('Validate Book API Response', async ({ request }) => {
  const response = await request.get('https://demoqa.com/BookStore/v1/Books');
  const responseBody = await response.json();

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  expect(responseBody.books.length).toBeGreaterThan(0);
  expect(responseBody.books[0].title).toBe('Git Pocket Guide');
});
