import { render, screen }           from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-router', () => ({
  useSearch: vi.fn(() => ({ a: 'test-param' })),
}));

import { PageA } from './PageA';

describe('PageA', () => {
  it('"Page A" 텍스트가 렌더링됨', () => {
    render(<PageA />);

    expect(screen.getByText('Page A')).toBeInTheDocument();
  });

  it('search param 값이 표시됨', () => {
    render(<PageA />);

    expect(screen.getByText(/Search param "a": test-param/)).toBeInTheDocument();
  });
});
