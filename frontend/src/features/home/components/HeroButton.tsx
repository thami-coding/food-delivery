import { Link } from "react-router"

type HeroProps = {
  title: string
  isTransparent?: boolean
}
export default function HeroButton({
  title,
  isTransparent = false,
}: HeroProps) {
  return (
    <Link
      to="/products"
      className={`px-6 py-3 rounded-lg border-2 border-yellow-400
        font-semibold  ${isTransparent && "bg-yellow-400 text-black"} 
        transition duration-300 mr-4 capitalize text-[1.2rem]`}
    >
      {title}
    </Link>
  )
}
