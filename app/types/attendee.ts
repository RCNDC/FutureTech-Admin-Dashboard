import z from 'zod';

export const AttendeeValidationSchema = z.object({
    email: z.email().min(1, 'Email Required'),
    fullname: z.string().min(1, 'Full Name Required'),
    phone: z.string().min(1, 'Phone Number Required'),
})

export type AttendeeValidationType = z.infer<typeof AttendeeValidationSchema>;
