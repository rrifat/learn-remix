import { useLoaderData } from "@remix-run/react";
import { ProductCard } from "~/components/Product";
import { buildDbClient } from "~/lib/client";
import type { Category, Product } from "~/lib/types";

export const loader = async () => {
  const db = buildDbClient();

  const featuredProducts = await db.query.products.findMany({
    columns: {
      // description: false,
      categoryId: false,
    },
  });
  const featuredCategories = await db.query.categories.findMany();

  return {
    featuredProducts: featuredProducts as unknown as Product[],
    featuredCategories: featuredCategories as unknown as Category[],
  };
};

export default function Home() {
  const { featuredProducts } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col space-x-4 space-y-4 px-4">
      <h3 className="font-semibold">Featured Products</h3>

      {featuredProducts.length ? (
        <ul className="mt-4 grid gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard {...{ product }} key={product.id} />
          ))}
        </ul>
      ) : (
        <div className="p-4 flex justify-center">
          There are no available products, please check back later!
        </div>
      )}
    </div>
  );
}
