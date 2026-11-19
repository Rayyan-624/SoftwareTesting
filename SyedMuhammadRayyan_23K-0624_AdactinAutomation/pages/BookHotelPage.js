class BookHotelPage {

  constructor(page) {
    this.page = page;
    this.hotelName      = page.locator('#hotel_name_dis');
    this.firstName      = page.locator('#first_name');
    this.lastName       = page.locator('#last_name');
    this.address        = page.locator('#address');
    this.ccNum          = page.locator('#cc_num');
    this.ccType         = page.locator('#cc_type');
    this.expMonth       = page.locator('#cc_exp_month');
    this.expYear        = page.locator('#cc_exp_year');
    this.cvv            = page.locator('#cc_cvv');
    this.bookNowButton  = page.locator('#book_now');
    this.firstNameError = page.locator('#first_name_span');
    this.ccNumError     = page.locator('#cc_num_span');
  }

  async bookHotel(firstName, lastName, address, ccNum, ccType, expMonth, expYear, cvv) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.address.fill(address);
    await this.ccNum.fill(ccNum);
    await this.ccType.selectOption(ccType);
    await this.expMonth.selectOption(expMonth);
    await this.expYear.selectOption(expYear);
    await this.cvv.fill(cvv);
    await this.bookNowButton.click();
  }
}

export default BookHotelPage;
