"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon, LucideLaptop, LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const themeOptions = [
  { name: "system", icon: LucideLaptop },
  { name: "dark", icon: LucideMoon },
  { name: "light", icon: LucideSun },
];

interface ThemeButtonProps {
  themeName: string;
  Icon: LucideIcon;
  isActive: boolean;
  onClickAction: () => void;
}

function ThemeButton({
  themeName,
  Icon,
  isActive,
  onClickAction,
}: ThemeButtonProps) {
  return (
    <Button variant="outline" className="gap-2" onClick={onClickAction}>
      <div className="grid aspect-square h-4 w-4 place-items-center rounded-full border border-foreground text-foreground ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        {isActive && <div className="h-2.5 w-2.5 rounded-full bg-foreground" />}
      </div>
      <Icon className="h-4 w-4" />
      {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
    </Button>
  );
}

export default function RadioThemeSwitcher() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setIsMounted(true), []);

  return (
    <div className="flex flex-col gap-4">
      {themeOptions.map(({ name, icon: Icon }) => (
        <ThemeButton
          key={name}
          themeName={name}
          Icon={Icon}
          isActive={isMounted && theme === name}
          onClickAction={() => setTheme(name)}
        />
      ))}
    </div>
  );
}
