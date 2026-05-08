import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  loginSchema,
  registerSchema,
} from "@/server/auth/validations/auth.validation";
import * as AuthAction from "@/server/auth/actions/auth.action";

export const authRouter = createTRPCRouter({
  // Endpoint: auth.register
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      return await AuthAction.register(input);
    }),

  // Endpoint: auth.login
  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const user = await AuthAction.login(input);

    return {
      message: "Login berhasil!",
      user: user,
    };
  }),

  me: publicProcedure.query(async () => {
    return await AuthAction.me();
  }),

  logout: publicProcedure.mutation(async () => {
    return await AuthAction.logout();
  }),
});
