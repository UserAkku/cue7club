"use client";

import { Star, StarHalf } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface RatingProps {
  rating: number;
  max?: number;
  className?: string;
  size?: number;
}

export function Rating({ rating, max = 5, className, size = 16 }: RatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} size={size} weight="fill" className="text-warning" />
      ))}
      {hasHalfStar && (
        <StarHalf size={size} weight="fill" className="text-warning" />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} size={size} className="text-muted-foreground/30" />
      ))}
    </div>
  );
}
