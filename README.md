# School Attendance System 🏫

Mini project sistem monitoring dan absensi siswa untuk memenuhi *challenge* Fullstack Web Development. Sistem ini menerapkan arsitektur *Three-Layer* (Router → Action → Repository) dengan *Role-Based Access Control* (RBAC).

## 🚀 Tech Stack
- **Framework:** Next.js 14 (App Router) + React 18
- **Language:** TypeScript 5 (Strict Mode)
- **API/Network:** tRPC v10 + React Query v4 + SuperJSON
- **Database & ORM:** MySQL + Prisma ORM v5
- **Prisma Extensions:** `prisma-extension-pagination` & `prisma-extension-soft-delete`
- **Validation:** Zod
- **Styling:** Tailwind CSS + Ant Design v5

## 🏗️ Architecture
Aplikasi ini menggunakan **Three-Layer Pattern** untuk memisahkan *logic* secara rapi:
1. **tRPC Router:** Menangani *request/response* dan validasi *input* dengan Zod (`/src/server/trpc/routers`).
2. **Server Action:** Menangani *business logic* dan *permission check* (`/src/server/[module]/actions`).
3. **Repository:** Murni menangani interaksi dengan *database* menggunakan Prisma (`/src/server/[module]/repositories`).

## ⚙️ Prerequisites & Setup
1. Clone repository ini.
2. Install dependencies menggunakan pnpm:

```bash
pnpm install
```

3. Duplikat file `.env.example` menjadi `.env` dan sesuaikan `DATABASE_URL` dengan MySQL lokal Anda.