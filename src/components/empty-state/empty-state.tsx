"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "../heading/heading";
import Button from "../button/button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: string;
}

const EmptyState = (props: EmptyStateProps) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading
        center="text-center"
        title={"No Exact Matches"}
        subtitle="Try changing or removing some of your filters"
      />
      <div className="w-48 mt-4">
        {props.showReset && (
          <Button
            outline
            label="remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
