import { MdOutlineClose } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import type { TProduct } from "../types/product";
import { addCartItem } from "../lib/apiClient";
import { useUser } from "../hooks/useAuth";

const AddItem = ({ product, setIsModalVisible }: { product: TProduct | null, setIsModalVisible: (value: React.SetStateAction<boolean>) => void }) => {
  const [quantity, setQuantity] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const notify = () => toast("Item Added!");
  const { user } =  useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
       setIsModalVisible(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const { imageUrl, name, price, productId } = product;
  return (
    <div>
      <div className="absolute inset-0 bg-black/60  backdrop-blur-xs"></div>
      <div
        ref={containerRef}
        className="w-md  ml-auto mr-auto mt-24 border rounded-md overflow-hidden fixed -top-5 left-1/3 bg-gray-950"
      >
        <div className="bg-gradient-to-br from-black/20 to-[#3b3b3b]">
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
          onClick={()=> setIsModalVisible(false)}
        >
          <MdOutlineClose className="text-4xl cursor-pointer" />
        </button>
        <div className="text-white">
          <div className="px-5">
            <div className=" flex mr-auto ml-auto w-fit items-center my-3.5">
              <button
                disabled={quantity === 1}
                className={"text-amber-400 text-4xl cursor-pointer"}
                onClick={() => {
                  setQuantity((prevState) => prevState - 1);
                }}
              >
                <CiCircleMinus />
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="text-amber-400 text-4xl cursor-pointer"
                onClick={() => {
                  setQuantity((prevState) => prevState + 1);
                }}
              >
                <CiCirclePlus />
              </button>
            </div>
            <button
              className="bg-yellow-400 mt-4 mb-8 rounded-md font-medium text-gray-950 w-full py-1.5 cursor-pointer"
              onClick={() => {
                addCartItem({
                  userId: user?.id as string,
                  productId: productId,
                  quantity,
                });
                 notify();
                 setIsModalVisible(false);
              }}
            >
              <span>ADD ITEM</span>
              <span className="px-2">-</span>
              <span>R {(price * quantity).toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
