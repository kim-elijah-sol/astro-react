import { render, screen }       from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { UserList }             from './UserList';

describe('UserList', () => {
  const mockUsers = [
    { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', username: 'janesmith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Wilson', username: 'bobwilson', email: 'bob@example.com' },
  ];

  it('모든 유저 정보가 렌더링됨', () => {
    render(<UserList data={mockUsers} />);

    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
    expect(screen.getByText(/Bob Wilson/)).toBeInTheDocument();
  });

  it('빈 배열일 때 유저 정보가 표시되지 않음', () => {
    render(<UserList data={[]} />);

    expect(screen.queryByText(/John Doe/)).not.toBeInTheDocument();
  });
});
