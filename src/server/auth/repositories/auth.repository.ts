import { prisma } from "@/libs/prisma/prisma";
import { Prisma } from "@prisma/client";

export const AuthRepository = {
  /**
   * 1. Mencari user berdasarkan Email
   */
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  },

  /**
   * 2. Mencari user berdasarkan ID
   */
  async findById(id: bigint) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        studentId: true,
      }
    });
  },

  /**
   * 3. Membuat User Baru
   */
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data: data,
    });
  },
};