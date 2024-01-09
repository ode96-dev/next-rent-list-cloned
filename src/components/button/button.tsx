"use client";
import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
       ${props.outline ? "bg-white" : "bg-rose-500"}
       ${props.outline ? "border-black" : "border-rose-500"}
       ${props.outline ? "text-black" : "text-white"}
       ${props.small ? "py-1" : "py-3"}
       ${props.small ? "text-sm" : "text-md"}
       ${props.small ? "font-light" : "font-semibold"}
       ${props.small ? "border-[1px]" : "border-2"}
       `}
    >
      {props.icon && <props.icon size={24} className="absolute left-4 top-3" />}
      {props.label}
    </button>
  );
};

export default Button;
