import { faker } from '@faker-js/faker';

import type { User } from '../model';
import type { UserPagination, UserResponse } from '../model/types';

const maxUsers = 10000;

const generateUser = (index: number): User => ({
  id:       index,
  name:     faker.person.fullName(),
  username: faker.internet.username(),
  email:    faker.internet.email(),
});

const generateUsers = (count: number): User[] =>
  Array.from({ length: count }).map((_, index) => generateUser(index));

export const getUser: (pagination: UserPagination) => Promise<UserResponse> = ({
  page,
  perPage,
}) =>
  new Promise((resolve) => setTimeout(() => {
    const originalUsers = generateUsers(perPage);

    const newIdUsers = originalUsers.map(user => ({
      ...user,
      id: maxUsers - user.id,
    }));

    resolve({
      users: newIdUsers,
      totalCount: maxUsers,
    });
  }, 500));
