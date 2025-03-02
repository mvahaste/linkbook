import { LucidePlus } from "lucide-react";
import { Button } from "./ui/button";

interface NewButtonProps {
  onClick: () => void;
}

export default function NewButton({ onClick, ...props }: NewButtonProps) {
  return (
    <Button
      className="fixed bottom-20 h-14 w-14 gap-2 self-end shadow-sm backdrop-blur-lg"
      onClick={onClick}
      {...props}
    >
      <LucidePlus />
      {/* New */}
    </Button>
  );
}
