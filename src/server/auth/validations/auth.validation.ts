import { z } from "zod";

// Validasi untuk login
export const loginSchema = z.object({
  email: z
  .string({ required_error: "Email wajib diisi" })
  .email({ message: "Format email tidak valid" }),
  password: z.string({ required_error: "Password wajib diisi" })
  .min(8, { message: "Password minimal 8 karakter" }),
});

export type TLoginInput = z.infer<typeof loginSchema>;

// Validasi untuk register
export const registerSchema = z.object({
  name: z.string({ required_error: "Nama wajib diisi" }),
  email: z
  .string({ required_error: "Email wajib diisi" })
  .email({ message: "Format email tidak valid" }),
  password: z.string({ required_error: "Password wajib diisi" })
  .min(8, { message: "Password minimal 8 karakter" }),
});

export type TRegisterInput = z.infer<typeof registerSchema>;