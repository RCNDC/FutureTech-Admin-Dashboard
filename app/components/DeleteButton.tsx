import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosinstance";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { useAuth } from "./authprovider";
import type { Row } from "@tanstack/react-table";

interface DeleteButtonProps<TData> {
    selectedRows: Row<TData>[];
    type: string;
}

export function DeleteButton<TData>({ selectedRows, type }: DeleteButtonProps<TData>) {
    const auth = useAuth();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (entryIds: (string | number)[]) => {
            const response = await axiosInstance.post(`/register/submission/${type}/delete`, {
                entry_ids: entryIds
            }, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`
                }
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Selected submissions deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['submissions'] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete submissions');
        }
    });

    const handleDelete = () => {
        const selectedIds = selectedRows.map(row => (row.original as any).entry_id);
        if (selectedIds.length > 0) {
            mutation.mutate(selectedIds);
        } else {
            toast.info('Please select at least one row to delete.');
        }
    };

    return (
        <DeleteConfirmationDialog onDelete={handleDelete}>
            <Button variant="destructive" disabled={selectedRows.length === 0 || mutation.isPending}>
                {mutation.isPending ? 'Deleting...' : `Delete (${selectedRows.length})`}
            </Button>
        </DeleteConfirmationDialog>
    );
}
