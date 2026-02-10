import Img from "../../../assets/hero-img.png"

export default function Promo() {
  return (
    <div>
      <div className="w-lg relative rounded-2xl py-3.5">
        <h3 className="font-lobster text-4xl text-center text-yellow-400">
          Beef Me Up Combo
        </h3>
        <div className="flex flex-col  border-3 border-yellow-400  w-fit rounded-full py-2 px-5 absolute right-10 text-white font-lobster text-[1.2rem]">
          <span>50%</span>
          <span>OFF</span>
        </div>
        <img src={Img} alt="hero image" />
        <p className="text-center text-4xl text-white  font-lobster">
          R40 Only
        </p>
      </div>
    </div>
  )
}
