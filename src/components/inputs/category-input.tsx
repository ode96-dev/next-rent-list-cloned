"use client";

import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput = (props: CategoryInputProps) => {
  return (
    <div
      onClick={() => props.onClick(props.label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
        props.selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <props.icon size={30} />
      <div className="font-semibol">{props.label}</div>
    </div>
  );
};

export default CategoryInput;
