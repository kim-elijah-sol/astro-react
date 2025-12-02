import { z }                     from 'zod';

import { UserSchema, type User } from '../model';

export const getUser: () => Promise<User[]> = () => fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(data => z.array(UserSchema).parse(data));
