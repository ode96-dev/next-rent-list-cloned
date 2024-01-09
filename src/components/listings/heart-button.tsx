"use client";
import { SafeUser } from "@/app/types";
import useFavorite from "@/hooks/use-favorites";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasLiked, toggleLiked } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <div
      key={listingId}
      onClick={toggleLiked}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        className="fill-white absolute -top-[2px] -right-[2px]"
        size={28}
      />
      <AiFillHeart
        className={hasLiked ? "fill-rose-500" : "fill-neutral-500/70"}
        size={24}
      />
    </div>
  );
};

export default HeartButton;
