import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { useMemo }    from 'react';

import { HomePage }   from './HomePage';
import { PageA }      from './PageA';
import { PageB }      from './PageB';
import { RootLayout } from './RootLayout';

// Routes
const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path:           '/',
  component:      HomePage,
});

const aRoute = createRoute({
  getParentRoute: () => rootRoute,
  path:           '/a',
  component:      PageA,
  validateSearch: (search: Record<string, unknown>) => ({
    a: (search.a as string) || '',
  }),
});

const bRoute = createRoute({
  getParentRoute: () => rootRoute,
  path:           '/b',
  component:      PageB,
});

const routeTree = rootRoute.addChildren([indexRoute, aRoute, bRoute]);

export function Routing() {
  const router = useMemo(() => {
    const memoryHistory = createMemoryHistory({
      initialEntries: ['/'],
    });

    return createRouter({
      routeTree,
      history: memoryHistory,
    });
  }, []);

  return <RouterProvider router={router} />;
}
