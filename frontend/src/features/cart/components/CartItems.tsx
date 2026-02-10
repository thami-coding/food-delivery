import { CiCircleMinus, CiCirclePlus } from "react-icons/ci"
import { IoTrashOutline } from "react-icons/io5"
import type { DetailedCart, UpdateQuantity } from "../types"
import { useDeletCart, useUpdateCart } from "../hooks"

export default function CartItems({ cart }: { cart: DetailedCart[] }) {
  const { mutate: updateCartItem } = useUpdateCart()
  const { mutate: deleteCartItem } = useDeletCart()

  const handleQuantityChange = ({ quantity, productId }: UpdateQuantity) => {
    updateCartItem({ quantity, productId })
  }

  return (
    <>
      {cart.map((cartItem) => {
        const { name, price, id, imageUrl } = cartItem.product
        const { quantity } = cartItem
        const productId = id as string

        return (
          <div key={productId} className="p-5  hover:bg-gray-600 rounded-sm">
            <div className="border-b grid grid-cols-3 w-fit pb-3">
              <div className="h-27 border rounded-md border-transparent overflow-hidden bg-linear-to-br from-black/20 to-[#3b3b3b]">
                <img
                  src={imageUrl}
                  alt=""
                  className="h-full object-cover w-36"
                />
              </div>
              <div className="flex px-2 flex-col justify-between">
                <h2>{name}</h2>
                <p className="text-xs">Size: Small</p>
                <div className=" rounded-4xl py-1 px-0.5 flex justify-between w-fit">
                  <button
                    data-testid="decrease"
                    className="text-2xl cursor-pointer"
                    disabled={quantity === 1}
                    onClick={() =>
                      handleQuantityChange({
                        quantity: quantity - 1,
                        productId,
                      })
                    }
                  >
                    <CiCircleMinus />
                  </button>
                  <span className="px-2" data-testid="quantity">
                    {quantity}
                  </span>
                  <button
                    data-testid="increase"
                    className="text-2xl cursor-pointer"
                    onClick={() =>
                      handleQuantityChange({
                        quantity: quantity + 1,
                        productId,
                      })
                    }
                  >
                    <CiCirclePlus />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button
                  className="hover:text-red-600 cursor-pointer"
                  onClick={() => deleteCartItem(productId)}
                >
                  <IoTrashOutline />
                </button>
                <p>R{(Number(price) * quantity).toFixed(2)}</p>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
