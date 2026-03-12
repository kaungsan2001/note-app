import * as z from "zod";

export const SignInSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password cannot exceed 100 characters" }),
});

export const SignUpSchema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters" })
      .max(50, { message: "Name cannot exceed 50 characters" }),

    email: z
      .string({ message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),

    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(100, { message: "Password cannot exceed 100 characters" }),

    confirmPassword: z
      .string({ message: "Please confirm your password" })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(100, { message: "Password cannot exceed 100 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignInPayLoadType = z.infer<typeof SignInSchema>;
export type SignUpPayLoadType = z.infer<typeof SignUpSchema>;
