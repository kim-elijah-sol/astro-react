import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement, type ComponentType } from 'react';

export const queryClient = new QueryClient();

export function withQueryClientProvider<P extends object>(
  Component: ComponentType<P>
): ComponentType<P> {
  return function (props: P) {
    return createElement(
      QueryClientProvider,
      { client: queryClient },
      createElement(Component, props)
    );
  }
}
