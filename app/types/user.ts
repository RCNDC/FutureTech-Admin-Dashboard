import { z } from 'zod';

export interface UserResponse {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  isLocked: number;
  isNew: boolean;
  Role: {
    id: number;
    name: string;
  } | null;
}

export const CreateUserValidationSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
  isLocked: z.boolean(),
  roleId: z.any().transform((val) => {
    if (val === '' || val === null || val === undefined) return null;
    return Number(val);
  }).pipe(z.number().nullable()),
});

export type CreateUserFormData = z.infer<typeof CreateUserValidationSchema>;

export const EditUserValidationSchema = z.object({
  isLocked: z.boolean(),
  roleId: z.any().transform((val) => {
    if (val === '' || val === null || val === undefined) return null;
    return Number(val);
  }).pipe(z.number().nullable()),
});

export type EditUserFormData = z.infer<typeof EditUserValidationSchema>;
