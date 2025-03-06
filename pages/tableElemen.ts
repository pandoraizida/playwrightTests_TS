import { Locator, Page, expect } from '@playwright/test';
import { arrayOfString } from 'types';

export default class TableElements {
    constructor(public page: Page) {}
    public createButton: Locator = this.page.getByRole('link').filter({ hasText: 'Create' });
    public exportButton: Locator = this.page.getByRole('button', { name: 'Export' });
    public tableRow: Locator = this.page.getByRole('row');
    public tableTitle: Locator = this.tableRow.first();
    public showInfoButton: Locator = this.page.getByRole('link').filter({ hasText: 'Show' });
    public saveFormButton: Locator = this.page.getByRole('button', { name: 'Save' });
    public deleteButton: Locator = this.page.getByRole('button', { name: 'Delete' });
    public checkboxForAllItems: Locator = this.page.getByTestId('CheckBoxOutlineBlankIcon').first();

    getErrorMessage(text: string): Locator {
        return this.page.getByRole('paragraph').filter({ hasText: text });
    }

    getText(text: string): Locator {
        return this.page.getByText(text);
    }

    getField(label: string): Locator {
        return this.page.getByLabel(label);
    }

    selectedItemsNote(text: string): Locator {
        return this.page.getByRole("heading", { name: text });
    }

    async openCreateForm(): Promise<void> {
      await this.createButton.click();
    }

    async saveForm(): Promise<void> {
        await this.saveFormButton.click();
    }

    async deleteItem(): Promise<void> {
        await this.deleteButton.click();
    }

    async clearFormField(label: string): Promise<void> {
        await this.page.getByLabel(label).clear();
    }

    async openEditForm(): Promise<void> {
        const lastRow = this.page.getByRole('row').last();
        await lastRow.click();
    }

    async selectAllItems(): Promise<void> {
        await this.checkboxForAllItems.click({ force: true });
    }

    async fillFormWithData(data: Record<string,string>): Promise<void> {
      for (const item in data) {
          await this.getField(item).fill(data[item]);
        }
      await this.saveForm();
    }

    async expectItemsCount(number: number | undefined): Promise<void> {
      expect(await this.tableRow.count() - 1).toBe(number);
    }

    async expectElementsVisability(elements: Record<string,string> | arrayOfString) {
      const elementsArray = Array.isArray(elements) ? elements : Object.keys(elements);
      elementsArray.forEach((elem) => {
        expect(this.getField(elem)).toBeVisible();
      })
    }

    async expectItemContain(userdata: Record<string,string>, condition = true) {
      const values = Object.values(userdata);
      const lastRow =  this.page.getByRole('row').last();
      if (condition) {
        values.forEach((value) => {
            expect(lastRow).toContainText(value);
          })
      } else {
        values.forEach((value) => {
            expect(lastRow).not.toContainText(value);
          })
      }
    }

    async expectFieldHasValue(userdata: Record<string,string>) {
      for (const item in userdata) {
        await expect(this.getField(item)).toHaveValue(userdata[item]);
      }
    }

    async expectFieldIsNotEmpty(userdata: Record<string,string> | arrayOfString) {
      const fields = Array.isArray(userdata) ? userdata : Object.keys(userdata);
      for (const field of fields) {
        await expect(this.getField(field)).not.toBeEmpty();
      }
    }
}