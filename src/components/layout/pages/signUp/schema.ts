import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string()
    .min(8, { message: 'Must be at least 8 characters with numbers and symbols' }),
  rePassword: z.string().min(1, { message: 'Please confirm your password' }),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, { message: 'Please enter a valid Egyptian phone number' }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Terms of Service and Privacy Policy',
  }),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ['rePassword'],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
