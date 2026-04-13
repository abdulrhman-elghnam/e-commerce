const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  rePassword: z.string().min(1),
  phone: z.string().regex(/^01[0125][0-9]{8}$/),
  terms: z.boolean().refine((val) => val === true),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ['rePassword'],
});

try {
  registerSchema.parse({
    name: 'Ali',
    email: 'ali@example.com',
    password: 'Password123',
    rePassword: 'Password123',
    phone: '01012345678',
    terms: true,
  });
  console.log("Success");
} catch(e) {
  console.log(e);
}
