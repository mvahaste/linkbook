"use client";

import {
  LucideBookmark,
  LucideSettings,
  LucideTag,
  LucideIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

/**
 * Navigation items.
 */
const navItems: {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { key: "1", label: "Bookmarks", href: "/bookmarks", icon: LucideBookmark },
  { key: "2", label: "Tags", href: "/tags", icon: LucideTag },
  { key: "3", label: "Settings", href: "/settings", icon: LucideSettings },
];

export default function BottomNavigationBar() {
  const pathname = usePathname();
  const router = useRouter();

  /**
   * Handle shortcut navigation.
   */
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const activeElement = document.activeElement;

      if (
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        (activeElement &&
          activeElement.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      const item = navItems.find((item) => item.key === event.key);

      if (item) {
        router.push(item.href);
      }
    },
    [router],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="sticky bottom-0 z-50 h-16 w-full border-t border-t-foreground/10 bg-background/95 shadow-sm backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex w-full max-w-2xl flex-row items-center justify-between px-5 py-3">
        {navItems.map(({ key, label, href, icon: Icon }) => (
          <Button
            key={key}
            className="rounded-full px-4"
            asChild
            variant={pathname === href ? "default" : "ghost"}
          >
            <Link href={href} className="inline-flex items-center gap-1.5">
              <Icon />
              <span className="hidden xs:inline">{label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
