import { useInfiniteQuery } from "@tanstack/react-query";
import { Categories } from "./Categories";
import { fetchProducts } from "../lib/apiClient";
import { type TProduct } from "../types/product";

import { useEffect, useRef, useState } from "react";
import AddItem from "./AddItem";
import ProductCard from "./ProductCard";
import type { TCategories } from "../types/category";

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
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const [product, setProduct] = useState<TProduct | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false)
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
      <h2 className="font-lobster text-5xl text-white text-center py-12 ">
        Menu
      </h2>
      <Categories setCategory={setCategory} selectedCategory={category} />
      <div
        className={`mt-24 grid grid-cols-3 gap-x-14 text-white max-w-6xljustify-between gap-y-12 min-h-[500px]`}
      >
        {error ? (
          <div>Opps Something went wrong...{error.message}</div>
        ) : isPending ? (
          <div>Loading...</div>
        ) : (
          data.pages.map((page) =>
            page.products.map((product) => {
          
              return (
                <ProductCard
                  key={product.productId}
                  product={product}
                  setProduct={setProduct}
                  setIsModalVisible={setIsModalVisible}
                />
              );
            })
          )
        )}
      <div ref={bottomRef} className="h-10" />
        
        {isModalVisible && <AddItem product={product} setIsModalVisible={setIsModalVisible} />}
      </div>
    </section>
  );
};

export default Products;
