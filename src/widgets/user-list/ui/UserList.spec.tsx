import { queryClient } from '@/shared/lib/query-client';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UserList } from './UserList';

const mockUsers = [
  { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', username: 'janesmith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Wilson', username: 'bobwilson', email: 'bob@example.com' },
];

vi.mock('@/entities/user', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/entities/user')>();
  return {
    ...original,
    getUser: vi.fn(),
  };
});

import { getUser } from '@/entities/user';

const mockedGetUser = vi.mocked(getUser);

describe('UserList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });
  it('모든 유저 정보가 렌더링됨', async () => {
    mockedGetUser.mockResolvedValue({
      users: mockUsers,
      totalCount: mockUsers.length,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
  });

  it('빈 배열일 때 유저 정보가 표시되지 않음', async () => {
    mockedGetUser.mockResolvedValue({
      users: [],
      totalCount: 0,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('로딩 중일 때 Loading 텍스트가 표시됨', () => {
    mockedGetUser.mockImplementation(
      () => new Promise(() => {})
    );

    render(<UserList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
