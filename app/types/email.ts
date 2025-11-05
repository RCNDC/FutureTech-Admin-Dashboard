import z from "zod";

export const EmailSchema = z.object({
    subject: z.string(),
    body: z.string().min(1, 'Body is required'),
   
});

export type EmailType = z.infer<typeof EmailSchema>;