"use client";
import useCountries from "@/hooks/use-countries";
import React from "react";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = (props: CountrySelectProps) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={props.value}
        onChange={(value) => props.onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <>
            <div className="flex flex-row item-center gap-3">
              <div>{option.flag}</div>
              <div>
                {option.label},{" "}
                <span className="text-neutral-800 ml-1">{option.region}</span>
              </div>
            </div>
          </>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
