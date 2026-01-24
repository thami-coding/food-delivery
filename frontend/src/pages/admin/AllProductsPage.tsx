import { useEffect, useRef } from "react"
import { useProducts } from "../../hooks/useProducts"
import { ErrorAlert } from "../../components/ErrorAlert"
import LoadingSpinner from "../../components/LoadingSpinner"
import { EditDelete } from "../../components/EditDelete"


export default function AllProductsPage() {
  const {
    isPending,
    isError,
    data,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    fetchNextPage
  } = useProducts()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasNextPage || !bottomRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      {
        threshold: 1,
      }
    )
    observer.observe(bottomRef.current)

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage])
  console.log(data)
  return (
    <>
      <h1 className="text-2xl font-semibold mb-12">All Products</h1>
      <section className="px-6 ">
        {
          isError ? (
            <div className="mt-15">
              <ErrorAlert refetch={refetch} />
            </div>
          ) : isPending ? (
            <div className="grid place-content-center w-full h-56">
              <LoadingSpinner />
            </div>

          ) : (
            <>
              <div
                className={`grid grid-cols-3 gap-x-14 text-white max-w-6xl justify-between gap-y-12 min-h-125`}
              >
                {
                  data?.pages.flatMap((page) => {
                    return page.products.map((product) => {
                      const { imageUrl, id } = product
                      return (
                        <div

                          key={id}
                          className="relative group shadow-lg shadow-neutral-950 transition-transform duration-300 rounded-2xl max-w-70 max-h-160  cursor-pointer"
                        >
                          <div className="max-w-full h-65 rounded-2xl bg-gray-950 overflow-hidden">
                            <img
                              src={imageUrl}
                              alt="food"
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <div className="absolute inset-0 rounded-2xl bg-zinc-500/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <EditDelete id={id} />
                          </div>
                        </div>
                      )
                    }
                  )
                  }
                  )
                }
                {isFetchingNextPage && <div className="mt-25">

                  <LoadingSpinner />
                </div>
                }
              </div>
              <div ref={bottomRef} />
            </>
          )
        }

      </section>
    </>
  )
}
