class LoginPage {

  constructor(page) {
    this.page = page;
    this.username    = page.locator('#username');
    this.password    = page.locator('#password');
    this.loginButton = page.locator('#login');
    this.errorMsg    = page.locator('.auth_error');
    this.logoutLink  = page.locator('a[href="Logout.php"]');
  }

  async gotoURL() {
    await this.page.goto('https://adactinhotelapp.com/', { waitUntil: 'domcontentloaded' });
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}

export default LoginPage;
