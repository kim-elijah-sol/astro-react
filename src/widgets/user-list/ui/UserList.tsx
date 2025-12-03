import { getUser } from '@/entities/user';
import type { User } from '@/entities/user';
import { withQueryClientProvider } from '@/shared/lib/query-client';
import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from './UserList.module.css';
import { useState } from 'react';
import type { UserPagination } from '@/entities/user/model/types';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('username', {
    header: 'Username',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
  }),
];

export const UserList = withQueryClientProvider(() => {
  const [pagination, setPagination] = useState<UserPagination>({ page: 0, perPage: 10 });

  const { data, isLoading } = useQuery({
    queryKey: ['users', pagination],
    queryFn: () => getUser(pagination),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });

  const table = useReactTable({
    data: data?.users ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pagination.perPage);
  const currentPage = pagination.page;

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handlePageClick = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 0; i < 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages - 1);
      } else if (currentPage >= totalPages - 3) {
        pages.push(0);
        pages.push('...');
        for (let i = totalPages - 4; i < totalPages; i++) pages.push(i);
      } else {
        pages.push(0);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages - 1);
      }
    }

    return pages;
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            Prev
          </button>

          <div className={styles.pageNumbers}>
            {getPageNumbers().map((page, index) =>
              typeof page === 'number' ? (
                <button
                  key={index}
                  className={`${styles.pageNumber} ${page === currentPage ? styles.active : ''}`}
                  onClick={() => handlePageClick(page)}
                >
                  {page + 1}
                </button>
              ) : (
                <span key={index} className={styles.ellipsis}>
                  {page}
                </span>
              )
            )}
          </div>

          <button
            className={styles.pageButton}
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      )}

      <div className={styles.pageInfo}>
        Showing {currentPage * pagination.perPage + 1} -{' '}
        {Math.min((currentPage + 1) * pagination.perPage, totalCount)} of{' '}
        {totalCount} items
      </div>
    </div>
  );
})
