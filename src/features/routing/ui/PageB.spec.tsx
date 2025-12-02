import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi }  from 'vitest';

const mockBack = vi.fn();
const mockNavigate = vi.fn();

vi.mock('@tanstack/react-router', () => ({
  useRouter:   vi.fn(() => ({ history: { back: mockBack } })),
  useNavigate: vi.fn(() => mockNavigate),
}));

import { PageB } from './PageB';

describe('PageB', () => {
  it('"Page B" 텍스트가 렌더링됨', () => {
    render(<PageB />);

    expect(screen.getByText('Page B')).toBeInTheDocument();
  });

  it('"이전 페이지로", "A 페이지로" 버튼이 렌더링됨', () => {
    render(<PageB />);

    expect(screen.getByText('이전 페이지로')).toBeInTheDocument();
    expect(screen.getByText('A 페이지로')).toBeInTheDocument();
  });

  it('"이전 페이지로" 클릭 시 뒤로가기 동작', () => {
    render(<PageB />);

    fireEvent.click(screen.getByText('이전 페이지로'));

    expect(mockBack).toHaveBeenCalled();
  });

  it('"A 페이지로" 클릭 시 A 페이지로 이동', () => {
    render(<PageB />);

    fireEvent.click(screen.getByText('A 페이지로'));

    expect(mockNavigate).toHaveBeenCalledWith({ to: '/a', search: { a: 'Hello from B' } });
  });
});
