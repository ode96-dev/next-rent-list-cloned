import React from "react";
import EmptyState from "../../components/empty-state/empty-state";
import getCurrentUser from "@/app/actions/get-current-user";
import getListings from "@/app/actions/get-listings";
import PropertyClient from "@/components/properties/property-client";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Pleas Login" />;
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No listings found"
        subtitle="you have not listed properties"
      />
    );
  }

  return (
    <>
      <PropertyClient
        //@ts-ignore
        listings={listings}
        currentUser={currentUser}
      />
    </>
  );
};

export default PropertiesPage;
