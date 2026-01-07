import { FaRegCircleCheck } from 'react-icons/fa6'
import { Link } from 'react-router'

export default function ProfileUpdated() {
 return (
  <article className="ml-auto mr-auto mt-20 py-15  shadow-lg shadow-neutral-900 rounded-md text-white px-8 w-[28rem] bg-[#202020] ">

   <FaRegCircleCheck className="text-green-600 text-7xl ml-auto mr-auto mb-6 block" />
   <h3 className='text-center text-2xl mb-6'>Profile Updated</h3>
   <p className='mb-3 text-center text-neutral-300'>Your information was successfully updated.</p>
   <div className='mt-8'>
    <Link to="/checkout"
     className="w-full text-neutral-900 text-[1.2rem] py-2 text- rounded-md cursor-pointer hover:bg-amber-400 bg-amber-300 block text-center"
    >
     Back to checkout
    </Link>
   </div>
  </article>
 )
}
