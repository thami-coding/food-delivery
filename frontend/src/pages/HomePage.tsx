import { GiChickenOven } from "react-icons/gi"

import HeroButton from "../features/home/components/HeroButton"
import Promo from "../features/home/components/Promo"

export default function HomePage() {
  return (
    <section className="pt-4 h-screen">
      <div className="flex items-center  justify-around h-[calc(100vh-1rem)]">
        <div className="flex flex-col text-white">
          <div className="flex  font-lobster text-yellow-400">
            <h2 className="mb-4 text-5xl">Fast Food at Its Best</h2>
            <GiChickenOven className="text-5xl ml-2" />
          </div>
          <h3 className="mb-4 text-3xl">
            Hungry? We’ve got what you’re craving
          </h3>
          <p className="mb-7 text-[1.2rem] ">
            Whether you're in a rush or just hungry for something better, <br />{" "}
            we've got your taste buds covered.
          </p>
          <div className="mt-3">
            <HeroButton title="Specials" />
            <HeroButton title="Menu" isTransparent={true} />
          </div>
        </div>
        <Promo />
      </div>
    </section>
  )
}
