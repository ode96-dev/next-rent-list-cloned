import prisma from "@/libs/prismadb";
import getCurrentUser from "./get-current-user";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const liked = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeLikes = liked.map((like) => ({
      ...like,
      createdAt: like.createdAt.toISOString(),
    }));

    return safeLikes;
  } catch (error: any) {
    throw new Error(error);
  }
}
