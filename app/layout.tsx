import { ConvexClientProvider } from "@/providers/convex-provider";
import ModalProvider from "@/providers/modal-provider";
import SupabaseProvider from "@/providers/supabase-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import UserProvider from "@/providers/user-provider";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "komo-mind",
  description: "",
  icons: {
    icon: [
      {
        url: "/logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body>
        <SupabaseProvider>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="komo-theme-2"
            >
              <UserProvider>
                <ModalProvider />
                <Toaster position="bottom-center" />
                {children}
              </UserProvider>
            </ThemeProvider>
          </ConvexClientProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
