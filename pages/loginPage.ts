import { Locator, Page } from '@playwright/test';
import { userCredsType } from 'types';

export default class LoginPage {
    constructor(private page: Page) {}
    public lockIcon: Locator = this.page.getByTestId('LockIcon');
    public usernameField: Locator = this.page.getByLabel('Username');
    public passwordField: Locator = this.page.getByLabel('Password');
    public loginButton: Locator = this.page.getByRole('button', { name: 'Sign in' });
    public errorMessage: Locator = this.page.getByText('Required').last();

    async goto(): Promise<void> {
      await this.page.goto('/login');
    }

    async clickLoginButton(): Promise<void> {
      await this.loginButton.click();
    }

    async login(userdata: userCredsType): Promise<void> {
      await this.goto();
      await this.usernameField.fill(userdata.username);
      await this.passwordField.fill(userdata.password);
      await this.clickLoginButton();
    }
}