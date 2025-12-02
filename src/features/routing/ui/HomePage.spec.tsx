import { render, screen }       from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HomePage }             from './HomePage';

describe('HomePage', () => {
  it('"Home" 텍스트가 렌더링됨', () => {
    render(<HomePage />);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
