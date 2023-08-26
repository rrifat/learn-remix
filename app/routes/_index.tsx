import { useLoaderData } from "@remix-run/react";
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
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h2>Products</h2>
      <pre>{JSON.stringify(data.featuredProducts, null, 2)}</pre>
      <h2>Categories</h2>
      <pre>{JSON.stringify(data.featuredCategories, null, 2)}</pre>
    </div>
  );
}
