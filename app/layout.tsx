import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "@fontsource/noto-sans-sc";
import "./globals.css";

const font = Open_Sans({ subsets: ["latin"] });

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={font.className}
        style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="komo-theme-2"
        >
          <Toaster position="bottom-center" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
