import React from "react";
import EmptyState from "@/components/empty-state/empty-state";
import getFavoriteListings from "../actions/get-favorite-listings";
import getCurrentUser from "../actions/get-current-user";
import LikedClient from "@/components/likes/liked-client";

const FavoritePages = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="no favorites found"
        subtitle="looks like you have not liked any properties"
      />
    );
  }

  return (
    <>
      <LikedClient listings={listings} currentUser={currentUser} />
    </>
  );
};

export default FavoritePages;
