import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { z } from 'zod';

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

const aSearchSchema = z.object({
  a: z.string(),
});

const aRoute = createRoute({
  getParentRoute: () => rootRoute,
  path:           '/a',
  component:      PageA,
  validateSearch: aSearchSchema,
});

const bRoute = createRoute({
  getParentRoute: () => rootRoute,
  path:           '/b',
  component:      PageB,
});

const routeTree = rootRoute.addChildren([indexRoute, aRoute, bRoute]);

const router = createRouter({
  routeTree,
  basepath: '/rt',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function Routing() {
  return <RouterProvider router={router} />;
}
