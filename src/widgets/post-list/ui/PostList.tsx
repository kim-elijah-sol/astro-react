import { useSuspenseQuery } from '@tanstack/react-query';

import { deletePost, getPost }                   from '@/entities/post';
import { withQueryClientProvider } from '@/shared/lib/query-client';

export const PostList = withQueryClientProvider(() => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['posts'],
    queryFn:  getPost,
  });

  return (
    <ul>
      {
        data.map(post => (
          <li
            key={post.id}
            onClick={async () => {
              await deletePost(post.id);
              refetch();
            }}
          >
            {post.title}
          </li>
        ))
      }
    </ul>
  );
})