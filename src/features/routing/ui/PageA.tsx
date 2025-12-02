import { useSearch } from '@tanstack/react-router';

export function PageA() {
  const { a } = useSearch({ from: '/a' });

  return (
    <div>
      <h1>Page A</h1>
      <p>Search param "a": {a || '(empty)'}</p>
    </div>
  );
}
