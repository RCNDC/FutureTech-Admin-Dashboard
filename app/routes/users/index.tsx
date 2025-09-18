import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/components/authprovider';
import axiosInstance from '@/lib/axiosinstance';
import { toastError } from '@/lib/toast';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Loading from '@/components/loading';
import type { response } from '@/types/response';
import { useDebounce } from '@/hooks/debounce';
import { AxiosError } from 'axios';
import type { Route } from './+types';
import type { UserResponse } from '@/types/user';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Users - Future Tech Addis' },
    { name: 'description', content: 'Users page' },
  ];
}

export default function UsersPage() {
  const auth = useAuth();
  const [filter, setFilter] = useState<string>('');
  const debounceSearchTerm = useDebounce(filter, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', debounceSearchTerm],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get<response<UserResponse[]>>(
          `/user/getAllUsers?query=${debounceSearchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        return res.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error('API Error:', error.response?.data, error.response?.status);
          toastError(error.response?.data?.message || 'Failed to fetch users');
        }
        throw error;
      }
    },
  });

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-2xl">Users</h3>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by email..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      {isLoading && <Loading />}
      {isError && (
        <div className="p-4 text-red-500">
          Error loading users: {error instanceof AxiosError ? error.response?.data?.message || error.message : 'Unknown error'}
        </div>
      )}
      {data?.data && data.data.length === 0 && <p>No users found.</p>}
      {data?.data && data.data.length > 0 && (
        <Table className="border rounded-lg shadow-sm">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Is Locked</TableHead>
              <TableHead>Is New</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(user.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.isLocked
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {user.isLocked ? 'Locked' : 'Unlocked'}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.isNew
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {user.isNew ? 'New' : 'Existing'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
