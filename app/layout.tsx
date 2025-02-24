import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import MobileNavBar from "@/components/mobile-nav-bar";

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
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col  items-center">
              {/* Header */}
              <header className="sticky top-0 z-50 flex h-16 w-full justify-center border-b border-b-foreground/10 bg-background/95 shadow-sm backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <p className="font-medium text-lg">{metadata.title}</p>
                  <nav className="flex flex-row gap-2 items-center">
                    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                  </nav>
                </div>
              </header>
              {/* Content */}
              <div className="flex flex-grow flex-col max-w-5xl p-5">
                {children}
              </div>
              {/* Footer */}
              <footer className="w-full flex items-center justify-center  mx-auto text-center text-xs gap-8 py-6">
                <p>
                  View the source code on{" "}
                  <a
                    href="https://github.com/mvahaste/linkbook"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </p>
              </footer>
              {/* Mobile Nav Bar */}
              <MobileNavBar />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
