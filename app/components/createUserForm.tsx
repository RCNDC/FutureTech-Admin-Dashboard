import { useForm, type SubmitHandler } from 'react-hook-form';
import { useEffect, type FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  CreateUserValidationSchema,
  type CreateUserFormData,
} from '../types/user';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosinstance';
import { toastError, toastSuccess } from '@/lib/toast';
import { AxiosError } from 'axios';
import Loading from './loading';
import { useAuth } from './authprovider';
import type { RoleResponse } from '@/types/role';
import type { response } from '@/types/response';

interface CreateUserFormProps {
  targetRoleName?: string;
  onSuccess?: () => void;
}

const CreateUserForm: FC<CreateUserFormProps> = ({ targetRoleName, onSuccess }) => {
  const auth = useAuth();
  const { data: roles } = useQuery<response<RoleResponse[]>>({
    queryKey: ['roles'],
    queryFn: async () => {
      const res = await axiosInstance.get('/role/getAllRoles', {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      return res.data;
    },
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(CreateUserValidationSchema),
    defaultValues: {
      isLocked: false,
    }
  });

  useEffect(() => {
    if (targetRoleName) {
      const isLocal = targetRoleName.toLowerCase().includes('local');
      setValue('roleId', isLocal ? 25 : 29);
    }
  }, [targetRoleName, setValue]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateUserFormData) => {
      const endpoint = targetRoleName ? '/sales-dashboard/createSales' : '/user/createUser';
      const response = await axiosInstance.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toastSuccess('User created successfully');
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toastError(error.response?.data.message);
      }
    },
  });

  const onSubmit: SubmitHandler<CreateUserFormData> = (data) => {
    mutate(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {targetRoleName && (
        <div className="space-y-1">
          <Label htmlFor="fullName" className="text-sm text-purple-900">
            Name
          </Label>
          <Input
            type="text"
            placeholder="Enter full name"
            {...register('fullName')}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm font-medium">
              {errors.fullName.message}
            </span>
          )}
        </div>
      )}

      <div className="space-y-1">
        <Label htmlFor="email" className="text-sm text-purple-900">
          Email
        </Label>
        <Input
          type="email"
          placeholder="Enter email"
          {...register('email')}
        />
        {errors.email && (
          <span className="text-red-500 text-sm font-medium">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password" className="text-sm text-purple-900">
          Password
        </Label>
        <Input
          type="password"
          placeholder="Enter password"
          {...register('password')}
        />
        {errors.password && (
          <span className="text-red-500 text-sm font-medium">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="roleId" className="text-sm text-purple-900">
          Role
        </Label>
        {targetRoleName ? (
          <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700">
            {targetRoleName}
          </div>
        ) : (
          <select {...register('roleId')} className="w-full p-2 border rounded-md">
            <option value="">None</option>
            {roles?.data?.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        )}
        {errors.roleId && (
          <span className="text-red-500 text-sm font-medium">
            {errors.roleId.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-slate-900 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all h-14 mt-4"
        disabled={isPending}
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <Loading />
            <span>Processing...</span>
          </div>
        ) : "Create Account"}
      </Button>
    </form>
  );
};

export default CreateUserForm;
