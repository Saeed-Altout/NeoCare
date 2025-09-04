import * as z from "zod";

export const signInSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),

  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const signUpSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
