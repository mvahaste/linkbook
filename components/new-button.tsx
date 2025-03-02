import { LucidePlus } from "lucide-react";
import { Button } from "./ui/button";
import { useRef } from "react";
import { useShortcuts } from "@/lib/useShortcuts";

interface NewButtonProps {
  onClick: () => void;
}

export default function NewButton({ onClick, ...props }: NewButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useShortcuts({
    a: () => buttonRef.current?.click(),
  });

  return (
    <Button
      className="fixed bottom-20 h-14 w-14 gap-2 self-end shadow-sm backdrop-blur-lg"
      ref={buttonRef}
      onClick={onClick}
      {...props}
    >
      <LucidePlus />
      {/* New */}
    </Button>
  );
}
