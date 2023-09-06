import { type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { sql } from "drizzle-orm";
import { products } from "drizzle/schema";
import { Pagination } from "~/components/Pagination";
import { ProductCard } from "~/components/Product";
import { buildDbClient } from "~/lib/client";
import type { Product } from "~/lib/types";

export const loader = async ({ params }: LoaderArgs) => {
  const { page } = params;
  const db = buildDbClient();
  //   const allProducts = await db.query.products.findMany({
  //     columns: { name: true },
  //   });

  const [result] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(products);

  const itemsCount = result.count;
  const limit = 4;
  const totalPages = Math.ceil(itemsCount / limit);

  let currentPage = 1,
    offset = 0;

  if (page !== undefined) {
    currentPage = parseInt(page);
    offset = currentPage === 1 ? 0 : (currentPage - 1) * limit;
  }

  const productsData = await db.query.products.findMany({
    offset,
    limit,
  });

  return {
    products: productsData as Product[],
    pageInfo: {
      currentPage,
      totalPages,
    },
  };
};

export default function Mugs() {
  const { products, pageInfo } = useLoaderData<typeof loader>();

  return (
    <>
      {!products.length ? (
        <div className="p-8 flex justify-center">
          There are no available products, please check back later!
        </div>
      ) : (
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <ul className="mt-4 grid gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
              {products && products.length ? (
                products.map((product) => (
                  <ProductCard {...{ product }} key={product.id} />
                ))
              ) : (
                <div className="p-8">No items</div>
              )}
            </ul>
            <Pagination {...pageInfo} />
          </div>
        </section>
      )}
    </>
  );
}
