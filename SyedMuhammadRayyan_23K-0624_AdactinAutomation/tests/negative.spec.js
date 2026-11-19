import { test, expect } from '@playwright/test';
import data from '../testdata/adactinData.json';
import LoginPage from '../pages/LoginPage';
import SearchHotelPage from '../pages/SearchHotelPage';
import SelectHotelPage from '../pages/SelectHotelPage';
import BookHotelPage from '../pages/BookHotelPage';
import ConfirmationPage from '../pages/ConfirmationPage';

test('TC_N01 Login with invalid username and password', async ({ page }) => {
  const login = new LoginPage(page);

  await login.gotoURL();
  await login.login(data.invalidUser.username, data.invalidUser.password);

  await expect(login.errorMsg).toContainText(data.messages.invalidLogin);
  await expect(page).toHaveTitle(data.titles.login);
  await expect(login.loginButton).toBeEnabled();
});

test('TC_N02 Search hotel without selecting mandatory fields', async ({ page }) => {
  const login = new LoginPage(page);
  const search = new SearchHotelPage(page);

  await login.gotoURL();
  await login.login(data.validUser.username, data.validUser.password);
  await search.clickSearch();

  await expect(search.locationError).toHaveText(data.messages.locationError);
  await expect(page).toHaveURL(/SearchHotel.php/);
  await expect(page).toHaveTitle(data.titles.search);
});

test('TC_N03 Booking with missing personal details', async ({ page }) => {
  const login = new LoginPage(page);
  const search = new SearchHotelPage(page);
  const select = new SelectHotelPage(page);
  const book = new BookHotelPage(page);
  const s = data.search;
  const b = data.booking;

  await login.gotoURL();
  await login.login(data.validUser.username, data.validUser.password);
  await search.searchHotel(s.location, s.hotel, s.roomType, s.rooms, s.checkIn, s.checkOut, s.adults);
  await select.selectFirstHotel();
  await book.bookHotel('', '', '', b.ccNum, b.ccType, b.expMonth, b.expYear, b.cvv);

  await expect(book.firstNameError).toHaveText(data.messages.firstNameError);
  await expect(page).toHaveTitle(data.titles.bookHotel);
  await expect(book.bookNowButton).toBeEnabled();
});

test('TC_N04 Invalid credit card details during payment', async ({ page }) => {
  const login = new LoginPage(page);
  const search = new SearchHotelPage(page);
  const select = new SelectHotelPage(page);
  const book = new BookHotelPage(page);
  const s = data.search;
  const b = data.booking;

  await login.gotoURL();
  await login.login(data.validUser.username, data.validUser.password);
  await search.searchHotel(s.location, s.hotel, s.roomType, s.rooms, s.checkIn, s.checkOut, s.adults);
  await select.selectFirstHotel();
  await book.bookHotel(b.firstName, b.lastName, b.address, data.invalidCard.ccNum, b.ccType, b.expMonth, b.expYear, b.cvv);

  await expect(book.ccNumError).toHaveText(data.messages.ccNumError);
  await expect(page).toHaveTitle(data.titles.bookHotel);
  await expect(book.bookNowButton).toBeEnabled();
});

test('TC_N05 Logout attempt without logging in', async ({ page }) => {
  const login = new LoginPage(page);

  await login.gotoURL();

  await expect(page).toHaveTitle(data.titles.login);
  await expect(login.logoutLink).toHaveCount(0);
  await expect(login.loginButton).toBeVisible();
  await expect(login.loginButton).toBeEnabled();
});
