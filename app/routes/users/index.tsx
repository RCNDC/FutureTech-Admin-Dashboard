import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/components/authprovider';
import axiosInstance from '@/lib/axiosinstance';
import { toastError } from '@/lib/toast';
import { Input } from '@/components/ui/input';
import Loading from '@/components/loading';
import type { response } from '@/types/response';
import { useDebounce } from '@/hooks/debounce';
import { AxiosError } from 'axios';
import type { Route } from './+types';
import type { UserResponse } from '@/types/user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateUserForm from '@/components/createUserForm';
import UsersTable from '@/components/userstable';
import { columns } from '@/components/usercolumn';

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
  const [open, setOpen] = useState(false);

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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new user</DialogTitle>
            </DialogHeader>
            <CreateUserForm />
          </DialogContent>
        </Dialog>
      </div>
      {isLoading && <Loading />}
      {isError && (
        <div className="p-4 text-red-500">
          Error loading users: {error instanceof AxiosError ? error.response?.data?.message || error.message : 'Unknown error'}
        </div>
      )}
      {data?.data && data.data.length === 0 && <p>No users found.</p>}
      {data?.data && data.data.length > 0 && (
        <UsersTable columns={columns} userData={data.data} />
      )}
    </div>
  );
}
