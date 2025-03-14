import { test as base } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import AdminPage from '../pages/adminPage';
import TableElements from '../pages/tableElement';
import BoardElements from '../pages/boardElement';

export const test = base.extend<{
    loginPage: LoginPage;
    adminPage: AdminPage;
    tableElem: TableElements;
    boardElem: BoardElements
}>({
    loginPage: async ({ page }, use) => await use(new LoginPage(page)),
    adminPage: async ({ page }, use) => await use(new AdminPage(page)),
    tableElem: async ({ page }, use) => await use(new TableElements(page)),
    boardElem: async ({ page }, use) => await use(new BoardElements(page))
});
