import { Locator, Page } from '@playwright/test';
import { userCredsType } from 'types';

export default class LoginPage {
    constructor(private readonly page: Page) {}
    public readonly lockIcon: Locator = this.page.getByTestId('LockIcon');
    public readonly usernameField: Locator = this.page.getByLabel('Username');
    public readonly passwordField: Locator = this.page.getByLabel('Password');
    public readonly loginButton: Locator = this.page.getByRole('button', { name: 'Sign in' });
    public readonly errorMessage: Locator = this.page.getByText('Required').last();

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