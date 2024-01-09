import prisma from "@/libs/prismadb";
import getCurrentUser from "@/app/actions/get-current-user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    guestCount,
    location,
    price,
    bathroomCount,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      bathroomCount,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
