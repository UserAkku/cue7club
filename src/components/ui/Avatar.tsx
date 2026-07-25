import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({
  src,
  alt = "Avatar",
  fallback,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const [error, setError] = React.useState(false);

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-base",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full bg-secondary items-center justify-center font-medium text-secondary-foreground ring-1 ring-white/10",
        sizes[size],
        className
      )}
      {...props}
    >
      {src && !error ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="aspect-square h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span className="uppercase">{fallback.slice(0, 2)}</span>
      )}
    </div>
  );
}
