import { z } from 'zod';

export const UserSchema = z.object({
  id:       z.number(),
  name:     z.string(),
  username: z.string(),
  email:    z.email(),
});

export type User = z.infer<typeof UserSchema>;

export const UserPaginationSchema = z.object({
  page:       z.number().min(0),
  perPage:    z.number().min(1),
});

export type UserPagination = z.infer<typeof UserPaginationSchema>;

export const UserResponseSchema = z.object({
  users: z.array(UserSchema),
  totalCount: z.number(),
})

export type UserResponse = z.infer<typeof UserResponseSchema>;