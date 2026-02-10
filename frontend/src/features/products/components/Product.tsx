import { MdOutlineClose } from "react-icons/md"
import { CiCirclePlus } from "react-icons/ci"
import { CiCircleMinus } from "react-icons/ci"
import { useEffect, useRef, useState } from "react"
import { useProduct } from "../productStore"
import { useDialog } from "../dialogStore"
import { useAddCartItem } from "../../cart/hooks"

export default function Product() {
  const [quantity, setQuantity] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const toggleDialog = useDialog((state) => state.toggleDialog)
  const product = useProduct((state) => state.product)
  const { mutate, isPending } = useAddCartItem()

  const handleClick = () => {
    mutate({
      productId: id!,
      quantity,
    })
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        toggleDialog()
      }
    }
    window.addEventListener("mousedown", handleClickOutside)

    return () => window.removeEventListener("mousedown", handleClickOutside)
  }, [toggleDialog])

  const {
    imageUrl,
    name,
    price = 0,
    id,
  } = product ?? { imageUrl: "", name: "", price: 0, id: "" }

  return (
    <div className="z-60">
      <div className="absolute inset-0 bg-black/60  backdrop-blur-xs"></div>
      <div
        ref={containerRef}
        data-testid="product-modal"
        className="w-md  border rounded-md overflow-hidden fixed top-10 left-1/3 bg-gray-950"
      >
        <div className="bg-linear-to-br from-black/20 to-[#3b3b3b]">
          <img
            src={imageUrl}
            alt="item"
            className="object-contain w-full h-75"
          />
        </div>
        <h3 className="text-center font-lobster text-3xl mt-6 text-yellow-400">
          {name}
        </h3>
        <div className="flex flex-col -rotate-12  border-3 border-yellow-400  w-fit rounded-full py-3 px-4 absolute top-5 left-5 text-white font-lobster text-[1.2rem]">
          <span>20%</span>
          <span className="-mt-3">OFF</span>
        </div>
        <button
          className="top-1 rounded-full right-1 absolute text-gray-400"
          onClick={toggleDialog}
        >
          <MdOutlineClose className="text-4xl cursor-pointer" />
        </button>
        <div className="text-white">
          <div className="px-5">
            <div className=" flex mr-auto ml-auto w-fit items-center my-3.5">
              <button
                disabled={quantity === 1}
                data-testid="decrease"
                className={"text-amber-400 text-4xl cursor-pointer"}
                onClick={() => {
                  setQuantity((prevState) => prevState - 1)
                }}
              >
                <CiCircleMinus />
              </button>
              <span className="px-4" data-testid="quantity">{quantity}</span>
              <button
                className="text-amber-400 text-4xl cursor-pointer"
                data-testid="increase"
                onClick={() => {
                  setQuantity((prevState) => prevState + 1)
                }}
              >
                <CiCirclePlus />
              </button>
            </div>
            <button
              disabled={isPending}
              className="bg-yellow-400 mt-4 mb-8 rounded-md font-medium text-gray-950 w-full py-1.5 cursor-pointer disabled:opacity-50"
              onClick={handleClick}
            >
              {isPending ? (
                "Adding..."
              ) : (
                <>
                  <span>ADD ITEM</span>
                  <span className="px-2">-</span>
                  <span>R {(Number(price) * quantity).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
