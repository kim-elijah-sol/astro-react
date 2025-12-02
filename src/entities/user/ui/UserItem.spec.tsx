import { render, screen }       from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { UserItem }             from './UserItem';

describe('UserItem', () => {
  const mockUser = {
    id:       1,
    name:     'John Doe',
    username: 'johndoe',
    email:    'john@example.com',
  };

  it('유저 정보가 "name (username) - email" 형식으로 렌더링됨', () => {
    render(<UserItem user={mockUser} />);

    expect(screen.getByText('John Doe (johndoe) - john@example.com')).toBeInTheDocument();
  });
});
