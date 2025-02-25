import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

interface LoadingSkeletonProps {
  count: number;
  parentClassName?: string;
  skeletonClassName?: string;
}

export default function FadingSkeletons({
  count,
  parentClassName,
  skeletonClassName,
}: LoadingSkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-4", parentClassName)}>
      {[...Array(count)].map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-12", skeletonClassName)}
          style={{ opacity: 1 - i / (count - 1) }}
        />
      ))}
    </div>
  );
}
