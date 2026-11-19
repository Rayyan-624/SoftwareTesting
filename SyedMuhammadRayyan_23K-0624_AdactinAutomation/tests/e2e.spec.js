import { test, expect } from '@playwright/test';
import data from '../testdata/adactinData.json';
import LoginPage from '../pages/LoginPage';
import SearchHotelPage from '../pages/SearchHotelPage';
import SelectHotelPage from '../pages/SelectHotelPage';
import BookHotelPage from '../pages/BookHotelPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import ItineraryPage from '../pages/ItineraryPage';
import LogoutPage from '../pages/LogoutPage';

test('TC_E2E_01 End to end hotel booking flow', async ({ page }) => {
  const login = new LoginPage(page);
  const search = new SearchHotelPage(page);
  const select = new SelectHotelPage(page);
  const book = new BookHotelPage(page);
  const confirm = new ConfirmationPage(page);
  const itinerary = new ItineraryPage(page);
  const logout = new LogoutPage(page);
  const s = data.search;
  const b = data.booking;

  // Step 1 - Login
  await login.gotoURL();
  await expect(page).toHaveTitle(data.titles.login);
  await login.login(data.validUser.username, data.validUser.password);
  await expect(page).toHaveTitle(data.titles.search);
  await expect(search.welcomeMsg.first()).toHaveText(data.messages.welcome);

  // Step 2 - Search Hotel
  await search.searchHotel(s.location, s.hotel, s.roomType, s.rooms, s.checkIn, s.checkOut, s.adults);
  await expect(page).toHaveTitle(data.titles.selectHotel);

  // Step 3 - Select Hotel
  await select.selectFirstHotel();
  await expect(page).toHaveTitle(data.titles.bookHotel);

  // Step 4 - Book Hotel
  await book.bookHotel(b.firstName, b.lastName, b.address, b.ccNum, b.ccType, b.expMonth, b.expYear, b.cvv);

  // Step 5 - Booking Confirmation
  await expect(page).toHaveTitle(data.titles.confirmation, { timeout: 30000 });
  await expect(confirm.orderNo).toBeVisible();
  await expect(confirm.orderNo).not.toHaveValue('');
  const orderNo = await confirm.orderNo.inputValue();
  console.log('Order Number: ' + orderNo);

  // Step 6 - Booking Itinerary
  await confirm.openItinerary();
  await expect(page).toHaveURL(/BookedItinerary.php/);
  await itinerary.searchOrder(orderNo);
  await expect(itinerary.bookedOrder(orderNo)).toBeVisible({ timeout: 30000 });

  // Step 7 - Logout
  await itinerary.logout();
  await expect(page).toHaveTitle(data.titles.logout);
  await expect(logout.logoutMsg).toContainText(data.messages.logout);
});
