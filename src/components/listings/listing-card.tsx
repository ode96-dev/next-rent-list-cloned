"use client";
import { SafeReservation, SafeUser } from "@/app/types";
import useCountries from "@/hooks/use-countries";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "./heart-button";
import Button from "../button/button";

interface ListingCardProps {
  key: string;
  data: Listing;
  reservation?: SafeReservation;
  currentUser: SafeUser | null;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard = (props: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(props.data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (props.disabled) {
        return;
      }

      props.onAction?.(props.actionId!);
    },
    [props.onAction, props.actionId, props.disabled]
  );

  const price = useMemo(() => {
    if (props.reservation) {
      return props.reservation.totalPrice;
    }

    return props.data.price;
  }, [props.reservation, props.data.price]);

  const reservationDate = useMemo(() => {
    if (!props.reservation) {
      return null;
    }

    const start = new Date(props.reservation.startDate);
    const end = new Date(props.reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [props.reservation]);
  return (
    <div
      key={props.data.id}
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${props.data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="listing"
            src={props.data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              key={props.data.id}
              listingId={props.data.id}
              currentUser={props.currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region},{location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || props.data.category}
        </div>
        <div className="flex flex-row items-center ga">
          <div className="font-semibold">$ {price}</div>
          {!props.reservation && (
            <>
              <div className="font-light">
                <span className="text-2xl">/</span>night
              </div>
            </>
          )}
        </div>
        {props.onAction && props.actionLabel && (
          <Button
            disabled={props.disabled}
            small
            label={props.actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
