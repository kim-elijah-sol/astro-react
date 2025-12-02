import { useNavigate, useRouter } from '@tanstack/react-router';

export function PageB() {
  const router = useRouter();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Page B</h1>
      <button onClick={() => router.history.back()}>이전 페이지로</button>

      <button onClick={() => navigate({ to: '/a', search: { a: 'Hello from B' }})}>
        A 페이지로
      </button>
    </div>
  );
}
