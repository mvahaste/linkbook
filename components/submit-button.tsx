"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideLoaderCircle } from "lucide-react";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  isPending?: boolean;
};

export function SubmitButton({ children, isPending, ...props }: Props) {
  const { pending } = useFormStatus();

  const showLoader = (props.formAction ? pending : false) || isPending;

  return (
    <Button
      type="submit"
      aria-disabled={showLoader}
      {...props}
      className={cn("relative flex flex-row items-center", props.className)}
    >
      <div
        className={`${showLoader ? "opacity-0" : "opacity-100"} flex flex-row items-center gap-2`}
      >
        {children}
      </div>
      {showLoader && (
        <LucideLoaderCircle className="absolute h-4 w-4 animate-spin" />
      )}
    </Button>
  );
}
