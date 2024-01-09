"use client";
import { register } from "module";
import { Stringifier } from "postcss";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const Input = (props: InputProps) => {
  return (
    <div className="w-full relative">
      {props.formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={props.id}
        disabled={props.disabled}
        {...props.register(props.id, { required: true })}
        placeholder=""
        type={props.type}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
            ${props.formatPrice ? "pl-9" : "pl-4"}
            ${
              props.errors[props.id] ? "borders-rose-500" : "border-neutral-300"
            }
            ${
              props.errors[props.id]
                ? "focus:border-rose-500"
                : "focus:border-black"
            }
            `}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
          props.formatPrice ? "left-9" : "left-4"
        }
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${props.errors[props.id] ? "text-rose-500" : "text-zinc-400"}`}
      >
        {props.label}
      </label>
    </div>
  );
};

export default Input;
