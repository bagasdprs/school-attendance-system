import { PrismaClient } from '@prisma/client';
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete';
import { pagination } from 'prisma-extension-pagination';

/**
 * 1. BASE CLIENT (Koneksi Mentah)
 * Ini adalah koneksi asli ke database. Kita tidak mengekspor (export) variabel ini
 * karena kita tidak ingin developer (atau kamu nanti) pakai koneksi mentah ini
 * secara langsung. Ini cuma dipakai sebagai "bahan baku" buat bikin 3 client di bawahnya.
 */
const prismaBase = new PrismaClient();

/**
 * 2. PRISMA ACTIVE (Kacamata Normal)
 * Client ini sudah dipasangi filter "Soft-Delete".
 * Artinya: Kalau kamu pakai `prismaActive.student.findMany()`, Prisma akan OTOMATIS
 * menambahkan query `WHERE deletedAt IS NULL` di belakang layar.
 * Jadi, data siswa yang sudah "dihapus" (deletedAt-nya ada isinya) tidak akan muncul di layar.
 */
export const prismaActive = prismaBase.$extends(
  createSoftDeleteExtension({
    models: {
      User: true,
      Student: true,
      Class: true,
      AttendanceSetting: true,
      Attendance: true,
    },
    defaultConfig: {
      field: 'deletedAt',
      createValue: (deleted) => {
        // Kalau fungsi delete dipanggil, isi kolom deletedAt dengan waktu sekarang.
        if (deleted) return new Date();
        return null;
      },
    },
  })
);

/**
 * 3. PRISMA WITH TRASHED (Kacamata Tembus Pandang + Pagination)
 * Client ini memakai `prismaBase` (tanpa filter soft-delete).
 * Artinya: Kalau kamu pakai `prismaWithTrashed.student.findMany()`, SEMUA data akan muncul,
 * baik yang masih aktif maupun yang sudah dihapus.
 * Client ini biasanya dipakai kalau Mas Hasan minta fitur "Recycle Bin", "Riwayat Lengkap",
 * atau "Restore Data". Di sini juga kita tambahkan fitur pagination.
 */
export const prismaWithTrashed = prismaBase.$extends(
  pagination()
);

/**
 * 4. PRISMA DEFAULT (Kacamata Normal + Pagination)
 * Ini adalah client UTAMA yang paling sering kamu pakai di 80% kodinganmu nanti.
 * Isinya adalah gabungan dari data yang cuma aktif saja (prismaActive)
 * ditambahin kemampuan untuk membagi halaman (pagination).
 */
export const prisma = prismaActive.$extends(
  pagination()
);