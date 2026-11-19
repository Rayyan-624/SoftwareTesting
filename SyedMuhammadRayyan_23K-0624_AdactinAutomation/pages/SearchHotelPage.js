class SearchHotelPage {

  constructor(page) {
    this.page = page;
    this.welcomeMsg    = page.locator('.welcome_menu');
    this.usernameShow  = page.locator('#username_show');
    this.location      = page.locator('#location');
    this.hotels        = page.locator('#hotels');
    this.roomType      = page.locator('#room_type');
    this.roomNos       = page.locator('#room_nos');
    this.checkIn       = page.locator('#datepick_in');
    this.checkOut      = page.locator('#datepick_out');
    this.adults        = page.locator('#adult_room');
    this.searchButton  = page.locator('#Submit');
    this.locationError = page.locator('#location_span');
  }

  async searchHotel(location, hotel, roomType, rooms, checkIn, checkOut, adults) {
    await this.location.selectOption(location);
    await this.hotels.selectOption(hotel);
    await this.roomType.selectOption(roomType);
    await this.roomNos.selectOption(rooms);
    await this.checkIn.fill(checkIn);
    await this.checkOut.fill(checkOut);
    await this.adults.selectOption(adults);
    await this.searchButton.click();
  }

  async clickSearch() {
    await this.searchButton.click();
  }
}

export default SearchHotelPage;
