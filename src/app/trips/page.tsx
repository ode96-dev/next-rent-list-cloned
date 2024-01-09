import React from "react";
import getCurrentUser from "../actions/get-current-user";
import EmptyState from "@/components/empty-state/empty-state";
import getReservations from "../actions/get-reservations";
import TripsClient from "@/components/trips/trips-client";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Pleas Login" />;
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you have reserved any trips"
      />
    );
  }

  return (
    <>
      <TripsClient
        //@ts-ignore
        reservations={reservations}
        currentUser={currentUser}
      />
    </>
  );
};

export default TripsPage;
