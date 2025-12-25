import React from "react";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

export default function StarRatingComponent({ rating, handleRatingChange }) {
  console.log(rating, "rating");

  return [1, 2, 3, 4, 5].map((item) => (
    <Button
      key={item}
      className={`p-2 rounded-full transition-colors ${
        item <= rating
          ? "text-yellow-500 hover:bg-black "
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
      size="icon"
      variant="outline"
      onClick={handleRatingChange ? () => handleRatingChange(item) : null}
    >
      <StarIcon
        className={`w-6 h-6 ${
          item <= rating ? "fill-yellow-500" : "fill-black"
        }`}
      />
    </Button>
  ));
}
