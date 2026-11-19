class LogoutPage {

  constructor(page) {
    this.page = page;
    this.logoutMsg = page.locator('.reg_success');
  }
}

export default LogoutPage;
