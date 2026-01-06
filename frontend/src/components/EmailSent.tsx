import { TfiEmail } from "react-icons/tfi";

export default function EmailSent({ email }: { email: string }) {
 return (
  <article className="ml-auto mr-auto mt-15 py-15 shadow-lg shadow-neutral-900 rounded-md text-white px-8 w-[28rem] bg-[#202020] ">
   <div className="border-2 border-green-600 text-green-600 rounded-full text-5xl p-6 w-fit mr-auto ml-auto mb-6 block">
    <TfiEmail />
   </div>
   <h3 className='text-center text-2xl mb-6'>Check your email</h3>
   <p className='mb-3 text-center text-neutral-300 px-10'>Please check the email address {email} for instructions to reset your password.</p>
   <div className='mt-8'>
    <button
     className="w-full text-neutral-900 text-[1.2rem] py-3 text- rounded-md cursor-pointer hover:bg-amber-400 bg-amber-300"
    >
     Resend email
    </button>
   </div>
  </article>
 )
}
