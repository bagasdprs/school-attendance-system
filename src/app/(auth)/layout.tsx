import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return <main className="min-h-screen bg-slate-50">{children}</main>;
}

export default AuthLayout;
