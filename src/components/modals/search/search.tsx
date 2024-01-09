"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "../modal";
import useSearchModal from "@/hooks/use-search-modal";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, {
  CountrySelectValue,
} from "@/components/inputs/country-select";
import queryString from "query-string";
import { formatISO } from "date-fns";
import Heading from "@/components/heading/heading";
import Calendar from "@/components/listings/calendar";
import Counter from "@/components/inputs/counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    router,
    step,
    searchModal,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <>
      <div className="flex flex-col gap-8">
        <Heading
          title="where do you want to go?"
          subtitle="find the perfect location!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setLocation(value as CountrySelectValue)}
        />
        <hr />
        <Map center={location?.latlng} />
      </div>
    </>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading title="where do you want to go?" subtitle="get going!" />
          <Calendar
            value={dateRange}
            onChange={(value) => setDateRange(value.selection)}
          />
        </div>
      </>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading title="more info" subtitle="find a perfect place" />
          <Counter
            title="Guests"
            subtitle="how many guests are coming?"
            value={guestCount}
            onChange={(value) => setGuestCount(value)}
          />
          <Counter
            title="Rooms"
            subtitle="how many rooms?"
            value={roomCount}
            onChange={(value) => setRoomCount(value)}
          />
          <Counter
            title="Bathrooms"
            subtitle="how many bathrooms?"
            value={bathroomCount}
            onChange={(value) => setBathroomCount(value)}
          />
        </div>
      </>
    );
  }
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      actionLabel={actionLabel}
      body={bodyContent}
    />
  );
};

export default SearchModal;
