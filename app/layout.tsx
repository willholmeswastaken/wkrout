import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wrkout",
  description: "Track your workouts and progress",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={`${inter.className} bg-background flex min-h-screen flex-col`}
      >
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <div className="flex-1">
                <main className="container mx-auto px-4 py-8">
                  <div className="max-w-7xl mx-auto">
                    <PageHeader />
                    {children}
                  </div>
                </main>
              </div>
              <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                  <PageFooter />
                </div>
              </div>
            </div>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
