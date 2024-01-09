"use client";
import { SafeUser } from "@/app/types";
import useCountries from "@/hooks/use-countries";
import React from "react";
import Heading from "../heading/heading";
import Image from "next/image";
import HeartButton from "./heart-button";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead = (props: ListingHeadProps) => {
  const { getByValue } = useCountries();
  const location = getByValue(props.locationValue);

  return (
    <>
      <Heading
        title={props.title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="image"
          src={props.imageSrc}
          fill
          className="object-cover w-full  "
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={props.id} currentUser={props.currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
