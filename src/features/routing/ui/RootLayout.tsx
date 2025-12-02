import { Link, Outlet }           from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export function RootLayout() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Link to="/">Home</Link>
        <Link
          to="/a" search={{
            a: 'hello from root layout',
          }}
        >Page A
        </Link>
        <Link to="/b">Page B</Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
