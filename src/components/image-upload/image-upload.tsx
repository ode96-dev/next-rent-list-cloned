"use client";
import React, { useCallback } from "react";
import {
  CldImage as CldImageDefault,
  CldImageProps,
  CldUploadWidget,
} from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload = (props: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      props.onChange(result.info.secure_url);
    },
    [props.onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="wbctyrkm"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <>
            <div
              onClick={() => open?.()}
              className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
            >
              <TbPhotoPlus size={50} />
              <div className="font-semibold text-lg">Click to upload</div>
              {props.value && (
                <>
                  <div className="absolute inset-0 w-full-h-full">
                    <Image
                      key={props.value}
                      alt="upload"
                      fill
                      style={{ objectFit: "cover" }}
                      src={props.value}
                    />
                  </div>
                </>
              )}
            </div>
          </>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
