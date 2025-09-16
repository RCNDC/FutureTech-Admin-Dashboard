import z from 'zod';

export const AttendeeValidationSchema = z.object({
    email: z.email({message: 'invalid email'}).min(1, {message:'Email Required'}),
    fullname: z.string({message: 'invalid Full Name'}).min(1, {message:'Full Name Required'}),
    phone: z.string({message: 'invalid Phone number'}).min(1, {message:'Phone Number Required'}),
})

export type AttendeeValidationType = z.infer<typeof AttendeeValidationSchema>;
