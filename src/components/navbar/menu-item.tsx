"use client";
import React from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem = (props: MenuItemProps) => {
  return (
    <div
      onClick={props.onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {props.label}
    </div>
  );
};

export default MenuItem;
