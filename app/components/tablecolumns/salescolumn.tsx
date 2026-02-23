import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosinstance';
import { useAuth } from '../authprovider';
import { toastError, toastSuccess } from '@/lib/toast';
import { AxiosError } from 'axios';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
    DialogDescription,
} from '../ui/dialog';

export interface SalesResponse {
    salesId: number;
    salesPersonName: string;
    email: string;
    roleId: number;
    salaryAmount: string;
    companyId: string | null;
    createdAt: string;
    updatedAt: string;
}

export const salesColumns: ColumnDef<SalesResponse>[] = [
    {
        accessorKey: 'salesId',
        header: 'ID',
    },
    {
        accessorKey: 'salesPersonName',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'salaryAmount',
        header: 'Salary',
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const sales = row.original;
            const auth = useAuth();
            const queryClient = useQueryClient();

            const { mutate: deleteSales } = useMutation({
                mutationFn: async (id: number) => {
                    const response = await axiosInstance.delete(`/sales-dashboard/delete/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${auth?.token}`,
                            },
                        });
                    return response.data;
                },
                onSuccess: () => {
                    toastSuccess('Sales representative deleted successfully');
                    queryClient.invalidateQueries({ queryKey: ['users', 'sales'] });
                },
                onError: (error) => {
                    if (error instanceof AxiosError) {
                        toastError(error.response?.data.message);
                    }
                },
            });

            return (
                <div className='flex gap-2'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='destructive'>Delete</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure you want to delete this representative?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant='outline'>No</Button>
                                </DialogClose>
                                <Button variant='destructive' onClick={() => deleteSales(sales.salesId)}>
                                    Yes
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        },
    },
];
