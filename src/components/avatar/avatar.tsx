"use client";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar = (props: AvatarProps) => {
  return (
    <Image
      src={props.src || "/images/placeholder.jpg"}
      width={30}
      height={30}
      alt="Avatar"
      className="rounded-full"
    />
  );
};

export default Avatar;
