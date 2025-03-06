import { faker } from '@faker-js/faker';
import { userCredsType, taskDataType, itemCountType, taskStatusType, taskCountWithStatusType } from 'types'; 

export const userCreds: userCredsType = {
    username: faker.internet.username(),
    password: faker.internet.password(),
}

export const userData: Record<string,string> = {
    'Email': faker.internet.email(),
    'First name': faker.person.firstName(),
    'Last name': faker.person.lastName(),
}

export const labelData: Record<string,string> = {
    'Name': faker.lorem.word(6)
}

export const statusData: Record<string,string> = {
    'Name': faker.lorem.word(5),
    'Slug': faker.lorem.word(5)
}

export const taskData: taskDataType = {
  assignee: 'sarah@example.com',
  title: faker.lorem.word(6),
  content: faker.lorem.word(8),
  status: 'To Review',
  label: 'task'
}

export const itemCount: itemCountType = {
    user: 8,
    label: 5,
    status: 5,
    task: 15
}

export const taskStatus: taskStatusType = {
  draft: 'Draft',
  toReview: 'To Review',
  toBeFixed: 'To Be Fixed',
  toPublish: 'To Publish',
  published: 'Published'
}

export const taskCountWithStatus: taskCountWithStatusType = {
  draft: 3,
  toReview: 3,
  toBeFixed: 3,
  toPublish: 3,
  published: 3
}