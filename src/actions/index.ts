import { defineAction }       from 'astro:actions';

import { deletePost }         from '../api/post.api';
import { getUser, type User } from '../api/user.api';

export const server = {
  getUser: defineAction({
    handler: async () => {
      const data = await getUser() as User[];
      return data;
    },
  }),
  deletePost: defineAction({
    handler: async (id: number) => {
      await deletePost(id);

      return {
        success: true,
      };
    },
  }),
};
