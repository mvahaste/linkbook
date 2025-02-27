"use client";

import KeyboardShortcuts from "@/components/keyboard-shortcuts";
import RadioThemeSwitcher from "@/components/radio-theme-switcher";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { LucideFolderX, LucideUserRoundX } from "lucide-react";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        return;
      }

      setUser(data?.session?.user ?? null);
      setIsLoadingUser(false);
    }

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">Account</h2>
      <p>
        <span className="font-medium">Email: </span>{" "}
        {isLoadingUser ? "Loading..." : (user?.email ?? "No email found")}
      </p>

      <h2 className="mt-4 text-lg font-medium">Appearance</h2>
      <RadioThemeSwitcher />

      <h2 className="mt-4 text-lg font-medium">Shortcuts</h2>
      <p>If you're on the desktop you can use the following shortcuts.</p>
      <KeyboardShortcuts />

      <h2 className="mt-4 text-lg font-medium">Danger Zone</h2>
      <Button variant="destructive" className="gap-2">
        <LucideFolderX className="h-4 w-4" />
        Delete Data
      </Button>
      <Button variant="destructive" className="gap-2">
        <LucideUserRoundX className="h-4 w-4" />
        Delete Account
      </Button>
    </div>
  );
}
