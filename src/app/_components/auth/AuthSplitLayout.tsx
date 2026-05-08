import React from "react";

interface AuthSplitLayoutProps {
  children: React.ReactNode;
  visualContent: React.ReactNode;
  reverse?: boolean;
}

export const AuthSplitLayout = ({
  children,
  visualContent,
  reverse = false,
}: AuthSplitLayoutProps) => {
  return (
    <div
      className={`flex min-h-screen w-full flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""}`}
    >
      <div className="relative hidden w-full items-center justify-center overflow-hidden bg-slate-100 md:flex md:w-1/2">
        {visualContent}
      </div>

      <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};
