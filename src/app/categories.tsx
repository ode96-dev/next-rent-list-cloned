"use client";
import Container from "@/components/container/container";
import React from "react";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import {
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "@/components/navbar/category-box";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "this property is close to the beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "this property is close to the windmill",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "this property is has modern design",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "this property is in the country side",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "this property has pool",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "this property is on an island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "this property is close to a lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "this property is close to a skiing center",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "this property is in a castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "this property has camping activities",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "this property is in the arctic",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "this property is close to a cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "this property is close to a desert",
  },
  {
    label: "Barns",
    icon: GiCactus,
    description: "this property is close to a barn",
  },
  {
    label: "Luxarious",
    icon: IoDiamond,
    description: "this property is luxarious",
  },
];

interface CategoriesProps {}

const Categories = (props: CategoriesProps) => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
