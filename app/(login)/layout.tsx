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
      <body className={`${mulish.className} dark h-full antialiased`}>
        <ClerkProvider
          appearance={{
            layout: {
              unsafe_disableDevelopmentModeWarnings: true,
            },
            baseTheme: dark,
          }}
          localization={ptBR}
        >
          <div className="h-full">
            <div className="sticky left-0 right-0 top-0 z-50 bg-background">
              <Navbar />
            </div>
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
