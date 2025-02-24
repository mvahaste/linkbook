"use client";

import {
  LucideBookmark,
  LucidePlus,
  LucideSettings,
  LucideTag,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNavBar() {
  const pathname = usePathname();

  return (
    <div className="sticky bottom-0 z-50 h-16 flex w-full py-3 px-5 justify-between border-t border-t-foreground/10 bg-background/95 shadow-sm backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 items-center">
      {/* <Button className="rounded-full px-4" variant="ghost"> */}
      {/*   <LucidePlus /> */}
      {/* </Button> */}
      <Button
        className="rounded-full px-4"
        asChild
        variant={pathname == "/bookmarks" ? "default" : "ghost"}
      >
        <Link href="/bookmarks">
          <LucideBookmark />
        </Link>
      </Button>
      <Button
        className="rounded-full px-4"
        asChild
        variant={pathname == "/tags" ? "default" : "ghost"}
      >
        <Link href="/tags">
          <LucideTag />
        </Link>
      </Button>
      <Button
        className="rounded-full px-4"
        asChild
        variant={pathname == "/settings" ? "default" : "ghost"}
      >
        <Link href="/settings">
          <LucideSettings />
        </Link>
      </Button>
    </div>
  );
}
