import { UserItem }  from '@/entities/user';
import type { User } from '@/entities/user';

type Props = {
  data: User[];
};

export function UserList({ data }: Props) {
  return (
    <ul>
      {data.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}
