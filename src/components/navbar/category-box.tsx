"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  key: string;
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox = (props: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currencyQuery = {};

    if (params) {
      currencyQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currencyQuery,
      category: props.label,
    };

    if (params?.get("category") === props.label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [props.label, params, router]);
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        props.selected ? "border-b-neutral-800" : "border-transparent"
      }
      ${props.selected ? "text-neutral-800" : "text-neutral-500"}`}
    >
      <props.icon size={26} />
      <div className="font-medium text-sm">{props.label}</div>
    </div>
  );
};

export default CategoryBox;
