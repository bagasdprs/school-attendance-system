import { Montserrat } from "next/font/google";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "sonner";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sistem Absensi Siswa",
  description: "Challenge Mini Project FS DOT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={montserrat.className}>
        <TRPCReactProvider>
          {children}
          <Toaster position="top-center" richColors />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
