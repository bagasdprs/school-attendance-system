"use server";

import bcrypt from "bcrypt";
import { AuthRepository } from "@/server/auth/repositories/auth.repository";
import type {
  TLoginInput,
  TRegisterInput,
} from "@/server/auth/validations/auth.validation";
import { getSession } from "@/libs/session";

/**
 * 1. Fungsi Register (Daftar Akun)
 */
export async function register(input: TRegisterInput) {
  // a. Pengecekan Email Duplikat
  const existingUser = await AuthRepository.findByEmail(input.email);
  if (existingUser) {
    throw new Error("Email sudah terdaftar. Silakan gunakan email lain.");
  }

  // b. Hash Password
  const hashedPassword = await bcrypt.hash(input.password, 10);

  // c. Simpan ke Database via Repository
  const newUser = await AuthRepository.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
    role: "STUDENT",
  });

  return {
    message: "Registrasi berhasil!",
    userId: newUser.id.toString(),
  };
}

/**
 * 2. Fungsi Login (Masuk Akun)
 */
export async function login(input: TLoginInput) {
  // a. Cari user berdasarkan email
  const user = await AuthRepository.findByEmail(input.email);

  if (!user) {
    throw new Error("Email atau password salah.");
  }

  // b. Verifikasi Password
  const isPasswordValid = await bcrypt.compare(input.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Email atau password salah.");
  }

  // d. Buat session
  const session = await getSession();
  session.userId = user.id.toString();
  session.role = user.role;
  session.isLoggedIn = true;
  await session.save();

  return {
    message: "Login berhasil!",
    user: {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
}

export async function me() {
  const session = await getSession();

  if (!session.isLoggedIn || !session.userId) {
    throw new Error("Anda belum login (Unauthorized)");
  }

  const user = await AuthRepository.findById(BigInt(session.userId));

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  return {
    ...user,
    id: user.id.toString(),
  };
}

export async function logout() {
  const session = await getSession();
  session.destroy();

  return {
    message: "Logout berhasil!",
  };
}
