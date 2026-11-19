import { test, expect } from '@playwright/test';
import data from '../testdata/adactinData.json';
import LoginPage from '../pages/LoginPage';
import SearchHotelPage from '../pages/SearchHotelPage';
import SelectHotelPage from '../pages/SelectHotelPage';
import BookHotelPage from '../pages/BookHotelPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import LogoutPage from '../pages/LogoutPage';

test('TC_P01 Successful login with valid credentials', async ({ page }) => {
  const login = new LoginPage(page);
  const search = new SearchHotelPage(page);

  await login.gotoURL();
  await expect(page).toHaveTitle(data.titles.login);
  await expect(login.loginButton).toBeEnabled();

  await login.login(data.validUser.username, data.validUser.password);

  await expect(page).toHaveURL(/SearchHotel.php/);
  await expect(page).toHaveTitle(data.titles.search);
  await expect(search.welcomeMsg.first()).toHaveText(data.messages.welcome);
  await expect(search.usernameShow).toHaveValue('Hello ' + data.validUser.username + '!');
});

test('TC_P02 Valid hotel search with correct filters', async ({ page }) => {
  const login = new LoginPage(page);
  const search = new SearchHotelPage(page);
  const select = new SelectHotelPage(page);
  const s = data.search;

  await login.gotoURL();
  await login.login(data.validUser.username, data.validUser.password);
  await expect(search.searchButton).toBeEnabled();

  await search.searchHotel(s.location, s.hotel, s.roomType, s.rooms, s.checkIn, s.checkOut, s.adults);

  await expect(page).toHaveURL(/SelectHotel.php/);
  await expect(page).toHaveTitle(data.titles.selectHotel);
  await expect(select.firstHotel).toBeVisible();
  await expect(select.continueButton).toBeEnabled();
});

test('TC_P03 Successful hotel selection and booking', async ({ page }) => {
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

  await expect(page).toHaveURL(/BookHotel.php/);
  await expect(page).toHaveTitle(data.titles.bookHotel);
  await expect(book.hotelName).toHaveValue(s.hotel);
  await expect(book.bookNowButton).toBeEnabled();

  await book.bookHotel(b.firstName, b.lastName, b.address, b.ccNum, b.ccType, b.expMonth, b.expYear, b.cvv);

  await expect(page).toHaveTitle(data.titles.confirmation, { timeout: 30000 });
});

test('TC_P04 Booking confirmation shown with Order Number', async ({ page }) => {
  const login = new LoginPage(page);
  const search = new SearchHotelPage(page);
  const select = new SelectHotelPage(page);
  const book = new BookHotelPage(page);
  const confirm = new ConfirmationPage(page);
  const s = data.search;
  const b = data.booking;

  await login.gotoURL();
  await login.login(data.validUser.username, data.validUser.password);
  await search.searchHotel(s.location, s.hotel, s.roomType, s.rooms, s.checkIn, s.checkOut, s.adults);
  await select.selectFirstHotel();
  await book.bookHotel(b.firstName, b.lastName, b.address, b.ccNum, b.ccType, b.expMonth, b.expYear, b.cvv);

  await expect(page).toHaveTitle(data.titles.confirmation, { timeout: 30000 });
  await expect(confirm.orderNo).toBeVisible();
  await expect(confirm.orderNo).not.toHaveValue('');
  await expect(confirm.itineraryButton).toBeEnabled();
  console.log('Order Number: ' + await confirm.orderNo.inputValue());
});

test('TC_P05 Successful logout after booking', async ({ page }) => {
  const login = new LoginPage(page);
  const search = new SearchHotelPage(page);
  const select = new SelectHotelPage(page);
  const book = new BookHotelPage(page);
  const confirm = new ConfirmationPage(page);
  const logout = new LogoutPage(page);
  const s = data.search;
  const b = data.booking;

  await login.gotoURL();
  await login.login(data.validUser.username, data.validUser.password);
  await search.searchHotel(s.location, s.hotel, s.roomType, s.rooms, s.checkIn, s.checkOut, s.adults);
  await select.selectFirstHotel();
  await book.bookHotel(b.firstName, b.lastName, b.address, b.ccNum, b.ccType, b.expMonth, b.expYear, b.cvv);
  await expect(page).toHaveTitle(data.titles.confirmation, { timeout: 30000 });

  await confirm.logout();

  await expect(page).toHaveURL(/Logout.php/);
  await expect(page).toHaveTitle(data.titles.logout);
  await expect(logout.logoutMsg).toContainText(data.messages.logout);
});
