

export default function ProceedToPayment() {
 return (
  <div className="min-h-[70vh] grid place-content-center px-4 mt-25">
   <form action="https://sandbox.payfast.co.za/eng/process"
    method="post">
    <input type="hidden" name="merchant_id" value="10040258" />
    <input type="hidden" name="merchant_key" value="cer0bf24g7wfr" />
    <input type="hidden" name="amount" value={12.00} />
    <input type="hidden" name="item_name" value="Test Product" />
    <input type="hidden" name="return_url" value="https://www.example.com/"></input>
    <div className="w-full max-w-lg min-w-md rounded-2xl shadow-xl border border-zinc-800 p-8 space-y-6 bg-neutral-800">
     <h2 className="text-2xl font-semibold text-center text-white">
      Proceed to Payment
     </h2>
     <div className="rounded-lg bg-[#484646c6] p-4 space-y-2 text-sm text-white" >
      <div className="flex justify-between">
       <span>Items (3)</span>
       <span>R1,200</span>
      </div>
      <div className="flex justify-between">
       <span>Delivery Fee</span>
       <span>R20</span>
      </div>
      <div className="border-t pt-2 flex justify-between font-medium">
       <span>Total</span>
       <span>R1,250</span>
      </div>
     </div>
     <div className="flex items-start gap-3 text-sm text-zinc-600">
      <div>
       <p className="font-medium text-white">Delivering to</p>
       <p className="text-zinc-300">221B Baker Street, London</p>
      </div>
     </div>
     <button
     type="submit"
      className=" cursor-pointer w-full rounded-lg bg-yellow-300 text-neutral-800 py-3 font-medium hover:bg-yellow-400 transition"
     >
      Pay R1,250
     </button>
     <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
      <span>100% secure payment</span>
     </div>
     <p className="text-xs text-center text-zinc-400">
      By continuing, you agree to our{" "}
      <span className="underline cursor-pointer">Terms & Refund Policy</span>
     </p>
    </div>
   </form>
  </div>
 );
}




// import React from 'react'

// export default function Payment() {


//  return 
//  return (
//   <form
//    className="mt-6"
//    action="https://sandbox.payfast.co.za/eng/process"
//    method="post"
//   >
//    <input type="hidden" name="merchant_id" value="10040258" />
//    <input type="hidden" name="merchant_key" value="cer0bf24g7wfr" />
//    <input type="hidden" name="amount" value={orderTotal} />
//    <input type="hidden" name="item_name" value="Test Product" />
//    <input type="hidden" name="return_url" value="https://www.example.com/"></input>

//    <div className="flex justify-between">
//     <h2 className="font-bold">Payment Method:</h2>
//     {/* <button
//        type="button"
//        className="text-yellow-400 cursor-pointer hover:underline"
//        onClick={handleClick}
//      >
//     change
//      </button> */}
//    </div>
//    <p>Card</p>

//    <div className="flex justify-between font-extrabold text-yellow-400 border-t-1 border-white mt-5 pt-3">
//     <span> Total Payment</span> <span>R{orderTotal}</span>
//    </div>
//    <div className="flex justify-between pt-2">
//     <span className="py-1.5">Discount</span>
//     <span className="font-bold">R0.00</span>
//    </div>
//    <button
//     type="submit"
//     className=" block text-center bg-yellow-400 w-full mt-6 text-gray-950 py-2 rounded-sm font-semibold track"
//    >
//     Place Order
//    </button>
//   </form>
//  )
// }
