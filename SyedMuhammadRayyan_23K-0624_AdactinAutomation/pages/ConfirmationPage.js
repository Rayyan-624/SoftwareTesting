class ConfirmationPage {

  constructor(page) {
    this.page = page;
    this.orderNo         = page.locator('#order_no');
    this.itineraryButton = page.locator('#my_itinerary');
    this.logoutButton    = page.locator('#logout');
  }

  async openItinerary() {
    await this.itineraryButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}

export default ConfirmationPage;
