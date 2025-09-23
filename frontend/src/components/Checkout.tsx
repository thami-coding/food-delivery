import { useState } from "react";
import { postAddress } from "../lib/apiClient";
import { useGlobalState } from "../hooks/useGlobalState";

export default function Checkout() {
  const { state } = useGlobalState();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  const [address, setAddress] = useState({
    street: "34 ThoryHill Place",
    city: "Durban",
    province: "Kwazulu-Natal",
    zip_code: "4037",
    userId: state.user?.userId || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postAddress(address);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10  border  text-gray-100 mr-20 w-lg p-3"
    >
      <div className="flex justify-between">
        <h2 className=" tracking-wide text-gray font-bold">Address:</h2>
        <button
          type="button"
          className="text-yellow-400 cursor-pointer hover:underline"
          onClick={() => setIsEditingAddress(!isEditingAddress)}
        >
          {isEditingAddress ? "save" : "change"}
        </button>
      </div>

      <div className="text-sm tracking-wide py-2">
        <input
          disabled={!isEditingAddress}
          placeholder="Enter Street"
          className="block mb-1 p-1"
          name="street"
          value={address.street}
          onChange={handleChange}
        />
        <input
          disabled={!isEditingAddress}
          placeholder="Enter City"
          className="block mb-1 p-1"
          value={address.city}
          onChange={handleChange}
        />
        <input
          disabled={!isEditingAddress}
          placeholder="Enter Province"
          className="block mb-1 p-1"
          name="province"
          value={address.province}
          onChange={handleChange}
        />
        <input
          disabled={!isEditingAddress}
          placeholder="Enter area code"
          className="block p-1"
          name="zip_code"
          value={address.zip_code}
          onChange={handleChange}
        />
      </div>

      <form
        className="mt-6"
        action="https://sandbox.payfast.co.za/eng/process"
        method="post"
      >
        <input type="hidden" name="merchant_id" value="10040258" />
        <input type="hidden" name="merchant_key" value="cer0bf24g7wfr" />
        <input type="hidden" name="amount" value="100.00" />
        <input type="hidden" name="item_name" value="Test Product" />

        <div className="flex justify-between">
          <h2 className="font-bold">Payment Method:</h2>
          <button
            type="button"
            className="text-yellow-400 cursor-pointer hover:underline"
            onClick={() => setIsEditingPayment(!isEditingPayment)}
          >
            {isEditingPayment ? "save" : "change"}
          </button>
        </div>
        <p>Card</p>
        <div className="flex justify-between border-t-1 mt-6 pt-5">
          <span>Order Amount</span> <span className="font-bold">R60.00</span>
        </div>
        <div className="flex justify-between">
          <span className="py-1.5">Discount</span>{" "}
          <span className="font-bold">R0.00</span>
        </div>
        <div className="flex justify-between font-extrabold text-yellow-400">
          <span> Total Payment</span> <span>R60.00</span>
        </div>
          <button
        type="submit"
        className=" block text-center bg-yellow-400 w-full mt-6 text-gray-950 py-2 rounded-sm font-semibold track"
      >
        Proceed to Payment
      </button>
      </form>
    
    </form>
  );
}
