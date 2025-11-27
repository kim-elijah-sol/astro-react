import { QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { actions }                       from 'astro:actions';

import { getPost }                       from '../api/post.api';

const queryClient = new QueryClient();

export default function List() {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['posts'],
    queryFn:  getPost,
  }, queryClient);

  return (
    <ul>
      {
        data.map(post => (
          <li
            key={post.id} style={{
              cursor: 'pointer',
            }}
            onClick={async () => {
              await actions.deletePost(post.id);
              refetch();
            }}
          >
            {post.title}
          </li>
        ))
      }
    </ul>
  );
}
