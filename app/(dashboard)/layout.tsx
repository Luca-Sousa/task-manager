import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { SidebarProvider } from "../_components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import { ptBR } from "@clerk/localizations";
import { SelectedItemProvider } from "../_contexts/SelectedItemContext";
import { Toaster } from "../_components/ui/sonner";

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
            baseTheme: dark,
          }}
          localization={ptBR}
        >
          <SidebarProvider>
            <SelectedItemProvider>
              <AppSidebar />
              {children}
            </SelectedItemProvider>
          </SidebarProvider>
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
