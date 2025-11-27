export type Post = {
  userId: number;
  id:     number;
  title:  string;
  body:   string;
};

export const getPost: () => Promise<Post[]> = () => fetch('https://jsonplaceholder.typicode.com/posts').then((res) => {
  console.log('Fetching posts from API');
  return res.json();
});

export const deletePost: (id: number) => Promise<void> = id => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'DELETE',
}).then(() => {});
