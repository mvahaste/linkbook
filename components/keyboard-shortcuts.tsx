"use client";

import { Command, Keyboard, Search } from "lucide-react";
import { useEffect, useState } from "react";

interface Shortcut {
  action: string;
  mac: string;
  windows: string;
  category: string;
}

export default function KeyboardShortcuts() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toLowerCase().includes("mac"));
  }, []);

  const shortcuts: Shortcut[] = [
    {
      action: "Go to Bookmarks",
      mac: "1",
      windows: "1",
      category: "Tabs",
    },
    {
      action: "Go to Tags",
      mac: "2",
      windows: "2",
      category: "Tabs",
    },
    {
      action: "Go to Settings",
      mac: "3",
      windows: "3",
      category: "Tabs",
    },
    {
      action: "Focus Search",
      mac: "/",
      windows: "/",
      category: "Navigation",
    },
    {
      action: "Unfocus",
      mac: "Esc",
      windows: "Esc",
      category: "Navigation",
    },
    // {
    //   action: "Open Command Menu",
    //   mac: "⌘ K",
    //   windows: "Ctrl K",
    //   category: "Navigation",
    // },
    // {
    //   action: "Search Projects",
    //   mac: "⇧ P",
    //   windows: "Shift P",
    //   category: "Navigation",
    // },
    // {
    //   action: "Search Teams",
    //   mac: "⇧ T",
    //   windows: "Shift T",
    //   category: "Navigation",
    // },
    // {
    //   action: "Toggle Theme",
    //   mac: "T",
    //   windows: "T",
    //   category: "Appearance",
    // },
    // {
    //   action: "Search Documentation",
    //   mac: "⇧ D",
    //   windows: "Shift D",
    //   category: "Help",
    // },
  ];

  const categories = Array.from(new Set(shortcuts.map((s) => s.category)));

  return (
    <div className="flex-col gap-4 text-sm">
      {categories.map((category) => (
        <div key={category} className="flex flex-col gap-1">
          <h3 className="text-lg font-medium">{category}</h3>
          {/* <h3 className="mb-4 text-sm font-medium text-muted-foreground"> */}
          {/*   {category} */}
          {/* </h3> */}
          {shortcuts
            .filter((s) => s.category === category)
            .map((shortcut) => (
              <div className="flex items-center gap-2">
                <p key={shortcut.action}>{shortcut.action} </p>
                <div className="h-[1px] flex-grow rounded-full bg-foreground/25" />
                <kbd className="rounded border bg-muted px-2 py-1 text-xs font-normal">
                  {isMac ? shortcut.mac : shortcut.windows}
                </kbd>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
