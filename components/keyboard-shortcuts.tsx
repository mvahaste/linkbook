"use client";

import { useIsMac } from "@/lib/useIsMac";
import { useMemo } from "react";

interface Shortcut {
  action: string;
  mac: string[];
  windows: string[];
  category: string;
}

const shortcuts: Shortcut[] = [
  { action: "Go to Bookmarks", mac: ["1"], windows: ["1"], category: "Tabs" },
  { action: "Go to Tags", mac: ["2"], windows: ["2"], category: "Tabs" },
  { action: "Go to Settings", mac: ["3"], windows: ["3"], category: "Tabs" },
  {
    action: "Focus Search",
    mac: ["/"],
    windows: ["/"],
    category: "Navigation",
  },
  { action: "Unfocus", mac: ["Esc"], windows: ["Esc"], category: "Navigation" },
];

export default function KeyboardShortcuts() {
  const isMac = useIsMac();

  const categories = useMemo(
    () => Array.from(new Set(shortcuts.map((s) => s.category))),
    [],
  );

  const getShortcutsForPlatform = (shortcut: {
    mac: string[];
    windows: string[];
  }) => (isMac ? shortcut.mac : shortcut.windows);

  return (
    <div className="flex flex-col gap-4 text-sm">
      {categories.map((category) => (
        <div key={category} className="flex flex-col gap-2">
          <h3 className="text-base font-medium">{category}</h3>
          {shortcuts
            .filter((shortcut) => shortcut.category === category)
            .map((shortcut) => (
              <div
                key={shortcut.action}
                className="flex flex-row items-center gap-2 text-muted-foreground"
              >
                <div className="flex flex-row gap-1">
                  {getShortcutsForPlatform(shortcut).map((key) => (
                    <kbd
                      className="rounded-[2px] border border-muted-foreground/50 bg-muted px-2 py-1 text-xs"
                      key={key}
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
                <p>{shortcut.action}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
