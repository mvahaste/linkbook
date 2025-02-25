import { RadioThemeSwitcher } from "@/components/radio-theme-switcher";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { LucideFolderX, LucideUserRoundX } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-4">
      {/* Account */}
      {/* - Email */}
      {/* - Password */}
      <h2 className="text-lg font-medium">Account</h2>
      <p>
        <span className="font-medium">Email:</span> {user?.email}
      </p>

      {/* Appearance */}
      <h2 className="mt-4 text-lg font-medium">Appearance</h2>
      <RadioThemeSwitcher />

      {/* Danger Zone */}
      {/* - Delete all data */}
      {/* - Delete account */}
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
