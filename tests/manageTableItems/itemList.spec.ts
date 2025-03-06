import { expect } from '@playwright/test';
import { itemCount } from '../constants';
import { arrayOfString } from 'types';
import { test } from '../../fixtures/authFixture';

const usersTableColumns: arrayOfString = ['Id', 'Email', 'First name', 'Last name', 'Created at'];
const labelTableColumns: arrayOfString = ['Id', 'Name', 'Created at'];
const statusTableColumns: arrayOfString = ['Id', 'Name', 'Slug', 'Created at'];

test.describe('Check item list view', () => {

  [
    { pageName: 'Users', tableHeaders: usersTableColumns, itemLength: itemCount.user },
    { pageName: 'Labels', tableHeaders: labelTableColumns, itemLength: itemCount.label },
    { pageName: 'Task statuses', tableHeaders: statusTableColumns, itemLength: itemCount.status },
  ].forEach(({ pageName, tableHeaders, itemLength }) => {
      test(`Should display correct ${pageName} page elements`, async ({ adminPage, tableElem }) => {
        await adminPage.openPage(pageName);
        
        await expect(tableElem.createButton).toBeVisible();
        await expect(tableElem.exportButton).toBeVisible();
        await tableElem.expectElementsVisability(tableHeaders);
        await tableElem.expectItemsCount(itemLength);
      });
  });
})