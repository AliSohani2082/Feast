import * as z from 'zod';

export const ingredient = z.object({
  ingredientId: z.string(),
  amountType: z.string(),
  amount: z.number(),
})

export const step = z.object({
  instruction: z.string(),
})

export const createPostValidation = z.object({
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  ingredients: z.array(ingredient),
  steps: z.array(z.string())
})
// ============================================================
// USER
// ============================================================
export const SignupValidation = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    username: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const SigninValidation = z.object({
  username: z.string(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: 'Minimum 5 characters.' })
    .max(2200, { message: 'Maximum 2,200 caracters' }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(1000, { message: 'Maximum 1000 characters.' }),
  tags: z.string(),
});
