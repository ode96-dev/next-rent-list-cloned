import React from "react";
import getCurrentUser from "../actions/get-current-user";
import EmptyState from "@/components/empty-state/empty-state";
import getReservations from "../actions/get-reservations";
import ReservationsClient from "@/components/reservations/reservations-client";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="unauthorized" subtitle="please login" />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="no reservations"
        subtitle="look like you dont have reservations on your property"
      />
    );
  }

  return (
    <>
      <ReservationsClient
        //@ts-ignore
        reservations={reservations}
        currentUser={currentUser}
      />
    </>
  );
};

export default ReservationsPage;
