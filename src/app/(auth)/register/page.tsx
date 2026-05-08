"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import {
  registerSchema,
  type TRegisterInput,
} from "@/server/auth/validations/auth.validation";
import { AuthSplitLayout } from "@/app/_components/auth/AuthSplitLayout";
import { InputField } from "@/app/_components/ui/InputField";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = api.auth.register.useMutation({
    onSuccess: () => {
      alert("Registrasi berhasil! Silakan login.");
      router.push("/login");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const onSubmit = (data: TRegisterInput) => {
    registerMutation.mutate(data);
  };

  const VisualContent = (
    <div className="text-center text-white">
      <h1 className="mb-4 text-4xl font-bold">Bergabunglah Bersama Kami</h1>
      <p className="text-lg text-green-100">
        Kelola kehadiran dengan mudah, cepat, dan presisi.
      </p>
    </div>
  );

  return (
    <AuthSplitLayout visualContent={VisualContent} reverse={true}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Daftar Akun Baru</h2>
        <p className="mt-2 text-sm text-gray-600">
          Silakan lengkapi data diri Anda di bawah ini.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Nama Lengkap"
          type="text"
          placeholder="Masukkan nama lengkap"
          registration={register("name")}
          error={errors.name}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="nama@sekolah.sch.id"
          registration={register("email")}
          error={errors.email}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Min. 8 karakter"
          registration={register("password")}
          error={errors.password}
        />

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full rounded-lg bg-[#8CC63F] py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:bg-gray-400"
        >
          {registerMutation.isPending ? "Mendaftarkan..." : "Daftar"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#8CC63F] hover:underline"
        >
          Masuk di sini
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
