import { useInfiniteQuery } from "@tanstack/react-query";
import { Categories } from "../components/Categories";
import { fetchProducts } from "../lib/apiClient";

import { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { TCategories } from "../types/category";
import { useDialog } from "../store/dialogStore";
import AddItem from "../components/AddItem";

const Products = () => {
  const [category, setCategory] = useState<TCategories>("all");

  const {
    error,
    isPending,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [{ queryIdentifier: "products", category: category }] as const,
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.nextPage,
  });
  const isDialogOpen = useDialog((state) => state.isDialogOpen)

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || !bottomRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        threshold: 1,
      }
    );
    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <section className="grid place-items-center relative bg-[#202020] ">
      <div className="mt-30 z-30 bg-[#202020] w-full  ">
      <Categories setCategory={setCategory} selectedCategory={category} />
      </div>

      <div
        className={`mt-30 grid grid-cols-3 gap-x-14 text-white max-w-6xljustify-between gap-y-12 min-h-[500px]`}
      >
        {error ? (
          <div>Opps Something went wrong...{error.message}</div>
        ) : isPending ? (
          <div>Loading...</div>
        ) : (
          data.pages.map((page) =>
            page?.products.map((product) => {
              
              return (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              );
            })
          )
        )}
        <div ref={bottomRef} className="h-10" />
        {isFetchingNextPage && <div>Loading...</div>}
        {isDialogOpen && <AddItem />}
      </div>
    </section>
  );
};

export default Products;
