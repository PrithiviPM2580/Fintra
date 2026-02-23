import { z } from 'zod';

export const changeUserPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, 'Current password must be at least 6 characters long'),
    newPassword: z
      .string()
      .min(6, 'New password must be at least 6 characters long'),
    confirmNewPassword: z
      .string()
      .min(6, 'Confirm new password must be at least 6 characters long'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New password and confirm new password must match',
    path: ['confirmNewPassword'],
  });

export const updateUserProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .optional(),
  lastName: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .optional(),
  email: z.email('Invalid email address').optional(),
  contact: z
    .string()
    .min(10, 'Contact must be at least 10 characters long')
    .optional(),
  currency: z
    .string()
    .min(3, 'Currency must be at least 3 characters long')
    .optional(),
});

export const updateUserProfileParamsSchema = z.object({
  id: z.coerce.number().int().positive('User ID must be a positive integer'),
});

export type ChangeUserPasswordInput = z.infer<typeof changeUserPasswordSchema>;
export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
export type UpdateUserProfileParams = z.infer<
  typeof updateUserProfileParamsSchema
>;
