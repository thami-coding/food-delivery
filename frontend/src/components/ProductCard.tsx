<<<<<<< Updated upstream
=======
import { useDialog } from "../store/dialogStore";
import { useProduct } from "../store/productStore";
>>>>>>> Stashed changes
import type { TProduct } from "../types/product";
import Ingredients from "./Ingredients";

export default function ProductCard({
<<<<<<< Updated upstream
  product,
  setProduct,
  setIsModalVisible
}: {
  product: TProduct;
  setProduct: (product: TProduct) => void;
  setIsModalVisible: (value: React.SetStateAction<boolean>) => void;
}) {
  const { imageUrl, price, description, ingredients, id, name } = product;
=======
  name, description, price, imageUrl, ingredients, id
}: TProduct) {
  const setProduct = useProduct((state) => state.setProduct)
  const toggleDialog = useDialog((state) => state.toggleDialog)

>>>>>>> Stashed changes
  return (
    <article
      className="shadow-lg shadow-neutral-950 flex flex-col justify-between  relative rounded-2xl max-w-80 max-h-[40rem]"
    >
      <span className="absolute top-2 left-2 font-lobster text-2xl text-black tracking-wide bg-yellow-400 p-1 rounded-2xl">
        R{price}
      </span>
      <div className="max-w-full rounded-tr-2xl rounded-tl-2xl overflow-hidden bg-black ">
        <img
          src={imageUrl}
          alt="food"
          className="object-contain w-full h-[260px]"
        />
      </div>

      <div className="text-left p-3  flex flex-col flex-1 justify-between shadow-lg shadow-neutral-900">
        <h3 className="text-2xl mb-3">{name}</h3>

        <Ingredients ingredients={ingredients} />
        <p>
          {description!.length > 60 ? (
            <>
              {description?.slice(0, 65)}{" "}
              <button className="text-sm text-yellow-400">...Read more</button>
            </>
          ) : (
            description
          )}
        </p>

        <button
          className="w-full mt-8 py-1 tracking-wider text-[1.3rem] rounded-md bg-amber-400 text-black cursor-pointer hover:bg-amber-300 transition-colors ease-in duration-300"
          onClick={() => {
<<<<<<< Updated upstream
            setProduct(product);
            setIsModalVisible(true)

=======
            setProduct({
              imageUrl, name, price, id
            });
            console.log("open modal");
            
            toggleDialog()
>>>>>>> Stashed changes
          }}
        >
          Add
        </button>
      </div>
    </article>
  );
}
