import { Page, Locator, expect } from "@playwright/test";
import TableElements from './tableElement';
import { taskDataType, taskStatusType } from "types";

export default class BoardElements extends TableElements {
    constructor(page: Page) {
       super(page);
    }
    
    public readonly taskCard: Locator = this.page.locator('.MuiCard-root');
    public readonly contentField: Locator = this.page.getByLabel('Content', { exact: true });
    public readonly firstTaskCard: Locator = this.taskCard.first();
    public readonly addFilterButton: Locator = this.page.getByRole('button', { name: 'Add Filter' });

    currentTaskCard(text: string): Locator {
        return this.page.getByRole('button').filter({ hasText: text });
    }

    getTaskColumn(text: string): Locator {
        return this.page.locator('.MuiBox-root').locator('.MuiBox-root').filter({ hasText: text });
    }

    async selectDropdownValue(label: string, text: string): Promise<void> {
        await this.getField(label).click();
        await this.page.getByRole('option').filter({ hasText: text }).click();
    }

    async fillTaskForm(data: taskDataType): Promise<void> {
        await this.selectDropdownValue('Assignee', data.assignee);
        await this.getField('Title').fill(data.title);
        await this.contentField.fill(data.content);
        await this.selectDropdownValue('Status', data.status);
        await this.selectDropdownValue('Label', data.label);
        await this.page.keyboard.press('Escape');
        await this.saveForm();
    }

    async openEditFirstTaskForm(): Promise<void> {
        await this.firstTaskCard.getByRole('link').filter({ hasText: 'Edit' }).click();
    }

    async dragAndDropFirsCardTo(toColumn: string): Promise<void> {
        const source = this.firstTaskCard;
        const target = this.getTaskColumn(toColumn);
        const targetBox = await target.boundingBox();
        if (targetBox === null) {
            throw new Error("Target box it not have a boundies");
        }
        await source.hover();
        await this.page.mouse.down();
        await this.page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 10 });
        await this.page.mouse.up();
    }

    async expectCardsCount(count: number = 0): Promise<void> {
        await expect(this.taskCard).toHaveCount(count);
    }

    async expectTaskCountWithStatus(status: string, count: number = 0): Promise<void> {
        const column = this.getTaskColumn(status);
        await expect(column.locator('.MuiCard-root')).toHaveCount(count);
    }

    async expectHeadersVisability(userdata: taskStatusType): Promise<void> {
        const elements = Object.values(userdata);
        elements.forEach((elem) => {
          expect(this.page.getByRole('heading', { name: elem })).toBeVisible();
        })
    }

    async expectTaskFieldsVisability(): Promise<void> {
        await expect(this.getField('Assignee')).toBeVisible();
        await expect(this.getField('Title')).toBeVisible();
        await expect(this.getField('Status')).toBeVisible();
        await expect(this.getField('Label')).toBeVisible();
        await expect(this.contentField).toBeVisible();
    }

    async expectTaskFieldHasValue(data: taskDataType): Promise<void> {
      await expect(this.page.getByRole('combobox').filter({ hasText: data.assignee })).toBeVisible();
      await expect(this.getField('Title')).toHaveValue(data.title);
      await expect(this.contentField).toHaveValue(data.content);
      await expect(this.page.getByRole('combobox').filter({ hasText: data.status })).toBeVisible();
      await expect(this.page.getByRole('combobox').filter({ hasText: data.label })).toBeVisible();
    }

    async expectTaskCardContain(text: string, data: string[]): Promise<void> {
        const card = this.currentTaskCard(text);
        data.forEach((value) => {
            expect(card).toContainText(value);
        })
    }
}
