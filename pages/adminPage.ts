import { Locator, Page } from '@playwright/test';

export default class AdminPage {
    constructor(private page: Page) {}

    public adminPageHeader: Locator = this.page.getByRole('heading');
    public userProfileButton: Locator = this.page.getByAltText('Jane Doe');

    async logout(): Promise<void> {
      await this.userProfileButton.click();
      await this.page.getByTestId('PowerSettingsNewIcon').click();
    }

    async openPage(text: string): Promise<void> {
      await this.page.getByRole('menuitem').filter({ hasText: text }).click();
    }
}