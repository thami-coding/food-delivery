import { useDialog } from "../dialogStore"
import { useProduct } from "../productStore"
import Ingredients from "./Ingredients"

type ProductCardProps = {
  id: string
  name: string
  price: string
  imageUrl: string
  ingredients: string
}
export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
  ingredients,
}: ProductCardProps) {
  const setProduct = useProduct((state) => state.setProduct)
  const toggleDialog = useDialog((state) => state.toggleDialog)
  const handleClick = () => {
    setProduct({ imageUrl, name, price, id })
    toggleDialog()
  }
  return (
    <article className="shadow-lg shadow-neutral-950 flex flex-col justify-between relative rounded-2xl max-w-80 max-h-160">
      <span className="absolute top-2 left-2 font-lobster text-2xl text-black tracking-wide bg-yellow-400 p-1 rounded-2xl">
        R{price}
      </span>
      <div className="max-w-full rounded-tr-2xl rounded-tl-2xl overflow-hidden bg-gray-950 ">
        <img src={imageUrl} alt="food" className="object-contain w-full h-65" />
      </div>

      <div className="text-left p-3  flex flex-col flex-1 justify-between shadow-lg shadow-neutral-900">
        <h3 className="text-2xl mb-3">{name}</h3>
        <p>Ingredients</p>
        <Ingredients ingredients={ingredients} />

        <button
          className="w-full mt-8 py-1 tracking-wider text-[1.3rem] rounded-md bg-amber-400 text-black cursor-pointer hover:bg-amber-300 transition-colors ease-in duration-300"
          onClick={handleClick}
        >
          Add
        </button>
      </div>
    </article>
  )
}
