import type { User } from '../model';

type Props = {
  user: User;
};

export function UserItem({ user }: Props) {
  return (
    <li>
      {user.name} ({user.username}) - {user.email}
    </li>
  );
}
