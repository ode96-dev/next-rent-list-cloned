"use client";
import React from "react";
import Container from "../container/container";
import Heading from "../heading/heading";
import { SafeListing, SafeUser } from "@/app/types";
import ListingCard from "../listings/listing-card";

interface LikedClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const LikedClient: React.FC<LikedClientProps> = ({ listings, currentUser }) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="list of places you have liked" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-">
        {listings.map((listing) => (
          <>
            <ListingCard
              //@ts-ignore
              currentUser={currentUser}
              //@ts-ignore
              key={listing.id}
              //@ts-ignore
              data={listing}
            />
          </>
        ))}
      </div>
    </Container>
  );
};

export default LikedClient;
