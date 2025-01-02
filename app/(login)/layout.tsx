import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ptBR } from "@clerk/localizations";
import { Mulish } from "next/font/google";
import Navbar from "./_components/navbar";

const mulish = Mulish({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${mulish.className} dark h-full antialiased`}
      >
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
          localization={ptBR}
        >
          <div className="h-screen">
          <Navbar />
          {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
