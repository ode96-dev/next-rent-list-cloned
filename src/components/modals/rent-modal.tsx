"use client";
import React, { useMemo, useState } from "react";
import Modal from "./modal";
import useRentModal from "@/hooks/use-rent-modal";
import Heading from "../heading/heading";
import { categories } from "@/app/categories";
import CategoryInput from "../inputs/category-input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect, { CountrySelectValue } from "../inputs/country-select";
import dynamic from "next/dynamic";
import Counter from "../inputs/counter";
import ImageUpload from "../image-upload/image-upload";
import Input from "../inputs/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

type RentModalProps = {};

const RentModal = (props: RentModalProps) => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map/map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("listing created");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((error) => {
        toast.error("error creating listing");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <>
      <div className="flex flex-col gap-8">
        <Heading
          title={"Which of these best describes your place?"}
          subtitle="Pick a category"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => (
            <>
              <div className="col-span-1" key={item.label}>
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading
            title="Where is your property located?"
            subtitle="Help guests locate it!"
          />
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />
          <Map center={location?.latlng} />
        </div>
      </>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading
            title={"Share some basics about your place"}
            subtitle="what amenities do you have?"
          />
          <Counter
            title={"Guests"}
            subtitle={"number of guests allowed"}
            value={guestCount}
            onChange={(value) => setCustomValue("guestCount", value)}
          />
          <hr />
          <Counter
            title={"Rooms"}
            subtitle={"number of rooms"}
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
          />
          <hr />
          <Counter
            title={"Bathrooms"}
            subtitle={"number of bathrooms"}
            value={bathroomCount}
            onChange={(value) => setCustomValue("bathroomCount", value)}
          />
        </div>
      </>
    );
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a photo of your place"
            subtitle="show guests you place!"
          />
          <ImageUpload
            value={imageSrc}
            onChange={(value) => setCustomValue("imageSrc", value)}
          />
        </div>
      </>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading
            title="How would you describe your place"
            subtitle="short n sweet"
          />
          <Input
            key="title"
            id="title"
            label="title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            key="description"
            id="description"
            label="description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      </>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading
            title="Set your price"
            subtitle="how much do you charge per night"
          />
          <Input
            key="price"
            id="price"
            label="price"
            formatPrice
            type="number"
            disabled={isLoading}
            errors={errors}
            register={register}
            required
          />
        </div>
      </>
    );
  }
  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Nextbnb your home"
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};
export default RentModal;
