class ItineraryPage {

  constructor(page) {
    this.page = page;
    this.searchOrderId = page.locator('#order_id_text');
    this.goButton      = page.locator('#search_hotel_id');
    this.logoutLink    = page.locator('a[href="Logout.php"]');
  }

  async searchOrder(orderNo) {
    await this.searchOrderId.fill(orderNo);
    await this.goButton.click();
  }

  bookedOrder(orderNo) {
    return this.page.locator(`input[value="${orderNo}"]`).first();
  }

  async logout() {
    await this.logoutLink.click();
  }
}

export default ItineraryPage;