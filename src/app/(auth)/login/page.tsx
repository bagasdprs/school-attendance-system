"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import {
  loginSchema,
  type TLoginInput,
} from "@/server/auth/validations/auth.validation";
import { AuthSplitLayout } from "@/app/_components/auth/AuthSplitLayout";
import { InputField } from "@/app/_components/ui/InputField";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = api.auth.login.useMutation({
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const onSubmit = (data: TLoginInput) => {
    loginMutation.mutate(data);
  };

  // Konten Visual sebelah Kiri
  const VisualContent = (
    // <div className="text-center text-white">
    //   <h1 className="mb-4 text-4xl font-bold">Sistem Absensi Modern</h1>
    //   <p className="text-lg text-green-100">
    //     Tingkatkan efisiensi dan transparansi dengan platform terpadu kami.
    //   </p>
    // </div>
    <>
      <Image
        src="/images/auth-bg.jpg"
        alt="Background Login"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-linear-to-t from-green-900/90 via-[#8CC63F]/70 to-[#8CC63F]/40 mix-blend-multiply" />
      <div className="relative z-10 flex flex-col items-center p-12 text-center text-white">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight drop-shadow-lg lg:text-5xl">
          Sistem Absensi <br /> Modern
        </h1>
        <p className="max-w-md text-lg text-green-50 drop-shadow-md">
          Platform terpadu untuk mengelola dan memonitoring kehadiran siswa
          secara efisien dan presisi.
        </p>
      </div>
    </>
  );

  return (
    <AuthSplitLayout visualContent={VisualContent} reverse={false}>
      <div className="mb-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-[#8CC63F]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Selamat Datang
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Silakan masukkan email dan password Anda untuk masuk ke sistem.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          label="Alamat Email"
          type="email"
          placeholder="nama@sekolah.sch.id"
          registration={register("email")}
          error={errors.email}
        />
        <InputField
          label="Kata Sandi"
          type="password"
          placeholder="Masukkan minimal 8 karakter"
          registration={register("password")}
          error={errors.password}
        />

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="mt-2 w-full rounded-xl bg-[#8CC63F] py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-600 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
        >
          {loginMutation.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Memproses...
            </span>
          ) : (
            "Masuk ke Akun"
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500">
        Belum memiliki akun?{" "}
        <Link
          href="/register"
          className="font-semibold text-[#8CC63F] transition-colors hover:text-green-700 hover:underline"
        >
          Daftar sekarang
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
