import { z }                     from 'zod';

import { PostSchema, type Post } from '../model';

const deletedPosts: number[] = [];

export const getPost: () => Promise<Post[]> = () => fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then((data) => {
    const posts = z.array(PostSchema).parse(data);
    return posts.filter(post => !deletedPosts.includes(post.id));
  });

export const deletePost: (id: number) => Promise<void> = id => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'DELETE',
}).then(() => {
  deletedPosts.push(id);
});
