import { expect } from '@playwright/test';
import { itemCount, taskStatus, taskCountWithStatus } from '../constants';
import { taskCountType } from 'types';
import { test } from '../../fixtures/authFixture';

const increasedTaskCountWithStatus: taskCountType = 4;
const decreasedTaskCountWithStatus: taskCountType = 2;
const taskCountFilteredByAssignee: taskCountType = 5;
const taskCountFilteredByStatus: taskCountType = 3;
const taskCountFilteredByLabel: taskCountType = 2;
const taskCountMultiFiltered: taskCountType = 1;

test.describe('Check interactions with board', () => {

    test.beforeEach(async ({ adminPage, boardElem }) => {
      await adminPage.openPage('Tasks');

      await boardElem.expectCardsCount(itemCount.task);
    });

    test('D&D task card is works as expected', async ({ boardElem }) => {
      await boardElem.expectTaskCountWithStatus(taskStatus.draft, taskCountWithStatus.draft);
      await boardElem.expectTaskCountWithStatus(taskStatus.published, taskCountWithStatus.published);
    
      await boardElem.dragAndDropFirsCardTo(taskStatus.published);

      await boardElem.expectTaskCountWithStatus(taskStatus.draft, decreasedTaskCountWithStatus);
      await boardElem.expectTaskCountWithStatus(taskStatus.published, increasedTaskCountWithStatus);
    });

    [
      { filterField: 'Assignee', valueToSelect: 'jack@yahoo.com', expectedTaskCount: taskCountFilteredByAssignee },
      { filterField: 'Status', valueToSelect: 'To Publish', expectedTaskCount: taskCountFilteredByStatus },
      { filterField: 'Label', valueToSelect: 'bug', expectedTaskCount: taskCountFilteredByLabel }
    ].forEach(({ filterField, valueToSelect, expectedTaskCount }) => {
        test(`Filtering by ${filterField} works as expected`, async ({ boardElem }) => {
          await boardElem.selectDropdownValue(filterField, valueToSelect);

          await expect(boardElem.addFilterButton).toBeVisible();
          await boardElem.expectCardsCount(expectedTaskCount);
        });
    });

    test('Multiple filtering works as expected', async ({ boardElem }) => {
        await boardElem.selectDropdownValue('Assignee', 'alice@hotmail.com');
        await boardElem.selectDropdownValue('Status', 'To Be Fixed');
        await boardElem.selectDropdownValue('Label', 'feature');
        
        await expect(boardElem.addFilterButton).toBeVisible();
        await boardElem.expectCardsCount(taskCountMultiFiltered);
    });
})
