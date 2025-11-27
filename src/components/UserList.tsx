import type { User } from '../api/user.api';

type Props = {
  data: User[];
};

export default function PostList({ data }: Props) {
  return (
    <ul>
      {
        data.map(user => (
          <li key={user.id}>
            {user.name} ({user.username}) - {user.email}
          </li>
        ))
      }
    </ul>
  );
}
