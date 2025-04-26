"use client"

import { useState } from "react"
import { Star } from "lucide-react"

type WorkoutRatingProps = {
  rating: number
  onRatingChange: (rating: number) => void
}

export function WorkoutRating({ rating, onRatingChange }: WorkoutRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex flex-col items-center py-6">
      <div className="text-lg mb-4">How was your workout?</div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              className={`h-10 w-10 ${
                star <= (hoverRating || rating) ? "fill-orange-500 text-orange-500" : "text-gray-500"
              }`}
            />
          </button>
        ))}
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        {rating === 1 && "Could be better"}
        {rating === 2 && "It was okay"}
        {rating === 3 && "Good workout"}
        {rating === 4 && "Great session!"}
        {rating === 5 && "Amazing workout!"}
      </div>
    </div>
  )
}
