import z from "zod";

export const FollowUpValidation = z.object({
    clientName: z.string().min(1, {message: 'Client name required'}),
    folloUpDate: z.string().min(1, {message: 'Followup Date required'}),
    title: z.string().min(1, {message: 'Title required'}),
    note:z.string()
})

export type FollowUpListType = {
    id:string;
    entry_id:number;
    status: 'Completed' | 'NotStarted'
}

export type FollowUpType = z.infer<typeof FollowUpValidation>;
