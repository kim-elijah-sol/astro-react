import { z } from 'zod';

export const UserSchema = z.object({
  id:       z.number(),
  name:     z.string(),
  username: z.string(),
  email:    z.email(),
});

export type User = z.infer<typeof UserSchema>;
