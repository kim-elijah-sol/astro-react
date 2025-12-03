import { render, screen }       from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { UserList }             from './UserList';

describe('UserList', () => {
  it('모든 유저 정보가 렌더링됨', () => {
    render(<UserList />);

    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
    expect(screen.getByText(/Bob Wilson/)).toBeInTheDocument();
  });

  it('빈 배열일 때 유저 정보가 표시되지 않음', () => {
    render(<UserList />);

    expect(screen.queryByText(/John Doe/)).not.toBeInTheDocument();
  });
});
