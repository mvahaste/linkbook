import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Linkbook",
  description: "Free and open-source link bookmarking web app.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <main className="flex min-h-screen flex-col items-center">
              <div className="flex w-full flex-1 flex-col items-center">
                {/* Header */}
                <header className="sticky top-0 z-50 flex h-16 w-full justify-center border-b border-b-foreground/10 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
                  <div className="flex w-full max-w-2xl items-center justify-between p-3 px-5 text-sm">
                    <p className="text-lg font-medium">{metadata.title}</p>
                    <nav className="flex flex-row items-center gap-2">
                      {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                    </nav>
                  </div>
                </header>
                {children}
              </div>
            </main>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
