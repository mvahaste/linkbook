"use client";

import { Button } from "@/components/ui/button";
import {
  LucideDelete,
  LucideLaptop,
  LucideMoon,
  LucideSun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const RadioThemeSwitcher = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // if (!mounted) {
  //   return null;
  // }

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => {
          setTheme("system");
        }}
      >
        <div className="grid aspect-square h-4 w-4 place-items-center rounded-full border border-foreground text-foreground ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          {isMounted && theme === "system" && (
            <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
          )}
        </div>
        <LucideLaptop className="h-4 w-4" />
        System
      </Button>
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => {
          setTheme("dark");
        }}
      >
        <div className="grid aspect-square h-4 w-4 place-items-center rounded-full border border-foreground text-foreground ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          {isMounted && theme === "dark" && (
            <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
          )}
        </div>
        <LucideMoon className="h-4 w-4" />
        Dark
      </Button>
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => {
          setTheme("light");
        }}
      >
        <div className="grid aspect-square h-4 w-4 place-items-center rounded-full border border-foreground text-foreground ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          {isMounted && theme === "light" && (
            <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
          )}
        </div>
        <LucideSun className="h-4 w-4" />
        Light
      </Button>
    </div>
  );
};

export { RadioThemeSwitcher };
