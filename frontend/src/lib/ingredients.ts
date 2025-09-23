import { PiCheeseBold } from "react-icons/pi";
import { CiBacon } from "react-icons/ci";
import { LiaEggSolid } from "react-icons/lia";
import { PiPepper } from "react-icons/pi";
import { CiFries } from "react-icons/ci";
import { TbBrandCakephp } from "react-icons/tb";

import beef from "../assets/icons/beef_patty.svg";
import chicken from "../assets/icons/chicken_patty.svg";
import veggie from "../assets/icons/broccoli.svg";
import type { IconType } from "react-icons/lib";

export const ingredientIcons: Record<string, IconType | string> = {
  cheese: PiCheeseBold,
  eggs: LiaEggSolid,
  jalapeño: PiPepper,
  bacon: CiBacon,
  chicken: chicken,
  beef: beef,
  veggie: veggie,
  chips: CiFries,
  cake: TbBrandCakephp,
};
// TODO: add cake category add description for chicken burger, change some images
