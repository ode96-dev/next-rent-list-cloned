export const dynamic = "force-dynamic";

import Container from "@/components/container/container";
import EmptyState from "@/components/empty-state/empty-state";
import getListings, { IListingsParams } from "./actions/get-listings";
import ListingCard from "@/components/listings/listing-card";
import getCurrentUser from "./actions/get-current-user";

interface HomeProps {
  searchParams: IListingsParams;
}
const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset={"true"} />;
  }
  return (
    <Container>
      <div className="gap-8 pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => {
          return (
            <>
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            </>
          );
        })}
      </div>
    </Container>
  );
};

export default Home;
