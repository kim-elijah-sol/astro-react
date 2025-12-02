import { useSuspenseQuery }       from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

import { deletePost, getPost }    from '@/entities/post';
import { queryClient }            from '@/shared';

export function PostList({ children }: PropsWithChildren) {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['posts'],
    queryFn:  getPost,
  }, queryClient);

  return (
    <>
      {children}
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
    </>
  );
}
