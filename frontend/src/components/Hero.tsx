import Img from "../assets/hero-img.png";
import { GiChickenOven } from "react-icons/gi";

const Hero = () => {
  return (
    <section className="flex items-center  justify-around h-[calc(100vh-1rem)]">
      <div className="flex flex-col text-white">
        <div className="flex  font-lobster text-yellow-400">
          <h2 className="mb-4 text-5xl">Fast Food at Its Best</h2>

          <GiChickenOven className="text-5xl ml-2" />
        </div>

        <h3 className="mb-4 text-3xl">Hungry? We’ve got what you’re craving</h3>
        <p className="mb-7 text-[1.2rem] ">
          Whether you're in a rush or just hungry for something better, <br />{" "}
          we've got your taste buds covered.
        </p>
        <div>
          <a
            href="#category"
            className=" mr-5 cursor-pointer text-[1.5rem] font-medium capitalize px-5 bg-amber-400 text-black   rounded-3xl py-1"
          >
            specials
          </a>
          <a
            href="#category"
            className="border cursor-pointer text-[1.5rem]  font-medium capitalize  px-5 rounded-3xl py-1"
          >
            Menu
          </a>
        </div>
      </div>
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
    </section>
  );
};

export default Hero;
