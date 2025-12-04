import { render, screen }       from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HomePage }             from './HomePage';

describe('HomePage', () => {
  it('콘텐츠 업로드 폼이 렌더링됨', () => {
    render(<HomePage />);

    expect(screen.getByText('콘텐츠 업로드')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /^URL/ })).toBeInTheDocument();
    expect(screen.getByText('클릭하여 이미지 업로드')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /상품명/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /설명/ })).toBeInTheDocument();
    expect(screen.getByText('Fashion')).toBeInTheDocument();
    expect(screen.getByText('Beauty')).toBeInTheDocument();
    expect(screen.getByText('F&B')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '업로드' })).toBeInTheDocument();
  });
});
